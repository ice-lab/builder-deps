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

externals['camelcase'] = '@builder/pack/deps/camelcase';
export async function ncc_camelcase(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('camelcase'))
    )
    .ncc({ packageName: 'camelcase', externals })
    .target('deps/camelcase');
}

externals['address'] = '@builder/pack/deps/address';
export async function ncc_address(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('address'))
    )
    .ncc({ packageName: 'address', externals })
    .target('deps/address');
}

externals['ansi-html'] = '@builder/pack/deps/ansi-html';
export async function ncc_ansi_html(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('ansi-html'))
    )
    .ncc({ packageName: 'ansi-html', externals })
    .target('deps/ansi-html');
}

export async function ncc_babel_bundle(task, opts) {
  const bundleExternals = { ...externals }
  for (const pkg of Object.keys(babelBundlePackages))
    delete bundleExternals[pkg]
  await task
    .source(opts.src || 'bundles/babel/bundle.js')
    .ncc({
      packageName: '@babel/core',
      bundleName: '@babel',
      externals: bundleExternals,
      minify: false,
    })
    .target('deps/@babel');
}

const babelBundlePackages = {
  '@babel/code-frame': '@builder/pack/deps/@babel/code-frame',
  '@babel/core': '@builder/pack/deps/@babel/core',
  '@babel/parser': '@builder/pack/deps/@babel/parser',
  '@babel/traverse': '@builder/pack/deps/@babel/traverse',
  '@babel/types': '@builder/pack/deps/@babel/types',
  '@babel/preset-env': '@builder/pack/deps/@babel/preset-env',
  '@babel/preset-react': '@builder/pack/deps/@babel/preset-react',
  '@babel/preset-typescript': '@builder/pack/deps/@babel/preset-typescript',
}

Object.assign(externals, babelBundlePackages);

export async function ncc_babel_bundle_packages(task, opts) {
  await task
    .source(opts.src || 'bundles/babel/packages/*')
    .target('deps/@babel/')
}

externals['body-parser'] = '@builder/pack/deps/body-parser';
export async function ncc_body_parser(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('body-parser'))
    )
    .ncc({ packageName: 'body-parser', externals })
    .target('deps/body-parser');
}

externals['cacache'] = '@builder/pack/deps/cacache';
export async function ncc_cacache(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('cacache'))
    )
    .ncc({ packageName: 'cacache', externals })
    .target('deps/cacache');
}

externals['cheerio'] = '@builder/pack/deps/cheerio';
export async function ncc_cheerio(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('cheerio'))
    )
    .ncc({ packageName: 'cheerio', externals })
    .target('deps/cheerio');
}

externals['cliui'] = '@builder/pack/deps/cliui';
export async function ncc_cliui(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('cliui'))
    )
    .ncc({ packageName: 'cliui', externals })
    .target('deps/cliui');
}

externals['color'] = '@builder/pack/deps/color';
export async function ncc_color(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('color'))
    )
    .ncc({ packageName: 'color', externals })
    .target('deps/color');
}

externals['copy-webpack-plugin'] = '@builder/pack/deps/copy-webpack-plugin';
export async function ncc_copy_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('copy-webpack-plugin'))
    )
    .ncc({ packageName: 'copy-webpack-plugin', externals })
    .target('deps/copy-webpack-plugin');
}

externals['css-loader'] = '@builder/pack/deps/css-loader';
export async function ncc_css_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('css-loader'))
    )
    .ncc({ packageName: 'css-loader', externals })
    .target('deps/css-loader');
}

externals['debug'] = '@builder/pack/deps/debug';
export async function ncc_debug(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('debug'))
    )
    .ncc({ packageName: 'debug', externals })
    .target('deps/debug');
}

externals['ejs'] = '@builder/pack/deps/ejs';
export async function ncc_ejs(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('ejs'))
    )
    .ncc({ packageName: 'ejs', externals })
    .target('deps/ejs');
}

externals['file-loader'] = '@builder/pack/deps/file-loader';
export async function ncc_file_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('file-loader'))
    )
    .ncc({ packageName: 'file-loader', externals })
    .target('deps/file-loader');
}

// externals['fork-ts-checker-webpack-plugin'] = '@builder/pack/deps/fork-ts-checker-webpack-plugin';
export async function ncc_fork_ts_checker_webpack_plugin_bundle(task, opts) {
  await task
    .source(opts.src || 'bundles/fork-ts-checker-webpack-plugin/bundle.js')
    .ncc({
      packageName: 'fork-ts-checker-webpack-plugin',
      bundleName: 'fork-ts-checker-webpack-plugin',
      externals: {
        ...externals,
        typescript: 'typescript',
        eslint: 'eslint',
      },
      minify: false,
    })
    .target('deps/fork-ts-checker-webpack-plugin')

  await task
    .source(
      opts.src || relative(__dirname, require.resolve('fork-ts-checker-webpack-plugin'))
    )
    .ncc({ packageName: 'fork-ts-checker-webpack-plugin', externals })
    .target('deps/fork-ts-checker-webpack-plugin');
}

export async function ncc_fork_ts_checker_webpack_plugin_bundle_package(task, opts) {
  await task
    .source(opts.src || 'bundles/fork-ts-checker-webpack-plugin/packages/*')
    .target('deps/fork-ts-checker-webpack-plugin/')
}

externals['@nuxtjs/friendly-errors-webpack-plugin'] = '@builder/pack/deps/@nuxtjs/friendly-errors-webpack-plugin';
export async function ncc_friendly_errors_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('@nuxtjs/friendly-errors-webpack-plugin'))
    )
    .ncc({ packageName: '@nuxtjs/friendly-errors-webpack-plugin', externals })
    .target('deps/@nuxtjs/friendly-errors-webpack-plugin');
}

externals['globby'] = '@builder/pack/deps/globby';
export async function ncc_globby(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('globby'))
    )
    .ncc({ packageName: 'globby', externals })
    .target('deps/globby');
}

externals['less-loader'] = '@builder/pack/deps/less-loader';
export async function ncc_less_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('less-loader'))
    )
    .ncc({ packageName: 'less-loader', externals: { ...externals, less: 'less' } })
    .target('deps/less-loader');
}

externals['sass-loader'] = '@builder/pack/deps/sass-loader';
export async function ncc_sass_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('sass-loader'))
    )
    .ncc({ packageName: 'sass-loader', externals: { ...externals, sass: 'sass' } })
    .target('deps/sass-loader');
}

// externals['loader-utils'] = '@builder/pack/deps/loader-utils';
export async function ncc_loader_utils(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('loader-utils'))
    )
    .ncc({ packageName: 'loader-utils', externals })
    .target('deps/loader-utils');
}

externals['lodash'] = '@builder/pack/deps/lodash';
export async function ncc_lodash(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('lodash'))
    )
    .ncc({ packageName: 'lodash', externals })
    .target('deps/lodash');
}

externals['css-declaration-sorter'] = '@builder/pack/deps/css-declaration-sorter';
export async function ncc_css_declaration_sorter(task, opts) {
  const dir = 'lib';
  await task
    .source(opts.src || relative(__dirname, require.resolve('css-declaration-sorter')))
    .ncc({ packageName: 'css-declaration-sorter', externals, dir })
    .target(`deps/css-declaration-sorter/${dir}`);
  const packageFolder = dirname(require.resolve('css-declaration-sorter/package.json'))
  fs.copySync(join(packageFolder, 'orders'), join(__dirname, 'deps/css-declaration-sorter/orders'));
}

externals['mini-css-extract-plugin'] = '@builder/pack/deps/mini-css-extract-plugin';
export async function ncc_mini_css_extract_plugin(task, opts) {
  await task
    .source(
      relative(
        __dirname,
        resolve(require.resolve('mini-css-extract-plugin'), '../index.js')
      )
    )
    .ncc({
      externals: {
        ...externals,
        './index': './index.js',
        'schema-utils': '@builder/pack/deps/schema-utils3',
        'webpack/lib/util/identifier': '@builder/pack/deps/webpack/identifier',
      },
    })
    .target('deps/mini-css-extract-plugin')
  await task
    .source(
      opts.src ||
        relative(__dirname, require.resolve('mini-css-extract-plugin'))
    )
    .ncc({
      packageName: 'mini-css-extract-plugin',
      externals: {
        ...externals,
        './index': './index.js',
        'schema-utils': '@builder/pack/deps/schema-utils3',
        'webpack/lib/util/identifier': '@builder/pack/deps/webpack/identifier'
      },
    })
    .target('deps/mini-css-extract-plugin')

  const packageFolder = dirname(require.resolve('mini-css-extract-plugin/package.json'))
  fs.copySync(join(packageFolder, 'dist/hmr'), join(__dirname, 'deps/mini-css-extract-plugin/hmr'));
}

externals['@pmmmwh/react-refresh-webpack-plugin'] = '@builder/pack/deps/@pmmmwh/react-refresh-webpack-plugin';
export async function ncc_react_refresh_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('@pmmmwh/react-refresh-webpack-plugin'))
    )
    .ncc({ packageName: '@pmmmwh/react-refresh-webpack-plugin', externals: {
      ...externals,
      'schema-utils': '@builder/pack/deps/schema-utils3',
    }})
    .target('deps/@pmmmwh/react-refresh-webpack-plugin');
}

externals['file-loader'] = '@builder/pack/deps/file-loader';
export async function ncc_file_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('file-loader'))
    )
    .ncc({ packageName: 'file-loader', externals })
    .target('deps/file-loader');
}

externals['url-loader'] = '@builder/pack/deps/url-loader';
export async function ncc_url_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('url-loader'))
    )
    .ncc({ packageName: 'url-loader', externals })
    .target('deps/url-loader');
}

externals['css-minimizer-webpack-plugin'] = '@builder/pack/deps/css-minimizer-webpack-plugin';
export async function ncc_css_minimizer_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('css-minimizer-webpack-plugin'))
    )
    .ncc({ packageName: 'css-minimizer-webpack-plugin', externals })
    .target('deps/css-minimizer-webpack-plugin');
}

externals['case-sensitive-paths-webpack-plugin'] = '@builder/pack/deps/case-sensitive-paths-webpack-plugin';
export async function ncc_case_sensitive_paths_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('case-sensitive-paths-webpack-plugin'))
    )
    .ncc({ packageName: 'case-sensitive-paths-webpack-plugin', externals })
    .target('deps/case-sensitive-paths-webpack-plugin');
}

externals['terser-webpack-plugin'] = '@builder/pack/deps/terser-webpack-plugin';
export async function ncc_terser_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('terser-webpack-plugin'))
    )
    .ncc({ packageName: 'terser-webpack-plugin', externals })
    .target('deps/terser-webpack-plugin');
}

externals['time-fix-plugin'] = '@builder/pack/deps/time-fix-plugin';
export async function ncc_time_fix_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('time-fix-plugin'))
    )
    .ncc({ packageName: 'time-fix-plugin', externals })
    .target('deps/time-fix-plugin');
}

externals['webpack-filter-warnings-plugin'] = '@builder/pack/deps/webpack-filter-warnings-plugin';
export async function ncc_webpack_filter_warnings_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('webpack-filter-warnings-plugin'))
    )
    .ncc({ packageName: 'webpack-filter-warnings-plugin', externals })
    .target('deps/webpack-filter-warnings-plugin');
}

externals['webpack-simple-progress-plugin'] = '@builder/pack/deps/webpack-simple-progress-plugin';
export async function ncc_webpack_simple_progress_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('webpack-simple-progress-plugin'))
    )
    .ncc({ packageName: 'webpack-simple-progress-plugin', externals })
    .target('deps/webpack-simple-progress-plugin');
}

externals['add-asset-html-webpack-plugin'] = '@builder/pack/deps/add-asset-html-webpack-plugin';
export async function ncc_add_asset_html_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('add-asset-html-webpack-plugin'))
    )
    .ncc({ packageName: 'add-asset-html-webpack-plugin', externals: {
      ...externals,
      'html-webpack-plugin': 'html-webpack-plugin',
    }})
    .target('deps/add-asset-html-webpack-plugin');
}

// TODO compile html-webpack-plugin
// html-webpack-plugin can not been pre-compiled
// because of require.resolve need return string while pre-compiled as module
// externals['html-webpack-plugin'] = '@builder/pack/deps/html-webpack-plugin';

externals['eslint-reporting-webpack-plugin'] = '@builder/pack/deps/eslint-reporting-webpack-plugin';
export async function ncc_eslint_reporting_webpack_plugin(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('eslint-reporting-webpack-plugin'))
    )
    .ncc({ packageName: 'eslint-reporting-webpack-plugin', externals: {
      ...externals,
      eslint: 'eslint',
    } })
    .target('deps/eslint-reporting-webpack-plugin');
}

externals['webpack-bundle-analyzer'] = '@builder/pack/deps/webpack-bundle-analyzer';
export async function ncc_webpack_bundle_analyzer(task, opts) {
  const assetsFolder = join(dirname(require.resolve('webpack-bundle-analyzer/package.json')), 'public');
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('webpack-bundle-analyzer'))
    )
    .ncc({ packageName: 'webpack-bundle-analyzer', externals })
    .target('deps/webpack-bundle-analyzer');
  fs.copySync(assetsFolder, join(__dirname, 'deps/webpack-bundle-analyzer/public'));
}

externals['eslint-loader'] = '@builder/pack/deps/eslint-loader';
export async function ncc_eslint_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('eslint-loader'))
    )
    .ncc({ packageName: 'eslint-loader', externals })
    .target('deps/eslint-loader');
}

externals['set-value'] = '@builder/pack/deps/set-value';
export async function ncc_set_value(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('set-value'))
    )
    .ncc({ packageName: 'set-value', externals })
    .target('deps/set-value');
}

externals['esbuild-loader'] = '@builder/pack/deps/esbuild-loader';
export async function ncc_esbuild_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('esbuild-loader'))
    )
    .ncc({ packageName: 'esbuild-loader', externals: {
      ...externals,
      esbuild: 'esbuild',
    } })
    .target('deps/esbuild-loader');
}

externals['serialize-javascript'] = '@builder/pack/deps/serialize-javascript';
export async function ncc_serialize_javascript(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('serialize-javascript'))
    )
    .ncc({ packageName: 'serialize-javascript', externals })
    .target('deps/serialize-javascript');
}

/* externals['sockjs'] = '@builder/pack/deps/sockjs';
export async function ncc_sockjs(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('sockjs'))
    )
    .ncc({ packageName: 'sockjs', externals })
    .target('deps/sockjs');
} */

// webpack 4 打包时不能 external source-map，应该是用了不同版本
// externals['source-map'] = '@builder/pack/deps/source-map';
export async function ncc_source_map(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('source-map'))
    )
    .ncc({ packageName: 'source-map', externals })
    .target('deps/source-map');
}

externals['postcss-loader'] = '@builder/pack/deps/postcss-loader';
export async function ncc_postcss_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-loader'))
    )
    .ncc({ packageName: 'postcss-loader', externals: { ...externals, postcss: 'postcss' } })
    .target('deps/postcss-loader');
}

externals['postcss-preset-env'] = '@builder/pack/deps/postcss-preset-env'
export async function ncc_postcss_preset_env(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-preset-env'))
    )
    .ncc({ packageName: 'postcss-preset-env', externals, minify: false })
    .target('deps/postcss-preset-env')
}

externals['postcss-safe-parser'] = '@builder/pack/deps/postcss-safe-parser'
export async function ncc_postcss_safe_parser(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-safe-parser'))
    )
    .ncc({ packageName: 'postcss-safe-parser', externals })
    .target('deps/postcss-safe-parser')
}

externals['postcss-plugin-rpx2vw'] = '@builder/pack/deps/postcss-plugin-rpx2vw'
export async function ncc_postcss_plugin_rpx2vw(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('postcss-plugin-rpx2vw'))
    )
    .ncc({ packageName: 'postcss-plugin-rpx2vw', externals })
    .target('deps/postcss-plugin-rpx2vw')
}

externals['webpack-chain'] = '@builder/pack/deps/webpack-chain';
export async function ncc_webpack_chain(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('webpack-chain'))
    )
    .ncc({ packageName: 'webpack-chain', externals })
    .target('deps/webpack-chain');
}

externals['prettier'] = '@builder/pack/deps/prettier';
export async function ncc_prettier(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('prettier'))
    )
    .ncc({ packageName: 'prettier', externals, minify: false })
    .target('deps/prettier');
}

// externals['webpack-sources'] = '@builder/pack/deps/webpack-sources';
export async function ncc_webpack_sources(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('webpack-sources'))
    )
    .ncc({ packageName: 'webpack-sources', externals })
    .target('deps/webpack-sources');
}

// externals['webpack-sources2'] = '@builder/pack/deps/webpack-sources2'
export async function ncc_webpack_sources2(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, bundleRequire.resolve('webpack-sources2'))
    )
    .ncc({ packageName: 'webpack-sources2', externals, target: 'es5' })
    .target('deps/webpack-sources2')
}

externals['webpack'] = '@builder/pack/deps/webpack/webpack-lib';
export async function ncc_webpack_bundle4(task, opts) {
  await task
    .source(opts.src || 'bundles/webpack/bundle4.js')
    .ncc({
      packageName: 'webpack',
      bundleName: 'webpack',
      externals,
      minify: false,
      target: 'es5',
    })
    .target('deps/webpack')
}

externals['schema-utils3'] = '@builder/pack/deps/schema-utils3'
export async function ncc_schema_utils3(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, bundleRequire.resolve('schema-utils3'))
    )
    .ncc({
      packageName: 'schema-utils3',
      externals,
    })
    .target('deps/schema-utils3')
}

export async function ncc_webpack_bundle5(task, opts) {
  await task
    .source(opts.src || 'bundles/webpack/bundle5.js')
    .ncc({
      packageName: 'webpack5',
      bundleName: 'webpack',
      customEmit(path) {
        if (path.endsWith('.runtime.js')) return `'./${basename(path)}'`;
      },
      externals: {
        ...externals,
        'schema-utils': '@builder/pack/deps/schema-utils3',
        'webpack-sources': '@builder/pack/deps/webpack-sources2',
      },
      minify: false,
      target: 'es5',
    })
    .target('deps/webpack');
}

externals['babel-loader'] = '@builder/pack/deps/babel-loader';
export async function ncc_babel_loader(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('babel-loader'))
    )
    .ncc({ packageName: 'babel-loader', externals })
    .target('deps/babel-loader');
}

externals['babel-jest'] = '@builder/pack/deps/babel-jest';
export async function ncc_babel_jest(task, opts) {
  await task
    .source(
      opts.src || relative(__dirname, require.resolve('babel-jest'))
    )
    .ncc({ packageName: 'babel-jest', externals })
    .target('deps/babel-jest');
}

export async function ncc(task) {
  await task
    .clear('compiled')
    .parallel([
      'ncc_address',
      'ncc_ansi_html',
      'ncc_babel_bundle',
      'ncc_babel_bundle_packages',
      'ncc_body_parser',
      'ncc_cacache',
      'ncc_cheerio',
      'ncc_cliui',
      'ncc_color',
      'ncc_camelcase',
      // 'ncc_sockjs',
      'ncc_source_map',
      // 'ncc_spdy',
      'ncc_copy_webpack_plugin',
      'ncc_case_sensitive_paths_webpack_plugin',
      'ncc_css_loader',
      'ncc_terser_webpack_plugin',
      'ncc_time_fix_plugin',
      'ncc_debug',
      'ncc_set_value',
      'ncc_webpack_filter_warnings_plugin',
      'ncc_webpack_simple_progress_plugin',
      'ncc_ejs',
      'ncc_css_minimizer_webpack_plugin',
      'ncc_css_declaration_sorter',
      'ncc_add_asset_html_webpack_plugin',
      'ncc_url_loader',
      'ncc_file_loader',
      'ncc_eslint_reporting_webpack_plugin',
      'ncc_webpack_bundle_analyzer',
      'ncc_eslint_loader',
      'ncc_esbuild_loader',
      'ncc_sass_loader',
      'ncc_postcss_loader',
      'ncc_postcss_preset_env',
      'ncc_postcss_safe_parser',
      'ncc_postcss_plugin_rpx2vw',
      'ncc_prettier',
      'ncc_friendly_errors_webpack_plugin',
      'ncc_globby',
      'ncc_loader_utils',
      'ncc_lodash',
      'ncc_less_loader',
      'ncc_schema_utils3',
      'ncc_serialize_javascript',
      'ncc_webpack_chain',
      'ncc_webpack_sources',
      'ncc_webpack_sources2',
      'ncc_webpack_bundle_hot',
      'ncc_webpack_bundle4',
      'ncc_webpack_bundle5',
      'ncc_webpack_bundle_packages',
      'ncc_babel_loader',
      'ncc_babel_jest',
      'ncc_css_declaration_sorter',
      'ncc_esbuild_loader',
      'ncc_react_refresh_webpack_plugin',
      'ncc_mini_css_extract_plugin',
      // 'ncc_fork_ts_checker_webpack_plugin_bundle',
      // 'ncc_fork_ts_checker_webpack_plugin_bundle_package',
    ]);
}

export async function ncc_webpack_bundle_packages(task, opts) {
  await task
    .source(opts.src || 'bundles/webpack/packages/*')
    .target('deps/webpack/')
}

export async function ncc_webpack_bundle_hot(task, opts) {
  await task
    .source(opts.src || `${dirname(require.resolve('webpack/hot/dev-server'))}/*`)
    .target('deps/webpack/hot/')
}

export default async function (task) {
  await task.clear('dist')
}
