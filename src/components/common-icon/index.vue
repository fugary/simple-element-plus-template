<script setup>
import { computed } from 'vue'
import { ICON_PREFIX } from '@/icons'
import kebabCase from 'lodash/kebabCase'

const props = defineProps({
  icon: {
    type: String,
    required: false
  }
})
const calcIcon = computed(() => {
  if (props.icon) {
    return `${ICON_PREFIX}${kebabCase(props.icon)}`
  }
  return props.icon
})
</script>

<template>
  <el-icon
    v-if="calcIcon"
    v-bind="$attrs"
  >
    <component
      :is="calcIcon"
    />
  </el-icon>
</template>
