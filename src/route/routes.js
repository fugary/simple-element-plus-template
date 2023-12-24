import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminRoutes from '@/route/AdminRoutes'
import ToolsRoutes from '@/route/ToolsRoutes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [{
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
        name: 'notFound',
        component: () => import('@/views/404.vue')
      },
      ...AdminRoutes,
      ...ToolsRoutes
      ]
    }
  ]
})

export default router
