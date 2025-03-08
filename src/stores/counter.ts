import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";
import type {UserTypes} from "@/componsables/apis/UserTypes";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const shortLinkGroup = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);

  const userInfo = ref<UserTypes.UserInfoTypes>();
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, shortLinkGroup, userInfo }
})
