import pc from 'picocolors'
import chalk from 'chalk';

const log = console.log;

console.log(`I see a ${pc.bgRed("red door")} and I want it painted ${pc.black("black")}`)

console.log(
  pc.bgBlack(
    pc.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)

log(chalk.blue('Hello') + ' World' + chalk.red('!'));
log(chalk.blue.bgRed.bold('Hello world!'));
console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', 'nihao')