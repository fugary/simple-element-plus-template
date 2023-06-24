<script setup>

import { ref } from 'vue'

const isCollapseLeft = ref(false)

const emit = defineEmits(['update:collapseLeft'])
const updateCollapseLeft = () => {
  isCollapseLeft.value = !isCollapseLeft.value
  emit('update:collapseLeft', isCollapseLeft.value)
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
        <el-icon v-if="!isCollapseLeft">
          <Fold />
        </el-icon>
        <el-icon v-if="isCollapseLeft">
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
        {{ $t('common.label.langCn') }}
      </el-menu-item>
      <el-menu-item
        index="1-2"
        @click="$changeLocale('en-US')"
      >
        {{ $t('common.label.langEn') }}
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        {{ $t('common.label.theme') }}
      </template>
      <el-menu-item index="2-1">
        {{ $t('common.label.themeDefault') }}
      </el-menu-item>
      <el-menu-item index="2-2">
        {{ $t('common.label.themeDark') }}
      </el-menu-item>
      <el-menu-item index="2-3">
        {{ $t('common.label.themePurple') }}
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
