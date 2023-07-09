<template>
  <div class="box">
    <PTets />
    <PTets />
    <PTets />
  </div>
  <!-- <div>
    我是第二段话
    <PTets />
  </div>
  <div>
    我是第二段话

    <PTets />
  </div> -->

  <button @click="sum">添加({{ count }})</button>
</template>

<script setup lang="tsx">
import { ref } from 'vue'

defineOptions({ name: 'JSXTest' })
const count = ref(1)

const PTets = () => <p>测试{count.value}</p>

const sum = () => count.value++
</script>
<script setup lang="ts"></script>

<style lang="scss" scoped>
p {
  color: red;
}

.box {
  // width: fit-content;
  // margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  p {
    background-color: aqua;
    &:first-child {
      flex-basis: 10%;
    }
    flex-basis: 100%;
    // max-width: 100%;
    flex-grow: 0;
  }
}
</style>
