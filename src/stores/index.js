import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

/**
 * 组合式api的$reset需要自己实现
 *
 * @param store
 */
const piniaPluginResetStore = ({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state)) // deep clone(store.$state)
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState))
  }
}

export default {
  install (app) {
    const pinia = createPinia()
    pinia.use(piniaPluginResetStore)
    pinia.use(createPersistedState({
      key: key => {
        const systemKey = import.meta.env.VITE_APP_SYSTEM_KEY
        return `__${systemKey}__${key}`
      }
    }))
    app.use(pinia)
    return pinia
  }
}
