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
import PvUvUipDailyCharts from "@/views/home/empty/components/PvUvUipDailyCharts.vue";


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
 * 获取分组统计数据
 */
async function getDailyData() {
  await $api.getDailyAccessStatsDataByGid(
      startDate.value,
      endDate.value,
      selectedGid.value
  ).then((res: any) => {
    if (res?.length > 0) {
      res.forEach((item: any) => {
        dailyStatsData.value.push(item);
        dateList.value.push(item.date);
        pvList.value.push(item.pv);
        uvList.value.push(item.uv);
        uipList.value.push(item.uip);
      });
      $message({
        type: 'success',
        message: '获取成功'
      });
    } else {
      dailyStatsData.value = [];
    }
  }).catch(error => {
    $message({
      type: 'error',
      message: error
    });
    resetData(); // 初始化数据
  });
}


watch(() => date.value, () => {
  initDateBinding();
});
</script>

<template>
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
        class="w-full h-auto min-h-4 grid grid-cols-4 gap-4 items-center relative pr-4"
    >
      <HomeStatsCard
          v-for="(item, index) in store.statsCardsList"
          :key="index"
          :info="item"
      />
      <!-- edit button -->
      <div class="w-auto h-auto absolute right-[-16px] top-0 cursor-pointer">
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
        style="height: calc(100% - 300px);"
        class="w-full h-auto mt-4"
    >
      <template #body>
        <!-- empty space -->
        <div
            class="w-full h-full grid grid-cols-2 gap-4 items-center p-4 justify-center"
        >
          <!-- pv & uv & uip charts -->
          <div class="w-full h-full flex flex-col">
            <!-- date & group picker -->
            <div class="w-full h-8 grid grid-cols-2 gap-4 justify-between items-center">
              <!-- group selector -->
              <div class="w-full h-auto flex">
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
              <!-- date picker -->
              <div class="w-full h-auto flex">
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
            <!-- charts -->
            <div style="height: calc(100% - 32px);" class="w-full h-auto flex">
              <PvUvUipDailyCharts
                  :date="dateList"
                  :pv="pvList"
                  :uv="uvList"
                  :uip="uipList"
              />
            </div>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
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
