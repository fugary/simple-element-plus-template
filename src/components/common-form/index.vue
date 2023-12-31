<script setup>
import { computed, ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { $i18nBundle } from '@/messages'

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
    if (option.prop) {
      let _rules = cloneDeep(option.rules || [])
      if (option.required !== undefined) {
        const label = option.label || $i18nBundle(option.labelKey)
        _rules = [{
          required: option.required,
          trigger: 'blur',
          message: $i18nBundle('common.msg.nonNull', [label])
        }, ..._rules]
      }
      if (option.pattern !== undefined) {
        const label = option.label || $i18nBundle(option.labelKey)
        _rules = [{
          pattern: option.pattern,
          trigger: 'blur',
          message: option.patternMsg || $i18nBundle('common.msg.patternInvalid', [label])
        }, ..._rules]
      }
      if (_rules.length) {
        ruleResult[option.prop] = _rules
      }
    }
  })
  console.info('==============rules', ruleResult)
  return ruleResult
})

const form = ref(null)

</script>

<template>
  <el-form
    ref="form"
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
    <slot
      name="default"
      :form="form"
    />
  </el-form>
</template>

<style scoped>

</style>
