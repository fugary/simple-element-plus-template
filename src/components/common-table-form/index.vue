<script setup>
import { computed } from 'vue'
import TableFormControl from '@/components/common-table-form/table-form-control.vue'

const props = defineProps({
  formOptions: {
    type: Array,
    default: () => []
  },
  model: {
    type: Object,
    required: true
  },
  dataListKey: {
    type: String,
    default: 'items'
  },
  showOperation: {
    type: Boolean,
    default: true
  }
})

const dataList = computed(() => {
  return props.model[props.dataListKey] || []
})

const emit = defineEmits(['delete', 'change'])

const deleteItem = (item, index) => {
  emit('delete', {
    item, index
  })
}

const formChange = ($event, row, $index, option) => {
  const args = [$event, {
    model: row,
    index: $index,
    option
  }]
  if (option.formChange) { // 动态表单change事件
    option.formChange(...args)
  }
  emit('change', ...args)
}

const options = computed(() => {
  return props.formOptions.filter(option => option.enabled !== false)
})

</script>

<template>
  <el-table
    :data="dataList"
    border
    class="common-table-form"
  >
    <el-table-column
      v-for="(option, index) in options"
      :key="index"
      :label="option.label||$t(option.labelKey)"
      :width="option.width"
    >
      <template #default="{row, $index}">
        <table-form-control
          :model="row"
          label-width="0"
          :option="option"
          :prop="`${dataListKey}.${$index}.${option.prop}`"
          @change="formChange($event, row, $index, option)"
        />
      </template>
    </el-table-column>
    <el-table-column
      v-if="showOperation"
      :label="$t('common.label.operation')"
    >
      <template #default="{row, $index}">
        <div class="el-form-item">
          <el-link
            type="danger"
            :underline="false"
            @click="deleteItem(row, $index)"
          >
            <common-icon
              icon="CloseBold"
              size="18"
            />
          </el-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
