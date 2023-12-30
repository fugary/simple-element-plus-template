import CommonIcon from '@/components/common-icon/index.vue'
import CommonFormControl from '@/components/common-form-control/index.vue'
import CommonMenu from '@/components/common-menu/index.vue'
import CommonMenuItem from '@/components/common-menu-item/index.vue'
import CommonTabsView from '@/components/common-tabs-view/index.vue'

/**
 * 自定义通用组件自动注册
 */
export default {
  /**
   * @param Vue {import('vue').App} IDE（IDEA）插件似乎不能正常提示vue3组件注册，参数名写成Vue才能提示
   */
  install (Vue) {
    Vue.component('CommonIcon', CommonIcon)
    Vue.component('CommonFormControl', CommonFormControl)
    Vue.component('CommonMenu', CommonMenu)
    Vue.component('CommonMenuItem', CommonMenuItem)
    Vue.component('CommonTabsView', CommonTabsView)
  }
}
