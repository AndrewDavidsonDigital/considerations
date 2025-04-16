<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { resolveRouteName } from "./Navigation.ts"
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
import { routes } from '@/router'
import IconMenu from "./icons/IconMenu.vue";

const currentRoute = useRoute();

const isMenuOpen = ref<boolean>(false);

watch(isMenuOpen, (newVal) => {
  if (newVal){
    document.body.classList.add('overflow-clip');
  } else {
    document.body.classList.remove('overflow-clip');
  }
})

</script>

<template>
  <nav class="relative max-h-5 !mt-0 mb-2">
    <button 
      class="ml-auto mr-2 cursor-pointer w-fit flex gap-2 group"
      @click="() => (isMenuOpen = !isMenuOpen)"
    >
      <h2 class="text-lg duration-500 text-emerald-400 group-hover:text-orange-400">
        Navigation ({{ resolveRouteName(currentRoute.path) }})
      </h2>
      <IconMenu class="transition-colors duration-500 text-emerald-400 group-hover:stroke-orange-400" />
    </button>

    <aside 
      :class="[
        'bg-slate-500 md:bg-gradient-to-r from-slate-500 to-[--color-background] to-95',
        'absolute right-0 top-12',
        'text-xl md:text-base',
        'w-0 max-w-[400px]', 
        'glass z-menu ml-auto rounded-l-xl',
        'transition-all duration-500',
        'px-5',
        { 'w-full h-[80dvh] md:!h-auto md:!w-1/4' : isMenuOpen },
        { 'translate-x-8 opacity-0 !px-0' : !isMenuOpen },
      ]"
    >
      <section class="py-10 flex flex-col gap-y-2 overflow-hidden">
        <template
          v-for="(value, _index) in routes"
          :key="'routerKey_' + _index"
        >
          <RouterLink
            :to="value.path"
            class="truncate duration-500 hover:text-orange-400"
            :class="[
              { 'pointer-events-none cursor-default truncate !text-cyan-500' : value.path === currentRoute.path},
            ]"
            :title="value.title"
            @click="isMenuOpen = false"
          >
            {{ value.title }}
          </RouterLink>
        </template>
      </section>
    </aside> 
  </nav>
</template>
