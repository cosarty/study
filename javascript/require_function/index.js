const { transformSync } = require('esbuild')

const fs = require('fs')

const { code } = transformSync(fs.readFileSync('./test.ts', 'utf8'), {
  // sourcefile: 'test.js',
  sourcemap: false,
  loader: 'ts',
  format: 'cjs',
})

const loadModule = (code) => {
  // 保存默认加载器
  const defaultLoader = require.extensions['.ts']
  const file = require.resolve('./test.ts')

  require.extensions['.ts'] = function (module, filename) {
    if (filename === file) {
      module._compile(code, file)
    } else {
      defaultLoader(module.filename)
    }
  }
  let raw = require('./test.ts')
  delete require.cache[file]
  raw = raw.__esModule ? raw.default : raw

  return raw
}

console.log(loadModule(code)(1,3))
