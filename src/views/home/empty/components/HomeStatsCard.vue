<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";
import {ref, watch} from "vue";


const props = withDefaults(defineProps<{
  params?: HomeTypes.HomeStatsInfoCardType;
  show?: boolean;
}>(), {
  show: false
})


const showFlag = ref<boolean>(props.show);


watch(() => props.show, () => {
  showFlag.value = props.show
}, { deep: true })
</script>

<template>
  <BaseCard
      v-show="params?.isShow || showFlag"
      class="w-full h-[150px] hover:shadow-md cursor-pointer"
  >
    <template #body>
      <div class="w-full h-full flex flex-col p-4 items-center">
        <div class="w-full h-1/2 flex overflow-hidden text-ellipsis items-center text-gray-400">{{ params.label ? params.label : '未知标签' }}</div>
        <div class="w-full h-1/2 flex items-center text-theme-color text-[20px] overflow-hidden text-ellipsis font-bold">{{ params.value ? params.value : '未知' }}</div>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>
