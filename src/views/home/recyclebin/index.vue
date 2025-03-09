<script setup lang="ts">
import {onMounted, ref} from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import {useRouter} from "vue-router";
import BasePagination from "@/components/base/BasePagination.vue";
import {useCounterStore} from "@/stores/counter.ts";
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import ShortLinkCellUv from "@/views/home/space/components/ShortLinkCellUv.vue";
import ShortLinkCellInfo from "@/views/home/space/components/ShortLinkCellInfo.vue";
import ShortLinkCellWebsiteInfo from "@/views/home/space/components/ShortLinkCellWebsiteInfo.vue";
import ShortLinkCellUip from "@/views/home/space/components/ShortLinkCellUip.vue";
import ShortLinkCellPv from "@/views/home/space/components/ShortLinkCellPv.vue";
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";
import {$api} from "@/componsables/api.ts";
import {$message} from "@/componsables/element-plus.ts";
import {spaceTableDataGenerator} from "@/componsables/apis/SpaceApis.ts";



/** ===== 回收站页面-start ===== **/
const router = useRouter();
const recycleBinCount = ref<number>(0);
const store = useCounterStore();
const tableData = ref<SpaceTypes.ShortLinkIPageTableDataType[]>([]);
const response = ref<SpaceTypes.ShortLinkIPageType[]>([]);
const current = ref<number>(1);
const size = ref<number>(10);
const gidList = ref<string>()


/**
 * 获取全部用户短链接分组 ids
 */
function getGidList() {
  let gidList: string[] = [];
  let result: string = '';
  if (store.shortLinkGroup.length > 0) {
    store.shortLinkGroup.forEach((item: ShortLinkTypes.shortLinkGroupTypes) => {
      gidList.push(item.gid);
    })
  } else {
    gidList = [];
  }
  // 将数组内容处理成逗号分隔的连续字符串
  if (gidList.length > 0) {
    result = gidList.join(',')
  }
  return result;
}

// TODO: 回收站获取接口后端不应该返回 fullShortUrl 的 prefix -> http://
/**
 * 获取回收站数据
 */
async function getTableData() {
  await $api.getRecycleBinPage(
      getGidList(),
      current.value,
      size.value
  ).then((res: any) => {
    $message({
      type: 'info',
      message: '获取成功'
    });
    tableData.value = []; // 初始化数据
    tableData.value = spaceTableDataGenerator(res.list);
    recycleBinCount.value = res.total;
  }).catch((error: string) => {
    $message({
      type: 'error',
      message: error
    });
  });
}


onMounted(async () => {
  await getTableData();
});
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
                  <ShortLinkCellInfo :row="row" />
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkWebsiteInfo"
                  label="短链接网址"
                  width="400"
                  show-overflow-tooltip
              >
                <template #default="{ row }">
                  <ShortLinkCellWebsiteInfo
                      :row="row"
                  />
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkPv"
                  label="访问次数"
                  width="150"
              >
                <template #default="{ row }">
                  <ShortLinkCellPv :row="row" />
                </template>
              </el-table-column>
              <el-table-column
                  prop="shortLinkUv"
                  label="访问人数"
                  width="150"
              >
                <template #default="{ row }">
                  <ShortLinkCellUv :row="row" />
                </template>
              </el-table-column>
              <el-table-column prop="shortLinkUip" label="IP数" width="150">
                <template #default="{ row }">
                  <ShortLinkCellUip :row="row" />
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
