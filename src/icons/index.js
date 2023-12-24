import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as MaterialIconsVue from '@vicons/material'
export default {
  install (app) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(MaterialIconsVue)) {
      app.component(key, component)
    }
  }
}
