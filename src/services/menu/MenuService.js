/**
 * @typedef {Object} MenuDto
 * @property {number} id 主键
 * @property {number} parentId 上级id
 * @property {string} iconCls 图标
 * @property {string} nameCn 中文名
 * @property {string} nameEn 英文名
 * @property {string} menuUrl 链接地址
 * @property {[MenuDto]} children 子菜单
 */

import { $httpGet, $httpPost } from '@/vendors/axios'
import { $i18nMsg } from '@/messages'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { GlobalLocales } from '@/consts/GlobalConstants'
import { useLoginConfigStore } from '@/stores/LoginConfigStore'
import { I18N_ENABLED, THEME_ENABLED } from '@/config'
import { $logout } from '@/utils'
import { nextTick } from 'vue'

export const searchMenusResult = (queryParam, config) => {
  return $httpPost('/api/searchMenus', queryParam, config)
}

export const loadMenuResult = (id, config) => {
  return $httpGet(`/api/menus/${id}`, config)
}

/**
 * @param menus {MenuDto[]}
 * @return {[CommonFormOption]}
 */
export const useMenuFormOptions = (menus) => {
  /**
   * @type {CommonTreeNode[]}
   */
  const treeData = menus ? menus.map(menu2TreeMenu) : []
  const defaultExpandedKeys = treeData.map(node => node.value)
  return [{
    labelKey: 'menu.label.menuNameCn',
    prop: 'nameCn',
    required: true
  }, {
    labelKey: 'menu.label.menuNameEn',
    prop: 'nameEn',
    required: true
  }, {
    labelKey: 'menu.label.menuParent',
    prop: 'parentId',
    type: 'tree-select',
    attrs: {
      checkStrictly: true,
      defaultExpandedKeys,
      data: treeData
    }
  }, {
    labelKey: 'menu.label.menuIcon',
    prop: 'iconCls',
    type: 'common-icon-select'
  }, {
    labelKey: 'menu.label.menuUrl',
    prop: 'menuUrl'
  }]
}

/**
 * @param menu {MenuDto}
 * @return {CommonTreeNode}
 */
export const menu2TreeMenu = (menu) => {
  /**
   * @type {CommonTreeNode}
   */
  const treeNode = {
    value: menu.id,
    label: $i18nMsg(menu.nameCn, menu.nameEn)
  }
  if (menu.children) {
    treeNode.children = menu.children.map(menu2TreeMenu)
  }
  return treeNode
}

/**
 * 接口菜单格式转换成页面展示格式
 * @param menu {MenuDto}
 * @return {CommonMenuItem}
 */
export const menu2CommonMenu = (menu) => {
  /**
   * @type {CommonMenuItem}
   */
  const menuItem = {
    icon: menu.iconCls,
    label: $i18nMsg(menu.nameCn, menu.nameEn),
    index: menu.menuUrl
  }
  if (menu.children) {
    menuItem.children = menu.children.map(menu2CommonMenu)
  }
  return menuItem
}

export const loadAndParseMenus = async (param, config) => {
  /**
   * @type {[MenuDto]}
   */
  const menus = await $httpPost('/api/menus', param, config).then(data => data.resultData?.menuList || [])
  return processMenus(menus)
}
/**
 * 解析菜单信息
 * @param {[MenuDto]} menus
 * @param {MenuDto} parent
 * @returns {*[]}
 */
const processMenus = (menus, parent = undefined) => {
  const results = []
  menus.forEach(currentMenu => {
    if (!parent) {
      if (!currentMenu.parentId) { // 根节点
        results.push(currentMenu)
        processMenus(menus, currentMenu)
      }
    } else {
      if (currentMenu.parentId === parent.id) {
        parent.children = parent.children || []
        parent.children.push(currentMenu)
        processMenus(menus, currentMenu)
      }
    }
    return parent
  })
  return results
}

export const useThemeAndLocaleMenus = () => {
  const globalConfigStore = useGlobalConfigStore()

  const toggleTheme = (event) => {
    // Attempt to get coordinates from the event or global event
    // Element Plus el-menu-item emits a custom object, not a MouseEvent, so event.clientX might be missing.
    const mouseEvent = event && typeof event.clientX === 'number' ? event : window.event
    const x = mouseEvent?.clientX ?? window.innerWidth / 2
    const y = mouseEvent?.clientY ?? window.innerHeight / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // Fallback for browsers without View Transition API
    if (!document.startViewTransition) {
      globalConfigStore.changeTheme(!globalConfigStore.isDarkTheme)
      return
    }

    // Disable transitions to prevent "fading" snapshot
    const css = document.createElement('style')
    css.appendChild(document.createTextNode(`* {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      -ms-transition: none !important;
      transition: none !important;
    }`))
    document.head.appendChild(css)

    const transition = document.startViewTransition(async () => {
      globalConfigStore.changeTheme(!globalConfigStore.isDarkTheme)
      await nextTick()
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: globalConfigStore.isDarkTheme ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 400,
          easing: 'ease-in',
          fill: 'forwards',
          pseudoElement: globalConfigStore.isDarkTheme
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )
    })

    // Clean up the transition disable style after the animation finishes
    transition.finished.then(() => {
      document.head.removeChild(css)
    })
  }

  return [{
    icon: 'LanguageFilled',
    isDropdown: true,
    enabled: I18N_ENABLED,
    children: [
      {
        iconIf: () => GlobalLocales.CN === globalConfigStore.currentLocale ? 'check' : '',
        labelKey: 'common.label.langCn',
        click: () => globalConfigStore.changeLocale(GlobalLocales.CN)
      },
      {
        iconIf: () => GlobalLocales.EN === globalConfigStore.currentLocale ? 'check' : '',
        labelKey: 'common.label.langEn',
        click: () => globalConfigStore.changeLocale(GlobalLocales.EN)
      }
    ]
  },
  {
    isDropdown: true,
    enabled: THEME_ENABLED,
    iconIf: () => !globalConfigStore.isDarkTheme ? 'moon' : 'sunny',
    click: (event) => toggleTheme(event)
  }]
}

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  const loginConfigStore = useLoginConfigStore()
  return [
    {
      iconIf: () => globalConfigStore.isCollapseLeft ? 'expand' : 'fold',
      click: globalConfigStore.collapseLeft
    },
    {
      isSplit: true,
      menuCls: 'flex-grow'
    },
    ...useThemeAndLocaleMenus(),
    {
      isDropdown: true,
      icon: 'Setting',
      click: () => globalConfigStore.changeShowSettings(true)
    },
    {
      icon: 'user',
      isDropdown: true,
      label: loginConfigStore.accountInfo ? $i18nMsg(loginConfigStore.accountInfo.userNameCN, loginConfigStore.accountInfo.userNameEN) : '',
      children: [
        {
          labelKey: 'common.label.personalInfo',
          index: '/personal'
        },
        {
          labelKey: 'common.label.about',
          index: '/about'
        },
        {
          labelKey: 'common.label.logout',
          click () {
            $logout()
          }
        }
      ]
    }
  ]
}
