<template>
  <div>
    <button @click="count++">＋1</button>
    <input v-model="state.name" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalState, useMyGlobalState, useLocalState } from '../../utils/store'

const { count } = useMyGlobalState()
const state = useLocalState()
</script>

<style lang="scss" scoped></style>