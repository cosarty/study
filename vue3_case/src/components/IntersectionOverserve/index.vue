<template>
  <div class="intersection-demo">
    <div v-for="num in 10" :key="num" class="sub">{{ num }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let obs: IntersectionObserver   

onMounted(() => {
  obs = new IntersectionObserver((entries) => {
    console.log('entries: ', entries)
  })

  obs.observe(document.querySelector('.intersection-demo .sub:nth-child(7)')!)
})

onUnmounted(() => {
  obs.unobserve(document.querySelector('.intersection-demo .sub:nth-child(7)')!)
})
</script>

<style scoped lang="scss">
.intersection-demo {
  width: 800px;     
  margin: 0 auto;
  .sub {
    height: 200px;
    margin-bottom: 25px;
    background-color: skyblue;
  }
}
</style>
