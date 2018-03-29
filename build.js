const ExecSync = require('child_process').execSync
const PackageJson = require('./package.json')
const Fs = require('fs-extra')
const Path = require('path')


let nspFailed = false
console.log('Node Security Project known vulnerabilities check:')
try {
  ExecSync('nsp check', {stdio: [0,1,2]})
} catch (e) {
  nspFailed = true
}

// Build the javascript bundle for production
ExecSync('npm run webpack')

Fs.writeFile(Path.join(__dirname, 'VERSION'), PackageJson.version, function(err) {
  if (err) {
    throw err
  }
}); 

const git_last_modified_date = ExecSync('git show -s --format=%cd HEAD --date=short')

Fs.writeFile(Path.join(__dirname, 'LAST_MODIFIED'), git_last_modified_date, function(err) {
  if (err) {
    throw err
  }
}); 


console.log('Build done!')
if (nspFailed) {
  console.log('\n\nNode Security Project detected vulnerabilities. Please read the output above and consider upgrading your dependencies.')
}
