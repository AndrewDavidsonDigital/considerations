<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { ref } from 'vue'


// reactive state
let borderToggle = ref(true)

</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Problem: </h2>
    <p class="indent-5">Need to consider how we can get oddly styled border via images</p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">Need a solution for sausage styled </p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">TBD</p>
  </section>
  <section class="flex gap-x-2 text-black pb-5">
    <button
      class="px-2 bg-slate-400 rounded-md" 
      @click="(e) => borderToggle = !borderToggle">Change {{ borderToggle ? 'to Dashed' : 'to custom' }}</button>
  </section>
  <section>
    <div :class="[
      'h-10 w-40',
      {'border-[4px] border-solid border-sausage' : borderToggle},
      {'border-[4px] border-dashed border-red-600' : !borderToggle},
      'bg-slate-400',
    ]"></div>
  </section>
</template>

<style scoped scss>
  .border-sausage{
    --var-border-size: 3px;
    --var-border-slice: 1;
    border-image: url('../assets/bg.svg') var(--var-border-slice) / var(--var-border-size) / calc(var(--var-border-size) / 2) space;
  }
</style>

