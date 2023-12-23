<script setup>
defineProps({
  icon: {
    type: String,
    required: false
  }
})
</script>

<template>
  <el-icon v-if="icon">
    <component
      :is="icon"
    />
  </el-icon>
</template>
