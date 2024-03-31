const BASE_PATH = '/admin'

export default [{
  path: `${BASE_PATH}/users`,
  name: 'UsersBase',
  children: [{
    path: '',
    name: 'Users',
    component: () => import('@/views/admin/Users.vue')
  }, {
    path: 'edit/:id',
    name: 'UserEdit',
    component: () => import('@/views/admin/UserEdit.vue'),
    meta: {
      replaceTabHistory: 'Users',
      labelKey: 'common.label.edit',
      icon: 'Edit'
    }
  }]
}, {
  path: `${BASE_PATH}/roles`,
  name: 'Roles',
  component: () => import('@/views/admin/Roles.vue')
}, {
  path: `${BASE_PATH}/authority`,
  name: 'Authority',
  component: () => import('@/views/admin/Authority.vue')
}, {
  path: `${BASE_PATH}/menus`,
  name: 'MenusBase',
  children: [{
    path: '',
    name: 'Menus',
    component: () => import('@/views/admin/Menus.vue')
  }, {
    path: 'edit/:id',
    name: 'MenuEdit',
    component: () => import('@/views/admin/MenuEdit.vue'),
    meta: {
      replaceTabHistory: 'Menus',
      labelKey: 'menu.label.menuEdit',
      icon: 'Edit'
    }
  }]
}]
