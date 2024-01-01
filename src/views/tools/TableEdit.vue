<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div>
    <strong>编辑数据</strong>
    <br>
    <el-link
      type="primary"
      @click="router.back()"
    >
      {{ $t('common.label.back') }}
    </el-link>
  </div>
</template>

<style scoped>

</style>
