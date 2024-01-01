<script setup>
/**
 * 表格列配置信息，对应el-table-column数据
 * @typedef {Object} CommonTableColumn
 * @property {string} label 标签头
 * @property {string} labelKey 国际化
 * @property {string} property 数据属性
 * @property {string} width 宽度
 * @property {boolean} isOperation 是否是操作列
 * @property {string} slot 自定义插槽
 * @property [ButtonProps] buttons 自定义按钮
 * @property {Object} attrs 其他属性
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
  },
  buttonSize: {
    type: String,
    default: 'small'
  }
})

</script>

<template>
  <el-table-column
    v-if="!column.isOperation"
    :label="column.label || $t(column.labelKey)"
    :property="column.property"
    :width="column.width"
    v-bind="column.attrs"
  >
    <template
      v-if="column.slot"
      #default="scope"
    >
      <slot
        v-bind="scope"
        name="default"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-if="column.isOperation"
    :label="column.label || $t(column.labelKey)"
    :width="column.width"
    v-bind="column.attrs"
  >
    <template
      #default="scope"
    >
      <el-button
        v-for="(button, index) in column.buttons"
        :key="index"
        :type="button.type"
        :icon="button.icon"
        :size="button.size||buttonSize"
        :disabled="button.disabled"
        :round="button.round"
        :circle="button.circle"
        @click="button.click&&button.click(scope.row, scope)"
      >
        {{ button.label || $t(button.labelKey) }}
      </el-button>
      <slot
        name="default"
        v-bind="scope"
      />
    </template>
  </el-table-column>
</template>

<style scoped>

</style>
