import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const currentLocale = ref('zh-CN')
  const isDarkTheme = useDark()
  const isCollapseLeft = ref(false)
  return {
    currentLocale,
    isDarkTheme,
    isCollapseLeft,
    changeLocale (locale) {
      currentLocale.value = locale
    },
    changeTheme (dark) {
      isDarkTheme.value = dark
    },
    collapseLeft () {
      isCollapseLeft.value = !isCollapseLeft.value
    }
  }
}, {
  persist: true
})
