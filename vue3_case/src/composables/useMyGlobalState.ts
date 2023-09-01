import { effectScope } from 'vue'

const useMyGlobalState = <
  T extends (...args: any) => any,
  P extends Parameters<T>
>(
  fn: T
) => {
  let initialized = false
  let state: any
  let scope = effectScope(true)

  return ((...arg: P) => {
    if (!initialized) {
      state = scope.run(() => fn(...(arg as any[])))
      initialized = true
    }

    return state
  }) as T
}

export { useMyGlobalState }
