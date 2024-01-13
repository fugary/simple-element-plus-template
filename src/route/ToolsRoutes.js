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
  name: 'TablesBase',
  children: [{
    path: '',
    name: 'Tables',
    component: () => import('@/views/tools/Tables.vue')
  }, {
    path: 'edit/:id',
    name: 'TableEdit',
    component: () => import('@/views/tools/TableEdit.vue'),
    meta: {
      replaceTabHistory: 'Tables',
      labelKey: 'common.label.edit',
      icon: 'Edit'
    }
  }]
}]
