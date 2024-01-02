import { $i18nBundle } from '@/messages'

/**
 * 测试假数据
 * @returns {Promise<unknown>}
 */
export const loadBusinessMenus = () => {
  // 模拟加载业务数据
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
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
            },
            {
              index: '/tests',
              icon: 'TipsAndUpdatesOutlined',
              labelKey: 'menu.label.toolsTests'
            }
          ]
        }])
    })
  })
}
