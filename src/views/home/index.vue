<script setup lang="ts">
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeAside from "@/components/home/HomeAside.vue";
import HomeMenu from "@/components/home/HomeMenu.vue";
import {onMounted, ref, watch} from "vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import HomeHeaderFunctionalBanner from "@/components/home/HomeHeaderFunctionalBanner.vue";
import BaseDraggableComp from "@/components/draggable/BaseDraggableComp.vue";
import ShortLinkItem from "@/components/shortlink/ShortLinkItem.vue";
import type {ShortLinkTypes} from "@/componsables/apis/ShortLinkTypes";
import {$const} from "@/componsables/const.ts";
import {useRoute} from "vue-router";
import SpaceAccessHistory from "@/components/space/SpaceAccessHistory.vue";
import {$api} from "@/componsables/api.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {useCounterStore} from "@/stores/counter.ts";



const route = useRoute();
const store = useCounterStore();
/** ======= 分组创建窗口-start ====== */
const dialogVisible = ref<boolean>(false);
const groupName = ref<string>('');
function handleCreateGroup() {
  dialogVisible.value = true;
}

/** ======= 分组创建窗口-end ====== */


/** ======= 短链接分组-start ====== */
const groupListCount = ref<number>(0);
const groupStat = ref<boolean>(false);
const groupEdit = ref<boolean>(false);
const groupDel = ref<boolean>(false);
const currentGroupIndex = ref<string | number>();
const groupCount = ref<number>(0);
const groupList = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);

// 短链接统计事件
function handleStatistics(index: string | number) {
  groupStat.value = true;
  currentGroupIndex.value = index;
}
// 短链接编辑事件
function handleEdit(index: number | string) {
  currentGroupIndex.value = index;
  groupEdit.value = true;
}
// 短链接删除事件
function handleDel(index: number | string) {
  currentGroupIndex.value = index;
  groupDel.value = true;
}
// 分组选中事件
function handleSelected(gid: string) {
  groupList.value.forEach(item => {
    item.selected = false; // 先将全部的分组选中状态设置为false
    if (item.gid === gid) {
      item.selected = true; // 将当前选中的分组选中状态设置为true
    }
  })
}

function checkSelected() {
  if ($const.ROUTE_WHITE_LIST.includes(route.path)) {
    groupList.value.forEach(item => {
      item.selected= false; // 如果当前页面不为短链接分组详情页面，则将全部的分组选中状态设置为false
    })
  } else {
    groupList.value.forEach(item => {
      if (route.path === $const.DEFAULT_ROUTER_PREFIX + item.gid) {
        item.selected = true;
      }
    })
  }
}


/**
 * 获取短链接分组列表
 */
async function getGroupList() {
  await $api.getGroupList().then((res: any) => {
    store.shortLinkGroup = []; // 每次重新获取分组时先清空，防止数据不一致
    groupListCount.value = 0;
    res.data.forEach((item: any) => {
      groupListCount.value += 1;
      groupList.value?.push({
        gid: item.gid,
        name: item.name,
        shortLinkCount: item.shortLinkCount,
        selected: false,
        sortOrder: item.sortOrder
      });
      store.shortLinkGroup.push({
        ...item,
        selected: false
      });
    })
  }).catch(error => {
    LogUtil.error(error);
  })
}



onMounted(async () => {
  checkSelected();
  await getGroupList();
})

watch(() => route.path, () => {
  checkSelected();
}, { deep: true })
/** ======= 短链接分组-end ====== */
</script>

<template>
  <div class="w-full h-full flex flex-col bg-[#EEF0F5]">
    <el-container class="w-full h-full">
      <el-header>
        <HomeHeader>
          <template #body>
            <HomeHeaderFunctionalBanner />
          </template>
        </HomeHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <HomeAside
              :count="groupListCount"
              @create="handleCreateGroup"
          >
            <template #default>
              <HomeMenu />
              <!-- short-link item draggable container -->
              <BaseDraggableComp
                  :list="groupList"
                  :sort="true"
              >
                <template #component>
                  <ShortLinkItem
                      v-for="(item, index) in groupList"
                      :key="index"
                      :group-name="item.name"
                      :count="item.shortLinkCount"
                      :selected="item.selected"
                      :gid="item.gid"
                      @statistics="handleStatistics"
                      @edit="handleEdit"
                      @delete="handleDel"
                      @select="handleSelected"
                  />
                </template>
              </BaseDraggableComp>
            </template>
          </HomeAside>
        </el-aside>
        <el-main>
          <div class="w-full h-full flex flex-col">
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- create group dialog -->
  <BaseDialog
      v-model:visible="dialogVisible"
      title="创建分组"
  >
    <template #body>
      <el-form-item
          required
          label="分组名称"
      >
        <el-input
            v-model="groupName"
            placeholder="请输入分组名称"
            clearable
            class="w-full"
            prefix-icon="Search"
        />
      </el-form-item>
    </template>
    <template #footer>
      <div class="w-full h-auto justify-end items-center">
        <el-button @click="() => dialogVisible = false" type="info">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- short-link group statistics dialog -->
  <BaseDialog
      v-model:visible="groupStat"
      :title="`统计 ${ currentGroupIndex } 分组的信息, 共计 ${ groupCount } 条短连`"
      width="500"
      :draggable="true"
  >
    <template #body>
       <el-scrollbar height="400">
         <div class="w-full h-full flex flex-col">
           <el-tabs type="border-card" class="w-full">
             <el-tab-pane label="访问数据">
               <!-- 访问数据组件 -->
             </el-tab-pane>
             <el-tab-pane label="历史记录">
               <!-- 历史记录组件 -->
               <SpaceAccessHistory />
             </el-tab-pane>
           </el-tabs>
         </div>
       </el-scrollbar>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end items-center">
        <el-button @click="() => groupStat = false" type="info">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- short-link group edit dialog -->
  <BaseDialog
      v-model:visible="groupEdit"
      title="编辑短链接分组"
  >
    <template #body>
      <el-form-item
          required
          label="分组名称"
      >
        <el-input
            v-model="currentGroupIndex"
            placeholder="请输入分组名称"
            clearable
            prefix-icon="Edit"
            class="w-60"
        />
      </el-form-item>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end items-center">
        <el-button type="info" @click="() => groupEdit = false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- short-link group delete dialog -->
  <BaseDialog
      v-model:visible="groupDel"
      title="删除短链接分组"
  >
    <template #body>
      <div class="w-full h-auto flex whitespace-pre-line text-red-500">
        你确定要删除 {{ currentGroupIndex }} 吗？
      </div>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end items-center">
        <el-button type="info" @click="() => groupDel = false">取消</el-button>
        <el-button type="danger">删除</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
:deep(.el-header) {
  padding: 0!important;
}
</style>
