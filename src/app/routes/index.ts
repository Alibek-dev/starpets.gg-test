import { createRouter, createWebHistory } from 'vue-router'

import { RouteCodeNames } from '@/app/routes/@types'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RouteCodeNames.HOME,
      path: '/',
      meta: { layout: 'home' },
      component: () => import('@/pages/home/HomeMainPage.vue'),
    },
    ]
})
