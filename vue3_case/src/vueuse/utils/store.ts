import { useStorage } from '@vueuse/core'
import { useMyGlobalState as createGlobalState } from '@/composables/useMyGlobalState'
import { ref } from 'vue'

export const useGlobalState = createGlobalState(() => {
  const count = ref()
  return { count }
})
export const useMyGlobalState = createGlobalState((a: number = 0) => {
  const count = ref(a)
  return { count }
})
export const useLocalState = createGlobalState(() =>
  useStorage('vueuse-local-storage', { name: 'cxn' })
)
