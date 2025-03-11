<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import * as echarts from "echarts";


const props = withDefaults(defineProps<{
  date?: string[];
  pv?: number[];
  uv?: number[];
  uip?: number[];
  visible?: boolean; // 窗口可见性
}>(), {
  date: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  pv: () => [],
  uv: () => [],
  uip: () => [],
  visible: false
})


const pv = ref<number[]>(props.pv);
const uv = ref<number[]>(props.uv);
const uip = ref<number[]>(props.uip);
const date = ref<string[]>(props.date);
let myChart: echarts.ECharts | null = null;


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
    // window.onresize = () => {
    //   myChart?.resize();
    // };
    myChart = echarts.init(chart.value);
    myChart.setOption(option);
  }
}


async function resetDataBinding() {
  // if (props.pv.length !== 0 || props.pv.length !== 0 || props.uip.length !== 0) {
  //   pv.value = props.pv;
  //   uv.value = props.uv;
  //   uip.value = props.uip;
  //   date.value = props.date;
  // }
  pv.value = props.pv;
  uv.value = props.uv;
  uip.value = props.uip;
  date.value = props.date;
}



onMounted(async () => {
  // await resetDataBinding();
  await initCharts();
});

// TODO: 统计图加载尺寸错误 统计图数据不一致错误
watch(() => props.date, async () => {
  await resetDataBinding();
  await initCharts();
});
</script>

<template>
  <div ref="chart" class="w-full h-full flex items-center" />
</template>

<style scoped>

</style>
