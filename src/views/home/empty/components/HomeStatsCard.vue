<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";
import {onMounted, ref, watch} from "vue";
import {useCounterStore} from "@/stores/counter.ts";


const props = withDefaults(defineProps<{
  info?: HomeTypes.HomeStatsInfoCardType;
  show?: boolean;
}>(), {
  show: false,
  info: {
    label: '',
    value: '',
    isShow: false
  }
})


const showFlag = ref<boolean>(props.show);
const cardValue = ref<string>('');
const store = useCounterStore();


function checkValue() {
  let shortLinkCount = 0;
  store.shortLinkGroup.forEach(item => {
    shortLinkCount += item.shortLinkCount;
  });
  switch (props.info.label) {
    case '':
      cardValue.value = '未知';
      break;
    case '分组数':
      cardValue.value = store.shortLinkGroup.length.toString();
      break;
    case '短链数':
      cardValue.value = shortLinkCount.toString();
      break;
  }
}


onMounted(() => {
  checkValue();
});



watch(() => props.show, () => {
  showFlag.value = props.show
  checkValue();
}, { deep: true })


watch(() => store.refreshFlag, () => {
  checkValue();
});
</script>

<template>
  <BaseCard
      v-show="info?.isShow || showFlag"
      class="w-full h-[140px] hover:shadow-md cursor-pointer"
  >
    <template #body>
      <div class="w-full h-full flex flex-col p-4 items-center">
        <div class="w-full h-1/2 flex overflow-hidden text-ellipsis items-center text-gray-400">{{ info?.label ? info?.label : '未知标签' }}</div>
        <div class="w-full h-1/2 flex items-center text-theme-color text-[20px] overflow-hidden text-ellipsis font-bold">{{  cardValue ? cardValue : '未知' }}</div>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>
