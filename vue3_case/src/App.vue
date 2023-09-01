<script setup lang="ts">
import ResuableComp from '@/components/ResuableComp/index.vue'
import VirualList from '@/components/virtualList/index'
import IntersectionOverserve from './components/IntersectionOverserve/index.vue'
import JSXTest from './components/JSXTest/index.vue'
import Test from './Test.vue'
import Vueuse from '@/components/Vueuse/index.vue'


import EffectScopeVue from '@/components/EffectScopeVue/index.vue'
import { ref } from 'vue'

const hiddeng = ref(false)

</script>

<template>
  <!-- <IntersectionOverserve></IntersectionOverserve> -->
  <!-- <Test :data="{ name: 'da', age: 18 }"></Test> -->
  <!-- <JSXTest /> -->
  <Vueuse />
  <!-- <button @click="hiddeng = !hiddeng">显示隐藏</button> -->
  <!-- v-if="hiddeng" / -->
  <EffectScopeVue  />
</template>

<style scoped lang="scss"></style>
