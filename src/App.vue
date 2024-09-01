<script lang="ts">
import loadingHook from '@shared/hooks/loadingHook'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import { useCurrencyStore } from '@/entities/currency/store/currency.store'

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
  },

  setup() {
    const route = useRoute()
    const layout = computed(() => (route.meta.layout || 'Default') + '-layout')

    const currencyStore = useCurrencyStore()
    const { isLoading, loadData } = loadingHook()

    onMounted(() => {
      loadData(async () => await currencyStore.fetchCurrencies())
    })

    return {
      layout,
      isLoading,
    }
  },
})
</script>

<template>
  <div class="font-manrope text-base font-normal text-richBlack">
    <component :is="layout" v-if="!isLoading"></component>
  </div>
</template>

<style scoped></style>
