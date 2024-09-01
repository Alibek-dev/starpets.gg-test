<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const routes = computed(() => [
  { name: 'Главная', routeName: 'home' },
  { name: 'Конвертация', routeName: 'convert' },
])

const route = useRoute()
</script>

<template>
  <div class="flex justify-between">
    <ul class="flex gap-6">
      <li
        v-for="routeItem of routes"
        :key="routeItem.routeName"
        class="cursor-pointer hover:underline"
        :class="[
          route.name === routeItem.routeName && 'text-brightNavyBlueSolid',
        ]"
      >
        <router-link :to="{ name: routeItem.routeName }">
          {{ routeItem.name }}
        </router-link>
      </li>
    </ul>

    <div>asdlkfjalskjdfkl</div>
  </div>
</template>

<style scoped></style>
