import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * @typedef {Object} TabsViewStore
 * @property {boolean} isTabMode 是否开启tab模式
 * @property {boolean} isCachedTabMode 是否开启tab缓存
 * @property {boolean} isShowTabIcon 是否显示tab的图标
 * @property {[import('vue-router').RouteRecordRaw]} historyTabs 历史tab列表
 * @property {[string]} cachedTabs 缓存的tab列表
 * @method removeHistoryTab
 */
/**
 * @return {TabsViewStore}
 */
export const useTabsViewStore = defineStore('tabsView', () => {
  const isTabMode = ref(true)
  const isCachedTabMode = ref(true)
  const isShowTabIcon = ref(true)
  /**
   * @type {{value: [import('vue-router').RouteRecordRaw]}}
   */
  const historyTabs = ref([])
  /**
   * @type {{value: [string]}}
   */
  const cachedTabs = ref([])

  const clearHistoryTabs = () => {
    if (historyTabs.value.length) {
      const tab = historyTabs.value[0]
      removeOtherHistoryTabs(tab)
    }
  }

  const findHistoryTab = (path) => {
    const idx = historyTabs.value.findIndex(v => v.path === path)
    if (idx > -1) {
      return historyTabs.value[idx]
    }
  }

  const addHistoryTab = (tab, insertIdx) => {
    // 添加tab
    if (isTabMode.value) {
      const idx = historyTabs.value.findIndex(v => v.path === tab.path)
      if (idx < 0) {
        if (insertIdx !== undefined) {
          historyTabs.value.splice(insertIdx, 0, tab)
        } else {
          historyTabs.value.push(Object.assign({}, tab)) // 可能是Proxy，需要解析出来
        }
        if (isCachedTabMode.value && tab.name) {
          console.info('=======================add tab', tab.name)
          if (!cachedTabs.value.includes(tab.name)) {
            cachedTabs.value.push(tab.name)
          }
        }
      }
    }
  }
  const removeHistoryTab = tab => {
    if (historyTabs.value.length > 1) {
      const idx = historyTabs.value.findIndex(v => v.path === tab.path)
      if (idx > -1) {
        removeCachedTab(historyTabs.value[idx])
        // 删除tab
        historyTabs.value.splice(idx, 1)
      }
      return historyTabs.value[historyTabs.value.length - 1]
    }
  }

  const removeCachedTab = tab => {
    if (tab) {
      const idx = cachedTabs.value.findIndex(v => v === tab.name)
      if (idx > -1) {
        cachedTabs.value.splice(idx, 1)
      }
    }
  }

  const removeOtherHistoryTabs = tab => {
    historyTabs.value = [tab]
    cachedTabs.value = []
    if (isCachedTabMode.value && tab.name) {
      cachedTabs.value = [tab.name]
    }
  }

  return {
    isTabMode,
    isCachedTabMode,
    isShowTabIcon,
    historyTabs,
    cachedTabs,
    changeTabMode (val) {
      isTabMode.value = val
      if (!isTabMode.value) {
        clearHistoryTabs()
      }
    },
    changeCachedTabMode (val) {
      isCachedTabMode.value = val
      if (!isCachedTabMode.value) {
        cachedTabs.value = []
      }
    },
    removeHistoryTab,
    removeOtherHistoryTabs,
    clearHistoryTabs,
    findHistoryTab,
    addHistoryTab
  }
}, {
  persist: true
})
