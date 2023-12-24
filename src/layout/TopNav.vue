<script setup>
import { useBaseTopMenus, useBusinessMenus } from '@/services/GlobalService'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { GlobalLayoutMode } from '@/consts/GlobalConstants'
import { computed } from 'vue'
const globalConfigStore = useGlobalConfigStore()
const topMenus = useBaseTopMenus()
const businessMenus = useBusinessMenus()

const allMenus = computed(() => {
  if (globalConfigStore.layoutMode === GlobalLayoutMode.TOP) {
    return [...businessMenus.value, ...topMenus.value.slice(1)]
  }
  return topMenus.value
})

</script>
<template>
  <common-menu
    router
    mode="horizontal"
    :ellipsis="false"
    :menus="allMenus"
  />
</template>

<style scoped>

</style>
