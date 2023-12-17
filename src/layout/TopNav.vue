<script setup>

import { Check } from '@element-plus/icons-vue'
import { useGlobalConfigStore } from '@/stores/globalConfigStore'

const globalConfigStore = useGlobalConfigStore()

const emit = defineEmits(['update:collapseLeft'])
const updateCollapseLeft = () => {
  globalConfigStore.collapseLeft()
  emit('update:collapseLeft', globalConfigStore.isCollapseLeft)
}

defineProps({
  collapseLeft: {
    type: Boolean
  }
})
</script>
<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item @click="updateCollapseLeft">
      <template #title>
        <el-icon v-if="!globalConfigStore.isCollapseLeft">
          <Fold />
        </el-icon>
        <el-icon v-if="globalConfigStore.isCollapseLeft">
          <Expand />
        </el-icon>
        <span>&nbsp;</span>
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title>
        <span>{{ $t('common.label.language') }}</span>
      </template>
      <el-menu-item
        index="1-1"
        @click="$changeLocale('zh-CN')"
      >
        <common-icon
          v-if="globalConfigStore.currentLocale==='zh-CN'"
          icon="check"
        />
        {{ $t('common.label.langCn') }}
      </el-menu-item>
      <el-menu-item
        index="1-2"
        @click="$changeLocale('en-US')"
      >
        <common-icon
          v-if="globalConfigStore.currentLocale==='en-US'"
          icon="check"
        />
        {{ $t('common.label.langEn') }}
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        {{ $t('common.label.theme') }}
      </template>
      <el-menu-item
        index="2-1"
        @click="globalConfigStore.changeTheme(false)"
      >
        <el-icon v-if="!globalConfigStore.isDarkTheme">
          <Check />
        </el-icon>
        {{ $t('common.label.themeDefault') }}
      </el-menu-item>
      <el-menu-item
        index="2-2"
        @click="globalConfigStore.changeTheme(true)"
      >
        <el-icon v-if="globalConfigStore.isDarkTheme">
          <Check />
        </el-icon>
        {{ $t('common.label.themeDark') }}
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        {{ $t('common.label.personalCenter') }}
      </template>
      <el-menu-item index="3-1">
        {{ $t('common.label.personalInfo') }}
      </el-menu-item>
      <el-menu-item index="3-2">
        {{ $t('common.label.about') }}
      </el-menu-item>
      <el-menu-item index="3-3">
        {{ $t('common.label.logout') }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>
