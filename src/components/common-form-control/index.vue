<script setup>
import { computed } from 'vue'
import { $i18nBundle } from '@/messages'
import ControlChild from '@/components/common-form-control/control-child.vue'
import { useInputType } from '@/components/utils'

/**
 * 定义一些注释属性，方便代码提示
 * @typedef {Object} CommonFormOption
 * @property {'input'|'input-number'|'cascader'|'radio'
 * |'radio-group'|'radio-button'|'checkbox'|'checkbox-group'|'checkbox-button'|'date-picker'
 * |'time-picker'|'switch'|'select'|'option'|'slider'|'transfer'|'upload'} type 类型
 * @property {any} value 数据值
 * @property {string|[string]} prop 属性
 * @property {string} label 标签
 * @property {string} labelKey 用于国际化的label
 * @property {boolean} required 是否必填,后面解析成为rules的一部分
 * @property {string|RegExp} pattern 正则表达式验证，解析成为rules的一部分
 * @property {string} patternMsg 正则表达式验证消息
 * @property {boolean} common 自定义组件
 * @property {boolean} disabled 禁用
 * @property {boolean} readonly 只读
 * @property {string} placeholder 占位提示符
 * @property {{clearable:boolean,disabled:boolean,showPassword:boolean}} attrs
 * @property {[CommonFormOption]} children 子节点
 * @property {Array<RuleItem>} rules 验证规则
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

const inputType = computed(() => useInputType(props.option))

const modelAttrs = computed(() => {
  if (['el-input', 'el-select', 'common-autocomplete', 'el-autocomplete', 'el-cascader'].includes(inputType.value)) {
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

const formModel = computed(() => props.option.model || props.model)

const modelValue = computed({
  get () {
    if (formModel.value && props.option.prop) {
      return formModel.value[props.option.prop]
    }
    return null
  },
  set (val) {
    if (formModel.value && props.option.prop) {
      formModel.value[props.option.prop] = val
    }
  }
})

const childTypeMapping = { // 自动映射子元素类型，配置的时候可以不写type
  'checkbox-group': 'checkbox',
  'radio-group': 'radio',
  select: 'option'
}

const children = computed(() => {
  const option = props.option
  const result = option.children || [] // 初始化一些默认值
  result.forEach(childItem => {
    if (!childItem.type) {
      childItem.type = childTypeMapping[option.type]
    }
  })
  return result
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
      :disabled="option.disabled"
      :readonly="option.readonly"
      @change="option.change"
    >
      <template v-if="children&&children.length">
        <control-child
          v-for="(childItem, index) in children"
          :key="index"
          :option="childItem"
        />
      </template>
    </component>
  </el-form-item>
</template>

<style scoped>

</style>
