<template>
  <div
    class="relative flex border-2 max-sm:px-2"
    :class="{
      'border-brightNavyBlueSolid': focused,
      'border-tuscanySolid': error,
      'border-antiFlashWhite bg-ghostWhite': !disabled && size !== 'large',
      'border-paleCornflowerBlueSolid backdrop-opacity-0': disabled,
      'h-[72px] rounded-xl': secondary && size === 'default',
      'h-[92px] rounded-3xl': !secondary && size === 'default',
      'h-[48px] rounded-3xl p-3': size === 'small',
      'h-[32px] border-none p-0': size === 'large',
      'px-6': size === 'default',
    }"
    @click="focusInput"
  >
    <div class="inline-block w-full cursor-text">
      <Transition name="slide-fade">
        <label
          v-if="(label && !error) || (label && disabled && size !== 'large')"
          for="bng-input"
          class="text-label"
          :class="{
            'text-ceil': disabled,
            'top-0': secondary || size === 'small' || size === 'large',
            'left-6 top-6': size === 'default',
          }"
        >
          {{ label }}
        </label>
        <label
          v-else-if="error && errorMessages.length"
          for="bng-input"
          class="text-label text-label--error"
          :class="{
            'top-2': secondary,
            'top-6': size !== 'large',
            '-top-4': size === 'large',
          }"
        >
          {{ errorMessages[0].$message }}
        </label>
      </Transition>

      <div
        class="flex items-center gap-2 pb-1"
        :class="{
          'top-6': !disabled && secondary && size === 'default',
          'top-11': !secondary && size !== 'large',
          'relative text-base': size !== 'large',
          'top-0 pb-2 text-2xl font-bold': size === 'large',
          'border-b-2 border-lavenderLight': focused,
          'border-b-2 border-tuscanySolid': error && size == 'large',
        }"
      >
        <slot name="prepend-inner">
          <bng-icon
            v-if="prependInnerIcon"
            :class="{
              'text-darkElectricBlue': disabled,
              'text-richBlack': !disabled,
            }"
          >
            <component :is="`bng-${prependInnerIcon}-icon`" />
          </bng-icon>
        </slot>
        <input
          ref="bng-input"
          :type="type"
          name="bng-input"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :maxlength="maxlength"
          class="customInput"
          :class="{
            'bg-ghostWhite text-richBlack ': !disabled,
            'bg-transparent': size === 'large',
            'text-ellipsis bg-transparent text-darkElectricBlue': disabled,
          }"
          :value="localValue"
          @input="onInput"
          @focus="focused = true"
          @blur="blur"
        />
      </div>
    </div>
    <bng-icon
      v-if="inputType === 'password'"
      class="text-gray-default cursor-pointer"
      @click="eyeOpen = !eyeOpen"
    >
      <component :is="eyeOpen ? 'bng-eye-open-icon' : 'bng-eye-close-icon'" />
    </bng-icon>
    <slot name="append-inner-icon">
      <bng-icon
        v-if="appendInnerIcon"
        class="ml-2"
        :class="{
          'text-darkElectricBlue': disabled,
          'mt-11': !secondary,
          'mt-6 text-darkElectricBlue': secondary,
        }"
        @click.stop="$emit('appendInnerIconClick')"
      >
        <component :is="`bng-${appendInnerIcon}-icon`" />
      </bng-icon>
    </slot>
  </div>
</template>

<script lang="ts">
import { InputTypes, MaskTypes } from '@shared/@types/input.types'
import { CleaveRules } from '@shared/config/cleave-rules'
import BngIcon from '@shared/ui/BngIcon.vue'
import Cleave from 'cleave.js'
import { CleaveOptions } from 'cleave.js/options'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BngTextField',
  components: { BngIcon },
  props: {
    modelValue: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: '',
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    maxlength: {
      type: [Number, String],
      default: 200,
    },

    maskType: {
      type: String as PropType<MaskTypes>,
      default: 'any',
    },

    customCleaveOptions: {
      type: Object,
      default: null,
    },

    label: {
      type: String,
      default: '',
    },

    prependInnerIcon: {
      type: String,
      default: '',
    },

    appendInnerIcon: {
      type: String,
      default: '',
    },

    inputType: {
      type: String as PropType<InputTypes>,
      default: 'text',
    },

    error: {
      type: Boolean,
      default: false,
    },

    errorMessages: {
      type: Array as PropType<any[]>,
      default: [],
    },

    blurFunc: {
      type: Function,
      default: () => {},
    },

    alwaysShowLabel: {
      type: Boolean,
      default: false,
    },

    secondary: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
    },

    dataMaskaReversed: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    focused: false,
    inputEl: {} as any,
    eyeOpen: true,
    localValue: '',

    cleave: null as Cleave | null,
  }),

  computed: {
    type(): string {
      if (this.inputType === InputTypes.password && this.eyeOpen) {
        return 'password'
      } else {
        return 'text'
      }
    },

    cleaveRule(): CleaveOptions {
      if (this.customCleaveOptions) {
        return this.customCleaveOptions
      } else {
        return CleaveRules[this.maskType] ?? CleaveRules[MaskTypes.any]
      }
    },
  },

  watch: {
    modelValue(newValue: string) {
      if (
        this.cleave &&
        (this.maskType !== MaskTypes.any || this.customCleaveOptions)
      ) {
        if (newValue === '') {
          this.localValue = ''
        } else {
          this.cleave.setRawValue(newValue)
          this.$nextTick(() => {
            this.localValue = this.cleave!.properties.result
          })
        }
      } else {
        this.localValue = newValue
      }
    },

    customCleaveOptions() {
      this.setCleaveAndValue()
    },

    maskType() {
      this.setCleaveAndValue()
    },
  },

  mounted() {
    this.inputEl = this.$refs['bng-input']
    this.setCleaveAndValue()
  },

  methods: {
    focusInput() {
      this.inputEl.focus()
    },

    onInput(e: any) {
      if (
        this.cleave &&
        (this.maskType !== MaskTypes.any || this.customCleaveOptions)
      ) {
        if (e.target.value === '') {
          this.cleave.properties.result = ''
          this.$emit('update:modelValue', '')
        } else {
          this.$emit('update:modelValue', this.cleave.getRawValue())
        }
      } else {
        this.$emit('update:modelValue', e.target.value)
      }
    },

    setCleaveAndValue() {
      if (this.customCleaveOptions) {
        this.cleave = new Cleave(
          this.inputEl as HTMLElement,
          this.customCleaveOptions,
        )
      } else {
        this.cleave = new Cleave(this.inputEl as HTMLElement, this.cleaveRule)
      }

      if (
        this.cleave &&
        (this.maskType !== MaskTypes.any || this.customCleaveOptions)
      ) {
        if (this.modelValue === '') {
          this.localValue = ''
        } else {
          this.cleave.setRawValue(this.modelValue)
          this.localValue = this.cleave.properties.result
        }
      } else {
        this.localValue = this.modelValue
      }
    },

    blur() {
      this.focused = false
      this.blurFunc()
    },
  },
})
</script>

<style scoped lang="scss">
.customInput {
  outline: none;
  box-shadow: none;
  @apply focus:shadow-none focus:ring-0 max-sm:text-sm w-full;
}
</style>
