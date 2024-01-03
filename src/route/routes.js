import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AdminRoutes from '@/route/AdminRoutes'
import ToolsRoutes from '@/route/ToolsRoutes'
import { checkRouteAuthority } from '@/authority'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
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
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        beforeLogin: true
      }
    }
  ]
})

router.beforeEach(checkRouteAuthority)

export default router
