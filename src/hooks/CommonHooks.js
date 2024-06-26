import { ref, watch } from 'vue'
import { isFunction, isNumber } from 'lodash-es'
import { useGlobalSearchParamStore } from '@/stores/GlobalSearchParamStore'

/**
 * 通用搜索表格表单封装
 * @param {CommonTableAndSearchForm} param 参数
 * @return {CommonTableAndSearchResult} 返回数据
 */
export const useTableAndSearchForm = ({
  searchMethod,
  defaultParam = {},
  dataProcessor,
  pageProcessor,
  saveParam = true
}) => {
  const globalSearchParamStore = useGlobalSearchParamStore()
  const tableData = ref([])
  const loading = ref(false)
  const searchParam = ref(saveParam ? globalSearchParamStore.getCurrentParam(defaultParam) : defaultParam)
  const searchTableItems = async (pageNumber, newParams = {}) => {
    if (isNumber(pageNumber)) {
      searchParam.value?.pageSetting && (searchParam.value.pageSetting.pageNumber = pageNumber)
    }
    loading.value = true
    saveParam && globalSearchParamStore.saveCurrentParam(searchParam.value)
    const searchResult = await searchMethod({ ...searchParam.value, ...newParams })
      .finally(() => { loading.value = false })
    loading.value = false
    if (searchResult.success && searchResult.resultData) {
      const resultData = searchResult.resultData
      tableData.value = isFunction(dataProcessor) && dataProcessor?.(resultData, searchParam)
      pageProcessor = pageProcessor || ((resultData, searchParam) => {
        searchParam.value?.pageSetting && resultData.pageSetting && Object.assign(searchParam.value.pageSetting, resultData.pageSetting || {})
      })
      pageProcessor?.(resultData, searchParam)
    }
    return searchResult
  }
  return {
    tableData,
    loading,
    searchParam,
    searchMethod: searchTableItems
  }
}

export const useDateStr = (watchFn) => {
  const dateStr = ref(new Date().getTime())
  watchFn && watch(watchFn, (update) => {
    if (update) {
      dateStr.value = new Date().getTime()
    }
  })
  return { dateStr }
}

export const useGlobalSaveSearchParam = (defaultParam) => {
  const globalSearchParamStore = useGlobalSearchParamStore()
  const searchParam = ref(globalSearchParamStore.getCurrentParam(defaultParam))
  return {
    searchParam,
    /**
     * @param [path]
     */
    saveSearchParam: (path) => {
      globalSearchParamStore.saveCurrentParam(searchParam.value, path)
    }
  }
}
