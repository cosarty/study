<script setup lang="ts">
import { ref } from 'vue'
import ResuableComp from '@/components/ResuableComp/index.vue'
import VirualList from '@/components/virtualList/index'
import IntersectionOverserve from './components/IntersectionObserver/index.vue'
import JSXTest from './components/JSXTest/index.vue'
import Test from './Test.vue'
import Vueuse from '@/components/Vueuse/index.vue'

// 测试全局数据共享的逻辑
import EffectScopeVue from '@/components/EffectScopeVue/index.vue'

import ResizeObserver from '@/components/ResizeObserver/index.vue'

</script>

<template>
  <IntersectionOverserve></IntersectionOverserve>
  <!-- <Test :data="{ name: 'da', age: 18 }"></Test> -->
  <!-- <JSXTest /> -->
  <!-- <Vueuse /> -->
  <!-- <ResizeObserver /> -->
</template>

<style scoped lang="scss"></style>
