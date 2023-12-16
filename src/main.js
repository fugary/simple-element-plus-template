import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { usePinia } from '@/store'

import messagesConfig from '@/languages/MessagesConfig'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(usePinia)
app.use(router)
app.use(ElementPlus)
app.use(messagesConfig)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
