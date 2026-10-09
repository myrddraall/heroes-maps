// Declares what this project publishes. Read by `gitflow pack`.
// The packs themselves are served from the main branch by GitHub Pages; a release is the git tag,
// with the catalog of the maps it holds attached. The path is absolute because git-flow checks an
// attachment from the project folder but uploads it from the workspace root.
import { join } from 'node:path';

export default {
  artifacts: [
    {
      type: 'release-attachment',
      name: 'index.json',
      path: join(import.meta.dirname, 'index.json'),
      contentType: 'application/json',
    },
  ],
};
