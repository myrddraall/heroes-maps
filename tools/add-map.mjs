// Adds a map, or refreshes it: copies a pack folder heroes-capture rendered (the folder with
// pack.json in it) into maps/<map id>/, replacing what was there, then rewrites the catalog.
//
//   pnpm run add.map <path to a pack folder>
import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { mapsFolder, writeCatalog } from './catalog.mjs';

const source = process.argv[2] && resolve(process.env.INIT_CWD ?? process.cwd(), process.argv[2]);
if (!source || !existsSync(join(source, 'pack.json'))) {
  console.error('usage: pnpm run add.map <path to a pack folder (the one with pack.json)>');
  process.exit(1);
}
const pack = JSON.parse(readFileSync(join(source, 'pack.json'), 'utf8'));
const target = join(mapsFolder, pack.map.id);
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`${pack.map.name}: ${source} -> ${target}`);
const maps = await writeCatalog();
console.log(`maps/index.json: ${maps.length} map${maps.length === 1 ? '' : 's'}`);
