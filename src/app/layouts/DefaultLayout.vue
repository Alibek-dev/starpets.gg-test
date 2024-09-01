<script setup lang="ts">
import DefaultHeader from '@/app/ui/DefaultHeader.vue'
</script>

<template>
  <div class="flex w-full justify-center px-40 py-6">
    <div
      class="border-eerieBlack flex w-full max-w-screen-lg rounded-2xl border p-6"
    >
      <DefaultHeader class="mb-6 w-full" />
      <router-view />
    </div>
  </div>
</template>

<style></style>
