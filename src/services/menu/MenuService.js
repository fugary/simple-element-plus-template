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

export const searchMenusResult = (queryParam, config) => {
  return $httpPost('/api/searchMenus', queryParam, config)
}

export const loadMenuResult = (id, config) => {
  return $httpGet(`/api/menus/${id}`, config)
}

/**
 * @return {[CommonFormOption]}
 */
export const useMenuFormOptions = () => {
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
    prop: 'parentId'
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
  return [{
    icon: 'LanguageFilled',
    isDropdown: true,
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
    iconIf: () => !globalConfigStore.isDarkTheme ? 'moon' : 'sunny',
    click: () => globalConfigStore.changeTheme(!globalConfigStore.isDarkTheme)
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
          click (router) {
            loginConfigStore.logout()
            router.push('/login')
          }
        }
      ]
    }
  ]
}
