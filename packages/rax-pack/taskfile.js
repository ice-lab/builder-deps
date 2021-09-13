// inspired by https://github.com/vercel/next.js/blob/canary/packages/next/taskfile.js
const fs = require('fs-extra');
const { relative, basename, resolve, dirname, join } = require('path')
const { Module } = require('module')

// Note:
// "bundles" folder shadows main node_modules in workspace where all installs in
// this shadow node_modules are alias installs only.
// This is because Yarn alias installs have bugs with version deduping where
// transitive versions are not resolved correctly - for example, webpack5
// will end up resolving webpack-sources@1 instead of webpack-sources@2.
// If/when this issue is fixed upstream in Yarn, this "shadowing" workaround can
// then be removed to directly install the bundles/package.json packages into
// the main package.json as normal devDependencies aliases.
const m = new Module(resolve(__dirname, 'bundles', '_'))
m.filename = m.id
m.paths = Module._nodeModulePaths(m.id)
const bundleRequire = m.require
bundleRequire.resolve = (request, options) =>
  Module._resolveFilename(request, m, false, options)


const externals = {
  chalk: 'chalk',
  'node-fetch': 'node-fetch',
  // postcss: 'postcss',

  // webpack
  'node-libs-browser': 'node-libs-browser',

  // sass-loader
  // (also responsible for these dependencies in package.json)
  'node-sass': 'node-sass',
  sass: 'sass',
  fibers: 'fibers',

  chokidar: 'chokidar',
  'jest-worker': 'jest-worker',
};

export async function ncc(task) {
  await task
    .clear('compiled')
    .parallel([
      
    ]);
}

export default async function (task) {
  await task.clear('dist')
}
