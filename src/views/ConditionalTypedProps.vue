<script setup lang="ts">
  import ConditionalComponent from '@/components/ConditionalComponent.vue';
  import img from '../assets/conidtional-props/example.png';
  import imgComponent from '../assets/conidtional-props/example-component.png';
import Highlight from '@/components/Highlight.vue';


</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      Sometimes you will have a component that takes props of 1 or 2 different / distinct prop-definitions.
    </p>
    <h2 class="text-xl">
      Example of expected behavior:
    </h2>
    <span class="indent-5">
      <img 
        :src="img"
        alt="example of the expected erroring on conditional props" 
      >
    </span>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      The solution here is to define the props as a union of valid types. The caveat here is that each type in the union MUST have every possible attribute and ensure that the ones in each specific.
    </p>
    <p class="indent-5">
      Another consideration is that as per 01-02-2025 (see: <a href="https://www.youtube.com/watch?v=vyD5pYOa5mY" target="_blank">https://www.youtube.com/watch?v=vyD5pYOa5mY</a>) it was considered that using the addition of an unused generic, see: <Highlight :content='`<script setup lang="ts" generic="UNUSED">`' /> was required for complete union independence; i.e: if you have 2 keys defined in both, then using key-a from union-a would NOT restrict key-b from being considered valid when pulling values from union-b. This does seem to be working without the generic added though as of 30-04-2025.
    </p>
    <h2 class="text-xl">
      Component Dif:
    </h2>
    <span class="indent-5">
      <img 
        :src="imgComponent"
        alt="example of the expected erroring on conditional props" 
      >
    </span>
  </section>
  <section class="flex flex-col gap-y-8 justify-start h-[150%] mt-20 w-full px-5">
    <div 
      class="
        flex flex-col gap-5
        max-w-[1000px] mx-auto
      "
    >
      <!-- Expect to be valid -->
      <ConditionalComponent content="I'm a string" />
      <ConditionalComponent colour="text-emerald-500" />

      <ConditionalComponent colour="text-emerald-700" content="baz" />
      <ConditionalComponent content="baz" colour="text-orange-700" />
    </div>
  </section>
</template>
