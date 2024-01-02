<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useMenuStore } from '@/stores/MenuStore'
import { GlobalLayoutMode } from '@/consts/GlobalConstants'
import { computed } from 'vue'
const globalConfigStore = useGlobalConfigStore()
const menuStore = useMenuStore()

const allMenus = computed(() => {
  const topMenus = menuStore.baseTopMenus
  const businessMenus = menuStore.businessMenus
  if (globalConfigStore.layoutMode === GlobalLayoutMode.TOP) {
    return [...businessMenus, ...topMenus.slice(1)]
  }
  return topMenus
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
