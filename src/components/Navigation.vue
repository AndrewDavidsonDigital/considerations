<!-- eslint-disable prettier/prettier -->
<script setup>
import { navRoutes, resolveRouteName } from "./Navigation.js"
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import IconMenu from "./icons/IconMenu.vue";

const currentRoute = useRoute();

const isMenuOpen = ref(false);

</script>

<template>
  <nav class="relative">
    <div 
      class="ml-auto mr-2 cursor-pointer w-fit flex gap-2 group"
      @click="isMenuOpen = !isMenuOpen">
      <h2 class="text-lg duration-500 text-emerald-400 group-hover:text-orange-400">Navigation ({{resolveRouteName(currentRoute.path)}})</h2>
      <IconMenu class="transition-colors duration-500 text-emerald-400 group-hover:stroke-orange-400"/>
    </div>

    <aside 
      :class="[
        'from-slate-500 bg-gradient-to-r to-[--color-background] to-95',
        'absolute right-0 top-12',
        'w-0 max-w-[400px]', 
        'glass z-menu ml-auto rounded-l-xl',
        'transition-all duration-500',
        { '!w-1/4' : isMenuOpen },
        { 'translate-x-8 opacity-0' : !isMenuOpen },
      ]"
    >
      <section class=" px-5 py-10 flex flex-col gap-y-2 overflow-hidden">
          <template v-for="(value, index) in navRoutes" :key="'routerKey_' + index">
            <RouterLink v-if="value.path !== currentRoute.path" :to="value.path" class="truncate duration-500 hover:text-orange-400" @click="isMenuOpen = false" :title="value.title">{{value.title}}</RouterLink>
            <RouterLink v-else :to="value.path" class="pointer-events-none cursor-default truncate duration-500 text-cyan-500" :title="value.title">{{value.title}}</RouterLink>
          </template>
      </section>
    </aside> 
  </nav>
</template>
