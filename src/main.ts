import '@/shared/assets/styles/main.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { router } from '@/app/routes'

import App from './App.vue'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
