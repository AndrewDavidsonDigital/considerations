<script setup>
import { onMounted,  ref } from 'vue'
import { FastAverageColor } from 'fast-average-color';



// reactive state
let loaded = ref(false)
let imageToggle = ref(true)


function changeImage(){
  imageToggle.value = !imageToggle.value
  const img = document.getElementById('ithra')

  if (imageToggle.value){
    img.src = '/airship.jpg'
  }else{
    img.src = '/nightscape.jpg'
  }
  const fac = new FastAverageColor();
  fac.getColorAsync(img)
    .then(color => {
        document.getElementById('bgLeft').style.backgroundColor = `${color.hex}`
        document.getElementById('bgRight').style.backgroundColor = `${color.hex}`
        document.documentElement.style.setProperty('--my-variable-name', color.rgba);
        // console.log(color)
        // grab darkness and apply tw-mix-blend-color only if color.isDark === true
    })
    .catch(e => {
        console.log(e);
    });
}

onMounted(() => {
  loaded.value = true
  changeImage()
});
</script>

<template>
  <section class="tw-text-white tw-text-left tw-w-1/2 tw-pb-5">
    <h2 class="tw-text-xl">Problem: </h2>
    <p class="tw-indent-5">Need to dynamically style the sides of the Background behind an image</p>
    <h2 class="tw-text-xl">Details: </h2>
    <p class="tw-indent-5">Need a solution for automatically defining the colours that should be used for 100% width of a hero banner that is content constrained</p>
    <h2 class="tw-text-xl">Logic: </h2>
    <p class="tw-indent-5">TBD</p>
  </section>
  <section class="tw-flex tw-gap-x-2 tw-text-black tw-pb-5">
    <button
      class="tw-px-2 tw-bg-slate-400 tw-rounded-md" 
      @click="changeImage">Change {{ imageToggle ? 'to nightscape' : 'to airship' }}</button>
  </section>
  <section class="tw-grid tw-grid-area-stack">
    <div class="tw-m-breakout tw-flex tw-h-full tw-mix-blend-color">
      <article id="bgLeft" class="tw-w-1/2 tw-bg-red-500"></article>
      <article id="bgRight" class="tw-w-1/2 tw-bg-green-500"></article>
    </div>
    <image 
      id="ithra" 
      src="/airship.jpg" 
      class="tw-aspect-video tw-gradients"/>
  </section>
</template>

<style scoped scss>
  .tw-m-breakout{
    margin:0 calc(50% - 50vw)
  }
  .tw-grid-area-stack {
    grid-template-areas: "stack";
  }
  .tw-grid-area-stack > * {
    grid-area: stack;
  }
  .tw-gradients{
    -webkit-mask-image: linear-gradient(to right, transparent 0%, var(--my-variable-name) 20%, var(--my-variable-name) 80%, transparent 100%);
  }
  .temp {
    background: linear-gradient(to right, transparent 0%, var(--bg-var) 5%, var(--bg-var) 95%, transparent 100%);
    --bg-var: var(--bg-var-rose-500);
  }
</style>

