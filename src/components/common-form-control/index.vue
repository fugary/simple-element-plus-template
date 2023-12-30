<script setup>
import { computed } from 'vue'

/**
 * @typedef {Object} CommonFormOption
 * @property {'input'|'input-number'|'cascader'|'radio'
 * |'radio-group'|'checkbox'|'checkbox-group'|'date-picker'
 * |'time-picker'|'switch'|'select'|'option'|'slider'|'transfer'|'upload'} type 类型
 * @property {any} value
 * @property {any} config
 * @property {string} prop
 * @property {string} label
 * @property {string} placeholder
 * @property {{clearable:boolean,disabled:boolean}} attrs
 * @property {[CommonFormOption]} children 子节点
 * @property {Array<RuleItem>} rules 子节点
 */
/**
 * @type {CommonFormOption}
 */
const props = defineProps({
  type: {
    type: String,
    default: 'input'
  },
  value: {
    type: Object,
    default: null
  },
  prop: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  children: {
    type: Array,
    default: () => []
  },
  rules: { type: Array, default: () => [] },
  placeholder: {
    type: String,
    default: ''
  },
  attrs: {
    type: Object,
    default: null
  }
})

const inputType = computed(() => {
  return `el-${props.type}`
})

</script>

<template>
  <component
    :is="inputType"
    :prop="prop"
    v-bind="attrs"
    :placeholder="placeholder"
  >
    <template v-if="children&&children.length">
      <common-form-control
        v-for="(childItem, index) in children"
        :key="index"
        :type="childItem.type"
      />
    </template>
  </component>
</template>

<style scoped>

</style>
