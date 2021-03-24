export default [
  // babel
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
  'babel-jest',
  '@babel/core',
  '@babel/types',
  '@babel/parser',
  '@babel/traverse',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-decorators',
  '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-function-bind',
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-logical-assignment-operators',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-pipeline-operator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  '@babel/plugin-transform-runtime',
  // basic dependencies
  'address',
  'ansi-html',
  'body-parser',
  'chalk',
  'cacache',
  'cheerio',
  'cliui',
  'color',
  'lodash',
  'camelcase',
  'identity-obj-proxy',
  'debug',
  'lodash',
  'mkcert',
  'path-exists',
  // webpack plugins
  'copy-webpack-plugin',
  'case-sensitive-paths-webpack-plugin',
  'terser-webpack-plugin',
  'time-fix-plugin',
  'webpack-filter-warnings-plugin',
  'webpack-simple-progress-plugin',
  'optimize-css-assets-webpack-plugin',
  '@nuxtjs/friendly-errors-webpack-plugin',
  'add-asset-html-webpack-plugin',
  'eslint-reporting-webpack-plugin',
  'webpack-bundle-analyzer',

  // webpack loaders
  'eslint-loader',
  'esbuild-loader',
  // webpack depend on css-loader/api.js
  // 'css-loader',
  'file-loader',
  'less-loader',
  'sass-loader',
  'babel-loader',
  'ts-loader',
  'url-loader',
  'postcss-loader',
  'postcss-preset-env',
  'postcss-safe-parser',
  'postcss-plugin-rpx2vw',

  'webpack-chain',
  // compilers
  // 'less',
  // 'sass',
];