<script setup lang="ts">
import Highlight from '../components/Highlight.vue';
/*
 * no JS needed
 */
</script>
  
<template>
  <section class="text-white text-left w-1/2 pb-5">
    <h2 class="text-xl text-orange-300">Issue: </h2>
    <p class="indent-5">Need for a way to progressivly style text</p>
    <h2 class="text-xl text-orange-300">Details: </h2>
    <p class="indent-5">Need to find a way to progressivly style text based on a scroll position</p>
    <h2 class="text-xl text-orange-300">Logic: </h2>
    <p class="indent-5">Now that we have the css for animation-timeline and animation-range we can scrap all the JS implimentations and use these for <Highlight content="animation-range: scroll()"/> and <Highlight content="animation-range: view()"/> to capture and get our progression percentages for animations frames</p>
    <h2 class="text-xl text-orange-300">Source: </h2>
    <p class="indent-5">Kevin Powell https://www.youtube.com/watch?v=d10GaL6F-lA</p>
  </section>
  <section class="min-h-[30vh] flex flex-col pt-5">
    spacer to enable scroll for scroll toggling
  </section> 
  <section class="md:w-[50vw] aspect-square flex flex-col">
    <p class="text-white/20 text-3xl"
    ><span class="scroll-fade">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Si longus, levis.Ut id aliis narrare gestiant? An ea, quae per vinitorem antea consequebatur, per se ipsa curabit? Quamquam te quidem video minime esse deterritum.Duo Reges: constructio interrete. Est, ut dicis, inquam. Quid enim me prohiberet Epicureum esse, si probarem, quae ille diceret? Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ita cum ea volunt retinere, quae superiori sententiae conveniunt, in Aristonem incidunt; An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia? At ille pellit, qui permulcet sensum voluptate. Restatis igitur vos; Tum Quintus: Est plane, Piso, ut dicis, inquit. Mihi, inquam, qui te id ipsum rogavi? Audax negotium, dicerem impudens, nisi hoc institutum postea translatum ad philosophos nostros esset. Profectus in exilium Tubulus statim nec respondere ausus; Quis Aristidem non mortuum diligit? Illa argumenta propria videamus, cur omnia sint paria peccata. Summus dolor plures dies manere non potest?</span></p>
  </section>
  <section class="min-h-[80vh] flex flex-col pt-5">
    spacer to enable scroll for scroll toggling
  </section>  
</template>

<style scoped scss>
  .text-hsl {
    color: hsl(0 0% 100% / 0.2);
  }
  .scroll-fade {
    background-clip: text;
    background-repeat: no-repeat;
    background-size: 0% 100%;
    background-image: linear-gradient(90deg, orange, orange);
    animation: scroll-reveal linear forwards;
    animation-timeline: view();
    animation-range-start: cover;
    animation-range-end: cover 80vh;
  }

  @keyframes scroll-reveal {
    to {
      background-size: 100% 100%;
    }
  }
</style>
