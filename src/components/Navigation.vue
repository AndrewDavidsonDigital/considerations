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
  <nav class="md:relative max-h-5 !mt-0 mb-2">
    <button 
      class="ml-auto mr-2 cursor-pointer w-fit flex gap-2 group"
      @click="() => (isMenuOpen = !isMenuOpen)"
    >
      <h2 class="text-lg duration-500 text-emerald-400 group-hover:text-orange-400">
        Navigation {{ currentRoute.path === '/' ? '' : '(' }} {{ resolveRouteName(currentRoute.path) }}{{ currentRoute.path === '/' ? '' : ')' }}
      </h2>
      <IconMenu class="transition-colors duration-500 text-emerald-400 group-hover:stroke-orange-400" />
    </button>

    <aside 
      class="
        bg-slate-500 md:bg-gradient-to-r from-slate-500 to-[--color-background] to-95
        absolute right-0 top-0 md:top-12
        text-xl md:text-base
        w-0 md:max-w-[400px] max-w-screen
        md:h-auto
        glass z-menu ml-auto rounded-l-xl
        transition-all duration-500
        pl-5 pr-2
      "
      :class="[
        { 'w-full h-[100dvh] md:!h-auto md:!w-1/4' : isMenuOpen },
        { 'translate-x-8 opacity-0 !px-0' : !isMenuOpen },
      ]"
    >
      <section class="md:py-10 overflow-y-scroll md:overflow-y-clip overflow-x-clip max-h-[100dvh] ">
        <div class="my-2 md:hidden">
          <button 
            class="mx-auto cursor-pointer w-fit flex gap-2 group"
            @click="() => (isMenuOpen = !isMenuOpen)"
          >
            <h2 class="text-xl duration-500 text-emerald-400 underline underline-offset-2">
              Collapse
            </h2>
          </button>
        </div>
        <template
          v-for="(value, _index) in routes"
          :key="'routerKey_' + _index"
        >
          <div class="mb-2">
            <RouterLink
              v-if="value.path !== '/'"
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
          </div>
        </template>
      </section>
    </aside> 
  </nav>
</template>
