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
  path: '/editors',
  name: 'Editors',
  component: () => import('@/views/tools/Editors.vue')
}, {
  path: '/charts',
  name: 'Charts',
  component: () => import('@/views/tools/Charts.vue')
}, {
  path: '/window-forms',
  name: 'WindowForms',
  component: () => import('@/views/tools/WindowForms.vue')
}]
