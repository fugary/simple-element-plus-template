import { defineStore, createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useTabsViewStore } from '@/stores/TabsViewStore'

export const useStore = defineStore('store', () => {
  return {
    globalConfig: useGlobalConfigStore(),
    tabsView: useTabsViewStore()
  }
})

export default {
  install (app) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    app.use(pinia)
    return pinia
  }
}
