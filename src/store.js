import { defineStore, createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { useGlobalConfigStore } from '@/stores/globalConfig'

export const usePinia = {
  install (app) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    app.use(pinia)
    return pinia
  }
}
export const useStore = defineStore('store', () => {
  return {
    globalConfig: useGlobalConfigStore()
  }
})
