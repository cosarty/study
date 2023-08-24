<template>不错嘛:{{ data }}</template>

<script lang="ts" setup generic="T ">
import { defineComponent } from 'vue'

defineProps<{ data: T }>()
</script>

<style lang="scss" scoped></style>
