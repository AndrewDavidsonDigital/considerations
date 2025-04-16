<script setup lang="ts">
import { onMounted,  onUnmounted,  ref } from 'vue'  

// reactive state
let modalRef = ref<HTMLDialogElement>()

function toggleDialog(toOpen = false){
  if (modalRef.value){
    if (toOpen){
      modalRef.value.showModal();
    } else {
      modalRef.value.close();
    }
  }
}

onMounted(() => {
  document.body.classList.add('overflow-x-hidden');
});

onUnmounted(() => {
  document.body.classList.remove('overflow-x-hidden');
});

</script>
  
<template>
  <section
    class="text-white text-left w-[80dvw] md:w-1/2 pb-5"
    style="background: #181818;"
  >
    <h2 class="text-xl text-orange-300">
      Issue:
    </h2>
    <p class="indent-5">
      Can the html dialog be used for Flyouts
    </p>
    <h2 class="text-xl text-orange-300">
      Details:
    </h2>
    <p class="indent-5">
      Need to consider how to use the html Dialog tag, and see if its compatable with the concept of a flyout
    </p>
  </section>
  <section class="flex flex-col gap-y-2 text-white pb-5">
    <button
      @click="() => toggleDialog(true)"
    >
      Open Modal
    </button>
    <!-- <button @click="toggleFlyoutFromRight">Open Flyout from Right</button> -->
  </section>
  <dialog 
    ref="modalRef"
    class="
      m-auto
      backdrop:bg-red-500/30
      transition-all duration-1000
      h-60 aspect-square
    "
  >
    <div class="flex items-center justify-center">
      <button 
        @click="() => toggleDialog(false)"
      >
        Close
      </button>
    </div>
  </dialog>
</template>

<style scoped scss>
/* 
  .duration-custom{
    @apply duration-[v-bind(duration)];
  }
   */
</style>