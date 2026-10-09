# heroes-maps

Heroes of the Storm battleground maps, rendered from the game by
[heroes-capture](https://github.com/myrddraall/heroes-capture), and served by GitHub Pages:

- **Home page:** https://myrddraall.github.io/heroes-maps/
- **Catalog:** https://myrddraall.github.io/heroes-maps/maps/index.json
- **A map's pack:** `https://myrddraall.github.io/heroes-maps/maps/<map id>/pack.json`

Each map is a pack, as heroes-capture's
[PACK.md](https://github.com/myrddraall/heroes-capture/blob/main/PACK.md) describes it:
`pack.json`, the PMTiles layers, the sky pictures, the structures' and camps' cut-outs
(`elements/`), and `index.html`, heroes-capture's reference viewer. The packs are committed
here exactly as heroes-capture wrote them. Nothing builds them, and nothing zips them.

## Layout

| Path              | What it is                                                                   |
| ----------------- | ---------------------------------------------------------------------------- |
| `maps/<map id>/`  | One map's pack                                                               |
| `maps/index.json` | The catalog: per map its id, name, game build, heroes-capture version, paths |
| `index.html`      | The home page, listing the catalog's maps                                    |
| `tools/`          | `add.map` and `generate.catalog`                                             |
| `.nojekyll`       | Pages serves every file as-is                                                |

Paths in the catalog are relative to the catalog itself (`maps/`).

## Using the maps from another site

Pages sends `Access-Control-Allow-Origin: *` and answers byte-range requests. A browser on
any site can therefore fetch `pack.json` and its pictures, and read the `.pmtiles` layers in
ranges (for example with the [`pmtiles`](https://www.npmjs.com/package/pmtiles) package).

Only the latest set of maps is live on Pages. An older release's files stay reachable at its tag:
`https://raw.githubusercontent.com/myrddraall/heroes-maps/<tag>/maps/<map id>/pack.json`.

## Adding or refreshing a map

1. Render the map with heroes-capture, on the machine with the game. The pack is the
   `pack` folder of that render (`maps\<map id>\pack`, or `maps\<map id>\elements\pack` for an
   elements render).
2. Copy the pack in, and rewrite the catalog:

   ```sh
   pnpm install
   pnpm run add.map <path to the pack folder>
   ```

   `add.map` replaces `maps/<map id>/` entirely. To rewrite the catalog alone (after removing
   a map, for example), run `pnpm run generate.catalog`.

3. Commit it on a branch, open a pull request into `main`, and merge it.
4. Release it as with any git-flow repository: the release pull request git-flow opens
   (`release/main`), once merged, tags the release (`@myrddraall/heroes-maps/v<version>`) and
   attaches the catalog.

Every re-render of a map adds its whole pack to the repository's history again: tens of MB per
map. Re-render only when a game patch or heroes-capture's output changes a map.

## Setup (once)

- Pages: Settings → Pages → Build and deployment → Source: **Deploy from a branch**, branch
  **main**, folder **/ (root)**.

## Development

`pnpm install`, then the root scripts:

| Script                      | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `pnpm run add.map <folder>` | Copies a pack into `maps/<map id>/` and the catalog |
| `pnpm run generate.catalog` | Rewrites `maps/index.json` from the packs           |
| `pnpm format`               | syncpack format and prettier                        |
| `pnpm check`                | Dependency versions and syncpack consistency        |
