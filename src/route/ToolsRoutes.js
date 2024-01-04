export default [{
  path: '/icons',
  name: 'icons',
  component: () => import('@/views/tools/Icons.vue')
}, {
  path: '/forms',
  name: 'forms',
  component: () => import('@/views/tools/Forms.vue')
}, {
  path: '/tests',
  name: 'tests',
  component: () => import('@/views/tools/TestPage.vue')
}, {
  path: '/tables',
  name: 'tables',
  children: [{
    path: '',
    name: 'tables-index',
    component: () => import('@/views/tools/Tables.vue')
  }, {
    path: 'edit/:id',
    name: 'tables-edit',
    component: () => import('@/views/tools/TableEdit.vue'),
    meta: {
      replaceTabHistory: 'tables-index',
      labelKey: 'common.label.edit',
      icon: 'Edit'
    }
  }]
}]
