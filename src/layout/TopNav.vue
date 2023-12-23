<script setup>
import { useBaseTopMenus } from '@/services/GlobalService'

const topMenus = useBaseTopMenus()

</script>
<template>
  <common-menu
    router
    mode="horizontal"
    :menus="topMenus"
  />
</template>

<style scoped>

</style>
