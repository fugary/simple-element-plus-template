<script setup>
import { computed } from 'vue'
import { $i18nBundle } from '@/messages'

/**
 * @type {{option:CommonFormOption}}
 */
const props = defineProps({
  /**
   * @type {CommonFormOption}
   */
  option: {
    type: Object,
    required: true
  }
})

const inputType = computed(() => {
  return `el-${props.option.type}`
})

const label = computed(() => {
  const option = props.option
  if (option.labelKey) {
    return $i18nBundle(option.labelKey)
  }
  return option.label
})

</script>

<template>
  <component
    :is="inputType"
    :value="option.value"
    :label="label"
    v-bind="option.attrs"
  />
</template>

<style scoped>

</style>
