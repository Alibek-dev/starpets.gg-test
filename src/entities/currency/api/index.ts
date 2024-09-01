import axios from 'axios'

import { CurrencyRates } from '@/entities/currency/@types'

const API_URL = 'https://status.neuralgeneration.com/api/currency'

export const fetchCurrencyRates = async (): Promise<CurrencyRates> => {
  try {
    const response = await axios.get<CurrencyRates>(API_URL)

    return response.data
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    throw error
  }
}
