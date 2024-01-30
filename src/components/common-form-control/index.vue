<script setup>
import { computed, ref, watch } from 'vue'
import { $i18nBundle } from '@/messages'
import ControlChild from '@/components/common-form-control/control-child.vue'
import { useInputType } from '@/components/utils'
import cloneDeep from 'lodash/cloneDeep'
import { get, set } from 'lodash'
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
  }
})

const inputType = computed(() => useInputType(props.option))

const modelAttrs = computed(() => {
  const option = props.option
  const attrs = { ...option.attrs }
  if (attrs.clearable === undefined && ['el-input', 'el-select', 'el-select-v2', 'common-autocomplete', 'el-autocomplete', 'el-cascader', 'el-tree-select'].includes(inputType.value)) {
    attrs.clearable = true
  }
  if (inputType.value === 'common-autocomplete' && option.getAutocompleteLabel) {
    attrs.defaultLabel = option.getAutocompleteLabel(props.model, option)
  }
  if (inputType.value === 'el-date-picker') {
    attrs.disabledDate = (date) => {
      const option = props.option
      let result = false
      if (option.minDate) {
        result = date.getTime() < dayjs(option.minDate).startOf('d').toDate().getTime()
      }
      if (result && option.maxDate) {
        result = date.getTime() > dayjs(option.maxDate).startOf('d').toDate().getTime()
      }
      return result
    }
  }
  attrs.defaultValue = modelValue.value || option.minDate
  return attrs
})

watch(() => [inputType.value, props.option.minDate, props.option.maxDate], ([type, minDate, maxDate]) => {
  const option = props.option
  const date = modelValue.value
  if (type === 'el-date-picker' && date && !option.disabled && option.clearInvalidDate !== false) {
    let invalid = false
    if (minDate) {
      invalid = date.getTime() < dayjs(option.minDate).startOf('d').toDate().getTime()
    }
    if (invalid && maxDate) {
      invalid = date.getTime() > dayjs(option.maxDate).startOf('d').toDate().getTime()
    }
    if (invalid) {
      modelValue.value = undefined
    }
  }
})

const label = computed(() => {
  const option = props.option
  if (option.labelKey) {
    return $i18nBundle(option.labelKey)
  }
  return option.label
})

const showLabel = computed(() => {
  return props.option.showLabel !== false && props.labelWidth !== '0'
})

const formModel = computed(() => props.option.model || props.model)

const modelValue = computed({
  get () {
    if (formModel.value && props.option.prop) {
      return get(formModel.value, props.option.prop)
    }
    return null
  },
  set (val) {
    if (formModel.value && props.option.prop) {
      set(formModel.value, props.option.prop, val)
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

const formItemRef = ref()

const rules = computed(() => {
  const option = props.option
  let _rules = cloneDeep(option.rules || [])
  if (option.prop) {
    if (option.required !== undefined) {
      const label = option.label || $i18nBundle(option.labelKey)
      _rules = [{
        trigger: option.trigger,
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
  }
  formItemRef.value && formItemRef.value.clearValidate()
  return _rules
})

const initFormModel = () => {
  if (formModel.value) {
    const option = props.option
    if (option.prop) {
      const defaultVal = get(formModel.value, option.prop)
      set(formModel.value, option.prop, defaultVal ?? option.value ?? undefined)
    }
  }
}

initFormModel()

watch(() => props.option, initFormModel, { deep: true })

const hasModelText = computed(() => {
  return !!(modelAttrs.value.modelText || modelAttrs.value.modelTextFunc)
})

const emit = defineEmits(['change'])

const controlChange = (...args) => {
  const option = props.option
  if (option.change) {
    option.change(...args)
  }
  emit('change', ...args)
}

const formItemEnabled = computed(() => props.option.enabled !== false)

const controlLabelWidth = computed(() => {
  const option = props.option
  const labelWidth = props.labelWidth
  return option.labelWidth || modelAttrs.value.labelWidth || labelWidth
})

</script>

<template>
  <el-form-item
    v-if="formItemEnabled"
    ref="formItemRef"
    :rules="rules"
    :prop="option.prop"
    :label-width="controlLabelWidth"
    v-bind="$attrs"
  >
    <template
      v-if="showLabel"
      #label
    >
      <slot name="beforeLabel" />
      <span :class="option.labelCls">{{ label }}</span>
      <el-tooltip
        v-if="option.tooltip||option.tooltipFunc"
        class="box-item"
        effect="dark"
        :disabled="!option.tooltip"
        :content="option.tooltip"
        placement="top-start"
      >
        <span>
          <el-link
            :underline="false"
            @click="option.tooltipFunc"
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
      :placeholder="option.placeholder"
      :disabled="option.disabled"
      :readonly="option.readonly"
      @change="controlChange"
    >
      <template
        v-if="hasModelText"
        #default
      >
        {{ modelAttrs.modelText || modelAttrs.modelTextFunc(modelValue) }}
      </template>
      <template v-if="children&&children.length">
        <control-child
          v-for="(childItem, index) in children"
          :key="index"
          :option="childItem"
        />
      </template>
    </component>
    <slot name="after" />
  </el-form-item>
</template>

<style scoped>

</style>
