<script setup lang="ts">
import ResuableComp from '@/components/ResuableComp/index.vue'
import VirualList from '@/components/virtualList/index'
import IntersectionOverserve from './components/IntersectionOverserve/index.vue'
import JSXTest from './components/JSXTest/index.vue'
import Test from './Test.vue'
</script>

<template>
  <!-- <IntersectionOverserve></IntersectionOverserve> -->
  <Test :data="{ name: 'da', age: 18 }"></Test>

  <!-- <JSXTest /> -->
</template>

<style scoped lang="scss"></style>
