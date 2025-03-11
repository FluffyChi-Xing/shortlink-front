<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import * as echarts from "echarts";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";


const props = withDefaults(defineProps<{
  data?: HomeTypes.BrowserStatsType[];
  visible?: boolean;
}>(), {
  data: () => [],
  visible: false
})


interface NameValueType {
  name: string;

  value: number;
}

const chart = ref();
const chartData = ref<NameValueType[]>([]);


/**
 * 类型转换函数
 */
function dataTransfer() {
  if (props.data.length > 0) {
    // chartData.value = [];
    props.data.forEach((item: HomeTypes.BrowserStatsType) => {
      chartData.value.push({
        name: item.browser,
        value: item.cnt
      });
    });
    // console.log(chartData.value)
  }
}


const option = {
  title: {
    text: '浏览器类型统计占比',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'right bottom'
  // },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: chartData.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


/**
 * 初始化 统计图
 */
async function initChart() {
  if (chart.value) {
    await dataTransfer(); // 转换数据
    const myChart = echarts.init(chart.value);
    myChart.setOption(option);
    // 监听窗体大小变化
    window.onresize = () => {
      myChart.resize();
    };
  }
}


onMounted(async () => {
  await initChart();
});



watch(() => props.data, async () => {
  await initChart();
}, { deep: true });


// watch(() => props.visible, async () => {
//   // await resetData();
//   await initChart();
// });
</script>

<template>
  <div ref="chart" class="w-full h-full flex" />
</template>
