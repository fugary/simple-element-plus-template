import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminRoutes from '@/route/AdminRoutes'
import ToolsRoutes from '@/route/ToolsRoutes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        icon: 'HomeFilled',
        labelKey: 'common.label.index'
      },
      children: [{
        path: '',
        name: 'index',
        component: () => import('@/views/Index.vue'),
        meta: {
          icon: 'HomeFilled',
          labelKey: 'common.label.index'
        }
      }, {
        path: 'about',
        name: 'about',
        component: () => import('@/views/account/AboutView.vue')
      }, {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/account/PersonalInfo.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue'),
        meta: {
          icon: 'QuestionFilled',
          label: 'Not Found'
        }
      },
      ...AdminRoutes,
      ...ToolsRoutes
      ]
    }
  ]
})

export default router
