import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const currentLocale = ref('zh-CN')
  const changeLocale = function (locale) {
    currentLocale.value = locale
  }
  return { currentLocale, changeLocale }
}, {
  persist: true
})
