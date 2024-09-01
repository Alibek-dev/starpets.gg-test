<script setup lang="ts">

import DefaultHeader from '@shared/ui/DefaultHeader.vue'
</script>

<template>
  <div
    class="flex h-[calc(100vh-10px)] max-h-screen flex-col justify-between px-6 pt-5 3xl:px-[156px]"
  >
    <div class="pb-6">
      <DefaultHeader class="mb-6" />
      <router-view />
    </div>
  </div>
</template>

<style></style>
