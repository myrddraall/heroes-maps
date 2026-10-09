// Rewrites maps/index.json from the packs in maps/.
//
//   pnpm run generate.catalog
import { writeCatalog } from './catalog.mjs';

const maps = await writeCatalog();
console.log(
  `maps/index.json: ${maps.length} map${maps.length === 1 ? '' : 's'}: ${maps.map((m) => m.name).join(', ')}`,
);
