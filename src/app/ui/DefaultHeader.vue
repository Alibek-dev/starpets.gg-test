<script setup lang="ts">
import BngSelect from '@shared/ui/BngSelect.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useCurrencyStore } from '@/entities/currency/store/currency.store'

const routes = computed(() => [
  { name: 'Главная', routeName: 'home' },
  { name: 'Конвертация', routeName: 'convert' },
])

const route = useRoute()
const currencyStore = useCurrencyStore()

onMounted(() => {
  currencyStore.setSelectedCurrency(currencyStore.getUniqueCurrencies[0])
})

const currencies = computed(() => currencyStore.getCurrencyItems)
</script>

<template>
  <div class="flex items-center justify-between">
    <ul class="flex gap-12">
      <li
        v-for="routeItem of routes"
        :key="routeItem.routeName"
        class="cursor-pointer hover:underline"
        :class="[
          route.name === routeItem.routeName && 'text-brightNavyBlueSolid',
        ]"
      >
        <router-link :to="{ name: routeItem.routeName }">
          {{ routeItem.name }}
        </router-link>
      </li>
    </ul>

    <div class="w-4/12">
      <BngSelect
        :model-value="currencyStore.selectedCurrency"
        size="small"
        placeholder="Валюта"
        :items="currencies"
        item-value="value"
        item-text="name"
        @update:modelValue="
          (value: string) => currencyStore.setSelectedCurrency(value)
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
