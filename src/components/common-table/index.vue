<script setup>
import CommonTableColumn from '@/components/common-table/common-table-column.vue'
import { computed, ref } from 'vue'

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
  /**
   * @type {CommonPage}
   */
  page: {
    type: Object,
    default: null
  },
  pageAlign: {
    type: String,
    default: 'center'
  },
  pageAttrs: {
    type: Object,
    default () {
      return {
        layout: 'total, sizes, prev, pager, next',
        pageSizes: [10, 20, 50],
        background: true
      }
    }
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: ''
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
  return _columns.filter(column => column.enabled !== false)
})

const emit = defineEmits(['pageSizeChange', 'currentPageChange', 'update:page'])

const pageSizeChange = (pageSize) => {
  emit('update:page', { ...props.page, pageSize })
  emit('pageSizeChange', pageSize)
}
const currentPageChange = (pageNumber) => {
  emit('update:page', { ...props.page, pageNumber })
  emit('currentPageChange', pageNumber)
}

const table = ref()

defineExpose({
  table
})

</script>

<template>
  <el-container
    v-loading="loading"
    class="flex-column"
    :element-loading-text="loadingText"
  >
    <el-table
      ref="table"
      v-bind="$attrs"
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
            :row="scope.row"
            :column="scope.column"
            :item="scope.row"
            :column-conf="scope.columnConf"
            :name="column.slot"
          />
        </template>
      </common-table-column>
    </el-table>
    <el-pagination
      v-if="page&&page.pageCount"
      class="common-pagination"
      v-bind="pageAttrs"
      :total="page.totalCount"
      :page-size="page.pageSize"
      :current-page="page.pageNumber"
      @size-change="pageSizeChange($event)"
      @current-change="currentPageChange($event)"
    />
  </el-container>
</template>

<style scoped>
.common-pagination {
  margin-top: 15px;
  justify-content: v-bind(pageAlign);
}
</style>
