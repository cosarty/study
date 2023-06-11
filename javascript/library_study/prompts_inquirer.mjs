import prompts from 'prompts'
import inquirer from 'inquirer'
// ;(async () => {
//   const response = await prompts({
//     type: 'number',
//     name: 'value',
//     message: 'How old are you?',
//     validate: (value) => (value < 18 ? `Nightclub is 18+ only` : true),
//   })

//   console.log(response) // => { value: 24 }
// })()

inquirer
  .prompt([
    {
      type: 'input', // 类型
      name: 'yourName', // 字段名称，在then里可以打印出来
      message: 'your name:', // 提示信息
    },
    {
      type: 'list',
      name: 'choice',
      message: 'your choice:',
      default: 0,
      choices: [
        { value: 1, name: 'hjy' },
        { value: 2, name: 'lio' },
      ],
    },
    {
      type: 'confirm',
      name: 'choic',
      message: 'your choice:',
      default: false,
    },
  ])

  .then((answers) => {
    console.log('answers', answers) // 与prompt的name字段对应
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
