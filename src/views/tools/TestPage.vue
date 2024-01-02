<script setup>
import { ref } from 'vue'

const modelIcon = ref('Apple')
</script>

<template>
  <el-container>
    <el-main>
      <el-form>
        <el-form-item label="图标选择">
          <common-icon-select v-model="modelIcon" />
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
