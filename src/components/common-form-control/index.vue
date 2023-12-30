<script setup>
import { computed } from 'vue'
import { $i18nBundle } from '@/messages'
import ControlChild from '@/components/common-form-control/control-child.vue'

/**
 * 定义一些注释属性，方便代码提示
 * @typedef {Object} CommonFormOption
 * @property {'input'|'input-number'|'cascader'|'radio'
 * |'radio-group'|'checkbox'|'checkbox-group'|'date-picker'
 * |'time-picker'|'switch'|'select'|'option'|'slider'|'transfer'|'upload'} type 类型
 * @property {any} value
 * @property {any} config
 * @property {string|[string]} prop
 * @property {string} label
 * @property {string} labelKey 用于国际化的label
 * @property {boolean} required
 * @property {string} placeholder
 * @property {{clearable:boolean,disabled:boolean,showPassword:boolean}} attrs
 * @property {[CommonFormOption]} children 子节点
 * @property {Array<RuleItem>} rules 子节点
 */

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
  },
  model: {
    type: Object
  }
})

const inputType = computed(() => {
  return `el-${props.option.type || 'input'}`
})

const modelAttrs = computed(() => {
  if (['input', 'select', 'autocomplete', 'cascader'].includes(inputType.value)) {
    return Object.assign({ clearable: true }, props.option.attrs || {})
  }
  return props.option.attrs
})

const label = computed(() => {
  const option = props.option
  if (option.labelKey) {
    return $i18nBundle(option.labelKey)
  }
  return option.label
})

const controlModel = computed(() => props.option.model || props.model)

const modelValue = computed({
  get () {
    console.info('=================', controlModel.value)
    if (controlModel.value && props.option.prop) {
      return controlModel.value[props.option.prop]
    }
    return null
  },
  set (val) {
    console.info('set===============', controlModel.value)
    if (controlModel.value && props.option.prop) {
      controlModel.value[props.option.prop] = val
    }
  }
})

</script>

<template>
  <el-form-item
    :label="label"
    :prop="option.prop"
  >
    <component
      :is="inputType"
      v-model="modelValue"
      v-bind="modelAttrs"
      :placeholder="option.placeholder"
      @change="option.change"
    >
      <template v-if="option.children&&option.children.length">
        <control-child
          v-for="(childItem, index) in option.children"
          :key="index"
          :option="childItem"
        />
      </template>
    </component>
  </el-form-item>
</template>

<style scoped>

</style>
