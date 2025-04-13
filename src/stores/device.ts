import { ref } from 'vue'
import { defineStore } from 'pinia'

const IOS_TAGS = [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod'
]

export const useDeviceStore = defineStore('device', () => {
  const isIos = ref(false)
  isIos.value = IOS_TAGS.includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  return { isIos }
})
