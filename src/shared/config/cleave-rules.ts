import { CleaveOptions } from 'cleave.js/options'

export const CleaveRules = {
  any: {},

  floatNumber: {
    numeral: true,
    numeralDecimalMark: '.',
    delimiter: ' ',
  } as CleaveOptions,
}
