<script setup lang="ts">
import {onMounted, ref} from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {spaceTableDataGenerator} from "@/componsables/apis/SpaceApis.ts";
import {ChatRound, PieChart, Share} from "@element-plus/icons-vue";
import BaseQRCode from "@/components/base/BaseQRCode.vue";
import {copyTextToClipboard} from "@/utils/CopyUtil.ts";
import {$message} from "@/componsables/element-plus.ts";
import BaseDialog from "@/components/base/BaseDialog.vue";


const pageSizes = ref<number[]>([5, 10, 15]);
const currentPage = ref<number>(1);
const currentSize = ref<number>(10);


/** ==================== 短连接分页管理页面-start ==================== */
const editFlag = ref<boolean>(false);
const delFlag = ref<boolean>(false);
const statsFlag = ref<boolean>(false);
const tableData = ref<SpaceTypes.ShortLinkIPageTableDataType[]>([]);
const downLoadFlag = ref<boolean>(false);
const currentRow = ref<SpaceTypes.ShortLinkIPageTableDataType | null>(null);
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


/**
 * 下载短连接二维码
 */
function downloadQrCode() {
  downLoadFlag.value = !downLoadFlag.value;
}


async function copyFullShortUrl(text: string) {
  await copyTextToClipboard(text).then(() => {
    $message({
      type: "success",
      message: '复制成功'
    });
  }).catch(() => {
    $message({
      type: "error",
      message: '复制失败'
    });
  });
}

// 编辑短链接 -start

const originUrl = ref<string>('');
const shortLinkDescribe = ref<string>('');
const shortLinkGroup = ref<string[]>([]);
const shortLinkValidType = ref<string>('0');

/**
 * 编辑短链接窗口
 * @param row
 */
function editShortLink(row: SpaceTypes.ShortLinkIPageTableDataType) {
  editFlag.value = true;
  currentRow.value = row;
}



function initEditShortLink() {
  editFlag.value = false;
  currentRow.value = null;
}

// 编辑短链接 -end


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
                  width="400"
                  show-overflow-tooltip
              >
                <template #default="{ row }">
                  <div class="w-full h-auto flex items-center">
                    <div
                        style="width: calc(100% - 40px);"
                        class="w-full h-auto flex items-center"
                    >
                      <div class="w-full h-auto flex flex-col items-center">
                        <div class="w-full h-auto cursor-pointer text-blue-400 hover:underline flex items-center overflow-hidden text-ellipsis">
                          https://{{ row?.shortLinkWebsiteInfo.fullShortUrl ? row?.shortLinkWebsiteInfo.fullShortUrl : '未知地址' }}
                        </div>
                        <div class="w-full h-auto text-gray-400 flex items-center overflow-hidden text-ellipsis">
                          {{ row?.shortLinkWebsiteInfo.originUrl ? row?.shortLinkWebsiteInfo.originUrl : '未知地址' }}
                        </div>
                      </div>
                    </div>
                    <div class="w-10 h-10 flex items-center justify-between">
                      <!-- qr-code popover -->
                      <el-popover
                          trigger="click"
                          effect="light"
                          placement="bottom"
                          width="172"
                      >
                        <template #reference>
                          <el-image
                              src="http://shortlink.nageoffer.com/assets/%E4%BA%8C%E7%BB%B4%E7%A0%81-2c225c0e.svg"
                              loading="lazy"
                              fit="contain"
                              style="width: 15px;height: 15px;"
                              class="cursor-pointer"
                          />
                        </template>
                        <template #default>
                          <!-- qrcode -->
                          <div class="w-full h-[132px] flex items-center">
                            <BaseQRCode :flag="downLoadFlag" :link="row?.shortLinkWebsiteInfo.fullShortUrl" :width="200" :height="200" />
                          </div>
                          <!-- download qrcode img -->
                          <div class="w-full h-auto mt-2">
                            <el-button @click="downloadQrCode" type="primary" class="w-full">下载</el-button>
                          </div>
                        </template>
                      </el-popover>
                      <!-- full short-link copy btn -->
                      <el-tooltip
                          effect="light"
                          placement="bottom"
                          content="复制"
                      >
                        <el-icon size="20">
                          <Share @click="copyFullShortUrl('https://' + row?.shortLinkWebsiteInfo.fullShortUrl)" class="text-blue-400 cursor-pointer" />
                        </el-icon>
                      </el-tooltip>
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
                    <el-button @click="editShortLink(row)" type="text" icon="Setting">设置</el-button>
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
  <!-- 统计短链接窗口 -->
  <!-- 编辑短链接窗口 -->
  <BaseDialog
      v-model:visible="editFlag"
      title="编辑短链接"
      width="500"
  >
    <template #body>
      <div class="w-full h-auto flex flex-col">
        <el-form label-width="auto">
          <el-form-item label="跳转链接" required>
            <el-input
                v-model="currentRow.shortLinkWebsiteInfo.originUrl"
                clearable
                maxlength="300"
                placeholder="请输入跳转链接"
                class="w-full"
            />
          </el-form-item>
          <el-form-item required label="描述信息">
            <textarea v-model="currentRow.shortLinkInfo.describe" maxlength="300" placeholder="请输入短链接描述" class="w-full bg-[#EEF0F5] h-20 p-4 resize-none" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end">
        <el-button @click="() => editFlag = false" type="primary">确认</el-button>
        <el-button @click="initEditShortLink" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- 删除短链接窗口 -->
</template>

<style scoped>

</style>
