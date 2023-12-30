import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { ref } from 'vue'
import { $i18nBundle } from '@/messages'

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return ref([
    {
      iconIf: () => globalConfigStore.isCollapseLeft ? 'expand' : 'fold',
      click: globalConfigStore.collapseLeft
    },
    {
      isSplit: true,
      menuCls: 'flex-grow'
    },
    {
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
    },
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
          index: '/logout'
        }
      ]
    }
  ])
}

export const useBusinessMenus = () => {
  return ref([
    {
      icon: 'HomeFilled',
      index: '/',
      labelIf: () => $i18nBundle('common.label.title')
    },
    {
      icon: 'setting',
      labelKey: 'menu.label.systemManagement',
      children: [
        {
          index: '/admin/users',
          icon: 'user',
          labelKey: 'menu.label.userManagement'
        },
        {
          index: '/admin/roles',
          icon: 'GroupFilled',
          labelKey: 'menu.label.roleManagement'
        },
        {
          index: '/admin/authority',
          icon: 'lock',
          labelKey: 'menu.label.authorityManagement'
        },
        {
          index: '/admin/menus',
          icon: 'menu',
          labelKey: 'menu.label.menuManagement'
        }
      ]
    },
    {
      icon: 'BuildFilled',
      labelKey: 'menu.label.toolsManagement',
      children: [
        {
          index: '/not-found',
          icon: 'WarningFilled',
          labelKey: 'menu.label.errorPage404'
        },
        {
          index: '/icons',
          icon: 'InsertEmoticonOutlined',
          labelKey: 'menu.label.toolsIcons'
        },
        {
          index: '/forms',
          icon: 'TableRowsFilled',
          labelKey: 'menu.label.toolsForms'
        },
        {
          index: '/tables',
          icon: 'Grid',
          labelKey: 'menu.label.toolsTables'
        }
      ]
    }])
}
