<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { $changeLocale, elementLocale, $i18nBundle } from '@/messages'
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'

const globalConfigStore = useGlobalConfigStore()
$changeLocale(globalConfigStore.currentLocale)
const title = computed(() => $i18nBundle('common.label.title'))
useTitle(title)
</script>

<template>
  <el-config-provider :locale="elementLocale.localeData">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
