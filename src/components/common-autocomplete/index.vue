<script setup>
/**
 * @typedef {Object} CommonAutocompleteOption 自动完成的配置信息
 * @property {[CommonTableColumn]} columns 表格显示列配置
 * @property {string} emptyMessage 没有数据的提示信息
 * @method searchMethod 搜索方法
 */
/**
 * @typedef {Object} CommonSelectPageOption 默认选择页配置
 */
/**
 * @typedef {Object} CommonAutocompleteProps
 * @property {CommonAutocompleteOption} autocompleteConfig 自动完成配置
 * @property {string} modelValue 输出数据
 * @property {boolean} useIdModel 输出对象还是id
 * @property {boolean} clearable 是否可以显示清空
 * @property {boolean} readonly 只读
 * @property {boolean} disabled 是否禁用
 * @property {boolean} emptySearchEnabled 没有关键字时是否点击就开始搜索
 * @property {string} title popover标题
 * @property {string} autocompleteLabel 自动完成label
 * @property {string} idKey id字段名
 * @property {string} labelKey label字段名
 * @property {number} debounceTime 防抖时间
 * @property {CommonPage} page 分页数据
 * @property {string} autocompleteWidth 宽度
 * @property {CommonSelectPageOption} selectPageConfig 分页
 * @property {Object} inputAttrs 输入框配置项
 */
import { nextTick, onMounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import { onClickOutside, onKeyStroke, useVModel } from '@vueuse/core'

/**
 * @type {CommonAutocompleteProps}
 */
const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: null
  },
  useIdModel: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  autocompleteLabel: {
    type: String,
    default: ''
  },
  idKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  debounceTime: { // 防抖
    type: Number,
    default: 300
  },
  autocompleteWidth: {
    type: String,
    default: '600px'
  },
  page: {
    type: Object,
    default: null
  },
  autocompleteConfig: {
    type: Object,
    required: true
  },
  selectPageConfig: {
    type: Object,
    default: null
  },
  clearable: {
    type: Boolean,
    default: true
  },
  inputAttrs: {
    type: Object,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  emptySearchEnabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'onSelectData', 'update:page', 'update:autocompleteLabel'])

const keywords = ref(props.autocompleteLabel)
const lastAutocompleteLabel = ref(props.autocompleteLabel)
const pageAttrs = { layout: 'total, prev, pager, next', small: true }
const dataList = ref([])
const popoverVisible = ref(false)
const autocompletePopover = ref()
const pageConfig = useVModel(props, 'page', emit)
/**
 * @type {function(boolean?)}
 */
const onInputKeywords = debounce((input) => {
  if (!props.disabled && !props.readonly) {
    if (input && pageConfig.value) {
      pageConfig.value = { ...pageConfig.value, pageNumber: 1 }
    }
    const val = keywords.value
    if (val || props.emptySearchEnabled) {
      popoverVisible.value = true
      props.autocompleteConfig.searchMethod(val, (result) => {
        dataList.value = result.items || []
        if (props.page) {
          pageConfig.value = { ...result.page }
        }
      })
    }
    if (!val && input) {
      onSelectData()
    }
  }
}, props.debounceTime)

onMounted(() => {
  onClickOutside(autocompletePopover.value?.popperRef?.contentRef, (event) => {
    popoverVisible.value = false
  })
})

watch(() => popoverVisible.value, (val) => {
  if (!val) {
    nextTick(() => {
      console.info('=======================', lastAutocompleteLabel.value, keywords.value)
      if (lastAutocompleteLabel.value && keywords.value && keywords.value !== lastAutocompleteLabel.value) {
        keywords.value = lastAutocompleteLabel.value
      }
    })
  }
})

//* ********************数据选择*********************

const vModel = useVModel(props, 'modelValue', emit)
const vAutocompleteLabel = useVModel(props, 'autocompleteLabel', emit)

const onSelectData = (row) => {
  popoverVisible.value = false
  if (!vModel.value && !row) {
    console.info('==================', row)
    return
  }
  let label = ''
  let value = null
  if (row) {
    label = row[props.labelKey]
    value = props.useIdModel ? row[props.idKey] : row
  }
  keywords.value = label
  vAutocompleteLabel.value = label
  lastAutocompleteLabel.value = label
  vModel.value = value
  emit('onSelectData', row)
}

// =======================按键处理===================
const tableRef = ref()
const currentOnRow = ref()
const currentOnIndex = ref(-1)

const moveSelection = function (down) {
  if (dataList.value.length > 0) {
    if (down) {
      if (currentOnIndex.value < dataList.value.length - 1) {
        currentOnIndex.value++
      } else {
        currentOnIndex.value = 0
      }
    } else {
      if (currentOnIndex.value > 1) {
        currentOnIndex.value--
      } else {
        currentOnIndex.value = 0
      }
    }
    currentOnRow.value = dataList.value[currentOnIndex.value]
  } else {
    currentOnRow.value = null
  }
  console.info('=================', tableRef.value.table, currentOnIndex.value, currentOnRow.value)
  tableRef.value.table?.setCurrentRow(currentOnRow.value)
}

// 向下按键移动元素
onKeyStroke('ArrowDown', e => moveSelection(true))
// 向上按键移动元素
onKeyStroke('ArrowUp', e => moveSelection(true))
// 选中回车
onKeyStroke('Enter', e => {
  onSelectData(currentOnRow.value)
})

</script>

<template>
  <div>
    <el-popover
      ref="autocompletePopover"
      transition="el-"
      :visible="popoverVisible"
      class="common-autocomplete"
      placement="bottom-start"
      :width="autocompleteWidth"
      :title="title"
    >
      <template #reference>
        <el-input
          v-model="keywords"
          :clearable="clearable"
          :placeholder="title"
          :disabled="disabled"
          :readonly="readonly"
          v-bind="inputAttrs"
          @input="onInputKeywords(true)"
          @click="onInputKeywords(false)"
        />
      </template>
      <template #default>
        <!--自动完成内容-->
        <common-table
          ref="tableRef"
          v-model:page="pageConfig"
          class="autocomplete-table"
          :columns="autocompleteConfig.columns"
          :empty-text="autocompleteConfig.emptyMessage"
          :data="dataList"
          :page-attrs="pageAttrs"
          @row-click="onSelectData($event)"
          @current-page-change="onInputKeywords(false)"
        >
          <template
            v-for="column in autocompleteConfig.columns"
            #[column.slot]="scope"
          >
            <slot
              v-if="column.slot"
              :item="scope.item"
              :column-conf="scope.columnConf"
              :name="column.slot"
            />
          </template>
        </common-table>
      </template>
    </el-popover>
  </div>
</template>

<style scoped>

</style>
