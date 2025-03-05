<script setup lang="ts">
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";

withDefaults(defineProps<{
  row?: SpaceTypes.ShortLinkIPageTableDataType
}>(), {

})
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center">
    <div class="w-full text-gray-400 h-auto flex">
      今日: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkPv.todayPv > 99 ? '99+' : row?.shortLinkPv.todayPv }}</div>
    </div>
    <div class="w-full text-gray-400 h-auto flex">
      累积: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkPv.totalPv > 99 ? '99+' : row?.shortLinkPv.totalPv }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
