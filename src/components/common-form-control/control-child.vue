<script setup>
import { computed } from 'vue'
import { toLabelByKey, useInputType } from '@/components/utils'

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

const inputType = computed(() => useInputType(props.option))

const label = computed(() => {
  const option = props.option
  if (option.labelKey) {
    return toLabelByKey(option.labelKey)
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
  >
    {{ label }}
  </component>
</template>

<style scoped>

</style>
