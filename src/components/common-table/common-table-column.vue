<script setup>
/**
 * 表格列配置信息，对应el-table-column数据
 * @typedef {Object} CommonTableColumn
 * @property {string} label 标签头
 * @property {string} labelKey 国际化
 * @property {string} property 数据属性
 * @property {string} width 宽度
 * @property {boolean} isOperation 是否是操作列
 */
/**
 * 配置信息
 */
const props = defineProps({
  /**
   * @type {CommonTableColumn}
   */
  column: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <el-table-column
    :label="column.label"
    :property="column.property"
    :width="column.width"
  />
</template>

<style scoped>

</style>
