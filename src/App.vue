<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import ForCorporateClientsLayout from '@/app/layouts/ForCorporateClientsLayout.vue'
import HomeLayout from '@/app/layouts/HomeLayout.vue'
import PromotionsLayout from '@/app/layouts/PromotionsLayout.vue'
import ServicesLayout from '@/app/layouts/ServicesLayout.vue'

import DefaultLayout from './app/layouts/DefaultLayout.vue'
import DoctorsLayout from './app/layouts/DoctorsLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
    HomeLayout,
    ForCorporateClientsLayout,
    ServicesLayout,
    PromotionsLayout,
    DoctorsLayout,
  },

  setup() {
    const route = useRoute()
    const layout = computed(() => (route.meta.layout || 'Default') + '-layout')

    onBeforeMount(() => {
      window.addEventListener('resize', () => setZoom())
      setZoom()
    })

    const setZoom = () => {
      // if (
      //   window.matchMedia('(min-width: 1280px) and (max-width: 1920px)').matches
      // ) {
      //   document.body.style.zoom = '80%'
      // } else {
      //   document.body.style.zoom = '100%'
      // }
    }

    return {
      layout,
    }
  },
})
</script>

<template>
  <div class="font-manrope text-base font-normal text-eerieBlack">
    <component :is="layout"></component>
  </div>
</template>

<style scoped></style>
