<script setup lang="ts">
import {ref, watch} from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import {useCounterStore} from "@/stores/counter.ts";
import {Operation} from "@element-plus/icons-vue";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";
import HomeStatsCard from "@/views/home/empty/components/HomeStatsCard.vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import dayjs from "dayjs";
import {$api} from "@/componsables/api.ts";
import {$message} from "@/componsables/element-plus.ts";
import PvUvUipDailyCharts from "@/components/stats/PvUvUipDailyCharts.vue";
import BrowserStatsCharts from "@/components/stats/BrowserStatsCharts.vue";
import {
  initDailyBrowserStatsDataBinding,
  initDailyStatsDataBinding,
  initTopIPsStatsDataBinding
} from "@/componsables/apis/ShortLinkStatsApis.ts";


const store = useCounterStore();
const editFlag = ref<boolean>(false);
const startDate = ref<string>('');
const endDate = ref<string>('');
const date = ref<string>('');
const selectedGid = ref<string>('');
const dailyStatsData = ref<HomeTypes.DailyAccessStatsType[]>([]);
const dateList = ref<string[]>([]);
const pvList = ref<number[]>([]);
const uvList = ref<number[]>([]);
const uipList = ref<number[]>([]);
const browserStatsList = ref<HomeTypes.BrowserStatsType[]>([]);
const ipTableData = ref<HomeTypes.TopIpStatsType[]>([]);
const isLoading = ref<boolean>(false);




function initDateBinding() {
  if (date.value && date.value.length === 2) {
    startDate.value = dayjs(date.value[0]).format('YYYY-MM-DD');
    endDate.value = dayjs(date.value[1]).format('YYYY-MM-DD');
    // console.log(startDate.value, endDate.value, date.value);
  }
}


function resetData() {
  startDate.value = '';
  endDate.value = '';
  date.value = '';
  selectedGid.value = '';
  dailyStatsData.value = [];
}


/**
 * 重置统计数据
 */
async function resetStatsData() {
  dailyStatsData.value = [];
  pvList.value = [];
  uvList.value = [];
  uipList.value = [];
  ipTableData.value = [];
  browserStatsList.value = [];
  dateList.value = [];
}


/**
 * 获取分组统计数据
 */
async function getDailyData() {
  isLoading.value = true;
  await $api.getDailyAccessStatsDataByGid(
      startDate.value,
      endDate.value,
      selectedGid.value
  ).then(async (res: any) => {
    await resetStatsData();
    // daily 数据初始化
    await initDailyStatsDataBinding(res, dailyStatsData.value, dateList.value, pvList.value, uvList.value, uipList.value);
    //浏览器数据初始化
    await initDailyBrowserStatsDataBinding(res, browserStatsList.value);
    // ip数据列表初始化
    await initTopIPsStatsDataBinding(res, ipTableData.value);
    isLoading.value = false;
    // console.log(dateList.value)
  }).catch(error => {
    $message({
      type: 'error',
      message: '获取失败'
    });
    resetData(); // 初始化数据
    isLoading.value = false;
    console.log(error);
  });
}


watch(() => date.value, async () => {
  await initDateBinding();
});
</script>

<template>
  <el-scrollbar height="600">
    <BaseCard
        v-if="store.shortLinkGroup.length === 0"
        class="w-full h-full flex"
    >
      <template #body>
        <div class="w-full h-full flex flex-col p-4 items-center">
          <el-empty
              description="暂无已有短链"
          />
        </div>
      </template>
    </BaseCard>
    <!-- stats cards -->
    <div
        v-else
        class="w-full h-full flex flex-col"
    >
      <!-- status banner -->
      <div class="w-full h-20 flex mb-4">
        <BaseCard class="w-full h-full flex" />
      </div>
      <!-- stats cards list -->
      <div
          class="w-full h-auto min-h-4 max-h-[140px] grid grid-cols-4 gap-4 items-center relative pr-4"
      >
        <HomeStatsCard
            v-for="(item, index) in store.statsCardsList"
            :key="index"
            :info="item"
        />
        <!-- edit button -->
        <div class="w-auto h-auto absolute right-0 top-0 cursor-pointer">
          <el-tooltip
              content="设置"
              effect="dark"
              placement="bottom"
          >
            <el-icon size="20">
              <Operation @click="() => editFlag = true" />
            </el-icon>
          </el-tooltip>
        </div>
      </div>
      <!-- empty space -->
      <BaseCard
          style="height: calc(100% - 160px);"
          class="w-full h-auto mt-4"
      >
        <template #body>
          <!-- empty space -->
          <div class="w-full h-auto flex flex-col p-4">
            <!-- date & group picker -->
            <div class="w-full h-8 grid grid-cols-2 gap-4 justify-end items-center">
              <!-- group selector -->
              <div class="w-full h-auto flex" />
              <!-- date picker -->
              <div class="w-full h-auto flex">
                <div class="w-1/2 h-full flex pr-2 items-center">
                  <el-select
                      v-model="selectedGid"
                      placement="bottom"
                      placeholder="请选择分组"
                  >
                    <el-option
                        v-for="(item, index) in store.shortLinkGroup"
                        :key="index"
                        :label="item.name"
                        :value="item.gid"
                    />
                  </el-select>
                </div>
                <div class="w-1/2 h-full flex pl-2">
                  <el-date-picker
                      v-model="date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                  />
                  <el-button @click="getDailyData" class="ml-4" type="primary">查询</el-button>
                </div>
              </div>
            </div>
            <div
                style="height: calc(100% - 32px);"
                class="w-full h-auto grid grid-cols-2 gap-4 py-4 items-center justify-center"
            >
              <!-- pv & uv & uip charts -->
              <div class="w-full h-full flex flex-col">
                <!-- charts -->
                <div
                    v-loading="isLoading"
                    style="height: calc(100% - 32px);" class="w-full h-auto flex"
                >
                  <PvUvUipDailyCharts
                      :date="dateList"
                      :pv="pvList"
                      :uv="uvList"
                      :uip="uipList"
                  />
                </div>
              </div>
              <!-- TopIPs & browser stats -->
              <div class="w-full h-full grid grid-cols-2 gap-4">
                <!-- net work -->
                <div
                    v-loading="isLoading"
                    class="w-full h-full flex"
                >
                  <BrowserStatsCharts
                      :data="browserStatsList"
                  />
                </div>
                <!-- Top IPs -->
                <div class="w-full h-full flex flex-col">
                  <el-table
                      v-loading="isLoading"
                      :data="ipTableData"
                      fit
                      stripe
                      show-overflow-tooltip
                      :header-cell-style="{ background: '#EEF0F5', textAlign: 'center', color: 'black', fontWeight: 'bold' }"
                  >
                    <el-table-column
                        label="访问量"
                        prop="cnt"
                    />
                    <el-table-column
                        label="IP"
                        prop="ip"
                    />
                    <template #empty>
                      <el-empty
                          description="暂无数据"
                      />
                    </template>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </el-scrollbar>
  <!-- edit stats cards dialog -->
  <BaseDialog
      v-model:visible="editFlag"
      title="自定义概览模块"
      width="500"
  >
    <template #body>
      <div class="w-full h-auto grid grid-cols-2 gap-4">
        <div
            v-for="(item, index) in store.statsCardsList"
            :key="index"
            class="w-full h-auto flex flex-col rounded-[5px] border border-gray-400 p-4"
        >
          <HomeStatsCard :info="item" :show="true" />
          <el-divider />
          <el-switch
              v-model="item.isShow"
              active-text="显示"
              inactive-text="隐藏"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end items-center">
        <el-button type="primary" @click="() => editFlag = false">关闭</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
