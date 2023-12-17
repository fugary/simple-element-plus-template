import { defineStore, createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { useGlobalConfigStore } from '@/stores/globalConfigStore'

export const useStore = defineStore('store', () => {
  return {
    globalConfig: useGlobalConfigStore()
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
