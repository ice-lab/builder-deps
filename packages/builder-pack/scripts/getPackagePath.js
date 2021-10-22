const { sync } = require('find-up');

function getPackagePath(packageName, isPath) {
  let packageJson = '';
  try {
    packageJson = sync('package.json', { cwd: isPath ? packageName : require.resolve(packageName) });
  } catch(err) {
    // ignore error
    console.log('err', err);
  }
  return packageJson;
}

module.exports = getPackagePath;