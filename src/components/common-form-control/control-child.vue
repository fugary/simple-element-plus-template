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
/**
 * element-plus的复选框和单选框没有value值，只有label用于存储值，因此特殊处理
 * @type {string[]}
 */
const labelAsValueKeys = ['checkbox', 'radio', 'checkbox-button', 'radio-button']

const labelOrValue = computed(() => {
  const option = props.option
  if (labelAsValueKeys.includes(option.type)) {
    return option.value
  }
  return label.value
})

</script>

<template>
  <component
    :is="inputType"
    :value="option.value"
    :label="labelOrValue"
    v-bind="option.attrs"
  >
    {{ label }}
  </component>
</template>

<style scoped>

</style>
