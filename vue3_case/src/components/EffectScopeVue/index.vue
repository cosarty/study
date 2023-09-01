<template>
  <div>
    <input v-model="txt1" />
    <button @click="curretnScope.stop()">停止</button>
    <div>回显2：{{ txt2 }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EffectScopeVue'
})
</script>


<script setup lang="ts">

import { effectScope, getCurrentScope, onScopeDispose, ref, watch, getCurrentInstance, onUnmounted } from 'vue'


// const scope = effectScope(true)
const txt1 = ref('')
const txt2 = ref('')

const proxy = getCurrentInstance()
console.log('proxy: ', proxy);

// scope.run(() => {
//   onScopeDispose(() => {
//     console.log('我是嵌套的我没有副作用啦')
//   })

// })

watch(txt1, (nx) => {
  txt2.value = nx
})

const curretnScope = getCurrentScope()!

onScopeDispose(() => {
  console.log('我没有副作用依赖啦')
})

</script>

<style scoped></style>