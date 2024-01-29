<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * @type {CommonFormOption}
   */
  option: {
    type: Object,
    required: true
  },
  model: {
    type: Object,
    required: true
  },
  labelWidth: {
    type: String,
    default: null
  },
  prop: {
    type: String,
    default: ''
  }
})

const dynamicOption = computed(() => {
  let option = props.option
  if (option.dynamicOption) {
    return { ...option.dynamicOption(props.model, option) }
  } else if (option.dynamicAttrs) {
    option = { ...option, attrs: option.dynamicAttrs(props.model, option) }
  }
  return option
})

</script>

<template>
  <common-form-control
    :model="model"
    :label-width="labelWidth"
    :option="dynamicOption"
    :prop="prop"
    v-bind="$attrs"
  />
</template>

<style scoped>

</style>
