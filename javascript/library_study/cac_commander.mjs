import cac from 'cac'
import ora from'ora'
// const cli = cac()

// cli.option('--type <type>,-t <type>', 'Choose a project type', {
//   default: 'node',
// })

// cli.command('lint [...files]', 'Lint files').action((files, options) => {
//   console.log(files, options)
// })

// cli.help()
// cli.version('0.0.0')
// const parsed = cli.parse()

// console.log(JSON.stringify(parsed, null, 2))



const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';
  setTimeout(() => {
    spinner.succeed()
  },1000)
}, 1000);
