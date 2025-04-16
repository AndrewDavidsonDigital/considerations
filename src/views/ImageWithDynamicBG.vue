<script setup lang="ts">
import { ref } from 'vue'
import { FastAverageColor } from 'fast-average-color';

// reactive state
let imageToggle = ref(true)


function changeImage(){
  imageToggle.value = !imageToggle.value
  const img = document.getElementById('ithra');

  if (!img){
    return
  }

  if (imageToggle.value){
    (img as HTMLImageElement).src = '/airship.jpg'
  }else{
    (img as HTMLImageElement).src = '/nightscape.jpg'
  }
  const fac = new FastAverageColor();
  fac.getColorAsync(img as HTMLImageElement)
    .then(color => {
      const left = document.getElementById('bgLeft');
      const right = document.getElementById('bgRight');
      if (!left || !right){
        return;
      }
      left.style.backgroundColor = `${color.hex}`
      right.style.backgroundColor = `${color.hex}`
      document.documentElement.style.setProperty('--colour-bg-bleed', color.rgba);
      // console.log(color)
      // grab darkness and apply mix-blend-color only if color.isDark === true
    })
    .catch(e => {
        console.log(e);
    });
}
</script>

<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl">
      Problem:
    </h2>
    <p class="indent-5">
      Need to dynamically style the sides of the Background behind an image
    </p>
    <h2 class="text-xl">
      Details:
    </h2>
    <p class="indent-5">
      Need a solution for automatically defining the colours that should be used for 100% width of a hero banner that is content constrained
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <p class="indent-5">
      TBD
    </p>
  </section>
  <section class="flex gap-x-2 text-black pb-5">
    <button
      class="px-2 bg-slate-400 rounded-md" 
      @click="changeImage"
    >
      Change {{ imageToggle ? 'to nightscape' : 'to airship' }}
    </button>
  </section>
  <section class="grid grid-area-stack">
    <div class="m-breakout flex h-full mix-blend-color">
      <article
        id="bgLeft"
        class="w-1/2 bg-red-500"
      ></article>
      <article
        id="bgRight"
        class="w-1/2 bg-green-500"
      ></article>
    </div>
    <image 
      id="ithra" 
      src="/airship.jpg" 
      class="aspect-video gradients z-10"
    />
  </section>
</template>

<style scoped scss>
  .m-breakout{
    margin:0 calc(50% - 50vw)
  }
  .grid-area-stack {
    grid-template-areas: "stack";
  }
  .grid-area-stack > * {
    grid-area: stack;
  }
  .gradients{
    mask-image: linear-gradient(to right, transparent 0%, var(--colour-bg-bleed) 20%, var(--colour-bg-bleed) 80%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, var(--colour-bg-bleed) 20%, var(--colour-bg-bleed) 80%, transparent 100%);
  }
</style>

