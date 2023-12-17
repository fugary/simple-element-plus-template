import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { usePinia } from '@/stores'
import commons from '@/components'

import messagesConfig from '@/languages/MessagesConfig'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(usePinia)
app.use(router)
app.use(ElementPlus)
app.use(messagesConfig)
app.use(commons)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
