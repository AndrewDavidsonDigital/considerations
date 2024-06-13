<script setup>
import { ref } from 'vue'

// reactive state
let toggler = ref(false)


function toggleHelper(){
  toggler.value = !toggler.value
}

</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">Issue: </h2>
    <p class="indent-5">Hover tooltips and explanators are absurdly anoying to setup and very external</p>
    <h2 class="text-xl">Details: </h2>
    <p class="indent-5">How can we use the new css Anchor properties to configure different types of tooltips</p>
    <h2 class="text-xl">Logic: </h2>
    <p class="indent-5">TBD</p>
  </section>
  <section class="flex gap-x-4">
    <button class="border-red-500 border border-solid px-4 py-2 peer/hover anchor">Hover me</button>
    <div class="bg-red-500 border-red-500 rounded min-h-4 min-w-60 px-4 py-2 my-2 absolute peer-hover/hover:opacity-100 opacity-0 duration-300 anchored anchored-tr">Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas</div>
    
    <button class="border-red-500 border border-solid px-4 py-2 anchor-toggle" @click="toggleHelper">Toggle</button>
    <div 
      :class='[
        "bg-red-500 border-red-500 rounded",
        "min-h-4 min-w-40 px-4 py-2 my-2",
        "absolute opacity-0 duration-300",
        "anchored-toggle anchored-tl",
        {
          "opacity-100" : toggler,
        }]'
      >zzzzzzz im going to stay asleep</div>
  </section>
</template>

<style scoped>
  .anchor {
    anchor-name: --anchor-el;
  }
  .anchored {
    position-anchor: --anchor-el;
  }
  
  .anchor-toggle {
    anchor-name: --anchor-toggle-el;
  }
  .anchored-toggle {
    position-anchor: --anchor-toggle-el;
  }

  
  .anchored-tl {
    bottom: anchor(top);
    left: anchor(left);
  }
  .anchored-tr {
    bottom: anchor(top);
    right: anchor(right);
  }

</style>

