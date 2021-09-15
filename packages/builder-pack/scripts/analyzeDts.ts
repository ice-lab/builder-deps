import * as fs from 'fs-extra';
import * as path from 'path';
import * as globby from 'globby';

interface IAnalyzeOptions {
  moduleName: string;
  outputFolder: string;
  originalPackageName?: string;
  isDefinitelyTyped?: boolean;
}

const importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/;
const importEs6Exp = /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/;
const fileExp = /^([\./].*|.:.*)$/;
const identifierExp = /^(\w+|\@\w+)(?:[\/\.-]\w+)*$/;
const typesExternals = {};
// always need typescript when coding with ts
const ignoreTypes = ['typescript'];

function replaceImportExport(line: string, replacer: (str: string) => string) {
  let match = line.match(importExp);
  if (match) {
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}

function replaceImportExportEs6(line: string, replacer: (str: string) => string) {
  if (line.indexOf('from') < 0) {
    return line;
  }
  let match = line.match(importEs6Exp);
  if (match) {
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}

export function bundleDts({ dtsFilePath, moduleName, file, outputFolder }) {
  const bomOptExp = /^\uFEFF?/;

  const dtsCode  = fs.readFileSync(dtsFilePath, 'utf8').replace(bomOptExp, '').replace(/\s*$/, '');
  const parsedCode = dtsCode.split(/\r?\n/g).map((line: any) => {
    let match: string[];
    // import() statement or es6 import
    if ((line.indexOf('from') >= 0 && (match = line.match(importEs6Exp))) ||
      (line.indexOf('require') >= 0 && (match = line.match(importExp)))) {
      const [_, lead, quote, moduleName, trail] = match;
      // filename (i.e. starts with a dot, slash or windows drive letter)
      if (fileExp.test(moduleName) || ignoreTypes.includes(moduleName)) {
        // already been copied
        return line;
      } else {
        // replace with relative path
        const folderDepth = moduleName.split('/').length;
        const pathArray = Array.from(new Array(folderDepth)).map(() => '..');
        const replaceFuncton = importEs6Exp.test(line) ? replaceImportExportEs6 : replaceImportExport;
        // check external types
        let types = typesExternals[moduleName];
        if (!typesExternals.hasOwnProperty(moduleName)) {
          // analyze types file
          types = analyzePackageDts({ moduleName, outputFolder });
          typesExternals[moduleName] = types;
        }
        if (types) {
          // ignore path of index.d.ts and remove dts extname
          const dtsFile = types !== true ? path.basename(types).replace(/^index\.d\.ts$/, '').replace(/\.d\.ts$/, '') : '';
          return replaceFuncton(line, () => `${pathArray.join('/')}/${moduleName}${dtsFile ? `/${dtsFile}` : ''}`);
        }
        return line;
      }
    }
    return line;
  }).join('\n');
  // rewrite file
  const outputPath = path.join(outputFolder, moduleName, file ? path.dirname(file) : '');
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, path.basename(dtsFilePath)), parsedCode, 'utf-8');
}

export function analyzePackageDts({ moduleName, outputFolder, isDefinitelyTyped, originalPackageName }: IAnalyzeOptions) {
  let checkModuleName = moduleName;
  let resolveFolder = '';
  try {
    // check module package json info
    // if fail to resolve package.json, package may be builtIn modules or have DefinitelyTyped package
    resolveFolder = path.dirname(require.resolve(`${checkModuleName}/package.json`))
  } catch (err) {
    // ignore error
  }
  if (resolveFolder && resolveFolder.includes('node_modules')) {
    // check package.json types field
    const packageInfo = fs.readJsonSync(require.resolve(`${checkModuleName}/package.json`));
    const typeField = packageInfo.types || packageInfo.typings;
    const cwd = typeField ? path.dirname(require.resolve(`${checkModuleName}/${typeField}`)) : path.dirname(require.resolve(checkModuleName));
    const files = globby.sync('**/*.d.ts', {
      cwd,
      ignore: ['node_modules']
    });
    const analyzeResult = typeField || true;
    if (files.length > 0) {
      // set cache before bundleDts
      typesExternals[originalPackageName || moduleName] = analyzeResult;
    }
    files.forEach((file) => {
      bundleDts({ dtsFilePath: path.join(cwd, file), file, outputFolder, moduleName: originalPackageName || moduleName });
    });
    if (files.length > 0) {
      return analyzeResult;
    } 
  }
  if (!isDefinitelyTyped){
    // check DefinitelyTyped package
    checkModuleName = `@types/${checkModuleName.replace(/^@/, '').replace(/\//g, '__')}`;
    return analyzePackageDts({ moduleName: checkModuleName, outputFolder, originalPackageName: moduleName, isDefinitelyTyped: true });
  }
  return false;
}