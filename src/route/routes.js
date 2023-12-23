import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
        component: () => import('@/views/AboutView.vue')
      }, {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/PersonalInfo.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/404.vue')
      }]
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
