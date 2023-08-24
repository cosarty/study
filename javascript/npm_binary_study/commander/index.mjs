import { program } from 'commander'

program.option('--first').option('-s, --separator <char>')

program.parse()

const options = program.opts()
console.log('options: ', options)
const limit = options.first ? 1 : undefined
console.log('limit: ', limit)

console.log(program.args[0].split(options.separator, limit))
