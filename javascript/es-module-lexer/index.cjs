const fs = require('fs').promises

;(async () => {
const code =   await fs.readFile(require.resolve('es-module-lexer'), 'utf-8')
console.log('code : ', code );
})()
