<script setup lang="ts">
  import { CogIcon } from '@/assets/icons';
import Highlight from '@/components/Highlight.vue';
import { ref } from 'vue';

  const ANIMATION_STEP_LIMIT = 4;
  const ANIMATION_INTERVAL = 500;

  const animated = ref(false);
  const animatedStep = ref(0);
  const timerId = ref(-1);

  const cellSize = ref(4);

  function handleTransition(){
    animated.value = true
    if (timerId.value > 0){
      return;
    }
    timerId.value = setInterval(
      () => {
        timer();
      },
      ANIMATION_INTERVAL,
    ) as unknown as number;
  }

  function timer(){
    // do stuff
    animatedStep.value++;

    // if animatedStep.value++ >= ANIMATION_STEP_LIMIT then stop
    
    if (animatedStep.value >= ANIMATION_STEP_LIMIT){
      console.log(`clearing timer: ${timerId.value}`);
      clearInterval(timerId.value);
      timerId.value = -1;
      // console.log('restating loop');
      animatedStep.value = 0;
    }
  }

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
      The cells inner content should be able to animate, i.e. rotate, and then the cell itself move as defined by a custom move-set.
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      Inner elements have no issue being animated via keyframes, but given the nature of the parent cell, needing to do move pause move pause flow, 
      without using position absolute and manipulating both <Highlight content='top' />  /  <Highlight content='left' />, we are left with chain transitioning based on manual setting this as 
      <Highlight content='transition-translate' /> doesn't seem to work if we animated the transition variable.
    </p>
  </section>
  <section class="flex flex-col gap-y-8 justify-start h-[150%] mt-20 w-full px-5">
    <div 
      class="
        flex flex-col gap-5
        max-w-[1000px] mx-auto
      "
    >  
      <section class="flex flex-col gap-y-2 text-white pb-5 items-center">
        <button
          class="border rounded-xl border-emerald-600 size-fit px-2 py-1"
          @click="handleTransition"
        >
          Start Transition
        </button>
        <p class="flex flex-col text-emerald-600">
          {{ animatedStep !== 0 ? `Step [${animatedStep}/${ANIMATION_STEP_LIMIT}]` : `Not Running`}}
        </p>
        <input
          v-model="cellSize"
          type="range"
          min="3"
          max="9"
          aria-hidden
        />
        <p class="flex flex-col text-emerald-600 ">
          Size: {{ cellSize }} tw-entity
        </p>
      </section>
      <section 
        class="grid grid-cols-3 p-2 bg-slate-600 " 
        :style="`--cell-size:${cellSize}rem;`"
      >
        <template 
          v-for="index in 9"
          :key="`cell_${index}`"
        >
          <article
            class="aspect-square bg-red-500 size-[var(--cell-size)] duration-500 grid items-center justify-center"
            :style="`filter: hue-rotate(${45*index}deg);`"
            :class="[
              { 'opacity-0' : [2,4,8,9].includes(index) }, // hidden cells

              // transition flow-A
              { 'translate-x-[var(--cell-size)] ' : animated && index === 1 && animatedStep === 1},
              { 'translate-y-[var(--cell-size)] translate-x-[var(--cell-size)] ' : animated && index === 1 && animatedStep === 2},
              { 'translate-x-[var(--cell-size)] ' : animated && index === 1 && animatedStep === 3},

              // transition flow-B
              { 'translate-y-[var(--cell-size)] ' : animated && index === 3 && animatedStep === 1},
              { 'translate-y-[var(--cell-size)] ' : animated && index === 3 && animatedStep === 3},

              // transition flow-C
              { 'translate-x-[var(--cell-size)] ' : animated && index === 5 && animatedStep === 1},
              { '-translate-x-[var(--cell-size)] ' : animated && index === 5 && animatedStep === 2},

              // transition flow-D
              { 'translate-y-[var(--cell-size)] ' : animated && index === 6 && animatedStep === 1},
              { 'translate-y-[var(--cell-size)] -translate-x-[var(--cell-size)] ' : animated && index === 6 && animatedStep === 2},
              { 'translate-y-[var(--cell-size)] ' : animated && index === 6 && animatedStep === 3},

              // transition flow-E
              { '-translate-y-[var(--cell-size)] ' : animated && index === 7 && animatedStep === 1},
              { '-translate-y-[calc(var(--cell-size)*2)] ' : animated && index === 7 && animatedStep === 2},
              { '-translate-y-[var(--cell-size)] ' : animated && index === 7 && animatedStep === 3},

            ]"
          >
            <div 
              class="size-fit animate-spin animation-duration-3000"
              :class="[
                { 'animation-reverse' : index % 2 === 1 },
              ]"
            >
              <template v-if="[5,6,7].includes(index)">
                MOVE
              </template>
              <template v-else>
                <CogIcon
                  class="animate-spin scale-[calc(var(--cell-size-in-rem)/4)] duration-200"
                  :style="`--cell-size-in-rem:${cellSize};`"
                />
              </template>
            </div>
          </article>
        </template>
      </section>
    </div>
  </section>
</template>
<style lang="css" scoped>

  .animate-move-cell {
    --cell-delta: 4rem ;
    --tw-translate-x: var(0);
    --tw-translate-y: var(0);
    animation: move-cell 10s linear infinite;
    translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
    @apply transition-discrete;
  }

  @keyframes move-cell {
    0%,100% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-x: var(0);
      --tw-translate-y: var(0);
    }
    10%, 90% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-x: var(0);
      --tw-translate-y: var(0);
    }
    20%, 80% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-y: var(--cell-delta);
    }
    30%, 70% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-y: var(--cell-delta);
    }
    40%, 60% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-x: var(--cell-delta);
      --tw-translate-y: var(--cell-delta);
    }
    50% {
      translate: var(--tw-translate-x, 0) var(--tw-translate-y, 0);
      --tw-translate-x: var(--cell-delta);
      --tw-translate-y: var(--cell-delta);
    }
  }

</style>