import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const shortLinkGroup = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, shortLinkGroup }
})
