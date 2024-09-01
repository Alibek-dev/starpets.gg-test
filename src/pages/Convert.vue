<script setup lang="ts">
import { MaskTypes } from '@shared/@types/input.types'
import BngSelect from '@shared/ui/BngSelect.vue'
import BngTextField from '@shared/ui/BngTextField.vue'
import { computed, onMounted, ref, watch } from 'vue'

import { CurrencyNames, CurrencyRates } from '@/entities/currency/@types'
import { useCurrencyStore } from '@/entities/currency/store/currency.store'

const currencyStore = useCurrencyStore()

const firstFieldCurrency = ref()
const secondFieldCurrency = ref(currencyStore.getUniqueCurrencies[1])

const firstValue = ref('')
const secondValue = ref('')

onMounted(() => {
  firstFieldCurrency.value = currencyStore.selectedCurrency
})

const conversionRate = computed(() => {
  if (!currencyStore.currencyRates) return 0

  const firstCurrency = firstFieldCurrency.value.toLowerCase()
  const secondCurrency = secondFieldCurrency.value.toLowerCase()

  const directRate =
    currencyStore.currencyRates[
      `${firstCurrency}-${secondCurrency}` as keyof CurrencyRates
    ]
  const reverseRate =
    currencyStore.currencyRates[
      `${secondCurrency}-${firstCurrency}` as keyof CurrencyRates
    ]

  if (directRate) {
    return directRate
  } else if (reverseRate) {
    return 1 / reverseRate
  } else {
    return 0
  }
})

const inputFirstValue = (newValue: string) => {
  const value = parseFloat(newValue)

  if (!isNaN(value)) {
    secondValue.value = (value * conversionRate.value).toFixed(2)
  } else {
    secondValue.value = ''
  }
}

const inputSecondValue = (newValue: string) => {
  const value = parseFloat(newValue)

  if (!isNaN(value)) {
    firstValue.value = (value / conversionRate.value).toFixed(2)
  } else {
    firstValue.value = ''
  }
}

watch([firstFieldCurrency, secondFieldCurrency], () => {
  const value = parseFloat(firstValue.value)

  if (!isNaN(value)) {
    secondValue.value = (value * conversionRate.value).toFixed(2)
  } else {
    secondValue.value = ''
  }
})
</script>

<template>
  <div class="flex flex-col rounded-2xl border p-6 pt-3">
    <div class="px-6 pb-2 text-lg">Конвертер</div>
    <div class="mb-3 h-px w-full bg-ceil"></div>

    <div class="grid grid-cols-2 gap-x-16 gap-y-6">
      <BngSelect
        v-model="firstFieldCurrency"
        :items="currencyStore.getCurrencyItems"
        label="Первая валюта"
        item-value="value"
        item-text="name"
      />
      <BngSelect
        v-model="secondFieldCurrency"
        :items="currencyStore.getCurrencyItems"
        label="Вторая валюта"
        item-value="value"
        item-text="name"
      />
      <BngTextField
        v-model="firstValue"
        :label="CurrencyNames[firstFieldCurrency as keyof typeof CurrencyNames]"
        :mask-type="MaskTypes.floatNumber"
        @update:modelValue="inputFirstValue"
      />
      <BngTextField
        v-model="secondValue"
        :label="
          CurrencyNames[secondFieldCurrency as keyof typeof CurrencyNames]
        "
        :mask-type="MaskTypes.floatNumber"
        @update:modelValue="inputSecondValue"
      />
    </div>
  </div>
</template>

<style scoped></style>
