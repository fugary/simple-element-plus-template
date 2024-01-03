import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadAndParseMenus, menu2CommonMenu, useBaseTopMenus } from '@/services/menu/MenuService'

export const useMenuConfigStore = defineStore('menuConfig', () => {
  /**
   * @type {[CommonMenuItem]}
   */
  const baseTopMenus = ref([])
  /**
   * @type {[MenuDto]}
   */
  const businessMenus = ref([])
  return {
    baseTopMenus,
    businessMenus,
    loadBaseTopMenus () {
      baseTopMenus.value = useBaseTopMenus()
    },
    async loadBusinessMenus () {
      businessMenus.value = await loadAndParseMenus()
      return this.calcBusinessMenus()
    },
    calcBusinessMenus () {
      return [{
        icon: 'HomeFilled',
        index: '/',
        labelKey: 'common.label.title'
      }, ...businessMenus.value.map(menu2CommonMenu)]
    },
    clearBusinessMenus () {
      businessMenus.value = []
    }
  }
}, {
  persist: true
})
