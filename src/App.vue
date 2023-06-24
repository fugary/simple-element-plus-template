<script setup>

</script>

<template>
  <el-config-provider :locale="$currentLocale.localeData">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
