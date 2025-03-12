<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import * as echarts from "echarts";
import { nextTick } from "vue";

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
});

let myChart: echarts.ECharts | null = null;
const chart = ref();

const option = reactive({
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
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.date
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'pv',
      type: 'line',
      stack: 'Total',
      data: props.pv
    },
    {
      name: 'uv',
      type: 'line',
      stack: 'Total',
      data: props.uv
    },
    {
      name: 'uip',
      type: 'line',
      stack: 'Total',
      data: props.uip
    }
  ]
});

async function initChartRender() {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(option);
    window.onresize = () => {
      myChart?.resize();
    }
    await nextTick();
    myChart.resize();
  }
}


async function resetData() {
  option.xAxis.data = [];
  option.series[0].data = [];
  option.series[1].data = [];
  option.series[2].data = [];
}

async function updateChartData() {
  await resetData();
  option.xAxis.data = [...props.date];
  option.series[0].data = [...props.pv];
  option.series[1].data = [...props.uv];
  option.series[2].data = [...props.uip];
  if (myChart) {
    myChart.setOption(option);
  }
}

onMounted(async () => {
  await initChartRender();
});

watch(() => [props.date, props.pv, props.uv, props.uip], async () => {
  await updateChartData();
}, {
  deep: true,
  immediate: true
});
</script>

<template>
  <div ref="chart" class="w-full h-full flex" />
</template>

<style scoped>

</style>
