import { defineAsyncComponent } from 'vue'

/**
 * 自定义通用组件自动注册
 */
export default {
  install (app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [filePath, componentFn] of Object.entries(components)) {
      const compName = filePath.split('/')[1]
      app.component(compName, defineAsyncComponent(componentFn))
    }
  }
}
