<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
 <div v-model="msg"  contenteditable="true"></div>
 
</template>

<style scoped>

</style>
