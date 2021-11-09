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

externals['css-loader'] = '@builder/rax-pack/deps/css-loader';
export async function ncc_css_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('css-loader'))
    )
    .ncc({ packageName: 'css-loader', externals })
    .target('deps/css-loader');
}

externals['sass-loader'] = '@builder/rax-pack/deps/sass-loader';
export async function ncc_sass_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('sass-loader'))
    )
    .ncc({ packageName: 'sass-loader', externals })
    .target('deps/sass-loader');
}

externals['less-loader'] = '@builder/rax-pack/deps/less-loader';
export async function ncc_less_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('less-loader'))
    )
    .ncc({ packageName: 'less-loader', externals })
    .target('deps/less-loader');
}

externals['postcss-loader'] = '@builder/rax-pack/deps/postcss-loader';
export async function ncc_postcss_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-loader'))
    )
    .ncc({ packageName: 'postcss-loader', externals })
    .target('deps/postcss-loader');
}

externals['postcss-safe-parser'] = '@builder/rax-pack/deps/postcss-safe-parser';
export async function ncc_postcss_safe_parser(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-safe-parser'))
    )
    .ncc({ packageName: 'postcss-safe-parser', externals })
    .target('deps/postcss-safe-parser');
}

externals['css-minimizer-webpack-plugin'] = '@builder/rax-pack/deps/css-minimizer-webpack-plugin';
export async function ncc_css_minimizer_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('css-minimizer-webpack-plugin'))
    )
    .ncc({ packageName: 'css-minimizer-webpack-plugin', externals })
    .target('deps/css-minimizer-webpack-plugin');
}

externals['postcss'] = '@builder/rax-pack/deps/postcss';
export async function ncc_postcss(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss'))
    )
    .ncc({ packageName: 'postcss', externals })
    .target('deps/postcss');
}

export async function ncc(task) {
  await task
    .clear('compiled')
    .parallel([
      'ncc_css_loader',
      'ncc_sass_loader',
      'ncc_less_loader',
      'ncc_postcss_loader',
      'ncc_postcss_safe_parser',
      'ncc_css_minimizer_webpack_plugin',
      'ncc_postcss',
    ]);
}

export default async function (task) {
  await task.clear('dist')
}
