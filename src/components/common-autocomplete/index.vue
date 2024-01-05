<script setup>
/**
 * @typedef {Object} CommonAutocompleteOption 自动完成的配置信息
 * @property {[CommonTableColumn]} columns 表格显示列配置
 * @property {string} emptyMessage 没有数据的提示信息
 * @method searchMethod 搜索方法
 */
/**
 * @typedef {Object} CommonSelectPageOption 默认选择页面配置信息
 * @property {[{ id:string, label:string }]} tabs 显示tabs配置
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
 * @property {Number} colSize 显示几列
 * @property {string} loadingText 加载提示loading
 * @property {string} minHeight 高度自定义
 * @property {Object} inputAttrs 输入框配置项
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import { onClickOutside, onKeyStroke, useVModel } from '@vueuse/core'
import chunk from 'lodash/chunk'

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
    default: '500px'
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
  colSize: {
    type: Number,
    default: 4
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
  },
  loadingText: {
    type: String,
    default: ''
  },
  minHeight: {
    type: String,
    default: '100px'
  }
})

const emit = defineEmits(['update:modelValue', 'onSelectData', 'update:page', 'update:autocompleteLabel'])
// 关键字搜索
const keywords = ref(props.autocompleteLabel)
// 上次搜索记录
const lastAutocompleteLabel = ref(props.autocompleteLabel)
// 分页条
const pageAttrs = { layout: 'total, prev, pager, next', small: true, background: true }
const selectPageAttrs = { layout: 'prev, pager, next', small: true, background: true }
// 自动完成数据
const dataList = ref([])
// 选项表数据
const selectPageData = ref({})
const selectPageTab = ref(null)
const popoverVisible = ref(false)
const autocompletePopover = ref()
const pageConfig = useVModel(props, 'page', emit)
const loadingData = ref(false)

const showSelectPage = computed(() => {
  return props.selectPageConfig && (!keywords.value || lastAutocompleteLabel.value === keywords.value)
})

const loadAutoDataList = (val) => {
  if (val || props.emptySearchEnabled) {
    popoverVisible.value = true
    loadingData.value = true
    props.autocompleteConfig.searchMethod(val, (result) => {
      dataList.value = result.items || []
      if (props.page) {
        pageConfig.value = { ...result.page }
      }
      loadingData.value = false
    })
  }
}

const loadSelectData = () => {
  const tabId = selectPageTab.value || props.selectPageConfig?.tabs?.[0]?.id
  if (tabId && !selectPageData.value[tabId]) {
    selectPageTab.value = tabId
    loadingData.value = true
    props.selectPageConfig?.searchMethod(tabId, (result) => {
      selectPageData.value[tabId] = result
      loadingData.value = false
    })
  }
}

/**
 * @type {function(boolean?)}
 */
const onInputKeywords = debounce((input) => {
  if (!props.disabled && !props.readonly) {
    const val = keywords.value
    if (showSelectPage.value) {
      popoverVisible.value = true
      loadSelectData()
    } else {
      if (input && pageConfig.value) {
        pageConfig.value = { ...pageConfig.value, pageNumber: 1 }
      }
      loadAutoDataList(val)
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
      if (currentOnIndex.value > 0) {
        currentOnIndex.value--
      } else {
        currentOnIndex.value = dataList.value.length - 1
      }
    }
    currentOnRow.value = dataList.value[currentOnIndex.value]
  } else {
    currentOnIndex.value = -1
    currentOnRow.value = null
  }
  console.info('=================', tableRef.value.table, currentOnIndex.value, currentOnRow.value)
  tableRef.value.table?.setCurrentRow(currentOnRow.value)
}

// 向下按键移动元素
onKeyStroke('ArrowDown', e => moveSelection(true))
// 向上按键移动元素
onKeyStroke('ArrowUp', e => moveSelection(false))
// 选中回车
onKeyStroke('Enter', e => {
  onSelectData(currentOnRow.value)
})

//= ===============selectPage处理=================//
const selectPagePageConfig = ref({})
const parsedSelectPageData = computed(() => {
  const result = {}
  if (selectPageData.value) {
    Object.entries(selectPageData.value).forEach(([key, value]) => {
      const chunkPages = chunk(value, props.colSize)
      const pager = selectPagePageConfig.value[key] = selectPagePageConfig.value[key] || getSelectPage(chunkPages.length)
      result[key] = chunkPages.slice((pager.pageNumber - 1) * pager.pageSize, pager.pageNumber * pager.pageSize)
    })
  }
  return result
})

const getSelectPage = (totalCount) => {
  const pageSize = 5
  const pageCount = Math.ceil((totalCount + pageSize - 1) / pageSize)
  return {
    pageNumber: 1,
    pageSize,
    totalCount,
    pageCount
  }
}

const selectPagePagination = (tab) => {
  const pager = selectPagePageConfig.value?.[tab.id]
  return pager && pager.pageCount && pager.pageCount > 1
}

const selectPagePaginationChange = (tab, pageNumber) => {
  const pager = selectPagePageConfig.value?.[tab.id]
  pager.pageNumber = pageNumber
  console.info('==================selectPagePaginationChange', tab, pageNumber, pager)
  selectPageData.value = { ...selectPageData.value }
}

</script>

<template>
  <div>
    <el-popover
      ref="autocompletePopover"
      :visible="popoverVisible"
      popper-class="common-autocomplete"
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
        <div v-if="showSelectPage">
          <el-tabs
            v-model="selectPageTab"
            class="common-select-page"
            type="border-card"
            @tab-click="onInputKeywords(false)"
          >
            <el-tab-pane
              v-for="tab in selectPageConfig.tabs"
              :key="tab.id"
              :name="tab.id"
            >
              <template #label>
                <span>{{ tab.label }}</span>
              </template>
              <template #default>
                <div
                  v-loading="loadingData"
                  :element-loading-text="loadingText"
                  class="select-page-content"
                  :style="{minHeight}"
                >
                  <template
                    v-for="(rowData, index) in parsedSelectPageData[tab.id]"
                    :key="index"
                  >
                    <el-row>
                      <el-col
                        v-for="(colData, idx) in rowData"
                        :key="idx"
                        :span="24/colSize"
                      >
                        <el-button
                          plain
                          class="common-select-page-btn is-text"
                          @click="onSelectData(colData)"
                        >
                          {{ colData[labelKey] }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </template>
                  <el-pagination
                    v-if="selectPagePagination(tab)"
                    :style="{'justify-content':'center'}"
                    v-bind="selectPageAttrs"
                    :total="selectPagePageConfig[tab.id].totalCount"
                    :page-size="selectPagePageConfig[tab.id].pageSize"
                    :current-page="selectPagePageConfig[tab.id].pageNumber"
                    @current-change="selectPagePaginationChange(tab, $event)"
                  />
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!--自动完成内容-->
        <common-table
          v-else
          ref="tableRef"
          v-model:page="pageConfig"
          :loading="loadingData"
          :loading-text="loadingText"
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
