<script setup>
import { computed } from 'vue'
import { $i18nBundle } from '@/messages'
import ControlChild from '@/components/common-form-control/control-child.vue'
import { useInputType } from '@/components/utils'

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
  if (['el-input', 'el-select', 'common-autocomplete', 'el-autocomplete', 'el-cascader', 'el-tree-select'].includes(inputType.value)) {
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
    :prop="option.prop"
  >
    <template #label>
      <span>{{ label }}</span>
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
