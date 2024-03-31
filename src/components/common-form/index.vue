<script setup>
import { inject, ref, onMounted, isRef, watchEffect } from 'vue'
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
    default () {
      return []
    }
  },
  labelWidth: {
    type: String,
    default: '110px'
  },
  model: {
    type: Object,
    default: null
  },
  inline: {
    type: Boolean
  },
  className: {
    type: String,
    default: 'common-form'
  },
  buttonStyle: {
    type: [String, Object],
    default: ''
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
  disableSubmitIfNotValid: {
    type: Boolean,
    default: false
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

const emit = defineEmits(['submitForm', 'update:model'])

const formModel = useVModel(props, 'model', emit)

//= ============form暴露============//
const form = ref()

defineExpose({
  form
})
onMounted(() => {
  const commonWindowRef = inject('commonWindow', null)
  if (isRef(commonWindowRef)) {
    commonWindowRef.value.addForm(form)
  }
})

/**
 * 表单校验不通过时禁止点击提交按钮
 */
const disableSubmit = ref(false)
watchEffect(async () => {
  if (!props.disableSubmitIfNotValid) { return false }
  if (!form.value) { return true }
  await form.value.validate((ok) => { disableSubmit.value = !ok })
})

</script>

<template>
  <el-form
    ref="form"
    :inline="inline"
    :class="className"
    :model="formModel"
    :label-width="labelWidth"
    :validate-on-rule-change="validateOnRuleChange"
  >
    <template
      v-for="(option,index) in options"
      :key="index"
    >
      <slot
        v-if="option.slot"
        :name="option.slot"
        :option="option"
        :form="form"
        :model="formModel"
      />
      <common-form-control
        v-if="!option.slot&&option.enabled!==false"
        :model="formModel"
        :option="option"
      />
    </template>
    <slot
      :form="form"
      :model="formModel"
      name="default"
    />
    <el-form-item
      v-if="showButtons"
      :style="buttonStyle"
    >
      <el-button
        v-if="showSubmit"
        :disabled="disableSubmit"
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
        :model="formModel"
        name="buttons"
      />
    </el-form-item>
    <slot
      :form="form"
      :model="formModel"
      name="after-buttons"
    />
  </el-form>
</template>

<style scoped>

</style>
