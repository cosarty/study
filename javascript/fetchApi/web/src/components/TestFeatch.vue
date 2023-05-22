<template>
  <div>
    测试1
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  const res = await fetch('https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt')
  let txt = ''
  const reader = res.body!.getReader()
  const decoder = new TextDecoder('utf-8')
  while (true) {
    const { done, value } = await reader.read()
    if (done) break;
    txt += decoder.decode(value)
    console.log('data: ', txt);
  }
})
</script>

<style scoped></style>