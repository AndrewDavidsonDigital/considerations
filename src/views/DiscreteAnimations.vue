<script setup lang="ts">
import { ref } from 'vue';
import Highlight from '../components/Highlight.vue';

// reactive state
let modalRef = ref<HTMLDialogElement>()

const toggleDialog = (toOpen = false) => {
  if (modalRef.value){
    if (toOpen){
      modalRef.value.showModal();
    } else {
      modalRef.value.close();
    }
  }
}

</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      How can we transition an element to removal (like a modal or tool-tip) from dom without shrinking nor off-screening nor negative z-indexing (lowering z-index bellow that of the body / main)
    </p>
    <h2 class="text-xl">
      Details:
    </h2>
    <p class="indent-5">
      Should be able to achieve this with new discrete transitions allowing us to transition to <Highlight content="display: none" />
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      Discrete animations need to define 3-points for a 2-phase transition.
    </p>
    <ul>
      <ol class="list-disc list-inside list-item">
        Init Clearly defined <Highlight content="@starting-style{}" />
      </ol>
      <ol class="list-disc list-inside list-item">
        Default state <Highlight content="display: none" /> or  <Highlight content="hidden" />
      </ol>
      <ol class="list-disc list-inside list-item">
        Final state <Highlight content="display: block" /> or  <Highlight content="block" />
      </ol>
    </ul>
    <hr class="my-2">
    <p>Additionaly we need to pro-activly enbale transition support for discrete animation-types <Highlight content="transition-behavior: allow-discrete;" /> or <Highlight content="[transition-behavior:_allow-discrete]" /></p>
  </section>
  <section class="flex gap-x-8">
    <!-- Dialogs -->
    <section class="flex flex-col">
      <h3>Dialogs</h3>
      <button 
        class="px-4 py-2 border-red-500 border border-solid rounded"
        @click="() => toggleDialog(true)"
      >
        Open Modal
      </button>
      <dialog 
        ref="modalRef"
        class="
          m-auto
          aspect-square h-60

          backdrop:transition-all
          backdrop:duration-1000
          backdrop:opacity-0
          backdrop:bg-white

          hidden
          transition-all
          duration-1000
          opacity-0

          [transition-behavior:_allow-discrete]
          backdrop:[transition-behavior:_allow-discrete]
        "
      >
        <div class="flex flex-col justify-bewteen">
          <button @click="toggleDialog(false)">
            Close
          </button>
        </div>
      </dialog>
    </section>

    <!-- Stacking anchors -->

    <section class="flex flex-col relative">
      <h3>Anchor Issues</h3>
      <!-- current version of tailwind will auto `var` wrap anything that starts with `--` so need to escape this with the help of whitespace escape `_--` -->
      <button class="[anchor-name:_--anchor-el] border-red-500 border border-solid px-4 py-2 peer/hover">
        Cant Hover me :'(
      </button>
      <div class="[position-anchor:_--anchor-el]  bg-red-500 border-red-500 rounded min-h-4 min-w-60 px-4 py-2 my-2 absolute peer-hover/hover:opacity-100 opacity-0 duration-300 anchored-tr">
        Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas
      </div>

      <br>

      <button class="[anchor-name:_--anchor-el-2] border-red-500 border border-solid px-4 py-2 peer/hover2">
        My anchor is blocking
      </button>
      <div class="[position-anchor:_--anchor-el-2]  bg-red-500 border-red-500 rounded min-h-4 min-w-60 max-w-60 px-4 py-2 my-2 absolute peer-hover/hover2:opacity-100 opacity-0 duration-300 anchored-tr">
        Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas
      </div>
    </section>

    <section class="flex flex-col relative">
      <h3>Anchors Fixed</h3>
      <!-- current version of tailwind will auto `var` wrap anything that starts with `--` so need to escape this with the help of whitespace escape `_--` -->
      <button class="[anchor-name:_--anchor-el] border-red-500 border border-solid px-4 py-2 peer/hover3">
        Yo, Hover me :D
      </button>
      <div 
        class="
          [position-anchor:_--anchor-el]
          bg-red-500 border-red-500 
          rounded
          min-h-4 min-w-60 max-w-60 
          px-4 py-2 my-2 
          absolute 
          peer-hover/hover3:opacity-100 opacity-0 
          duration-1000 anchored-tr
        "
      >
        Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas
      </div>

      <br>

      <button class="[anchor-name:_--anchor-el-2] border-red-500 border border-solid px-4 py-2 peer/hover4">
        My anchor could be blocking
      </button>
      <div
        class="
          bg-red-500 border-red-500 rounded 
          min-h-4 min-w-60 px-4 py-2 my-2 max-w-60
          absolute hidden
          peer-hover/hover4:opacity-100 peer-hover/hover4:block
          opacity-0 duration-1000 anchored-tr 
          [position-anchor:_--anchor-el-2]
          [transition-behavior:_allow-discrete]
          fromHiddenToBlock
        "
      >
        Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas
      </div>
    </section>
  </section>
</template>

<style scoped>

  dialog[open]{
    @apply block;
    @apply opacity-100;

    @starting-style {
      opacity: 0;
    }
  }

  dialog[open]::backdrop{
    @apply opacity-30;
  }

  @starting-style {
    dialog[open]::backdrop{
      @apply opacity-0;
    }
  }
  
  .fromHiddenToBlock {
    @starting-style {
      opacity: 0;
    }
  }
  
  .anchored-tr {
    bottom: anchor(top);
    right: anchor(right);
  }
</style>

