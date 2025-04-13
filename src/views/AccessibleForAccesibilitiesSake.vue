<script setup lang="ts">
  import { ref } from 'vue'
  import Highlight from '../components/Highlight.vue';
  import { ChevronIcon, LoopIcon } from '@/assets/icons';

  const activateChevron = ref<boolean>(false);
  const activateModal = ref<boolean>(false);



</script>

<template>
  <aside
    class="
      absolute top-10 right-10 w-0
      overflow-clip
      border-0 border-emerald-500 bg-emerald-500/30
      duration-700 transition-all
      z-[9999999]
    "
    :class="[
      {'!w-auto px-5 py-2 !border': activateModal }
    ]"
  >
    <ul class="[&>li]:!text-nowrap">
      <li>row-1</li>
      <li>row-2</li>
      <li>row-3</li>
      <li>row-4</li>
    </ul>
  </aside>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Issue: </h2>
    <p class="indent-5">Native <Highlight content="placeholders"/> for select tags don't play nice with assistive technologies thus shouldn't be used. This is obviously <Highlight content="less accessible"/>for those NOT using such technologies (~90%+) of the users</p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">If the native html placeholder attributes cant be used then we should be able to replicate this with some non-accessible (aria-hidden) content that is ephemeral to the user</p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">Placeholder content in itself should just be able to be a z-index'd higher element that has its opacity toggled based on a rule-set relative to the interaction of the underlying select element</p>
  </section>
  <section class="flex flex-col w-fit gap-y-8 justify-start h-[150%] mt-20">
    <section>
      <div 
        class="
          w-full flex duration-500 transition-all
          border border-l-0 rounded-r-lg
          [&>button]:py-2 [&>button]:px-2
          has-[>button+button:hover,>button+button:focus-visible]:border-green-500 
          has-[>button+button:hover,>button+button:focus-visible]:bg-emerald-400/30
          "
      >
        <button 
          class="w-fit aspect-square accessibility-overrides bg-neutral-900"
          @click="() => activateChevron = !activateChevron"
        >
          <ChevronIcon 
            class="rotate-180 duration-300 transition-all" 
            :class="{ '!rotate-360': activateChevron }"
          />
        </button>
        <button 
          class="w-full flex gap-2 accessibility-overrides"
          @click="() => activateModal= !activateModal"
        >
          <p class="text-lg ">ROW TITLE</p><LoopIcon class="inline"/>
        </button>
      </div>
      <article
        class="duration-300 transition-all h-0 overflow-clip"
        :class="[
          { '!block !opacity-100 !h-auto' : activateChevron },
        ]"
      >
        <p>
          Here there be dragons
        </p>
      </article>
    </section>
  </section>
</template>

<style lang="css" scoped>

  .accessibility-overrides  {
    &:hover, &:focus-within {
      @apply outline-none;
      color: blue;
    }
  }
</style>