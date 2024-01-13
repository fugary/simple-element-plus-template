<script setup>
import { ref } from 'vue'
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

const emit = defineEmits(['submitForm', 'update:model'])

const formModel = useVModel(props, 'model', emit)

//= ============form暴露============//

const form = ref()

defineExpose({
  form
})

</script>

<template>
  <el-form
    ref="form"
    class="common-form"
    :model="formModel"
    :label-width="labelWidth"
    v-bind="$attrs"
    :validate-on-rule-change="validateOnRuleChange"
  >
    <template
      v-for="(option,index) in options"
      :key="index"
    >
      <slot
        v-if="option.slot"
        name="option.slot"
        :option="option"
        :form="form"
        :model="formModel"
      />
      <common-form-control
        :model="formModel"
        :option="option"
      />
    </template>
    <slot
      :form="form"
      :model="formModel"
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
