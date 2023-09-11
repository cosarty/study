/**
 * @param target - 监听的目标元素
 * @param callback - 回调函数
 * @param options - 选项
 */

import {
  ComponentPublicInstance,
  Ref,
  computed,
  toValue,
  watch,
  getCurrentScope,
  onScopeDispose,
} from 'vue'

type MybeElementRef =
  | HTMLElement
  | Ref<HTMLElement | undefined>
  | ComponentPublicInstance

const useSupported = (key: keyof typeof window) =>
  typeof window !== 'undefined' && key in window

const useResizeObserver = (
  target: MybeElementRef | MybeElementRef[],
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) => {
  // 判断一下是否支持的resizeObserver
  const isSupported = useSupported('ResizeObserver')

  const scope = getCurrentScope()
  let observer: ResizeObserver | undefined

  const unrefElemnt = (target: MybeElementRef): HTMLElement => {
    const el = toValue(target)
    return (el as ComponentPublicInstance)?.$el ?? el
  }
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = computed(() =>
    Array.isArray(target)
      ? target.map((el) => unrefElemnt(el))
      : [unrefElemnt(target)]
  )

  // 监听数组变化然后重新监听
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup()
      if (isSupported) {
        observer = new ResizeObserver(callback)
        for (const _el of els) {
          _el && observer!.observe(_el, options)
        }
      }
    },
    { immediate: true, flush: 'post', deep: true }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  if (scope) {
    onScopeDispose(stop)
  }
}

export { useResizeObserver }
