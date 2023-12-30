<script setup>
import { computed } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  /**
   * @type [CommonFormOption]
   */
  options: {
    type: Array,
    required: true
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  model: {
    type: Object
  }
})

const rules = computed(() => {
  const ruleResult = {}
  props.options.forEach(option => {
    if (option.prop && option.rules) {
      ruleResult[option.prop] = cloneDeep(option.rules)
    }
  })
  console.info(ruleResult)
  return ruleResult
})

</script>

<template>
  <el-form
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="$attrs"
  >
    <common-form-control
      v-for="(option,index) in options"
      :key="index"
      :model="model"
      :option="option"
    />
  </el-form>
</template>

<style scoped>

</style>
