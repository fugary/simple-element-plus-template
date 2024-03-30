<script setup>
import { get, isArray, isObject, set } from 'lodash'
import { computed, onMounted, useSlots } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

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
    default: '150px'
  },
  prop: {
    type: String,
    default: ''
  },
  unlimitedEnable: {
    type: Boolean,
    default: true
  }
})

const calcFilterType = computed(() => props.option.type || 'checkbox-group')

const isUnlimited = computed(() => {
  const option = props.option
  const value = get(props.model, option.prop)
  const filterType = calcFilterType.value
  if (filterType === 'common-tab-filter') {
    if (isObject(value) && option.attrs?.tabs && option.attrs?.tabs.length) {
      let unlimited = true
      option.attrs.tabs.forEach(tab => {
        const tabVal = get(value, tab.prop)
        if (unlimited) {
          if (isArray(tabVal)) {
            if (tabVal.length) {
              unlimited = false
            }
          } else {
            unlimited = !tabVal
          }
        }
      })
      return unlimited
    }
  }
  return !value || !value.length
})

const setUnlimited = () => {
  const option = props.option
  const filterType = calcFilterType.value
  let value
  if (filterType.includes('checkbox')) {
    value = []
  } else if (filterType === 'common-tab-filter') {
    value = {}
  }
  set(props.model, option.prop, value)
}

const initFilterModel = () => {
  const filterType = calcFilterType.value
  if (filterType === 'common-tab-filter') {
    const value = get(props.model, props.option.prop)
    if (!value) {
      set(props.model, props.option.prop, {})
    }
  }
}

onMounted(() => {
  initFilterModel()
})

const newOption = computed(() => {
  const option = cloneDeep(props.option)
  option.type = calcFilterType.value
  return option
})

const slots = computed(() => {
  const tmpSlots = cloneDeep(useSlots())
  delete tmpSlots.afterLabel
  return tmpSlots
})

</script>

<template>
  <common-form-control
    :label-width="labelWidth"
    :model="model"
    :option="newOption"
  >
    <template
      v-if="unlimitedEnable"
      #afterLabel
    >
      <slot name="afterLabel" />
      <el-link
        class="margin-left1 margin-top1"
        type="primary"
        :underline="false"
        @click="setUnlimited()"
      >
        <el-tag
          size="small"
          :effect="isUnlimited?'dark':'light'"
        >
          {{ $t('common.label.unlimited') }}
        </el-tag>
      </el-link>
    </template>
    <template
      v-for="(slot, slotKey) in slots"
      :key="slotKey"
      #[slotKey]
    >
      <slot :name="slotKey" />
    </template>
  </common-form-control>
</template>

<style scoped>

</style>
