import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      name: 'convert',
      path: '/convert',
      component: () => import('@/pages/Convert.vue'),
    },
  ],
})
