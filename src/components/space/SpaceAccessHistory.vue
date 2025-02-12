<script setup lang="ts">
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import { ref } from "vue";
import {timerFormat} from "../../utils/TimeUtil.ts";
import {$enum} from "../../componsables/enums.ts";
import BasePagination from "@/components/base/BasePagination.vue";

withDefaults(defineProps<{
  historyList?: SpaceTypes.spaceAccessHistoryListType[];
}>(), {
  historyList: null
})



const emits = defineEmits(['change', 'pageChange']);
const timeArea = ref<string>();
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full h-10 flex items-center justify-end">
      <el-date-picker
          v-model="timeArea"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
      />
    </div>
    <div class="w-full h-auto flex flex-col">
      <el-table
          :data="historyList"
          fit
          stripe
          :header-cell-style="{ background: '#EEF0F5', textAlign: 'center', color: 'black', fontWeight: 'bold' }"
      >
        <el-table-column width="200" prop="accessTime" label="访问时间">
          <template #default="{ row }">
            <span>{{ timerFormat(row?.accessTime, $enum.TimeFormatEnum[0]) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" prop="accessIp" label="访问IP" />
        <el-table-column width="200" prop="accessArea" label="访问地区" />
        <el-table-column width="300" prop="accessInfo" label="设备信息" />
        <template #empty>
          <el-empty
              description="暂无访问记录"
          />
        </template>
      </el-table>
    </div>
    <!-- pagination -->
    <div class="w-full h-auto justify-center items-center mt-4">
      <BasePagination />
    </div>
  </div>
</template>

<style scoped>

</style>
