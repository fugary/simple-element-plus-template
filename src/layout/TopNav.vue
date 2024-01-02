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
