import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTabsViewStore = defineStore('tabsView', () => {
  const isTabMode = ref(true)
  const isCachedTabMode = ref(true)
  const isShowTabIcon = ref(true)
  const historyTabs = ref([])
  const cachedTabs = ref([])

  const clearHistoryTabs = () => {
    if (historyTabs.value.length) {
      const tab = historyTabs.value[0]
      historyTabs.value = [tab]
      cachedTabs.value = []
      if (isCachedTabMode.value && tab.name) {
        cachedTabs.value = [tab.name]
      }
    }
  }

  const findHistoryTab = (path) => {
    const idx = historyTabs.value.findIndex(v => v.path === path)
    if (idx > -1) {
      return historyTabs.value[idx]
    }
  }

  const addHistoryTab = tab => {
    // 添加tab
    if (isTabMode.value) {
      const idx = historyTabs.value.findIndex(v => v.path === tab.path)
      if (idx < 0) {
        historyTabs.value.push(Object.assign({}, tab)) // 可能是Proxy，需要解析出来
        if (isCachedTabMode.value && tab.name) {
          cachedTabs.value.push(tab.name)
        }
      }
    }
  }
  const removeHistoryTab = path => {
    if (historyTabs.value.length > 1) {
      const idx = historyTabs.value.findIndex(v => v.path === path)
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

  return {
    isTabMode,
    isCachedTabMode,
    isShowTabIcon,
    historyTabs,
    cachedTabs,
    changeTabMode () {
      isTabMode.value = !isTabMode.value
      if (!isTabMode.value) {
        clearHistoryTabs()
      }
    },
    changeCachedTabMode () {
      isCachedTabMode.value = !isCachedTabMode.value
      if (!isCachedTabMode.value) {
        cachedTabs.value = []
      }
    },
    changeShowTabIcon () {
      isShowTabIcon.value = !isShowTabIcon.value
    },
    removeHistoryTab,
    clearHistoryTabs,
    findHistoryTab,
    addHistoryTab
  }
}, {
  persist: true
})
