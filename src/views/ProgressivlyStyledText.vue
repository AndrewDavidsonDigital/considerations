<script setup lang="ts">
import { 
  ref,
  watch,
  computed, 
  onUnmounted, 
  onMounted,
} from 'vue'
  
  // reactive state
  let fps = ref(60);
  let observer = ref<IntersectionObserver>();
  let isLoadedFull = ref(false)
  let refreshKey = ref<number>()
  let tickerId = ref<number>(-1)
  let scrollToggled = ref(true)
  let timeToggled = ref(false)
  let textModule = ref<HTMLParagraphElement>() // element ref
  
  let textTop = ref('')
  let textBottom = ref('')
  let textHeight = ref('')
  let textWidth = ref('')
  let textLineHeight = ref('')
  let textPaddingFull = ref<IPaddingConfig>({
    top: '',
    bottom: '',
    left: '',
    right: '',
  })


  interface IPaddingConfig {
    top: string;
    bottom: string;
    left: string;
    right: string;
  }
  interface ITimerConfig {
    startTimestamp: 0 | number,
    duration: number,
  }

  interface IScrollConfig {
    bias: number,
    top: number,
    bottom: number,
    startTimestamp: 0 | number,
  }

  let timeConfig = ref<ITimerConfig>({
    startTimestamp: 0,
    duration: 10000,
  })

  let scrollConfig = ref<IScrollConfig>({
    bias: 1,
    top: 0,
    bottom: 0,
    startTimestamp: 0,
  })

  function resolveTextSizes(){
    textHeight.value = resolveCss(textModule.value, 'height')
    textWidth.value = resolveCss(textModule.value, 'width')
    textLineHeight.value = resolveCss(textModule.value, 'lineHeight') 
    textTop.value = `${textModule.value?.getBoundingClientRect().top}`
    textBottom.value = `${textModule.value?.getBoundingClientRect().bottom}`
    
    textPaddingFull.value.top = resolveCss(textModule.value, 'padding-top') 
    textPaddingFull.value.bottom = resolveCss(textModule.value, 'padding-bottom') 
    textPaddingFull.value.left = resolveCss(textModule.value, 'padding-left') 
    textPaddingFull.value.right = resolveCss(textModule.value, 'padding-right') 
  }

  function resolveCss(object: HTMLElement | undefined, cssKey: string): string{
    if (!object){
      return '';
    }
    return (window.getComputedStyle(object)).getPropertyValue(cssKey);
  }

  function computedLineWidth(index: number){
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
          (((scrollConfig.value.top - Number(textBottom.value)) / totalScrollArea) * 100).toFixed(2),
          (((scrollConfig.value.top - Number(textTop.value)) / totalScrollArea) * 100).toFixed(2),
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

  function shouldLineBeFilled(index: number, percentagesPerLine: number){
    if (scrollToggled.value){
      const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
      const percentages = [
        (((scrollConfig.value.top - Number(textBottom.value)) / totalScrollArea) * 100).toFixed(2),
        (((scrollConfig.value.top - Number(textTop.value)) / totalScrollArea) * 100).toFixed(2),
      ]
      const percentComplete = Math.max(Math.min((percentages.reduce((a,b) => a + Number(b), 0)), 100),0)  
      return (index * percentagesPerLine) <= percentComplete

    }else if(timeToggled.value){
      const valueCompleted = Date.now() - timeConfig.value.startTimestamp
      const percentComplete = (valueCompleted / timeConfig.value.duration) * 100
      return (index * percentagesPerLine) <= percentComplete
    }
  }

  function shouldLineBeEmpty(index: number, percentagesPerLine: number){
    if (scrollToggled.value){
      const totalScrollArea = scrollConfig.value.top - scrollConfig.value.bottom
      const percentages = [
        (((scrollConfig.value.top - Number(textBottom.value)) / totalScrollArea) * 100).toFixed(2),
        (((scrollConfig.value.top - Number(textTop.value)) / totalScrollArea) * 100).toFixed(2),
      ]
      const percentComplete = Math.max(Math.min((percentages.reduce((a,b) => a + Number(b), 0)), 100),0)      
      return (index * percentagesPerLine) >= (percentComplete + percentagesPerLine)

    }else if(timeToggled.value){
      const valueCompleted = Date.now() - timeConfig.value.startTimestamp
      const percentComplete = (valueCompleted / timeConfig.value.duration) * 100
      return (index * percentagesPerLine) >= (percentComplete + percentagesPerLine)
    } 
    
    return false;
  }
  
  const textPaddingFullNumber = computed(() => {
    let retval:IPaddingConfig = {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
    for (const [key, value] of Object.entries(textPaddingFull.value) as [keyof IPaddingConfig, string][]){
      retval[key] = `${Number(value.substring(0, value.length -2))}px`
    }
    return retval as IPaddingConfig;
  })
  
  const interval = computed(() => Number((1000 / fps.value).toFixed(2)));

  const textHeightNumber = computed(() => Number(textHeight.value.substring(0, textHeight.value.length -2)))
  const textLineHeightNumber = computed(() => Number(textLineHeight.value.substring(0, textLineHeight.value.length -2)))
  const numberOfLinesToRender = computed(() => ((textHeightNumber.value - Number(textPaddingFullNumber.value.top) - Number(textPaddingFullNumber.value.bottom)) / textLineHeightNumber.value) || 0)

  function resolveHeightOffset(){
    const totalHalf = window.innerHeight / 2
    const usedHalf = (textHeightNumber.value / 2) * scrollConfig.value.bias
    const retval = Number((-50 + (usedHalf / totalHalf * 50)).toFixed(2))
    return retval
  }

  function observerCallback(entries: IntersectionObserverEntry[], _observer: IntersectionObserver){
    if (isLoadedFull.value){
      if (entries[0].isIntersecting){
        scrollConfig.value.startTimestamp = Date.now()
        tickerId.value = (setInterval(() => ticker(), interval.value) as unknown as number)
      }else{
        scrollConfig.value.startTimestamp = -1
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

      
      observer.value.observe((textModule.value as  HTMLElement));
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
  watch(scrollToggled, (newVal) => {
    if(observer.value){
      if (newVal === true){
        clearTickerInterval()
        isLoadedFull.value = false
        observer.value.observe(textModule.value as HTMLElement);
        scrollConfig.value.startTimestamp = Date.now()
        setTimeout(() => isLoadedFull.value = true, interval.value)
      }else{
        observer.value.unobserve(textModule.value as HTMLElement)
        scrollConfig.value.startTimestamp = -1
      }
    }
  })
  
  /**
   * Remove and Re-innit TimeToggle
   * from button press 
   */
  watch(timeToggled, (newVal) => {
    if (newVal === true){
      clearTickerInterval()
      timeConfig.value.startTimestamp = Date.now()
      tickerId.value = (setInterval(() => ticker(), interval.value) as unknown as number)
    }else{
      timeConfig.value.startTimestamp = -1
    }
  })

  /**
   * Ticker to iterate checks 
   */
  function ticker(){
    const now = Date.now()
    let endDuration = 0;
    
    if(timeToggled.value){
      endDuration = timeConfig.value.startTimestamp + timeConfig.value.duration
    }

    if(scrollToggled.value){
      textTop.value = `${textModule.value?.getBoundingClientRect().top}`
      textBottom.value = `${textModule.value?.getBoundingClientRect().bottom}`
    }

    if (timeToggled.value && (now >= endDuration)){
      clearTickerInterval()
    }
    refreshKey.value = now
  }

  function clearTickerInterval(){    
    clearInterval(tickerId.value)
    tickerId.value = -1;
  }

  defineExpose({
    textModule,
    resolveTextSizes,
    numberOfLinesToRender,
  })
</script>
  
<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl text-orange-300">
      Issue:
    </h2>
    <p class="indent-5">
      Need for a way to progressivly style text
    </p>
    <h2 class="text-xl text-orange-300">
      Details:
    </h2>
    <p class="indent-5">
      Need to find a way to progressivly style text based on a specific progress, i.e. time or scroll position
    </p>
    <h2 class="text-xl text-orange-300">
      Logic:
    </h2>
    <h3 class="text-lg text-orange-300">
      Generic:
    </h3>
    <p class="indent-5">
      Define a template ref for the paragraph to style, prior to that in the template add a heirachily older sibling `element` that is positioned absolutely so that it sits underneath the template; This will house our `highlight` colour.
    </p>
    <p class="indent-5">
      Once loaded, and on aspect changes, read the computed sizing values and line-heighs. From this we can calculate the number, and size of all the lines within the paragraph.
    </p>
    <p class="indent-5">
      From this, our template iterates over our computed (number of lines), and we now have an indetically spaced underlying layer, with a `width` of 0% as we don't want to colour it yet.
    </p>
    <p class="indent-5">
      Using the mix-blend-multiply we on the paragraph we can colour the text based on the background of the underlying layers.
    </p>
    <p class="indent-5">
      For both Timed and Scrolled, per tick of itteration, calculate the percentages per row of scaling on each line, they will fall into one of 3 categories; Filled, Empty, and a single line Partially Filled
    </p>
    <h3 class="text-lg text-orange-300">
      Timed:
    </h3>
    <p class="indent-5">
      For timed; we define a duration and a tick-interval, each tick we reprocess the percentage of completion on all line to dynamically generate `width` values for each row
    </p>
    <h3 class="text-lg text-orange-300">
      Scrolled:
    </h3>
    <p class="indent-5">
      For Scrolled we define an Intersection Observer, around the center of the viewport, and a tick-interval. When the Intersection Observer is triggered either start or stop the ticker depending on if we entered or left the intersection, each tick we reprocess the percentage of completion on all line to dynamically generate `width` values for each row, based on the average percentage of both the Lower intersection with the bottom of the element and the Upper interseciont with the top of the element
    </p>
  </section>
  <section class="flex flex-col gap-y-2 text-black pb-5">
    <article class="flex gap-x-2 justify-around">
      <button
        class="px-2 bg-slate-400 rounded-md border-2" 
        :class="{
          'border-red-400': scrollToggled,
          'border-slate-400': !scrollToggled,
        }" 
        @click="timeToggled = false; scrollToggled = true"
      >
        Scroll Toggled
      </button>
      <button 
        class="px-2 bg-slate-400  rounded-md border-2"
        :class="{
          'border-red-400': timeToggled,
          'border-slate-400': !timeToggled,
        }" 
        @click="timeToggled = true; scrollToggled = false"
      >
        Timer Toggled
      </button>
    </article>
    <article class="flex gap-x-2 justify-around">
      <div class="w-1/3 inline-flex text-white">
        <label for="fpsId">FPS: </label>
        <input 
          id="fpsId" 
          v-model="fps" 
          type="text"
          class="ml-2 pl-2 text-black" 
          style="width: 100%"
        >
      </div>
      <div class="w-1/3 inline-flex text-white">
        Interval: <span class="ml-2 pl-2 text-black min-w-[4rem] bg-white">{{ interval }}</span>
      </div>
    </article>
  </section>
  <section class="min-h-[40vh] hidden md:flex flex-col">
    spacer to enable scroll for scroll toggling
  </section>  
  <section class="md:w-[50vw] aspect-square flex flex-col mix-blend-lighten">
    <section 
      class="absolute"
      :style="`
        width: ${textWidth}; 
        height: ${textHeight}; 
        padding-top: ${textPaddingFull.top}; 
        padding-bottom: ${textPaddingFull.bottom}; 
        padding-left: ${textPaddingFull.left}; 
        padding-right: ${textPaddingFull.right}`"
    >
      <template
        v-for="n in numberOfLinesToRender"
        :key="refreshKey + '_' + n"
      >
        <article 
          class="bg-orange-500" 
          :style="`
            width: ${computedLineWidth(n)}; 
            height: ${textLineHeight}; 
          `" 
        />
      </template>
    </section>
    <p
      ref="textModule"
      class="text-white font-bold relative p-3 bg-black mix-blend-multiply"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. Si longus, levis.Ut id aliis narrare gestiant? An ea, quae per vinitorem antea consequebatur, per se ipsa curabit? Quamquam te quidem video minime esse deterritum.
      Duo Reges: constructio interrete. Est, ut dicis, inquam. Quid enim me prohiberet Epicureum esse, si probarem, quae ille diceret? Quae quo sunt excelsiores, eo dant clariora indicia naturae. Ita cum ea volunt retinere, quae superiori sententiae conveniunt, in Aristonem incidunt; An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur infamia? At ille pellit, qui permulcet sensum voluptate. Restatis igitur vos; Tum Quintus: Est plane, Piso, ut dicis, inquit. Mihi, inquam, qui te id ipsum rogavi? 
      Audax negotium, dicerem impudens, nisi hoc institutum postea translatum ad philosophos nostros esset. Profectus in exilium Tubulus statim nec respondere ausus; Quis Aristidem non mortuum diligit? Illa argumenta propria videamus, cur omnia sint paria peccata. Summus dolor plures dies manere non potest?
    </p>
  </section>
  <section class="min-h-[40vh] flex flex-col">
    spacer to enable scroll for scroll toggling
  </section>  
</template>