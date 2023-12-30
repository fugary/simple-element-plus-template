<script setup>
import {useGlobalConfigStore} from '@/stores/GlobalConfigStore'
const globalConfigStore = useGlobalConfigStore()

</script>

<template>
  <el-drawer v-model="globalConfigStore.isShowSettings" direction="rtl" :size="350">
    <template #header>
      <strong>{{ $t('common.label.settings') }}</strong>
    </template>
    <template #default>
      <div>

      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="globalConfigStore.changeShowSettings(false)">{{$t('common.label.close')}}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>

</style>
