<script setup>
import { ref } from 'vue'

// reactive state
let startTime = ref(0)
let endTime = ref(0)
let custom = ref('ko-KR')

let days = ref([])

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

function translateEntireWeek(locale){
  startTime.value = Date.now()
  days.value = []
  
  rawDays.forEach((dayName) => {
    const localedDay = resolveLocaleDay(dayName, locale)
    days.value.push(localedDay)
  });
  
  endTime.value = Date.now()
}
  
function resolveLocaleDay(dayName, locale){
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

</script>

<template>
  <section style="display: flex;">
  <button @click="justIterateLoop">Loop only</button>
  <button @click="translateEntireWeek('en-AU')">Start-AU</button>
  <button @click="translateEntireWeek('JA')">Start-JA</button>
  <button @click="translateEntireWeekCustom">Start-custom</button>
  <section style="background: pink; width: 100px"><input v-model="custom" type='text' style="width: 100%"></section></section>
  <section>{{startTime}}</section>
  <section>{{endTime}}</section>
  <section>delta: {{endTime - startTime}}ms</section>
  <hr>
  <section>
    <article v-for="(dayShort, index) in days" :key="index">
      <h3>{{dayShort}}</h3>
    </article>
  </section>
</template>