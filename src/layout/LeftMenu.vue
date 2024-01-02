<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useMenuStore } from '@/stores/MenuStore'
const globalConfigStore = useGlobalConfigStore()
const menuStore = useMenuStore()
</script>

<template>
  <el-scrollbar>
    <common-menu
      class="el-menu-left"
      :collapse="globalConfigStore.isCollapseLeft"
      :menus="menuStore.businessMenus"
      :default-openeds="['1']"
    />
  </el-scrollbar>
</template>

<style scoped>
</style>
