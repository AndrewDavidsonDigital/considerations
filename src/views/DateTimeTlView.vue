<script setup lang="ts">
import { onMounted, ref } from 'vue'

// reactive state
let startTime = ref(0)
let endTime = ref(0)
let custom = ref('ko-KR')

let days = ref<string[]>([])

const rawDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'FAKEDAY',
  'Saturday',
  'Sunday',
]

const DAYNAME_CONSTS = Object.freeze({
  monday: new Date("2020-06-01"),
  tuesday: new Date("2020-06-02"),
  wednesday: new Date("2020-06-03"),
  thursday: new Date("2020-06-04"),
  friday: new Date("2020-06-05"),
  saturday: new Date("2020-06-06"),
  sunday: new Date("2020-06-07"),
})



function translateEntireWeekCustom(){
  translateEntireWeek(custom.value)
}

function justIterateLoop(){
  startTime.value = Date.now()
  days.value = []
  
  rawDays.forEach((dayName) => {
    // const localedDay = resolveLocaleDay(dayName, locale)
    days.value.push(dayName)
  });
  
  endTime.value = Date.now()
}

function translateEntireWeek(locale: string){
  startTime.value = Date.now()
  days.value = []
  
  rawDays.forEach((dayName) => {
    const localedDay = resolveLocaleDay(dayName, locale)
    days.value.push(localedDay)
  });
  
  endTime.value = Date.now()
}
  
function resolveLocaleDay(dayName: string, locale: string){
  switch(dayName){
    case 'Monday':
      return DAYNAME_CONSTS.monday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Tuesday':
      return DAYNAME_CONSTS.tuesday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Wednesday':
      return DAYNAME_CONSTS.wednesday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Thursday':
      return DAYNAME_CONSTS.thursday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Friday':
      return DAYNAME_CONSTS.friday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Saturday':
      return DAYNAME_CONSTS.saturday.toLocaleString(locale, { 'weekday': 'short' });
    case 'Sunday':
      return DAYNAME_CONSTS.sunday.toLocaleString(locale, { 'weekday': 'short' });
    default:
      return 'N/A'
  }
}
onMounted(() => {
  justIterateLoop();
});
</script>

<template>
  <section class="text-white text-left w-[80dvw] md:w-1/2 pb-5">
    <h2 class="text-xl">
      Issue:
    </h2>
    <p class="indent-5">
      Verification / Dissproval of claim: <em>Native JS Date object intl is <strong>SLOW</strong></em>
    </p>
    <h2 class="text-xl">
      Details:
    </h2>
    <p class="indent-5">
      Mate refused to use the innate embedded translations from JS Date object, for unclear reasons and claimed its was just obsurdly slow when asked for reasoning
    </p>
    <h2 class="text-xl">
      Logic:
    </h2>
    <div class="indent-5">
      Code takes a list of String representations of `Day of the week`, i.e.: Monday, and needs to resolve the intl, short name for these, relative to a given locale.<pre class="indent-0 p-3 rounded-md bg-orange-300 text-black italic"><code lang="js" class="break-words text-wrap">DAYNAME_CONSTS.friday.toLocaleString(locale, { 'weekday': 'short' })</code></pre> From this we can see that resolving results for 8 entities takes between 0 and 1ms, this is clearly not slow. As Just iterating over the loop can be seen to take between 0 and 1ms, but on average closer to 0
    </div>
  </section>
  <section class="flex flex-wrap gap-2 text-black pb-5 px-5">
    <button
      class="px-2 bg-slate-400 rounded-md" 
      @click="justIterateLoop"
    >
      Loop only
    </button>
    <button 
      class="px-2 bg-slate-400 rounded-md" 
      @click="translateEntireWeek('en-AU')"
    >
      Start-AU
    </button>
    <button 
      class="px-2 bg-slate-400 rounded-md" 
      @click="translateEntireWeek('JA')"
    >
      Start-JA
    </button>
    <button 
      class="px-2 bg-slate-400 rounded-md" 
      @click="translateEntireWeekCustom"
    >
      <label for="customLang_id">Start-custom</label>
    </button> 
    <div style="background: pink; width: 100px">
      <input
        id="customLang_id"
        v-model="custom"
        type="text"
        style="width: 100%"
      >
    </div>
  </section>
  <section class="w-1/2 flex flex-col">
    <div class="w-64 inline-flex justify-between">
      <span>Start Timestamp:</span><span>{{ startTime }}</span>
    </div>
    <div class="w-64 inline-flex justify-between">
      <span>End Timestamp:</span><span>{{ endTime }}</span>
    </div>
    <div class="w-64 inline-flex justify-between">
      <span>Delta:</span><span>{{ endTime - startTime }}</span>
    </div>
    <hr>
    <div>
      <article
        v-for="(dayShort, index) in days"
        :key="index"
      >
        <h3>{{ dayShort }}</h3>
      </article>
    </div>
  </section>
</template>