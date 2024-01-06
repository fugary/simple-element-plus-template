const BASE_PATH = '/admin'

export default [{
  path: `${BASE_PATH}/users`,
  name: 'Users',
  component: () => import('@/views/admin/Users.vue')
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
  name: 'Menus',
  children: [{
    path: '',
    name: 'menus-index',
    component: () => import('@/views/admin/Menus.vue')
  }, {
    path: 'edit/:id',
    name: 'menus-edit',
    component: () => import('@/views/admin/MenuEdit.vue'),
    meta: {
      replaceTabHistory: 'menus-index',
      labelKey: 'menu.label.menuEdit',
      icon: 'Edit'
    }
  }]
}]
