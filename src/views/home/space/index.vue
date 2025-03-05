<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {spaceTableDataGenerator} from "@/componsables/apis/SpaceApis.ts";
import BaseDialog from "@/components/base/BaseDialog.vue";
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";
import ShortLinkCellInfo from "@/views/home/space/components/ShortLinkCellInfo.vue";
import ShortLinkCellWebsiteInfo from "@/views/home/space/components/ShortLinkCellWebsiteInfo.vue";
import ShortLinkCellPv from "@/views/home/space/components/ShortLinkCellPv.vue";
import ShortLinkCellUip from "@/views/home/space/components/ShortLinkCellUip.vue";
import ShortLinkCellUv from "@/views/home/space/components/ShortLinkCellUv.vue";
import {$api} from "@/componsables/api.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {useRoute} from "vue-router";
import {useCounterStore} from "@/stores/counter.ts";


const pageSizes = ref<number[]>([5, 10, 15]);
const currentPage = ref<number>(1);
const currentSize = ref<number>(10);
const currentGid = ref<string>('');
const route = useRoute();


/** ==================== 短连接分页管理页面-start ==================== */
const editFlag = ref<boolean>(false);
const delFlag = ref<boolean>(false);
const statsFlag = ref<boolean>(false);
const store = useCounterStore();
// 短链接分组列表
const shortLinkGroupList = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);
const tableData = ref<SpaceTypes.ShortLinkIPageTableDataType[]>([]);
// const downLoadFlag = ref<boolean>(false);
const currentRow = ref<SpaceTypes.ShortLinkIPageTableDataType | null>(null);
// 后端响应
const shortLinkIPageData = ref<SpaceTypes.ShortLinkIPageType[]>([]);


function resetBindData() {
  tableData.value = [];
  shortLinkIPageData.value = [];
  currentSize.value = pageSizes.value[1];
  currentPage.value = 1;
}



/**
 * 获取短链接分页列表
 */
async function getTableData() {
  resetBindData(); // 重置数据
  await $api.getShortLinkPage(currentPage.value, currentSize.value, currentGid.value).then((res: any) => {
    res.data.records.forEach((item: any) => {
      shortLinkIPageData.value.push(item);
    });
    tableData.value = spaceTableDataGenerator(shortLinkIPageData.value);
  }).catch((error) => {
    // LogUtil.error(error);
    console.log(error);
  })
}

// 编辑短链接 -start

const originUrl = ref<string>();
const shortLinkDescribe = ref<string>( );
const shortLinkGroup = ref<string>();
const shortLinkValidType = ref<string>('0');
const validDate = ref<string>();

/**
 * 编辑短链接窗口
 * @param row
 */
function editShortLink(row: SpaceTypes.ShortLinkIPageTableDataType) {
  editFlag.value = true;
  currentRow.value = row;
  initEditFormData(); // 在打开编辑短链接弹窗的时候初始化回显数据
}


/**
 * 数据回显初始化函数
 */
function initEditFormData() {
  originUrl.value = currentRow.value?.shortLinkWebsiteInfo.originUrl;
  shortLinkDescribe.value = currentRow.value?.shortLinkInfo.describe;
  shortLinkGroupList.value.forEach((item: ShortLinkTypes.shortLinkGroupTypes) => {
    if (item.gid === currentRow.value?.shortLinkInfo.gid) {
      shortLinkGroup.value = item.gid;
    }
  })
}


/**
 * 窗口关闭初始化函数
 */
function initEditShortLink() {
  editFlag.value = false;
  currentRow.value = null;
  // 清除回显数据
  originUrl.value = '';
  shortLinkDescribe.value = '';
  shortLinkGroup.value = '';
}

// 编辑短链接 -end



// 删除短链接 -start


const delShortLinkName = ref<string>('未知');

/**
 * 删除短连接触发器
 * @param row
 */
function delShortLink(row: SpaceTypes.ShortLinkIPageTableDataType) {
  delFlag.value = true;
  currentRow.value = row;
  delShortLinkName.value = row?.shortLinkInfo.describe ? row?.shortLinkInfo.describe : '未知短链';
}


// 删除短链接 -end



// 统计短链接 -start

const statsShortLinkName = ref<string>('未知');


/**
 * 统计短链接触发器
 * @param row
 */
function statsShortLink(row: SpaceTypes.ShortLinkIPageTableDataType) {
  statsFlag.value = true;
  currentRow.value = row;
  statsShortLinkName.value = row?.shortLinkInfo.describe ? row?.shortLinkInfo.describe : '未知短链';
}

// 统计短链接 -end
const createFlag = ref<boolean>(false);
const createShortLinkOriginUrl = ref<string>();
const createShortLinkDescribe = ref<string>();
const createShortLinkGroup = ref<string>();
const createShortLinkValidType = ref<string>('0');
const createShortLinkValidDate = ref<string>();
// 批量创建短链接
const batchCreateFlag = ref<boolean>(false);
const batchCreateShortLinkUrl = ref<string[]>([]);
const batchCreateShortLinkDescribes = ref<string[]>([]);
const batchCreateShortLinkGroup = ref<string>();
const batchCreateShortLinkValidType = ref<string>('0');
const batchCreateShortLinkValidDate = ref<string>();


/**
 * 创建短链接弹窗触发器
 */
function createShortLinkHandler() {
  createFlag.value = true;
}


function batchCreateShortLinkHandler() {
  batchCreateFlag.value = true;
}


/**
 * 取消创建短链接函数
 */
function cancelCreateShortLinkHandler() {
  createFlag.value = false;
  initCreateShortLinkBindData();
}


function cancelBatchCreateShortLinkHandler() {
  batchCreateFlag.value = false;
  initBatchCreateShortLinkBindData();
}


/**
 * 关闭窗口数据初始化函数
 */
function initCreateShortLinkBindData() {
  createShortLinkOriginUrl.value = '';
  createShortLinkDescribe.value = '';
  createShortLinkGroup.value = '';
  createShortLinkValidType.value = '0';
  createShortLinkValidDate.value = '';
}


function initBatchCreateShortLinkBindData() {
  batchCreateShortLinkUrl.value = [];
  batchCreateShortLinkDescribes.value = [];
  batchCreateShortLinkGroup.value = '';
  batchCreateShortLinkValidType.value = '0';
  batchCreateShortLinkValidDate.value = '';
}


// 短链接创建 -start



// 短链接创建 -end
// TODO: 处理编辑短链接弹窗 过期时间 选择的回显效果


onMounted(async () => {
  shortLinkGroupList.value = store.shortLinkGroup;
  currentGid.value = route.params.groupName as string;
  await getTableData();
})



watch(() => route.params.groupName, async () => {
  currentGid.value = route.params.groupName as string;
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
            <el-button @click="createShortLinkHandler" type="primary">创建短链接</el-button>
            <el-button @click="batchCreateShortLinkHandler" type="primary" plain>批量创建短链接</el-button>
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
                :row-style="{ height: '50px' }"
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
                    <el-button @click="statsShortLink(row)" type="text" icon="PieChart">统计</el-button>
                    <el-button @click="editShortLink(row)" type="text" icon="Setting">设置</el-button>
                    <el-button @click="delShortLink(row)" type="text" icon="Delete">删除</el-button>
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
  <BaseDialog
      v-model:visible="statsFlag"
      width="600"
      title="统计短链接"
  >
    <template #body>
      <el-empty
          description="暂无统计数据"
      />
    </template>
    <template #footer>
      <div class="w-full h-auto flex items-center justify-end">
        <el-button type="primary">确认</el-button>
        <el-button @click="() => statsFlag = false" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
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
                v-model="originUrl"
                clearable
                maxlength="300"
                placeholder="请输入跳转链接"
                class="w-full"
            />
          </el-form-item>
          <el-form-item required label="描述信息">
            <textarea v-model="shortLinkDescribe" maxlength="300" placeholder="请输入短链接描述" class="w-full bg-[#EEF0F5] h-20 p-4 resize-none" />
          </el-form-item>
          <el-form-item required label="短链分组">
            <el-select
                v-model="shortLinkGroup"
                placeholder="请选择短链接分组"
                class="w-full"
            >
              <el-option
                  v-for="(item, index) in shortLinkGroupList"
                  :key="index"
                  :label="item.name"
                  :value="item.gid"
              />
            </el-select>
          </el-form-item>
          <el-form-item required label="有效期">
            <el-radio-group
                v-model="shortLinkValidType"
            >
              <el-radio-button
                  value="0"
              >
                永久
              </el-radio-button>
              <el-radio-button
                  value="1"
              >
                自定义
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
              v-if="shortLinkValidType === '1'"
              required
              label="选择时间"
          >
            <el-date-picker
                v-model="validDate"
                type="date"
                placeholder="选择过期时间"
                size="default"
            />
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
  <BaseDialog
      v-model:visible="delFlag"
      title="删除短链接"
      width="500"
  >
    <template #body>
      <div class="w-full h-auto flex items-center whitespace-pre-line text-red-500 font-bold">
        你确定要将短链接 [ {{ delShortLinkName }} ] 放入回收站吗 ?
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex items-center justify-end">
        <el-button type="primary">确认</el-button>
        <el-button @click="() => delFlag = false" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- 创建短链接接口 -->
  <BaseDialog
      v-model:visible="createFlag"
      width="500"
      title="创建短链接"
  >
    <template #body>
      <div class="w-full h-auto flex flex-col">
        <el-form
            label-width="auto"
            class="w-full"
        >
          <el-form-item label="跳转链接" required>
            <el-input
                v-model="createShortLinkOriginUrl"
                placeholder="请输入 http://或 https:// 开头的原始链接"
                clearable
                maxlength="300"
                class="w-full"
            />
          </el-form-item>
          <el-form-item required label="描述信息">
            <textarea
                v-model="createShortLinkDescribe"
                placeholder="请输入短链接描述"
                class="w-full h-20 p-4 bg-[#EEF0F5] resize-none"
                maxlength="300"
            />
          </el-form-item>
          <el-form-item required label="短链分组">
            <el-select
                v-model="createShortLinkGroup"
                placeholder="请选择短链接分组"
                class="w-full"
            >
              <el-option
                  v-for="(item, index) in shortLinkGroupList"
                  :key="index"
                  :label="item.name"
                  :value="item.gid"
              />
            </el-select>
          </el-form-item>
          <el-form-item required label="有效期">
            <el-radio-group
                v-model="createShortLinkValidType"
            >
              <el-radio-button
                  value="0"
              >
                永久
              </el-radio-button>
              <el-radio-button
                  value="1"
              >
                自定义
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
              v-if="createShortLinkValidType === '1'"
              required
              label="选择时间"
          >
            <el-date-picker
                v-model="createShortLinkValidDate"
                type="date"
                placeholder="选择过期时间"
                size="default"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex items-center justify-end">
        <el-button type="primary">确认</el-button>
        <el-button @click="cancelCreateShortLinkHandler" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- 批量创建短链接窗口 -->
  <BaseDialog
      v-model:visible="batchCreateFlag"
      title="批量创建短链接"
      width="500"
  >
    <template #body>
      <div class="w-full h-auto flex flex-col">
        <el-form
            label-width="auto"
            class="w-full"
        >
          <el-form-item label="跳转链接" required>
            <textarea
                v-model="batchCreateShortLinkUrl"
                placeholder="请输入 http://或 https:// 开头的原始链接 并用 , 号分隔"
                class="w-full h-20 p-4 bg-[#EEF0F5] resize-none"
            />
          </el-form-item>
          <el-form-item label="描述信息" required>
            <textarea
                v-model="batchCreateShortLinkDescribes"
                placeholder="请输入 短链接描述信息 并用 , 号分隔"
                class="w-full h-20 p-4 bg-[#EEF0F5] resize-none"
            />
          </el-form-item>
          <el-form-item required label="有效期">
            <el-radio-group
                v-model="batchCreateShortLinkValidType"
            >
              <el-radio-button
                  value="0"
              >
                永久
              </el-radio-button>
              <el-radio-button
                  value="1"
              >
                自定义
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
              v-if="batchCreateShortLinkValidType === '1'"
              required
              label="选择时间"
          >
            <el-date-picker
                v-model="batchCreateShortLinkValidDate"
                type="date"
                placeholder="选择过期时间"
                size="default"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex items-center justify-end">
        <el-button type="primary">确认</el-button>
        <el-button @click="cancelBatchCreateShortLinkHandler" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
