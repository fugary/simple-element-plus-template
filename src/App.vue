<script setup>
import { useGlobalConfigStore } from '@/stores/globalConfig'
import { $changeLocale, elementLocale } from '@/languages/MessagesConfig'

const globalConfigStore = useGlobalConfigStore()
$changeLocale(globalConfigStore.currentLocale)
</script>

<template>
  <el-config-provider :locale="elementLocale.localeData">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
