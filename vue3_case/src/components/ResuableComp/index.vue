<template>
  <div>测试</div>

  <DefineFoo v-slot="{ message }">
    <div class="red">我是:{{ message }}</div>
  </DefineFoo>

  <ReuseFoo  message="cxn"></ReuseFoo>
  <ReuseFoo  message="cxn2"></ReuseFoo>

  <div v-html="msg"  contenteditable></div>
</template>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { ref } from 'vue';

const [DefineFoo, ReuseFoo] = createReusableTemplate<{ message: string }>()

const msg = ref('ghgfhgf')
</script>

<style scoped lang="scss">
.red {
  color: red;
}
</style>
