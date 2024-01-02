import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
import { changeMessages } from '@/messages'

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const currentLocale = ref(GlobalLocales.CN)
  const isDarkTheme = useDark()
  const isCollapseLeft = ref(false)
  const isShowSettings = ref(false)
  const isShowBreadcrumb = ref(true)
  const layoutMode = ref(GlobalLayoutMode.LEFT)
  return {
    currentLocale,
    isDarkTheme,
    isCollapseLeft,
    isShowSettings,
    isShowBreadcrumb,
    layoutMode,
    changeLocale (locale) {
      if (Object.values(GlobalLocales).includes(locale)) {
        currentLocale.value = locale
      } else {
        throw new Error(`Locale ${locale} is not supported.`)
      }
      changeMessages(locale)
    },
    changeTheme (dark) {
      isDarkTheme.value = dark
    },
    changeShowSettings (val) {
      isShowSettings.value = val
    },
    collapseLeft () {
      isCollapseLeft.value = !isCollapseLeft.value
    },
    changeLayout (layout) {
      if (Object.values(GlobalLayoutMode).includes(layout)) {
        layoutMode.value = layout
      } else {
        throw new Error(`Layout ${layout} is not supported.`)
      }
    }
  }
}, {
  persist: true
})
