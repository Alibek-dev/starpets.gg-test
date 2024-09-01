import { defineStore } from 'pinia'
import { computed, ComputedRef, Ref, ref } from 'vue'

import { CurrencyNames, CurrencyRates } from '@/entities/currency/@types'
import { fetchCurrencyRates } from '@/entities/currency/api'

export const useCurrencyStore = defineStore('currency', () => {
  const currencyRates: Ref<CurrencyRates | null> = ref(null)

  const fetchCurrencies = async () => {
    currencyRates.value = await fetchCurrencyRates()
  }

  const getUniqueCurrencies: ComputedRef<string[]> = computed(() => {
    const currencies = new Set<string>()

    if (!currencyRates.value) return []

    Object.keys(currencyRates.value).forEach((rate) => {
      const [fromCurrency, toCurrency] = rate.split('-')

      currencies.add(fromCurrency.toUpperCase())
      currencies.add(toCurrency.toUpperCase())
    })

    return Array.from(currencies)
  })

  const getCurrencyItems: ComputedRef<{ name: string; value: string }[]> =
    computed(() =>
      getUniqueCurrencies.value.map((item) => {
        return {
          name: CurrencyNames[item as keyof typeof CurrencyNames],
          value: item,
        }
      }),
    )

  const selectedCurrency = ref('')

  const setSelectedCurrency = (value: string) => {
    selectedCurrency.value = value
  }

  const getRatesByBaseCurrency = computed(
    (): {
      targetCurrency: string
      rate: number
    }[] => {
      if (!currencyRates.value || !selectedCurrency.value) return []

      return Object.entries(currencyRates.value)
        .filter(([key]) => key.startsWith(selectedCurrency.value.toLowerCase()))
        .map(([key, rate]) => {
          const targetCurrency = key.split('-')[1].toUpperCase()

          return {
            targetCurrency,
            rate,
          }
        })
    },
  )

  return {
    currencyRates,
    getUniqueCurrencies,
    getCurrencyItems,
    selectedCurrency,
    fetchCurrencies,
    getRatesByBaseCurrency,
    setSelectedCurrency,
  }
})
