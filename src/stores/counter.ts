import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";
import type {UserTypes} from "@/componsables/apis/UserTypes";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const shortLinkGroup = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);

  const userInfo = ref<UserTypes.UserInfoTypes>();

  const refreshFlag = ref<boolean>(false); // 通知页面刷新标志

  const statsCardsList = ref<HomeTypes.HomeStatsInfoCardType[]>([
    {
      label: '分组数',
      value: '0',
      isShow: false
    },
    {
      label: '短链数',
      value: '0',
      isShow: false
    }
  ]);
  function increment() {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment,
    shortLinkGroup,
    userInfo,
    refreshFlag,
    statsCardsList
  };
})
