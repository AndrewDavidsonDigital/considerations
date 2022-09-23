<script setup>
import { 
  ref,
  watch,
  computed, 
  onUnmounted, 
  onMounted,
} from 'vue'
  
  // reactive state
  let observer = ref({});
  let isLoadedFull = ref(false)
  let refreshKey = ref(null)
  let tickerId = ref(null)
  let scrollToggled = ref(true)
  let timeToggled = ref(false)
  let textModule = ref(null) // element ref
  let textTop = ref('')
  let textBottom = ref('')
  let textHeight = ref('')
  let textWidth = ref('')
  let textLineHeight = ref('')
  let textPaddingFull = ref({
    top: '',
    bottom: '',
    left: '',
    right: '',
  })

  let timeConfig = ref({
    startTimestamp: null,
    duration: 10000,
    interval: 50,
  })

  let scrollConfig = ref({
    bias: 1,
    top: 0,
    bottom: 0,
    startTimestamp: null,
    interval: 50,
  })

  function resolveTextSizes(){
    textHeight.value = resolveCss(textModule.value, 'height')
    textWidth.value = resolveCss(textModule.value, 'width')
    textLineHeight.value = resolveCss(textModule.value, 'lineHeight') 
    textTop.value = textModule.value.getBoundingClientRect().top
    textBottom.value = textModule.value.getBoundingClientRect().bottom
    
    textPaddingFull.value.top = resolveCss(textModule.value, 'padding-top') 
    textPaddingFull.value.bottom = resolveCss(textModule.value, 'padding-bottom') 
    textPaddingFull.value.left = resolveCss(textModule.value, 'padding-left') 
    textPaddingFull.value.right = resolveCss(textModule.value, 'padding-right') 
  }

  function resolveCss(object, cssKey){
    return window.getComputedStyle(object)[cssKey]
  }

  function computedLineWidth(index){
    const percentagesPerLine = 100 / numberOfLinesToRender.value 
    const shouldFill = shouldLineBeFilled(index, percentagesPerLine)
    const shouldEmpty = shouldLineBeEmpty(index, percentagesPerLine)
    if (shouldFill){
      return '100%'
    } else if (shouldEmpty) {
      return '0%'
    }else{
      let retval = '0%'
      if (scrollToggled.value){
        const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
        const percentages = [
          (((scrollConfig.value.top - textBottom.value) / totalScrollArea) * 100).toFixed(2),
          (((scrollConfig.value.top - textTop.value) / totalScrollArea) * 100).toFixed(2),
        ]
        const percentComplete = Math.max(Math.min((percentages.reduce((a,b) => a + Number(b), 0)), 100),0)
        const currentLinePercentOfPerLinePercent = (percentComplete % percentagesPerLine) / percentagesPerLine * 100
        retval = `${currentLinePercentOfPerLinePercent.toFixed(2)}%`    
      }else if(timeToggled.value){
        const valueCompleted = Date.now() - timeConfig.value.startTimestamp
        const percentComplete = (valueCompleted / timeConfig.value.duration) * 100
        const currentLinePercentOfPerLinePercent = (percentComplete % percentagesPerLine) / percentagesPerLine * 100
        retval = `${currentLinePercentOfPerLinePercent.toFixed(2)}%`
      }
      return retval
    }
  }

  function shouldLineBeFilled(index, percentagesPerLine){
    if (scrollToggled.value){
      const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
      const percentages = [
        (((scrollConfig.value.top - textBottom.value) / totalScrollArea) * 100).toFixed(2),
        (((scrollConfig.value.top - textTop.value) / totalScrollArea) * 100).toFixed(2),
      ]
      const percentComplete = Math.max(Math.min((percentages.reduce((a,b) => a + Number(b), 0)), 100),0)  
      return (index * percentagesPerLine) <= percentComplete

    }else if(timeToggled.value){
      const valueCompleted = Date.now() - timeConfig.value.startTimestamp
      const percentComplete = (valueCompleted / timeConfig.value.duration) * 100
      return (index * percentagesPerLine) <= percentComplete
    }
  }

  function shouldLineBeEmpty(index, percentagesPerLine){
    if (scrollToggled.value){
      const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
      const percentages = [
        (((scrollConfig.value.top - textBottom.value) / totalScrollArea) * 100).toFixed(2),
        (((scrollConfig.value.top - textTop.value) / totalScrollArea) * 100).toFixed(2),
      ]
      const percentComplete = Math.max(Math.min((percentages.reduce((a,b) => a + Number(b), 0)), 100),0)      
      return (index * percentagesPerLine) >= (percentComplete + percentagesPerLine)

    }else if(timeToggled.value){
      const valueCompleted = Date.now() - timeConfig.value.startTimestamp
      const percentComplete = (valueCompleted / timeConfig.value.duration) * 100
      return (index * percentagesPerLine) >= (percentComplete + percentagesPerLine)
    }
  }
  
  const textPaddingFullNumber = computed(() => {
    let retval = {}
    for (const [key, value] of Object.entries(textPaddingFull.value)){
      retval[key] = Number(value.substring(0, value.length -2))
    }
    return retval
  })

  const textHeightNumber = computed(() => Number(textHeight.value.substring(0, textHeight.value.length -2)))
  const textLineHeightNumber = computed(() => Number(textLineHeight.value.substring(0, textLineHeight.value.length -2)))
  const numberOfLinesToRender = computed(() => ((textHeightNumber.value - textPaddingFullNumber.value.top - textPaddingFullNumber.value.bottom) / textLineHeightNumber.value) || 0)

  function resolveHeightOffset(){
    const totalHalf = window.innerHeight / 2
    const usedHalf = (textHeightNumber.value / 2) * scrollConfig.value.bias
    const retval = (-50 + (usedHalf / totalHalf * 50)).toFixed(2)
    return retval
  }

  function observerCallback(entries, observer){
    if (isLoadedFull.value){
      if (entries[0].isIntersecting){
        scrollConfig.value.startTimestamp = Date.now()
        tickerId.value = setInterval(() => ticker(), scrollConfig.value.interval)
      }else{
        scrollConfig.value.startTimestamp = null
        clearTickerInterval()
      }
    }
  }
  
  onMounted(() => {
    setTimeout(() => {
      const tester = resolveHeightOffset()
      let options = {
        rootMargin: `${resolveHeightOffset()}% 0% ${resolveHeightOffset()}% 0%`,
      }
      if (tester >= 0){
        options = {
          rootMargin: `-30% 0% -30% 0%`,
        }
      }
      observer.value = new IntersectionObserver((entries, observer) => observerCallback(entries, observer), options);
      const gap = Math.abs(resolveHeightOffset())
      const topper = window.innerHeight * (gap /100)
      const bottomout = window.innerHeight - window.innerHeight * (gap /100)
      scrollConfig.value.bottom = Number(topper.toFixed(0))
      scrollConfig.value.top = Number(bottomout.toFixed(0))

      
      observer.value.observe(textModule.value);
      setTimeout(() => isLoadedFull.value = true, 1000)
    },500)
  })

  // register toggles for regenerating the object size
  window.addEventListener("resize", () => resolveTextSizes());  
  onUnmounted(() => {
    window.removeEventListener("resize", () => resolveTextSizes());
    if(tickerId.value){
      clearInterval(tickerId.value)
    }
  }),
  onMounted(() => {
    resolveTextSizes()
  });
  //---------


  /**
   * Remove and Re-innit ScollToggle 
   * from button press
   */
  watch(scrollToggled, (newVal, oldVal) => {
    if (newVal === true){
      clearTickerInterval()
      isLoadedFull.value = false
      observer.value.observe(textModule.value);
      scrollConfig.value.startTimestamp = Date.now()
      setTimeout(() => isLoadedFull.value = true, scrollConfig.value.interval)
    }else{
      observer.value.unobserve(textModule.value)
      scrollConfig.value.startTimestamp = null
    }
  })
  
  /**
   * Remove and Re-innit TimeToggle
   * from button press 
   */
  watch(timeToggled, (newVal, oldVal) => {
    if (newVal === true){
      clearTickerInterval()
      timeConfig.value.startTimestamp = Date.now()
      tickerId.value = setInterval(() => ticker(), timeConfig.value.interval)
    }else{
      timeConfig.value.startTimestamp = null
    }
  })

  /**
   * Ticker to iterate checks 
   */
  function ticker(){
    const now = Date.now()
    let endDuration;
    if(timeToggled.value){
      endDuration = timeConfig.value.startTimestamp + timeConfig.value.duration
    }

    if(scrollToggled.value){
      textTop.value = textModule.value.getBoundingClientRect().top
      textBottom.value = textModule.value.getBoundingClientRect().bottom
    }

    if (timeToggled.value && (now >= endDuration)){
      clearTickerInterval()
    }
    refreshKey.value = now
  }

  function clearTickerInterval(){    
    clearInterval(tickerId.value)
    tickerId.value = null;
  }

  defineExpose({
    textModule,
    resolveTextSizes,
    numberOfLinesToRender,
  })
</script>
  
<template>
  <section class="tw-text-white tw-text-left tw-w-1/2 tw-pb-5">
    <h2 class="tw-text-xl tw-text-orange-300">Issue: </h2>
    <p class="tw-indent-5">Need for a way to progressivly style text</p>
    <h2 class="tw-text-xl tw-text-orange-300">Details: </h2>
    <p class="tw-indent-5">Need to find a way to progressivly style text based on a specific progress, i.e. time or scroll position</p>
    <h2 class="tw-text-xl tw-text-orange-300">Logic: </h2>
    <h3 class="tw-text-lg tw-text-orange-300">Generic: </h3>
    <p class="tw-indent-5">Define a template ref for the paragraph to style, prior to that in the template add a heirachily older sibling `element` that is positioned absolutely so that it sits underneath the template; This will house our `highlight` colour.</p>
    <p class="tw-indent-5">Once loaded, and on aspect changes, read the computed sizing values and line-heighs. From this we can calculate the number, and size of all the lines within the paragraph.</p>
    <p class="tw-indent-5">From this, our template iterates over our computed (number of lines), and we now have an indetically spaced underlying layer, with a `width` of 0% as we don't want to colour it yet. </p>
    <p class="tw-indent-5">Using the mix-blend-multiply we on the paragraph we can colour the text based on the background of the underlying layers.</p>
    <p class="tw-indent-5">For both Timed and Scrolled, per tick of itteration, calculate the percentages per row of scaling on each line, they will fall into one of 3 categories; Filled, Empty, and a single line Partially Filled</p>
    <h3 class="tw-text-lg tw-text-orange-300">Timed: </h3>
    <p class="tw-indent-5">For timed; we define a duration and a tick-interval, each tick we reprocess the percentage of completion on all line to dynamically generate `width` values for each row</p>
    <h3 class="tw-text-lg tw-text-orange-300">Scrolled: </h3>
    <p class="tw-indent-5">For Scrolled we define an Intersection Observer, around the center of the viewport, and a tick-interval. When the Intersection Observer is triggered either start or stop the ticker depending on if we entered or left the intersection, each tick we reprocess the percentage of completion on all line to dynamically generate `width` values for each row, based on the average percentage of both the Lower intersection with the bottom of the element and the Upper interseciont with the top of the element</p>
  </section>
  <section class="tw-flex tw-gap-x-2 tw-text-black tw-pb-5">
    <button
      class="tw-px-2 tw-bg-slate-400 tw-rounded-md tw-border-2" 
      :class="{
        'tw-border-red-400': scrollToggled,
        'tw-border-slate-400': !scrollToggled,
        }" 
      @click="timeToggled = false; scrollToggled = true">Scroll Toggled</button>
    <button 
      class="tw-px-2 tw-bg-slate-400  tw-rounded-md tw-border-2"
      :class="{
        'tw-border-red-400': timeToggled,
        'tw-border-slate-400': !timeToggled,
        }" 
      @click="timeToggled = true; scrollToggled = false">Timer Toggled</button>
  </section>
  <section class="tw-min-h-[40vh] tw-hidden md:tw-flex tw-flex-col">
    spacer to enable scroll for scroll toggling
  </section>  
  <section class="md:tw-w-[50vw] tw-aspect-square tw-flex tw-flex-col tw-mix-blend-lighten">
    <section 
      class="tw-absolute"
      :style="`
        width: ${textWidth}; 
        height: ${textHeight}; 
        padding-top: ${textPaddingFull.top}; 
        padding-bottom: ${textPaddingFull.bottom}; 
        padding-left: ${textPaddingFull.left}; 
        padding-right: ${textPaddingFull.right}`"
      >
      <template v-for="n in numberOfLinesToRender" :key="refreshKey + '_' + n">
        <article 
          class="tw-bg-orange-500" 
          :style="`
            width: ${computedLineWidth(n)}; 
            height: ${textLineHeight}; 
          `" 
        />
      </template>
    </section>
    <p ref="textModule" class="tw-text-white tw-font-bold tw-relative tw-p-3 tw-bg-black tw-mix-blend-multiply">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Si longus, levis.Ut id aliis narrare gestiant? An ea, quae per vinitorem antea consequebatur, per se ipsa curabit? Quamquam te quidem video minime esse deterritum.
Duo Reges: constructio interrete. Est, ut dicis, inquam. Quid enim me prohiberet Epicureum esse, si probarem, quae ille diceret? Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ita cum ea volunt retinere, quae superiori sententiae conveniunt, in Aristonem incidunt; An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia? At ille pellit, qui permulcet sensum voluptate. Restatis igitur vos; Tum Quintus: Est plane, Piso, ut dicis, inquit. Mihi, inquam, qui te id ipsum rogavi? 
Audax negotium, dicerem impudens, nisi hoc institutum postea translatum ad philosophos nostros esset. Profectus in exilium Tubulus statim nec respondere ausus; Quis Aristidem non mortuum diligit? Illa argumenta propria videamus, cur omnia sint paria peccata. Summus dolor plures dies manere non potest?</p>
  </section>
  <section class="tw-min-h-[40vh] tw-flex tw-flex-col">
    spacer to enable scroll for scroll toggling
  </section>  
</template>