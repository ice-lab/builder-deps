/* eslint-disable import/no-extraneous-dependencies */

function codeFrame() {
  return require('@babel/code-frame')
}

function core() {
  return require('@babel/core')
}

function pluginProposalDecorators() {
  return require('@babel/plugin-proposal-decorators')
}

function pluginProposalDoExpressions() {
  return require('@babel/plugin-proposal-do-expressions')
}

function pluginProposalExportDefaultFrom() {
  return require('@babel/plugin-proposal-export-default-from')
}

function pluginProposalExportNamespaceFrom() {
  return require('@babel/plugin-proposal-export-namespace-from')
}

function pluginProposalFunctionBind() {
  return require('@babel/plugin-proposal-function-bind')
}

function pluginProposalFunctionSent() {
  return require('@babel/plugin-proposal-function-sent');
}

function pluginProposalJsonStrings() {
  return require('@babel/plugin-proposal-json-strings');
}

function pluginProposalLogicalAssignmentOperators() {
  return require('@babel/plugin-proposal-logical-assignment-operators')
}

function pluginProposalNullishCoalescingOperator() {
  return require('@babel/plugin-proposal-nullish-coalescing-operator')
}

function pluginProposalNumericSeparator() {
  return require('@babel/plugin-proposal-numeric-separator')
}

function pluginProposalOptionalChaining() {
  return require('@babel/plugin-proposal-optional-chaining')
}

function pluginProposalPipelineOperator() {
  return require('@babel/plugin-proposal-pipeline-operator')
}

function pluginProposalThrowExpressions() {
  return require('@babel/plugin-proposal-throw-expressions')
}

function pluginSyntaxDynamicImport() {
  return require('@babel/plugin-syntax-dynamic-import')
}

function pluginSyntaxImportMeta() {
  return require('@babel/plugin-syntax-import-meta')
}

function pluginTransformRuntime() {
  return require('@babel/plugin-transform-runtime')
}

function presetEnv() {
  return require('@babel/preset-env')
}

function presetReact() {
  return require('@babel/preset-react')
}

function presetTypescript() {
  return require('@babel/preset-typescript')
}

module.exports = {
  codeFrame,
  core,
  pluginProposalDecorators,
  pluginProposalDoExpressions,
  pluginProposalExportDefaultFrom,
  pluginProposalLogicalAssignmentOperators,
  pluginProposalNullishCoalescingOperator,
  pluginProposalThrowExpressions,
  pluginSyntaxImportMeta,
  pluginProposalPipelineOperator,
  pluginProposalOptionalChaining,
  pluginProposalJsonStrings,
  pluginProposalFunctionSent,
  pluginProposalFunctionBind,
  pluginProposalExportNamespaceFrom,
  pluginProposalNumericSeparator,
  pluginSyntaxDynamicImport,
  pluginTransformRuntime,
  presetEnv,
  presetReact,
  presetTypescript,
}
