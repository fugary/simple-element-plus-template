export default [{
  path: '/icons',
  name: 'Icons',
  component: () => import('@/views/tools/Icons.vue')
}, {
  path: '/forms',
  name: 'Forms',
  component: () => import('@/views/tools/Forms.vue')
}, {
  path: '/tests',
  name: 'TestPage',
  component: () => import('@/views/tools/TestPage.vue')
}, {
  path: '/window-forms',
  name: 'WindowForms',
  component: () => import('@/views/tools/WindowForms.vue')
}]
