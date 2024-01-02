import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBaseTopMenus, useBusinessMenus } from '@/services/global/GlobalService'

export const useMenuStore = defineStore('menu', () => {
  /**
   * @type {[CommonMenuItem]}
   */
  const baseTopMenus = ref([])
  /**
   * @type {[CommonMenuItem]}
   */
  const businessMenus = ref([])
  return {
    baseTopMenus,
    businessMenus,
    loadBaseTopMenus () {
      baseTopMenus.value = useBaseTopMenus()
      console.info('顶部数据', businessMenus.value)
    },
    async loadBusinessMenus () {
      businessMenus.value = await useBusinessMenus()
      console.info('菜单数据', businessMenus.value)
    }
  }
}, {
  persist: true
})
