const composeRight =
  (...fns) =>
  (...arg) =>
    fns.reduceRight((arg, fn) => fn(...arg), arg)

const compose = (...fns) =>
  fns.reduce(
    (pre, next) =>
      (...arg) =>
        pre(next(...arg))
  )

  const composePromise =
  (...fns) =>
  (...args) =>
    fns.reverse().reduce(
      (pre, next) =>
        pre.then((...arg) => {
          return next.call(null, ...arg)
        }),
      Promise.resolve(...args)
    )

const composeFn = [
  (arg) => {
    console.log(1, arg)
    return arg
  },
  (arg) => {
    console.log(2, arg)
    return arg
  },
  (arg) => {
    console.log(3, arg)
    return arg
  },
  (arg) => {
    console.log(4, arg)
    return arg
  },
]
const composePromiseFn = [
  async (arg) => {
    console.log(1, arg)
    return arg
  },
  async (arg) => {
    console.log(2, arg)
    return arg
  },
  async (arg) => {
    console.log(3, arg)
    return arg
  },
  async (arg) => {
    console.log(4, arg)
    return arg
  },
]

const call = compose(...composeFn)
const callPromise = composePromise(...composePromiseFn)
call('hello')

console.log('----------')
callPromise('helloPromise')



