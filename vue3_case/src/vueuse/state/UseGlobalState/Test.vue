<template>
  <div>
    {{ count }}
  </div>
  <div>我的名字：{{ state.name }}</div>
</template>

<script setup lang="ts">
import { useGlobalState, useMyGlobalState, useLocalState } from '../../utils/store'

const { count } = useMyGlobalState()
const state = useLocalState()
</script>

<style scoped></style>