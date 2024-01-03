<script setup>
import CommonTableColumn from '@/components/common-table/common-table-column.vue'
import { computed } from 'vue'

/**
 * @typedef {TableProps} CommonTableProps
 * @property {[CommonTableColumn]} columns
 */
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
  },
  border: {
    type: Boolean,
    default: true
  },
  /**
   * el-button
   * @type [ButtonProps]
   */
  buttons: {
    type: Array,
    default () {
      return []
    }
  },
  buttonsSlot: {
    type: String,
    default: ''
  },
  buttonSize: {
    type: String,
    default: 'small'
  },
  buttonsColumnAttrs: {
    type: Object,
    default: null
  },
  page: {
    type: Object,
    default: null
  },
  pageAttrs: {
    type: Object,
    default () {
      return {
        layout: 'total, sizes, prev, pager, next',
        pageSizes: [10, 20, 50]
      }
    }
  }
})
/**
 *
 * @type {ComputedRef<[CommonTableColumn]>}
 */
const calcColumns = computed(() => {
  let _columns = props.columns
  if (props.buttons.length || props.buttonsSlot) {
    const buttonColumn = {
      labelKey: 'common.label.operation',
      isOperation: true,
      slot: props.buttonsSlot,
      buttons: props.buttons,
      attrs: props.buttonsColumnAttrs
    }
    _columns = [..._columns, buttonColumn]
  }
  return _columns
})

defineEmits(['pageSizeChange', 'currentPageChange'])

</script>

<template>
  <el-table
    :v-bind="$attrs"
    :highlight-current-row="highlightCurrentRow"
    :stripe="stripe"
    :data="data"
    :border="border"
  >
    <common-table-column
      v-for="(column, index) in calcColumns"
      :key="index"
      :column="column"
      :button-size="buttonSize"
    >
      <!--用于自定义显示属性-->
      <template
        #default="scope"
      >
        <slot
          v-if="column.slot"
          :scope="scope"
          :item="scope.row"
          :column-conf="scope.columnConf"
          :name="column.slot"
        />
      </template>
    </common-table-column>
  </el-table>
  <el-pagination
    v-if="page && page.totalCount"
    class="common-pagination"
    v-bind="pageAttrs"
    :total="page.totalCount"
    :page-size="page.pageSize"
    :current-page="page.pageIndex"
    @size-change="$emit('pageSizeChange', $event)"
    @current-change="$emit('currentPageChange', $event)"
  />
</template>

<style scoped>
.common-pagination {
  margin-top: 15px;
}
</style>
