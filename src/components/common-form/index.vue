<script setup>
import { ref, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { $i18nBundle } from '@/messages'
import { useVModel } from '@vueuse/core'

/**
 * @typedef {FormProps} CommonFormProps
 * @property {[CommonFormOption]} options 配置选项
 * @property {boolean} showButtons 是否显示按钮区域
 * @property {boolean} showSubmit 是否显示提交按钮
 * @property {boolean} showReset 是否显示重置按钮
 * @method submitForm 提交逻辑
 */
/**
 * @type {CommonFormProps}
 */
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
    type: Object,
    default: null
  },
  showButtons: {
    type: Boolean,
    default: true
  },
  showSubmit: {
    type: Boolean,
    default: true
  },
  submitLabel: {
    type: String,
    default: ''
  },
  showReset: {
    type: Boolean,
    default: true
  },
  resetLabel: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: false
  },
  backLabel: {
    type: String,
    default: ''
  },
  backUrl: {
    type: String,
    default: ''
  }
})

const initRules = () => {
  const ruleResult = {}
  props.options.forEach(option => {
    if (option.prop) {
      let _rules = cloneDeep(option.rules || [])
      if (option.required !== undefined) {
        const label = option.label || $i18nBundle(option.labelKey)
        _rules = [{
          required: option.required,
          message: $i18nBundle('common.msg.nonNull', [label])
        }, ..._rules]
      }
      if (option.pattern !== undefined) {
        const label = option.label || $i18nBundle(option.labelKey)
        _rules = [{
          pattern: option.pattern,
          message: option.patternMsg || $i18nBundle('common.msg.patternInvalid', [label])
        }, ..._rules]
      }
      if (_rules.length) {
        ruleResult[option.prop] = _rules
      }
    }
  })
  return ruleResult
}

const rules = ref({})

const emit = defineEmits(['submitForm', 'update:model'])

const formModel = useVModel(props, 'model', emit)

watch(() => props.options, (options) => {
  console.info('=================options', options)
  options.forEach(option => {
    if (formModel.value && option.value) {
      formModel.value[option.prop] = option.value
    }
  })
  rules.value = initRules()
}, { deep: true })

//= ============form暴露============//

const form = ref()

defineExpose({
  form
})

</script>

<template>
  <el-form
    ref="form"
    :model="formModel"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="$attrs"
  >
    <common-form-control
      v-for="(option,index) in options"
      :key="index"
      :model="formModel"
      :option="option"
    />
    <slot
      :form="form"
      name="before-buttons"
    />
    <el-form-item v-if="showButtons">
      <el-button
        v-if="showSubmit"
        type="primary"
        @click="$emit('submitForm', form)"
      >
        {{ submitLabel||$t('common.label.submit') }}
      </el-button>
      <el-button
        v-if="showReset"
        @click="form.resetFields()"
      >
        {{ resetLabel||$t('common.label.reset') }}
      </el-button>
      <el-button
        v-if="showBack||backUrl"
        @click="backUrl?$router.push(backUrl):$router.go(-1)"
      >
        {{ backLabel||$t('common.label.back') }}
      </el-button>
      <slot
        :form="form"
        name="buttons"
      />
    </el-form-item>
    <slot
      :form="form"
    />
  </el-form>
</template>

<style scoped>

</style>
