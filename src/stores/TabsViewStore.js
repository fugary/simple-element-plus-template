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
  const currentTab = ref('')
  /**
   * @type {{value: [import('vue-router').RouteRecordRaw]}}
   */
  const historyTabs = ref([])
  /**
   * @type {{value: [string]}}
   */
  const cachedTabs = ref([])

  const clearAllTabs = () => {
    historyTabs.value = []
    cachedTabs.value = []
  }

  const clearHistoryTabs = () => {
    if (historyTabs.value.length) {
      let idx = historyTabs.value.findIndex(v => currentTab.value && v.path === currentTab.value)
      idx = idx > -1 ? idx : 0
      const tab = historyTabs.value[idx]
      removeOtherHistoryTabs(tab)
    }
  }

  const findHistoryTab = (path) => {
    const idx = historyTabs.value.findIndex(v => v.path === path)
    if (idx > -1) {
      return historyTabs.value[idx]
    }
  }

  const checkMataReplaceHistory = (historyTab, tab) => {
    // 如果meta中配置有replaceTabHistory，默认替换相关的tab
    return historyTab.meta && historyTab.meta.replaceTabHistory && historyTab.meta.replaceTabHistory === tab.name
  }

  const isSameReplaceHistory = (historyTab, tab) => {
    return historyTab.meta && historyTab.meta.replaceTabHistory && tab.meta && tab.meta.replaceTabHistory &&
        historyTab.meta.replaceTabHistory === tab.meta.replaceTabHistory
  }

  const addHistoryTab = (tab) => {
    // 添加tab
    if (isTabMode.value) {
      const idx = historyTabs.value.findIndex(v => v.path === tab.path)
      if (idx < 0) {
        const replaceIdx = historyTabs.value.findIndex(v => checkMataReplaceHistory(v, tab) ||
            checkMataReplaceHistory(tab, v) || isSameReplaceHistory(v, tab))
        if (replaceIdx > -1) {
          console.info(replaceIdx, historyTabs.value[replaceIdx])
          if (replaceIdx !== undefined) {
            historyTabs.value.splice(replaceIdx, 1, Object.assign({}, tab))
            return
          }
        }
        historyTabs.value.push(Object.assign({}, tab)) // 可能是Proxy，需要解析出来
        if (isCachedTabMode.value && tab.name) {
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

  const removeOtherHistoryTabs = tab => {
    historyTabs.value = [tab]
    cachedTabs.value = []
    if (isCachedTabMode.value && tab.name) {
      cachedTabs.value = [tab.name]
    }
  }

  const removeHistoryTabs = (tab, type) => {
    if (tab) {
      const idx = cachedTabs.value.findIndex(v => v === tab.name)
      let removeTabs = []
      if (type === 'right') {
        removeTabs = historyTabs.value.splice(idx + 1)
      } else if (type === 'left') {
        removeTabs = historyTabs.value.splice(0, idx)
      }
      if (removeTabs.length) {
        removeTabs.forEach(removeCachedTab)
      }
    }
  }
  const addCachedTab = (tab) => {
    if (isCachedTabMode.value && tab.name) {
      if (!cachedTabs.value.includes(tab.name)) {
        cachedTabs.value.push(tab.name)
      }
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

  const hasCloseDropdown = (tab, type) => {
    const idx = historyTabs.value.findIndex(v => v.path === tab.path)
    switch (type) {
      case 'close':
      case 'other':
        return historyTabs.value.length > 1
      case 'left':
        return idx !== 0
      case 'right':
        return idx !== historyTabs.value.length - 1
    }
  }

  return {
    isTabMode,
    isCachedTabMode,
    isShowTabIcon,
    currentTab,
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
    removeHistoryTabs,
    clearAllTabs,
    clearHistoryTabs,
    findHistoryTab,
    addHistoryTab,
    addCachedTab,
    removeCachedTab,
    hasCloseDropdown
  }
}, {
  persist: true
})
