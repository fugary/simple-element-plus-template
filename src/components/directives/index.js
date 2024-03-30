import { CommonPopoverDirective, CommonTooltipDirective } from '@/components/directives/CommonTooltipDirective'
import { h, render } from 'vue'

export class DynamicHelper {
  constructor () {
    this.appDivId = 'app'
    this.context = DynamicHelper.app._context
    this.container = DynamicHelper.createContainer()
    this.destroy = DynamicHelper.getDestroyFunc(this.container)
  }

  static createContainer () {
    return document.createElement('div')
  }

  static getDestroyFunc (container) {
    return () => {
      if (container) {
        render(null, container)
      }
    }
  }

  createAndRender (...args) {
    const container = this.container
    const vnode = h(...args)
    vnode.appContext = this.context
    render(vnode, container)
    const appDiv = document.getElementById(this.appDivId)
    if (appDiv && container.firstElementChild) {
      appDiv.appendChild(container.firstElementChild)
    }
    return vnode
  }
}

export default {
  install (Vue) {
    DynamicHelper.app = Vue
    Vue.directive('common-tooltip', CommonTooltipDirective)
    Vue.directive('common-popover', CommonPopoverDirective)
  }
}
