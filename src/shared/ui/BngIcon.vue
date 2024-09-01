<script setup lang="ts">
  const { size, iconName, iconColor } = defineProps({
    size: {
      type: [Number, String],
      default: 24,
    },
    iconName: String,
    iconColor: {
      type: String,
      default: "currentColor",
    },
  })
</script>

<template>
  <svg
    class="select-none"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<style scoped>

</style>