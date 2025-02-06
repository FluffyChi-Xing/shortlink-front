<script setup lang="ts">
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeAside from "@/components/home/HomeAside.vue";
import HomeMenu from "@/components/home/HomeMenu.vue";
import { ref } from "vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import HomeHeaderFunctionalBanner from "@/components/home/HomeHeaderFunctionalBanner.vue";



/** ======= 分组创建窗口-start ====== */
const dialogVisible = ref<boolean>(false);
const groupName = ref<string>('');
function handleCreateGroup() {
  dialogVisible.value = true;
}

/** ======= 分组创建窗口-end ====== */
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
              @create="handleCreateGroup"
          >
            <template #default>
              <HomeMenu />
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
</template>

<style scoped>
:deep(.el-header) {
  padding: 0!important;
}
</style>
