<!-- eslint-disable prettier/prettier -->
<script setup>
import { navRoutes } from "./Navigation.js"

</script>

<template>
  <nav class="flex flex-col pb-5 items-center justify-start">
    <template v-for="(value, index) in navRoutes" :key="'routerKey_' + index">
      <RouterLink :to="value.path">{{value.title}}</RouterLink>
    </template>
  </nav>
</template>
