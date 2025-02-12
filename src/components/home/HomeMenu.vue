<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import type {MenuTypes} from "@/componsables/apis/MenuTypes";
import {useRoute, useRouter} from "vue-router";
import {$const} from "@/componsables/const.ts";


const router = useRouter();
const route = useRoute();
const currentIndex = ref<string>('1');
const menuItemList = ref<MenuTypes.MenuType[]>(
    [
      {
        index: '1',
        label: '首页',
        route: '/home',
      },
      {
        index: '2',
        label: '仪表盘',
        route: '/home/dashboard'
      },
      {
        index: '3',
        label: '用户信息',
        route: '/home/user'
      }
    ]
);


function checkMenuHighLight(path: string, routeList: MenuTypes.MenuType[]) {
  let currentRoute = path;
  routeList?.forEach((item: MenuTypes.MenuType) => {
    if (item?.children?.length !== undefined && item?.children?.length > 0) {
      checkMenuHighLight(currentRoute, item?.children);
    } else if (!$const.ROUTE_WHITE_LIST?.includes(currentRoute)){
      currentIndex.value = ''
    } else {
      if (item?.route === currentRoute) {
        currentIndex.value = item.index;
      }
    }
  })
}


function handleMenuClick(path: string | undefined) {
  if (path) {
    router.push(path);
    checkMenuHighLight(path, menuItemList.value);
  }
}


onMounted(() => {
  checkMenuHighLight(route.path, menuItemList.value);
});


watch(() => route.path, () => {
  checkMenuHighLight(route.path, menuItemList.value);
}, { deep: true })
</script>

<template>
  <div class="w-full h-auto flex flex-col">
    <el-menu
        :default-active="currentIndex"
        active-text-color="#3464E0"
        mode="vertical"
    >
      <el-menu-item
          v-for="(item, index) in menuItemList"
          :key="index"
          :index="item.index"
          :route="item.route"
          @click="handleMenuClick(item?.route)"
      >
        <template #default>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: none!important;
}
</style>
