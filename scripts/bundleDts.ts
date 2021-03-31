import * as fs from 'fs-extra';
import * as path from 'path';
import * as globby from 'globby';

const importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/;
const importEs6Exp = /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/;
const fileExp = /^([\./].*|.:.*)$/;
const identifierExp = /^(\w+|\@\w+)(?:[\.-\/]\w+)*$/;
const typesExternals = {};

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
      console.log('replacer==>', match[3]);
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}

export default function bundleDts({ dtsFilePath, packageName, packageFolder }) {
  const bomOptExp = /^\uFEFF?/;

  const dtsCode  = fs.readFileSync(dtsFilePath, 'utf8').replace(bomOptExp, '').replace(/\s*$/, '');
  const parsedCode = dtsCode.split(/\r?\n/g).map((line: any) => {
    let match: string[];
    // import() statement or es6 import
    if ((line.indexOf('from') >= 0 && (match = line.match(importEs6Exp))) ||
      (line.indexOf('require') >= 0 && (match = line.match(importExp)))) {
      const [_, lead, quote, moduleName, trail] = match;

      
      // console.log(_, lead, quote, moduleName, trail);

      // filename (i.e. starts with a dot, slash or windows drive letter)
      if (fileExp.test(moduleName)) {
        // already been copied
        return line;
      }
      // identifier
      else {
        console.log('import ==>', moduleName);
        // replace with relative path
        const folderDepth = packageName.split('/').length;
        const pathArray = Array.from(new Array(folderDepth)).map(() => '..');
        const replaceFuncton = importEs6Exp.test(line) ? replaceImportExportEs6 : replaceImportExport;
        console.log(importEs6Exp.test(line));
        // check types file
        // check external types
        const isDefinitelyTyped = checkPackageDts(moduleName, packageFolder, moduleName);
        
        if (isDefinitelyTyped) {
          const DefinitelyTypedPackage = `@types/${moduleName.replace(/^@/, '').replace(/\//g, '__')}`;
          checkPackageDts(DefinitelyTypedPackage, packageFolder, moduleName, true);
        }
        // console.log('new line ==>', replaceFuncton(line, () => `${pathArray.join('/')}/${moduleName}`));
        return replaceFuncton(line, () => `${pathArray.join('/')}/${moduleName}`);
      }
    }
    return line;
  }).join('\n');
  // rewrite file
  fs.ensureDirSync(path.join(packageFolder, packageName));
  fs.writeFileSync(path.join(packageFolder, packageName, path.basename(dtsFilePath)), parsedCode, 'utf-8');
}

function analyzePackageDts(moduleName: string, packageFolder: string, packageName: string, isType: boolean = false) {
  let checkModuleName = moduleName;
  try {
    let resolveFolder = '';
    try {
      // step 1: check module folder
      resolveFolder = !isType ? path.dirname(require.resolve(checkModuleName)) : path.dirname(require.resolve(`${checkModuleName}/package.json`))
    } catch (err) {
      // ignore error
    }
    // ignore built in modules
    if (!resolveFolder || !resolveFolder.includes('node_modules')) {
      // reset resolveFolder
      resolveFolder = '';
      try {
        // DefinitelyTyped
        checkModuleName = `@types/${checkModuleName.replace(/^@/, '').replace(/\//g, '__')}`;
        resolveFolder = path.dirname(require.resolve(`${checkModuleName}/package.json`));
      } catch (err) {
        // ignore error
        resolveFolder = '';
      }
      if (!resolveFolder) {
        return false;
      }
    }
    // check package.json types field
    const packageInfo = fs.readJsonSync(require.resolve(`${checkModuleName}/package.json`));
    
    const cwd = packageInfo.types ? path.dirname(require.resolve(`${checkModuleName}/${packageInfo.types}`)) : resolveFolder;
    const files = globby.sync('**/*.d.ts', {
      cwd,
      ignore: ['node_modules']
    });
    // glob dts
    files.forEach((file) => {
      bundleDts({ dtsFilePath: path.join(cwd, file), packageFolder, packageName });
    });
    
    return files.length === 0;
  } catch (err) {
    console.log('fail to get package info', err)
  }
  return false;
}