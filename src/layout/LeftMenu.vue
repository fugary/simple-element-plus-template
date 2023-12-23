<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
const globalConfigStore = useGlobalConfigStore()
</script>

<template>
  <el-scrollbar>
    <el-menu
      class="el-menu-left"
      :collapse="globalConfigStore.isCollapseLeft"
      :default-openeds="['1']"
    >
      <el-menu-item
        index="0"
        route="/"
      >
        <span>Simple Element Plus</span>
        <div v-if="globalConfigStore.isCollapseLeft">
          SEP
        </div>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>{{ $t('menu.label.systemManagement') }}</span>
        </template>
        <el-menu-item index="1-1">
          <el-icon><user /></el-icon>
          <span>{{ $t('menu.label.userManagement') }}</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Menu /></el-icon>
          <span>{{ $t('menu.label.roleManagement') }}</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><lock /></el-icon>
          <span>{{ $t('menu.label.authorityManagement') }}</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <el-icon><Menu /></el-icon>
          <span>{{ $t('menu.label.menuManagement') }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><WarningFilled /></el-icon>
          <span>{{ $t('menu.label.errorPage') }}</span>
        </template>
        <el-menu-item index="2-1">
          <el-icon><Warning /></el-icon>
          <span>{{ $t('menu.label.errorPage404') }}</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <el-icon><Warning /></el-icon>
          <span>{{ $t('menu.label.errorPage403') }}</span>
        </el-menu-item>
        <el-menu-item index="2-3">
          <el-icon><Warning /></el-icon>
          <span>{{ $t('menu.label.errorPage500') }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
</style>
