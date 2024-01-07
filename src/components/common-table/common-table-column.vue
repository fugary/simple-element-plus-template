<script setup>
/**
 * 配置信息
 * @type {CommonTableColumnProps}
 */
const props = defineProps({
  /**
   * @type {CommonTableColumn}
   */
  column: {
    type: Object,
    required: true
  },
  /**
   * @type {''|'large'|'small'|'default'}
   */
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
    :prop="column.prop||column.property"
    :width="column.width"
    v-bind="column.attrs"
    :formatter="column.formatter"
  >
    <template
      v-if="column.slot||column.click"
      #default="scope"
    >
      <el-link
        v-if="column.click"
        type="primary"
        v-bind="column.linkAttrs"
        @click="column.click(scope.row, scope)"
      >
        {{ column.formatter?column.formatter(scope.row, scope):scope.row[column.property] }}
      </el-link>
      <slot
        v-bind="scope"
        :column-conf="column"
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
      <template v-for="(button, index) in column.buttons">
        <el-button
          v-if="!button.buttonIf||button.buttonIf(scope.row, scope)"
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
      </template>
      <slot
        name="default"
        v-bind="scope"
      />
    </template>
  </el-table-column>
</template>

<style scoped>

</style>
