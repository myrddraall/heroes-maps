// The catalog: maps/index.json, listing every pack in maps/ from its pack.json. Generated, never
// edited by hand; formatted with the repository's prettier settings so it is formatter-clean.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const mapsFolder = join(root, 'maps');

export async function writeCatalog() {
  const maps = [];
  for (const id of readdirSync(mapsFolder).sort()) {
    const packFile = join(mapsFolder, id, 'pack.json');
    if (!existsSync(packFile)) continue;
    const pack = JSON.parse(readFileSync(packFile, 'utf8'));
    if (pack.map.id !== id) throw new Error(`maps/${id}/pack.json is the pack of ${pack.map.id}`);
    const thumbnail = pack.images?.thumbnail;
    maps.push({
      id,
      name: pack.map.name,
      category: pack.map.category ?? null,
      gameBuild: pack.gameBuild,
      tool: pack.tool,
      structures: pack.map.structures ?? null,
      path: `${id}/`,
      pack: `${id}/pack.json`,
      thumbnail: thumbnail ? { file: `${id}/${thumbnail.file}`, size: thumbnail.size } : null,
    });
  }
  const file = join(mapsFolder, 'index.json');
  const text = JSON.stringify({ format: 1, maps });
  const options = { ...(await resolveConfig(file)), filepath: file };
  writeFileSync(file, await format(text, options));
  return maps;
}
