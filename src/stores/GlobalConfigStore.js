import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
import { changeMessages } from '@/messages'

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const currentLocale = ref(GlobalLocales.CN)
  const systemKey = import.meta.env.VITE_APP_SYSTEM_KEY
  const isDarkTheme = useDark({
    storageKey: `__${systemKey}__vueuse-color-scheme`
  })
  const isCollapseLeft = ref(false)
  const isShowSettings = ref(false)
  const isShowBreadcrumb = ref(true)
  const showMenuIcon = ref(true)
  const layoutMode = ref(GlobalLayoutMode.TOP)
  return {
    currentLocale,
    isDarkTheme,
    isCollapseLeft,
    isShowSettings,
    isShowBreadcrumb,
    layoutMode,
    showMenuIcon,
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
