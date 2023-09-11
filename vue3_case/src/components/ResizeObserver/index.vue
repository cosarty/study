<template>
  <div class="container">
    <div ref="el" class="box">测试</div>
    <div ref="el2" class="box2">测试2</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useResizeObserver } from '@/composables/useResizeObserver'


const el = ref<HTMLDivElement>()
const el2 = ref<HTMLDivElement>()

useResizeObserver([el, el2], (entry) => {
  console.log('entry: ', entry);
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  height: 100vh;

  .box,
  .box2 {
    width: 300px;
    height: 300px;
    resize: both;
    margin: auto 0;
    border: 1px solid #ccc;
    overflow: auto;
  }

  .box2 {

    margin: auto 12px;
  }

}
</style>