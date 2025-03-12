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
import {$api} from "@/componsables/api.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {useCounterStore} from "@/stores/counter.ts";
import {$message} from "@/componsables/element-plus.ts";



const route = useRoute();
const store = useCounterStore();
const isLoading = ref<boolean>(false);
/** ======= 分组创建窗口-start ====== */
const dialogVisible = ref<boolean>(false);
const groupName = ref<string>('');
function handleCreateGroup() {
  dialogVisible.value = true;
}

/** ======= 分组创建窗口-end ====== */


/** ======= 短链接分组-start ====== */
const groupListCount = ref<number>(0);
// const groupStat = ref<boolean>(false);
const groupEdit = ref<boolean>(false);
const groupDel = ref<boolean>(false);
const currentGroupIndex = ref<string | number>();
// const groupCount = ref<number>(0);
const groupList = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]);
const sortedGroupList = ref<ShortLinkTypes.shortLinkGroupTypes[]>([]); // 排序后的数组
const sortRequestList = ref<ShortLinkTypes.ShortLinkSortRequestType[]>([]); // 以 , 分隔的字符串

// 短链接编辑事件
function handleEdit(params: string[]) {
  groupName.value = params[0] as string;
  currentGroupIndex.value = params[1] as string;
  groupEdit.value = true;
}


/**
 * 编辑短链接分组信息
 */
async function changeGroupInfoHandler() {
  await $api.updateShortLinkGroup(
      currentGroupIndex.value as string,
      groupName.value
  ).then(async (res: string) => {
    $message({
      type: 'info',
      message: res
    });
    // 刷新分组列表
    await getGroupList();
    // 关闭窗口
    groupEdit.value = false;
  }).catch(error => {
    $message({
      type: 'error',
      message: error
    });
    // 关闭窗口
    groupEdit.value = false;
  });
}



// 短链接删除事件
function handleDel(gid: number | string) {
  currentGroupIndex.value = gid;
  groupDel.value = true;
}


/**
 * 删除空分组
 */
async function deleteShortLinkGroup() {
  await $api.deleteGroupItem(currentGroupIndex.value).then(async (res: string) => {
    $message({
      type: 'info',
      message: res
    });
    // 刷新分组列表
    await getGroupList();
    // 关闭窗口
    groupDel.value = false;
  }).catch(error => {
    $message({
      type: 'error',
      message: error
    });
    groupDel.value = false;
  });
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
 * 初始情况下的数组重拍
 */
async function resortList() {
  sortedGroupList.value = [];
  groupList.value.forEach((item: ShortLinkTypes.shortLinkGroupTypes, index: number) => {
    sortedGroupList.value.push({
      selected: false,
      name: item.name,
      sortOrder: index,
      shortLinkCount: item.shortLinkCount,
      gid: item.gid
    });
  });
  groupList.value = [...sortedGroupList.value];
}


/**
 * 正常情况下的数组顺序重排
 */
async function sortList() {
  sortedGroupList.value = [];
  sortedGroupList.value = groupList.value.sort((a, b) => a.sortOrder - b.sortOrder);
  groupList.value = [...sortedGroupList.value];
}


/**
 * 检查当前分组列表的排序情况
 */
async function sortGroupList() {
  // 检查当前分组是否为初始情况 即 sortOrder 为 0,如果是，则按当前顺序从上到下给 sortOrder 赋值
  if (groupList.value.length > 0) {
    let zeroCount = 0;
    groupList.value.some(item => {
      if (item.sortOrder === 0) {
        zeroCount ++;
      }
    })
    if (zeroCount === groupList.value.length) {
      // 按当前顺序排列赋值
      await resortList();
    } else {
      // 否则按照 sortOrder 顺序赋值
      await sortList();
    }
  }
}

/**
 * 获取短链接分组列表
 */
async function getGroupList() {
  isLoading.value = true;
  await $api.getGroupList().then(async (res: any) => {
    store.shortLinkGroup = []; // 每次重新获取分组时先清空，防止数据不一致
    groupListCount.value = 0;
    groupList.value = [];// 初始化分组列表
    sortedGroupList.value = [];
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
    });
    // 处理数组排序问题
    await sortGroupList();
    isLoading.value = false;
    // console.log(sortedGroupList.value)
  }).catch(error => {
    LogUtil.error(error);
    isLoading.value = false;
  })
}

// 创建新的短链接分组-start
function cancelCreateGroup() {
  groupName.value = '';
  dialogVisible.value = false;
}


/**
 * 处理创建分组事件
 */
async function createGroupHandler() {
  if (groupName.value) {
    await $api.saveShortLinkGroup(groupName.value).then(async (res: string) => {
      $message({
        type: 'info',
        message: res
      })
      // 刷新分组列表
      await getGroupList();
      // 关闭弹窗
      dialogVisible.value = false;
      // 初始化分组名称
      groupName.value = '';
    }).catch();
  } else {
    $message({
      type: 'warning',
      message: '分组名称不能为空'
    })
  }
}


/**
 * 处理短链接分组排序
 */
/**
 * 处理短链接分组排序
 */
async function shortLinkGroupSortHandler() {
  // if (sortedGroupList.value.length > 0) {
  //   sortRequestList.value = sortedGroupList.value.map((item: ShortLinkTypes.shortLinkGroupTypes) => ({
  //     gid: item.gid,
  //     sortOrder: item.sortOrder
  //   }));
  //   await $api.sortShortLinkGroup(sortRequestList.value)
  //       .then(async () => {
  //         // 初始化排序请求字符串
  //         sortRequestList.value = [];
  //         // 初始化排序后的数组
  //         sortedGroupList.value = [];
  //         // 重新获取分组列表
  //         await getGroupList();
  //       })
  //       .catch(err => {
  //         $message({
  //           type: 'error',
  //           message: err
  //         });
  //         sortRequestList.value = []; // 初始化排序请求字符串
  //       });
  // }


  $message({
    type: 'warning',
    message: '暂未开放排序功能'
  });
}


// 创建新的短链接分组-end


onMounted(async () => {
  checkSelected();
  await getGroupList();
})

watch(() => route.path, () => {
  checkSelected();
}, { deep: true })


/**
 * 刷新数据检测
 */
watch(() => store.refreshFlag, async () => {
  await getGroupList();
}, { deep: true });


// 检查短链接分组顺序变动
watch(() => groupList.value, async () => {
  // 重新排列数组
  await sortGroupList();
  // await shortLinkGroupSortHandler();
}, { deep: true });
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
                  v-loading="isLoading"
                  :list="groupList"
                  :sort="true"
                  @drag-end="shortLinkGroupSortHandler"
              >
                <template #component>
                  <ShortLinkItem
                      v-for="(item, index) in groupList"
                      :key="index"
                      :group-name="item.name"
                      :count="item.shortLinkCount"
                      :selected="item.selected"
                      :gid="item.gid"
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
        <el-button @click="createGroupHandler" type="primary">确认</el-button>
        <el-button @click="cancelCreateGroup" type="info">取消</el-button>
      </div>
    </template>
  </BaseDialog>
  <!-- short-link group statistics dialog -->
<!--  <BaseDialog-->
<!--      v-model:visible="groupStat"-->
<!--      :title="`统计 ${ currentGroupIndex } 分组的信息, 共计 ${ groupCount } 条短连`"-->
<!--      width="500"-->
<!--      :draggable="true"-->
<!--  >-->
<!--    <template #body>-->
<!--       <el-scrollbar height="400">-->
<!--         <div class="w-full h-full flex flex-col">-->
<!--           <el-tabs type="border-card" class="w-full">-->
<!--             <el-tab-pane label="访问数据">-->
<!--               &lt;!&ndash; 访问数据组件 &ndash;&gt;-->
<!--             </el-tab-pane>-->
<!--             <el-tab-pane label="历史记录">-->
<!--               &lt;!&ndash; 历史记录组件 &ndash;&gt;-->
<!--               <SpaceAccessHistory />-->
<!--             </el-tab-pane>-->
<!--           </el-tabs>-->
<!--         </div>-->
<!--       </el-scrollbar>-->
<!--    </template>-->
<!--    <template #footer>-->
<!--      <div class="w-full h-auto flex justify-end items-center">-->
<!--        <el-button type="primary">确认</el-button>-->
<!--        <el-button @click="() => groupStat = false" type="info">取消</el-button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </BaseDialog>-->
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
            v-model="groupName"
            placeholder="请输入分组名称"
            clearable
            prefix-icon="Edit"
            class="w-60"
        />
      </el-form-item>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-end items-center">
        <el-button @click="changeGroupInfoHandler" type="primary">确认</el-button>
        <el-button type="info" @click="() => groupEdit = false">取消</el-button>
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
        <el-button @click="deleteShortLinkGroup" type="danger">删除</el-button>
        <el-button type="info" @click="() => groupDel = false">取消</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
:deep(.el-header) {
  padding: 0!important;
}
</style>
