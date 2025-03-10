<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import {useCounterStore} from "@/stores/counter.ts";
import {Operation} from "@element-plus/icons-vue";
import type {HomeTypes} from "@/componsables/apis/HomeTypes";
import HomeStatsCard from "@/views/home/empty/components/HomeStatsCard.vue";
import BaseDialog from "@/components/base/BaseDialog.vue";


const store = useCounterStore();
const editFlag = ref<boolean>(false);
const statsCardsList = ref<HomeTypes.HomeStatsInfoCardType[]>([
  {
    label: '分组数',
    value: store.shortLinkGroup.length.toString(),
    isShow: false
  },
  {
    label: '短链数',
    value: '0',
    isShow: false
  }
]);
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
        class="w-full h-36 grid grid-cols-4 gap-4 items-center relative pr-4"
    >
      <HomeStatsCard
          v-for="(item, index) in statsCardsList"
          :key="index"
          :params="item"
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
        class="w-full h-auto mt-4"
    >
      <template #body>
        <!-- empty space -->
        <div class="w-full h-auto flex mt-4 items-center justify-center">
          <el-empty
              description="暂无数据"
          />
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
            v-for="(item, index) in statsCardsList"
            :key="index"
            class="w-full h-auto flex flex-col rounded-[5px] border border-gray-400 p-4"
        >
          <HomeStatsCard :params="item" :show="true" />
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
