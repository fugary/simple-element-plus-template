import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import stores from '@/stores'
import icons from '@/icons'
import messages from '@/messages'
import commons from '@/components'

import App from '@/App.vue'
import router from '@/router'

import './assets/main.css'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(ElementPlus)
app.use(icons)
app.use(messages)
app.use(commons)

app.mount('#app')
