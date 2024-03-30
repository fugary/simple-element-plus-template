<script setup>
import { computed, isVNode, ref, watch } from 'vue'
import { $i18nBundle } from '@/messages'
import ControlChild from '@/components/common-form-control/control-child.vue'
import { toLabelByKey, useInputType } from '@/components/utils'
import cloneDeep from 'lodash/cloneDeep'
import { get, isFunction, set } from 'lodash'
import dayjs from 'dayjs'

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
    type: Object,
    required: true
  },
  labelWidth: {
    type: String,
    default: null
  },
  addInfo: {
    type: Object,
    default: () => ({})
  }
})

const calcOption = computed(() => {
  let option = props.option
  if (isFunction(option.dynamicOption)) {
    option = { ...option, ...option.dynamicOption(props.model, option, props.addInfo) }
  } else if (isFunction(option.dynamicAttrs)) {
    option = { ...option, attrs: { ...option.attrs, ...option.dynamicAttrs(props.model, option, props.addInfo) } }
  }
  return option
})

const inputType = computed(() => useInputType(calcOption.value))

const modelAttrs = computed(() => {
  const option = calcOption.value
  const attrs = { ...option.attrs }
  if (attrs.clearable === undefined && ['el-input', 'el-select', 'el-select-v2', 'common-autocomplete', 'el-autocomplete', 'el-cascader', 'el-tree-select'].includes(inputType.value)) {
    attrs.clearable = true
  }
  if (inputType.value === 'common-autocomplete' && option.getAutocompleteLabel) {
    attrs.defaultLabel = option.getAutocompleteLabel(props.model, option)
  }
  if (inputType.value === 'el-date-picker') {
    attrs.disabledDate = (date) => {
      const option = calcOption.value
      let result = false
      if (option.minDate) {
        result = date.getTime() < dayjs(option.minDate).startOf('d').toDate().getTime()
      }
      if (!result && option.maxDate) {
        result = date.getTime() > dayjs(option.maxDate).startOf('d').toDate().getTime()
      }
      return result
    }
  }
  const defaultValue = modelValue.value || option.minDate
  if (defaultValue) {
    attrs.defaultValue = dayjs(defaultValue).toDate()
  }
  return attrs
})

watch(() => [inputType.value, calcOption.value.minDate, calcOption.value.maxDate], ([type, minDate, maxDate]) => {
  const option = calcOption.value
  const date = modelValue.value
  if (type === 'el-date-picker' && date && !option.disabled && option.clearInvalidDate !== false) {
    let invalid = false
    if (minDate) {
      invalid = dayjs(date).isBefore(dayjs(option.minDate).startOf('d'))
    }
    if (invalid && maxDate) {
      invalid = dayjs(date).isAfter(dayjs(option.maxDate).startOf('d'))
    }
    if (invalid) {
      modelValue.value = undefined
    }
  }
})

const label = computed(() => {
  const option = calcOption.value
  if (option.labelKey) {
    return toLabelByKey(option.labelKey)
  }
  return option.label
})

const showLabel = computed(() => {
  return calcOption.value.showLabel !== false && props.labelWidth !== '0'
})

const formModel = computed(() => calcOption.value.model || props.model)

const modelValue = computed({
  get () {
    if (formModel.value && calcOption.value.prop) {
      return get(formModel.value, calcOption.value.prop)
    }
    return null
  },
  set (val) {
    if (formModel.value && calcOption.value.prop) {
      set(formModel.value, calcOption.value.prop, val)
    }
  }
})

const childTypeMapping = { // 自动映射子元素类型，配置的时候可以不写type
  'checkbox-group': 'checkbox',
  'radio-group': 'radio',
  select: 'option'
}

const children = computed(() => {
  const option = calcOption.value
  const result = option.children || [] // 初始化一些默认值
  result.forEach(childItem => {
    if (!childItem.type) {
      childItem.type = childTypeMapping[option.type]
    }
  })
  return result
})

const formItemRef = ref()

const rules = computed(() => {
  const option = calcOption.value
  let _rules = cloneDeep(option.rules || [])
  if (option.prop) {
    if (option.required !== undefined) {
      const label = option.label || toLabelByKey(option.labelKey)
      _rules = [{
        trigger: option.trigger,
        required: option.required,
        message: $i18nBundle('common.msg.nonNull', [label])
      }, ..._rules]
    }
    if (option.pattern !== undefined) {
      const label = option.label || toLabelByKey(option.labelKey)
      _rules = [{
        pattern: option.pattern,
        message: option.patternMsg || $i18nBundle('common.msg.patternInvalid', [label])
      }, ..._rules]
    }
  }
  formItemRef.value && formItemRef.value.clearValidate()
  return _rules
})

const initFormModel = () => {
  if (formModel.value) {
    const option = calcOption.value
    if (option.prop) {
      const defaultVal = get(formModel.value, option.prop)
      set(formModel.value, option.prop, defaultVal ?? option.value ?? undefined)
    }
  }
}

initFormModel()

watch(() => calcOption.value, initFormModel, { deep: true })

const hasModelText = computed(() => {
  return modelAttrs.value.modelText || calcOption.value.formatter
})

const emit = defineEmits(['change'])

const controlChange = (...args) => {
  const option = calcOption.value
  if (option.change) {
    option.change(...args)
  }
  emit('change', ...args)
}

const formItemEnabled = computed(() => calcOption.value.enabled !== false)

const controlLabelWidth = computed(() => {
  const option = calcOption.value
  const labelWidth = props.labelWidth
  return option.labelWidth || modelAttrs.value.labelWidth || labelWidth
})

const formatResult = computed(() => {
  if (hasModelText.value) {
    if (modelAttrs.value.modelText) {
      return {
        modelText: modelAttrs.value.modelText
      }
    }
    const option = calcOption.value
    if (option.formatter) {
      const result = option.formatter(modelValue.value, calcOption.value)
      return {
        modelText: result,
        vnode: isVNode(result)
      }
    }
  }
  return null
})

</script>

<template>
  <el-form-item
    v-if="formItemEnabled"
    ref="formItemRef"
    :rules="rules"
    :prop="calcOption.prop"
    :style="calcOption.style"
    :label-width="controlLabelWidth"
    v-bind="$attrs"
  >
    <template
      v-if="showLabel"
      #label
    >
      <slot name="beforeLabel" />
      <span :class="calcOption.labelCls">{{ label }}</span>
      <slot name="afterLabel" />
      <el-tooltip
        v-if="calcOption.tooltip||calcOption.tooltipFunc"
        class="box-item"
        effect="dark"
        :disabled="!calcOption.tooltip"
        :content="calcOption.tooltip"
        placement="top-start"
      >
        <span>
          <el-link
            :underline="false"
            @click="calcOption.tooltipFunc"
          >&nbsp;
            <common-icon
              icon="QuestionFilled"
            />
          </el-link>
        </span>
      </el-tooltip>
    </template>
    <component
      :is="inputType"
      v-model="modelValue"
      v-bind="modelAttrs"
      :placeholder="calcOption.placeholder"
      :disabled="calcOption.disabled"
      :readonly="calcOption.readonly"
      @change="controlChange"
    >
      <template
        v-if="hasModelText&&formatResult"
        #default
      >
        <span
          v-if="formatResult.modelText&&!formatResult.vnode"
          class="common-form-label-text"
          v-html="formatResult.modelText"
        />
        <component
          :is="formatResult.modelText"
          v-if="formatResult.vnode"
          class="common-form-label-text"
        />
      </template>
      <slot name="childBefore" />
      <template v-if="children&&children.length">
        <control-child
          v-for="(childItem, index) in children"
          :key="index"
          :option="childItem"
        />
      </template>
      <slot name="childAfter" />
    </component>
    <slot name="after" />
  </el-form-item>
</template>

<style scoped>

</style>
