import { ref } from 'vue'
import { $i18nBundle } from '@/messages'

const calcWithIf = menuItem => {
  ['icon', 'labelKey', 'label', 'html'].forEach(key => {
    const keyIf = menuItem[`${key}If`]
    if (keyIf) {
      menuItem[key] = keyIf(menuItem)
    }
  })
}

export const MENU_INFO_LIST = ref({})

export const useMenuInfo = path => {
  const menuInfo = MENU_INFO_LIST.value[path]
  console.info('================', MENU_INFO_LIST.value)
  return menuInfo
}

export const useMenuName = item => {
  const menuInfo = useMenuInfo(item.path)
  if (menuInfo) {
    if (menuInfo.label) {
      return menuInfo.label
    }
    if (menuInfo.labelKey) {
      return $i18nBundle(menuInfo.labelKey)
    }
  }
  if (item.meta && item.meta.labelKey) {
    return $i18nBundle(item.meta.labelKey)
  }
  return item.name || 'No Name'
}

export const filterMenus = menus => menus.filter(menu => !menu.disabled)
  .map(menu => {
    calcWithIf(menu)
    if (menu.index) { // 把菜单存储下来，后面需要使用名字
      MENU_INFO_LIST.value[menu.index] = menu
    }
    if (menu.children && menu.children.length) {
      menu.children = filterMenus(menu.children)
    }
    return menu
  })
