<script setup>
import { ref } from 'vue'
import Highlight from '../components/Highlight.vue';

// reactive state
let toggler = ref(false)
let modalRef = ref(null)


const toggleDialog = (toOpen = false) => {
  if (toOpen){
    modalRef.value.showModal();
  } else {
    modalRef.value.close();
  }
}


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
    <p class="indent-5">CSS anchors / anchoring is composed of two segments, the anchor object it self and the element(s) that is paired to it. Anchors and their content can be declared in Tailwind arbitrarily <Highlight content="[anchor-name:_--ANCHOR-NAME]"/>, and can be triggered programatically via dynamic CSS application <Highlight content=":class"/> or via confitional css of other elements <Highlight content="peer-hover:opcaity-100"/></p>
    <p class="indent-5">Given that the anchored element is always in the dom we will need remove these as they tooltip, even at opaicty-0, will sit above other elements in the base css stack, this can be cleanly solved with <RouterLink to="/discrete-animations">discrete animations</RouterLink></p>
  </section>
  <section class="flex gap-x-4">
    <!-- current version of tailwind will auto `var` wrap anything that starts with `--` so need to escape this with the help of whitespace escape `_--` -->
    <button class="[anchor-name:_--anchor-el] border-red-500 border border-solid px-4 py-2 peer/hover">Hover me</button>
    <div class="[position-anchor:_--anchor-el]  bg-red-500 border-red-500 rounded min-h-4 min-w-60 px-4 py-2 my-2 absolute peer-hover/hover:opacity-100 opacity-0 duration-300 anchored-tr">Thing to be anchored lanksldnkajsbdkjasbjkdasbkjdbas</div>
    
    <button class="[anchor-name:_--anchor-toggle-el] border-red-500 border border-solid px-4 py-2" @click="toggleHelper">Toggle</button>
    <div 
      :class='[
        "bg-red-500 border-red-500 rounded",
        "min-h-4 min-w-40 px-4 py-2 my-2",
        "absolute opacity-0 duration-300",
        "[position-anchor:_--anchor-toggle-el] anchored-tl",
        {
          "opacity-100" : toggler,
        }]'
      >zzzzzzz im going to stay asleep</div>
      
    <button class="border-red-500 border border-solid px-4 py-2" @click="toggleDialog">What about in modals?</button>
    <dialog 
      ref="modalRef"
      class="
        m-auto
        backdrop:bg-red-500/30
        transition-all duration-1000
      ">
      <div class="flex items-center justify-center h-60 aspect-square">
        <button class="[anchor-name:_--anchor-hover-inModal-el] border-blue-500 border border-solid px-4 py-2 peer/hover">Hover</button>
        <div 
          :class='[
            "bg-blue-500 border-blue-500 rounded",
            "min-h-4 min-w-40 px-4 py-2 my-2",
            "absolute opacity-0 duration-300",
            "[position-anchor:_--anchor-hover-inModal-el] anchored-tl",
            "peer-hover/hover:opacity-100 opacity-0 duration-300"
            ]'
          >zzzzzzz im going to stay asleep</div>
        <br>
        <button @click="toggleDialog(false)">Close</button>
      </div>
    </dialog>
  </section>
</template>

<style scoped>  
  .anchored-tl {
    bottom: anchor(top);
    left: anchor(left);
  }
  .anchored-tr {
    bottom: anchor(top);
    right: anchor(right);
  }
</style>

