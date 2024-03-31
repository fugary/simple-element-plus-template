const allMenus = [
  {
    id: 1,
    iconCls: 'setting',
    nameCn: '系统管理',
    nameEn: 'System'
  },
  {
    id: 11,
    parentId: 1,
    iconCls: 'user',
    nameCn: '用户管理',
    nameEn: 'Users',
    menuUrl: '/admin/users'
  },
  {
    id: 12,
    parentId: 1,
    iconCls: 'GroupOutlined',
    nameCn: '角色管理',
    nameEn: 'Roles',
    menuUrl: '/admin/roles'
  },
  {
    id: 13,
    parentId: 1,
    iconCls: 'lock',
    nameCn: '权限管理',
    nameEn: 'Authority',
    menuUrl: '/admin/authority'
  },
  {
    id: 14,
    parentId: 1,
    iconCls: 'GroupsOutlined',
    nameCn: '用户组管理',
    nameEn: 'Groups',
    menuUrl: '/admin/groups'
  },
  {
    id: 15,
    parentId: 1,
    iconCls: 'SupervisedUserCircleOutlined',
    nameCn: '租户管理',
    nameEn: 'Tenants',
    menuUrl: '/admin/tenants'
  },
  {
    id: 16,
    parentId: 1,
    iconCls: 'menu',
    nameCn: '菜单管理',
    nameEn: 'Menus',
    menuUrl: '/admin/menus'
  },
  {
    id: 2,
    iconCls: 'BuildFilled',
    nameCn: '常用工具',
    nameEn: 'Tools'
  },
  {
    id: 21,
    parentId: 2,
    iconCls: 'InsertEmoticonOutlined',
    nameCn: '图标管理',
    nameEn: 'Icons',
    menuUrl: '/icons'
  },
  {
    id: 22,
    parentId: 2,
    iconCls: 'TableRowsFilled',
    nameCn: '表单示例',
    nameEn: 'Forms',
    menuUrl: '/forms'
  },
  {
    id: 23,
    parentId: 2,
    iconCls: 'Grid',
    nameCn: '表格示例',
    nameEn: 'Tables',
    menuUrl: '/tables'
  },
  {
    id: 24,
    parentId: 2,
    iconCls: 'TipsAndUpdatesOutlined',
    nameCn: '其他示例',
    nameEn: 'Others',
    menuUrl: '/tests'
  },
  {
    id: 25,
    parentId: 2,
    iconCls: 'DynamicFormFilled',
    nameCn: '窗口表单示例',
    nameEn: 'Window Forms',
    menuUrl: '/window-forms'
  }
]

export default [{
  url: '/simple/api/menus',
  method: 'post',
  response: () => {
    return {
      success: true,
      message: 'Success',
      resultData: {
        menuList: allMenus
      }
    }
  }
}, {
  url: '/simple/api/searchMenus',
  method: 'post',
  response: request => {
    return {
      success: true,
      message: 'Success',
      resultData: function () {
        const menuList = allMenus
        let pageSize = 10
        let pageNumber = 1
        if (request.body.page) {
          pageSize = +request.body.page.pageSize || 10
          pageNumber = +request.body.page.pageNumber || 1
        }
        const total = menuList.length
        const pageCount = (total + pageSize - 1) / pageSize
        const result = {
          page: {
            pageSize: function () {
              return pageSize
            },
            pageNumber: function ({ request }) {
              if (request.body.page) {
                return request.body.page.pageNumber || 1
              }
              return 1
            },
            pageCount,
            totalCount: total
          }
        }
        result.menuList = menuList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        return result
      }
    }
  }
}, {
  url: '/simple/api/menus/:id',
  method: 'get',
  response: request => {
    return {
      success: true,
      message: 'Success',
      resultData: function () {
        return {
          menu: allMenus.filter(menu => menu.id === +request.query.id)[0]
        }
      }
    }
  }
}]
