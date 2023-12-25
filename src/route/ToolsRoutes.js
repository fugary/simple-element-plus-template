export default [{
  path: '/icons',
  name: 'icons',
  component: () => import('@/views/tools/Icons.vue')
}, {
  path: '/forms',
  name: 'forms',
  component: () => import('@/views/tools/Forms.vue')
}, {
  path: '/tables',
  name: 'tables',
  component: () => import('@/views/tools/Tables.vue')
}]
