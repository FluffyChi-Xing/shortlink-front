<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import * as echarts from "echarts";


const props = withDefaults(defineProps<{
  date?: string[];
  pv?: number[];
  uv?: number[];
  uip?: number[]
}>(), {
  date: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  pv: () => [0],
  uv: () => [0],
  uip: () => [0]
})


const pv = ref<number[]>(props.pv);
const uv = ref<number[]>(props.uv);
const uip = ref<number[]>(props.uip);
const date = ref<string[]>(props.date);


const chart = ref();

const option = {
  title: {
    text: '分组统计数据'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['pv', 'uv', 'uip']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  // 取消注释并修正 xAxis 配置
  xAxis: {
    // 修正 type 为 'category'
    type: 'category',
    boundaryGap: false,
    data: date.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'pv',
      type: 'line',
      stack: 'Total',
      data: pv.value
    },
    {
      name: 'uv',
      type: 'line',
      stack: 'Total',
      data: uv.value
    },
    {
      name: 'uip',
      type: 'line',
      stack: 'Total',
      data: uip.value
    }
  ]
};


/**
 * 初始化图表
 */
async function initCharts() {
  if (chart.value) {
    const myChart = echarts.init(chart.value);
    myChart.setOption(option);
  }
}


async function resetDataBinding() {
  pv.value = props.pv;
  uv.value = props.uv;
  uip.value = props.uip;
  date.value = props.date;
}



onMounted(async () => {
  await initCharts();
});


watch(() => props.date, async () => {
  await resetDataBinding();
  await initCharts();
});


watch(() => props.date, async () => {
  await resetDataBinding();
  await initCharts();
}, { deep: true })
</script>

<template>
  <div ref="chart" class="w-full h-full flex items-center" />
</template>

<style scoped>

</style>
