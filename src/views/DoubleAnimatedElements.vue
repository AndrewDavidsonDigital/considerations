<script setup lang="ts">
import { ref } from 'vue';


const animated = ref(false);

</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      Need to work out how to have elements which are natively animated (i.e: icons), animated in a matrix to move between cells.
    </p>
    <h2 class="text-xl">
      Example of expected behavior:
    </h2>
    <p class="indent-5">
      TBD.
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      TBD.
    </p>
  </section>
  <section class="flex flex-col gap-y-8 justify-start h-[150%] mt-20 w-full px-5">
    <div 
      class="
        flex flex-col gap-5
        max-w-[1000px] mx-auto
      "
    >  
      <section class="flex flex-col gap-y-2 text-white pb-5">
        <button
          @click="animated = !animated"
        >
          Toggle Transition
        </button>
      </section>
      <section class="grid grid-cols-3 p-2 bg-slate-600">
        <template 
          v-for="index in 7"
          :key="`cell_${index}`"
        >
          <article
            class="aspect-square bg-red-500 size-[4rem] duration-500"
            :style="`filter: hue-rotate(${45*index}deg);`"
            :class="[
              // { 'animate-move-cell ' : animated && index === 6 },
              { 'translate-y-[4rem] ' : animated && index === 6 },
            ]"
          >
            <div 
              v-if="index === 6"
              class="size-fit mx-auto my-4 animate-spin animation-duration-3000"
            >
              MOVE
            </div>
            <div 
              v-else
              class="size-fit mx-auto my-4 animate-spin animation-duration-3000"
            >
              CELL
            </div>
          </article>
        </template>
      </section>
    </div>
  </section>
</template>
<style lang="css" scoped>

  /* * {
    --cell-delta: 4rem ;
    --tw-translate-x: var(--cell-delta);
    --tw-translate-y: var(--cell-delta);
  } */

  .animate-move-cell {
    animation: move-cell 3.5s linear infinite;
    translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
  }

  @keyframes move-cell {
    0%,100% {
      --tw-translate-y: var(--cell-delta);
    }
    10%, 90% {
      --tw-translate-y: var(--cell-delta);
    }
    /* 20%, 80% {
      opacity: 0.7;
    }
    30%, 70% {
      opacity: 0.7;
    } */
    40%, 60% {
      --tw-translate-x: var(--cell-delta);
      --tw-translate-y: var(--cell-delta);
    }
    50% {
      --tw-translate-x: var(--cell-delta);
      --tw-translate-y: var(--cell-delta);
    }
  }

</style>