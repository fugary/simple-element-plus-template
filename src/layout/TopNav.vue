<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useMenuConfigStore } from '@/stores/MenuConfigStore'
import { GlobalLayoutMode } from '@/consts/GlobalConstants'
import { computed } from 'vue'
const globalConfigStore = useGlobalConfigStore()
const menuConfigStore = useMenuConfigStore()

const allMenus = computed(() => {
  const topMenus = menuConfigStore.baseTopMenus
  const businessMenus = menuConfigStore.calcBusinessMenus()
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
  >
    <template
      v-if="globalConfigStore.layoutMode === GlobalLayoutMode.LEFT && globalConfigStore.isShowBreadcrumb"
      #split
    >
      <common-breadcrumb :style="{'padding-left': '0','padding-top': '22px'}" />
    </template>
  </common-menu>
</template>

<style scoped>

</style>
