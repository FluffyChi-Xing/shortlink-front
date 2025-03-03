<script setup lang="ts">
import {onMounted, ref} from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {spaceTableDataGenerator} from "@/componsables/apis/SpaceApis.ts";
import {ChatRound, PieChart} from "@element-plus/icons-vue";


const pageSizes = ref<number[]>([5, 10, 15]);
const currentPage = ref<number>(1);
const currentSize = ref<number>(10);


/** ==================== 短连接分页管理页面-start ==================== */
const tableData = ref<SpaceTypes.ShortLinkIPageTableDataType[]>([]);
// 后端响应模拟数据
const shortLinkIPageData = ref<SpaceTypes.ShortLinkIPageType[]>([
  {
    id: '1847981660247695362',
    domain: "http://url.nageoffer.com",
    shortUrl: "2uoYPa",
    fullShortUrl: "url.nageoffer.com/2uoYPa",
    originUrl: "https://juejin.cn/post/7259757499254718524",
    gid: "eCJGh3",
    validDateType: 0,
    enableStatus: 0,
    validDate: null,
    createTime: "2024-10-20 20:42:16",
    describe: "校招：外卖和商城项目不吃香了，我选 12306！铁路购票服务是与大家生活和出行相关的关键系统，包括会员、购票、订单、支付 - 掘金",
    favicon: "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png",
    totalPv: 351,
    todayPV: 4,
    totalUv: 297,
    todayUv: 2,
    totalUip: 287,
    todayUip: 2
  }
]);


async function getTableData() {
  // TODO: 调用后端接口获取分页数据
  tableData.value = spaceTableDataGenerator(shortLinkIPageData.value);
  console.log(tableData.value[0])
}



onMounted(async () => {
  await getTableData();
})
/** ==================== 短连接分页管理页面-end ==================== */
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
                :data="tableData"
                fit
                stripe
                :header-cell-style="{ background: '#EEF0F5', textAlign: 'center', color: 'black', fontWeight: 'bold' }"
            >
              <el-table-column
                  prop="shortLinkInfo"
                  label="短链接信息"
                  width="300"
                  show-overflow-tooltip
              >
                <template #default="{ row }">
                  <div class="w-full h-10 flex items-center">
                    <!-- favicon -->
                    <div class="w-5 h-5 mx-2 flex items-center">
                      <el-image
                          :src="row?.shortLinkInfo.favicon"
                          class="w-full h-full"
                          fit="contain"
                          loading="lazy"
                      />
                    </div>
                    <!-- other info -->
                    <div
                        style="width: calc(100% - 28px);"
                        class="w-auto h-full flex flex-col items-center overflow-hidden"
                    >
                      <div class="w-full h-auto flex text-4 items-center overflow-hidden text-ellipsis">
                        {{ row?.shortLinkInfo.describe ? row?.shortLinkInfo.describe : '未知' }}
                      </div>
                      <div class="w-full h-auto flex text-2 items-center overflow-hidden text-ellipsis">
                        {{ row?.shortLinkInfo.createTime ? row?.shortLinkInfo.createTime : '未知' }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkWebsiteInfo"
                  label="短链接网址"
                  width="350"
                  show-overflow-tooltip
              >
                <template #default="{ row }">
                  <div class="w-full h-auto flex flex-col items-center">
                    <div class="w-full h-auto text-blue-400 hover:underline flex items-center overflow-hidden text-ellipsis">
                      <a href="#">https://{{ row?.shortLinkWebsiteInfo.fullShortUrl ? row?.shortLinkWebsiteInfo.fullShortUrl : '未知地址' }}</a>
                    </div>
                    <div class="w-full h-auto text-gray-400 flex items-center overflow-hidden text-ellipsis">
                      {{ row?.shortLinkWebsiteInfo.originUrl ? row?.shortLinkWebsiteInfo.originUrl : '未知地址' }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkPv"
                  label="访问次数"
                  width="150"
              >
                <template #default="{ row }">
                  <div class="w-full h-auto flex flex-col items-center">
                    <div class="w-full text-gray-400 h-auto flex">
                      今日: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkPv.todayPv > 99 ? '99+' : row?.shortLinkPv.todayPv }}</div>
                    </div>
                    <div class="w-full text-gray-400 h-auto flex">
                      累积: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkPv.totalPv > 99 ? '99+' : row?.shortLinkPv.totalPv }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkUv"
                  label="访问人数"
                  width="150"
              >
                <template #default="{ row }">
                  <div class="w-full h-auto flex flex-col items-center">
                    <div class="w-full text-gray-400 h-auto flex">
                      今日: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkUv.todayUv > 99 ? '99+' : row?.shortLinkUv.todayUv }}</div>
                    </div>
                    <div class="w-full text-gray-400 h-auto flex">
                      累积: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkUv.totalUv > 99 ? '99+' : row?.shortLinkUv.totalUv }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="shortLinkUip" label="IP数" width="150">
                <template #default="{ row }">
                  <div class="w-full h-auto flex flex-col items-center">
                    <div class="w-full text-gray-400 h-auto flex">
                      今日: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkUip.todayUip > 99 ? '99+' : row?.shortLinkUip.todayUip }}</div>
                    </div>
                    <div class="w-full text-gray-400 h-auto flex">
                      累积: <div class="font-bold w-10 flex justify-center text-black">{{ row?.shortLinkUip.totalUip > 99 ? '99+' : row?.shortLinkUip.totalUip }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <div class="w-full h-auto flex justify-between">
                    <el-button type="text" icon="PieChart">统计</el-button>
                    <el-button type="text" icon="Setting">设置</el-button>
                    <el-button type="text" icon="Delete">删除</el-button>
                  </div>
                </template>
              </el-table-column>
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
