import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

export default {
  install (app) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    app.use(pinia)
    return pinia
  }
}
