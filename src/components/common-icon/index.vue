<script setup>
defineProps({
  icon: {
    type: String,
    required: false
  }
})
</script>

<template>
  <el-icon
    v-if="icon"
    v-bind="$attrs"
  >
    <component
      :is="icon"
    />
  </el-icon>
</template>
