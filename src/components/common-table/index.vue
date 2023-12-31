<script setup>
/**
 * @typedef {TableProps} CommonTableProps
 * @property {[CommonTableColumn]} columns
 */
import CommonTableColumn from '@/components/common-table/common-table-column.vue'

/**
 * @type CommonTableProps
 */
const props = defineProps({
  /**
   * @type {[CommonTableColumn]}
   */
  columns: {
    type: Array,
    required: true
  },
  /**
   * 显示数据
   */
  data: {
    type: Array,
    default () {
      return []
    }
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  stripe: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <el-table
    :v-bind="$attrs"
    :highlight-current-row="highlightCurrentRow"
    :stripe="stripe"
    :data="data"
  >
    <common-table-column
      v-for="(column, index) in columns"
      :key="index"
      :column="column"
    />
  </el-table>
</template>

<style scoped>

</style>
