<script setup>
import { computed, ref, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { $i18nBundle } from '@/messages'
import { useVModel } from '@vueuse/core'

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
  validateOnRuleChange: {
    type: Boolean,
    default: false
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
    default: false
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

//= ============form暴露============//

const form = ref()

const rules = computed(() => {
  const ruleResult = {}
  props.options.forEach(option => {
    if (option.prop) {
      let _rules = cloneDeep(option.rules || [])
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
      if (_rules.length) {
        ruleResult[option.prop] = _rules
      }
    }
  })
  form.value && form.value.clearValidate()
  return ruleResult
})

const emit = defineEmits(['submitForm', 'update:model'])

const formModel = useVModel(props, 'model', emit)

const initFormModel = () => {
  if (formModel.value) {
    props.options.forEach(option => {
      if (option.prop) {
        formModel.value[option.prop] = option.value || undefined
      }
    })
  }
}

initFormModel()

watch(() => props.options, initFormModel, { deep: true })

defineExpose({
  form
})

</script>

<template>
  <el-form
    ref="form"
    class="common-form"
    :model="formModel"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="$attrs"
    :validate-on-rule-change="validateOnRuleChange"
  >
    <common-form-control
      v-for="(option,index) in options"
      :key="index"
      :model="formModel"
      :option="option"
    />
    <slot
      :form="form"
      name="default"
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
      name="after-buttons"
    />
  </el-form>
</template>

<style scoped>

</style>
