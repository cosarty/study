// 异步遍历器

const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay, delay))

async function start() {
  for await (const x of [sleep(1000), sleep(5000)]) {
    console.log(x)
  }
}
start().then(() => {
  console.log('结束')
})

