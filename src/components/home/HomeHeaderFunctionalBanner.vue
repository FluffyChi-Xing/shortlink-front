<script setup lang="ts">
import {useRouter} from "vue-router";

withDefaults(defineProps<{
  username?: string;
}>(), {
  username: 'test'
})


const router = useRouter();
</script>

<template>
  <div
      style="font-size: 15px;font-weight: 600;outline: none;"
      class="w-auto h-full flex items-center"
  >
    <div class="text-[#e8e8e8] cursor-pointer px-4 hover:underline hover:text-white">
      Github
    </div>
    <el-dropdown>
      <template #default>
        <div class="text-[#e8e8e8] el-dropdown-link cursor-pointer px-4 hover:text-white">
          {{ username }}
        </div>
      </template>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="() => router.push('/home/user')">
            个人信息
          </el-dropdown-item>
          <el-dropdown-item>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
:deep(.el-dropdown) {
  outline: none!important;
  border: none!important;
}

.el-dropdown-link {
  outline: none!important;
}
</style>
