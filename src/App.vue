<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/app/layouts/DefaultLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
  },

  setup() {
    const route = useRoute()
    const layout = computed(() => (route.meta.layout || 'Default') + '-layout')

    return {
      layout,
    }
  },
})
</script>

<template>
  <div class="font-manrope text-base font-normal text-richBlack">
    <component :is="layout"></component>
  </div>
</template>

<style scoped></style>
