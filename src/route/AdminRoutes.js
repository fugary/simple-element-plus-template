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
  component: () => import('@/views/admin/Menus.vue')
}]