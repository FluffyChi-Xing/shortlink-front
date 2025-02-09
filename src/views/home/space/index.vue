<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BasePagination from "@/components/base/BasePagination.vue";


const pageSizes = ref<number[]>([5, 10, 15]);
const currentPage = ref<number>(1);
</script>

<template>
  <div class="w-full h-full flex">
    <BaseCard class="w-full h-full p-4">
      <template #body>
        <div class="w-full h-full flex flex-col">
          <!-- functional banner -->
          <div class="w-full h-auto flex py-2">
            <el-button type="primary">创建短链接</el-button>
            <el-button type="primary" plain>批量创建短链接</el-button>
          </div>
          <!-- table area -->
          <div
              style="height: calc(100% - 112px);"
              class="w-full h-auto flex flex-col"
          >
            <el-table
                fit
                :header-cell-style="{ background: '#EEF0F5', textAlign: 'center', color: 'black', fontWeight: 'bold' }"
            >
              <el-table-column label="短链接信息" width="300" show-overflow-tooltip />
              <el-table-column label="短链接网址" width="300" show-overflow-tooltip />
              <el-table-column label="访问次数" width="150" />
              <el-table-column label="访问人数" width="150" />
              <el-table-column label="IP数" width="150" />
              <el-table-column label="操作" width="200" fixed="right" />
              <template #empty>
                <el-empty
                    description="暂无短链接"
                />
              </template>
            </el-table>
          </div>
          <!-- pagination -->
          <div class="w-full h-16 flex justify-center items-center mt-auto">
            <BasePagination
                v-model:current-page="currentPage"
                :background="false"
                :page-sizes="pageSizes"
                :page-size="10"
                :layout="'total, sizes, prev, pager, next, jumper'"
            />
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>

</style>
