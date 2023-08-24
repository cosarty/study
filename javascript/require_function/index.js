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
  console.log('file: ', file)
  require.extensions['.ts'] = function (module, filename) {
    console.log('filename: ', filename)

    if (filename === file) {
      module._compile(code, file)
    } else {
      defaultLoader(module.filename)
    }
  }
  let raw = require('./test.ts')
  // console.log(require)
  delete require.cache[file]

  raw = raw.__esModule ? raw.default : raw

  return raw
}

console.log(loadModule(code)(1,3))
