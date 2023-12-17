<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-icon>
    <component
      :is="icon"
    />
  </el-icon>
</template>
