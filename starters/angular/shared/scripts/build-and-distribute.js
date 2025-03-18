const cli = require('@angular/cli').default;
const path = require('path');
const fs = require('fs');

/**
 * A simple script that builds the shared library and then distributes
 * that build to all of the Angular templates that depend on it.
 */

const PROJECTS = [
  'ai-chatbot',
  'ai-text-editor',
  'dashboard',
  'ecommerce',
  'image-gallery',
  'kanban',
];
const DIST_PATH = path.join(__dirname, '../dist/shared');

const log = console.log;

async function buildAndDistribute() {
  log('Initiating a build ...');
  await cli({ cliArgs: ['build'] });

  for (const project of PROJECTS) {
    const projectVendorPath = path.join(
      __dirname,
      '../../',
      project,
      'vendor/shared',
    );

    log(`Distributing to "${project}" ...`);

    fs.cp(DIST_PATH, projectVendorPath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

buildAndDistribute();
