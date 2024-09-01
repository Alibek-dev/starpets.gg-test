<script setup lang="ts">
import DefaultHeader from '@shared/ui/DefaultHeader.vue'
</script>

<template>
  <div class="flex w-full justify-center px-40 py-6">
    <div
      class="flex w-full max-w-screen-md rounded-2xl border border-eerieBlack p-6"
    >
      <DefaultHeader class="mb-6 w-full" />
      <router-view />
    </div>
  </div>
</template>

<style></style>
