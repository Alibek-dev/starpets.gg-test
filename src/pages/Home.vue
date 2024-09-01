<script setup lang="ts">
import { formatCurrencyUtils } from '@shared/utils/format-currency'

import { useCurrencyStore } from '@/entities/currency/store/currency.store'

const currencyStore = useCurrencyStore()
</script>

<template>
  <div class="flex flex-col rounded-2xl bg-lavenderLight pt-3">
    <div class="px-6 pb-2 text-lg">Отношения к основной валюте сайта</div>
    <div class="mb-3 h-px w-full bg-ceil"></div>

    <div class="flex flex-col">
      <div
        v-for="item of currencyStore.getRatesByBaseCurrency"
        :key="item.targetCurrency"
        class="flex items-center justify-between gap-2 px-6 py-2 first:rounded-t-2xl last:rounded-b-2xl odd:bg-blue-200 even:bg-blue-100"
      >
        <div>{{ formatCurrencyUtils(1, currencyStore.selectedCurrency) }}</div>
        <p class="flex items-center gap-2">
          <span>{{ formatCurrencyUtils(item.rate, item.targetCurrency) }}</span>
          <span>({{ item.targetCurrency }})</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
