const { execSync } = require('child_process')

const version = execSync('node -v')
console.log('version: ', version.toString())
