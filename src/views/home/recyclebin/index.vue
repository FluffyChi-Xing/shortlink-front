<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import {useRouter} from "vue-router";
import BasePagination from "@/components/base/BasePagination.vue";



/** ===== 回收站页面-start ===== **/
const router = useRouter();
const recycleBinCount = ref<number>(0);

/** ===== 回收站页面-end ===== **/
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <BaseCard
        class="w-full h-full"
        :title="'回收站 共有 ' + recycleBinCount + ' 条短链接'"
    >
      <template #body>
        <div class="w-full h-full flex flex-col p-4">
          <!-- main table body -->
          <div
              style="height: calc(100% - 64px);"
              class="w-full h-auto flex flex-col"
          >
            <el-table
                fit
                stripe
                :header-cell-style="{ background: '#EEF0F5', textAlign: 'center', color: 'black', fontWeight: 'bold' }"
            >
              <el-table-column label="短连接信息" />
              <el-table-column label="短链接网址" />
              <el-table-column label="访问次数" />
              <el-table-column label="访问人数" />
              <el-table-column label="访问IP" />
              <el-table-column
                  label="操作"
                  :fixed="'right'"
                  width="200"
              />
              <template #empty>
                <el-empty
                    description="暂无短链接"
                />
              </template>
            </el-table>
          </div>
          <!-- footer pagination -->
          <div class="w-full h-16 mt-auto flex items-center justify-center">
            <BasePagination />
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>

</style>
