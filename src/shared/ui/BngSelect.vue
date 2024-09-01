<template>
  <div class="relative w-full">
    <Listbox
      v-slot="{ open }"
      v-model="selectedValue"
      :disabled="disabled"
      class="relative w-full"
    >
      <div>
        <transition name="slide-fade">
          <label
            v-if="(label && !error) || (label && disabled && !error) || open"
            for="iz-input"
            class="text-label absolute left-6 top-6"
            :class="{ 'text-gray-400': disabled }"
          >
            {{ label }}
          </label>
          <label
            v-else-if="error && errorMessages.length"
            for="iz-input"
            class="text-label text-label--error left-6 top-6"
          >
            {{ errorMessages[0].$message }}
          </label>
        </transition>
        <ListboxButton
          class="flex w-full cursor-pointer flex-col items-start rounded-3xl border-2 border-antiFlashWhite bg-ghostWhite text-start font-sans"
          :class="{
            'rounded-b-none': open,
            'border-tuscanySolid': error,
            'border-brightNavyBlueSolid': focused || open,
            'min-h-[92px]': size === 'default',
            'h-[48px]': size === 'small',
            'border-paleCornflowerBlueSolid bg-transparent': disabled,
          }"
          @focus="focused = true"
        >
          <div
            class="flex w-full justify-between"
            :class="{
              'pl-5': !disabled && size === 'default',
              'mt-11 px-6': size === 'default',
              'mt-3 px-3': size === 'small',
            }"
          >
            <div class="flex max-w-full gap-2">
              <bng-icon
                v-if="!disabled"
                class="text-dark"
                :class="{
                  'text-darkElectricBlue': disabled,
                  'text-richBlack': selectedValue,
                }"
              >
                <bng-angle-down-icon />
              </bng-icon>
              <div
                class="truncate whitespace-nowrap text-base max-md:text-sm"
                :class="{
                  'text-ceil': !selectedValue,
                  'text-richBlack': !disabled && selectedValue,
                }"
              >
                {{ buttonPlaceholder }}
              </div>
            </div>

            <bng-icon v-if="clear && selectedValue" @click.stop="onClear">
              <bng-close-icon />
            </bng-icon>
          </div>
        </ListboxButton>
        <ListboxOptions
          class="absolute z-50 max-h-[350px] w-full overflow-y-auto rounded-b-xl border-2 border-t-0 border-brightNavyBlueSolid bg-cultured"
        >
          <slot name="items" :items="items">
            <ListboxOption
              v-for="(item, key) of items"
              :key="key"
              :value="itemValue && item ? item[itemValue] : item"
              as="template"
              class="rounded-xl"
              @click.stop
            >
              <li
                class="cursor-pointer px-6 pb-3 font-sans text-base text-richBlack hover:bg-gray-200"
              >
                <hr size="1" class="pt-3" />
                <span>{{ itemText && item ? item[itemText] : item }}</span>
              </li>
            </ListboxOption>
          </slot>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>

<script lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import BngAngleDownIcon from '@shared/assets/icons/BngAngleDownIcon.vue'
import BngCloseIcon from '@shared/assets/icons/BngCloseIcon.vue'
import BngIcon from '@shared/ui/BngIcon.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BngSelect',
  components: {
    BngCloseIcon,
    ListboxLabel,
    BngIcon,
    ListboxOption,
    ListboxOptions,
    BngAngleDownIcon,
    ListboxButton,
    Listbox,
  },

  props: {
    placeholder: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    items: {
      type: Array as PropType<any>,
      default: [],
    },

    itemText: {
      type: String,
      default: '',
    },

    itemValue: {
      type: String,
      default: '',
    },

    modelValue: {
      type: [String, Number, null, Object] as PropType<any>,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
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

    clear: {
      type: Boolean,
      default: false,
    },

    returnObject: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<'default' | 'small'>,
      default: 'default',
    },
  },

  data: () => ({
    focused: false,
  }),

  computed: {
    selectedValue: {
      get: function (): any {
        if (this.returnObject) {
          return this.modelValue
        } else {
          return this.items.find((item: any) => {
            if (item[this.itemValue] === this.modelValue) return item
          })
        }
      },

      set: function (value: any) {
        if (this.returnObject) {
          this.$emit(
            'update:modelValue',
            this.items.find((item: any) => item[this.itemValue] === value) ??
              null,
          )
        } else {
          this.$emit('update:modelValue', value)
        }
      },
    },

    buttonPlaceholder() {
      if (this.selectedValue) {
        return this.itemText
          ? this.selectedValue[this.itemText]
          : this.selectedValue
      } else {
        return this.placeholder
      }
    },
  },

  methods: {
    onClear() {
      this.selectedValue = null
    },
  },
})
</script>

<style lang="scss" scoped></style>
