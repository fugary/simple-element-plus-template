<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useBusinessMenus } from '@/services/global/GlobalService'
const globalConfigStore = useGlobalConfigStore()
const businessMenus = useBusinessMenus()
</script>

<template>
  <el-scrollbar>
    <common-menu
      class="el-menu-left"
      :collapse="globalConfigStore.isCollapseLeft"
      :menus="businessMenus"
      :default-openeds="['1']"
    />
  </el-scrollbar>
</template>

<style scoped>
</style>
