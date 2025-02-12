<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import {CirclePlus, Delete} from "@element-plus/icons-vue";
const props = withDefaults(defineProps<{
  count?: number;
}>(), {
  count: 0
})

const emits = defineEmits(['create']);


/**
 * 处理短链接分组创建事件
 */
function groupCreateHandler() {
  emits('create');
}
</script>

<template>
  <BaseCard class="w-full h-full flex">
    <template #body>
      <div class="w-full h-full flex flex-col">
        <!-- header -->
        <div
            style="box-sizing: border-box;border-bottom: 1px solid #1a2e3a;"
            class="w-full h-14  bg-[#021c27] flex gap-4 px-4 items-center justify-center"
        >
          <div
              class="w-full h-auto text-white text-[15px] font-bold leading-[24px] flex items-end"
          >
            短链分组
            <div class="text-[10px] pl-1">共 {{props?.count}} 组</div>
          </div>
          <div class="w-auto ml-auto cursor-pointer h-auto flex items-center">
            <el-tooltip
                placement="bottom"
                effect="dark"
                content="添加分组"
            >
              <el-icon
                  @click="groupCreateHandler"
              >
                <CirclePlus class="text-blue-500" />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <!-- default -->
        <div
            style="height: calc(100% - 112px);"
            class="w-full h-auto flex flex-col"
        >
          <slot name="default" />
        </div>
        <!-- footer -->
        <div
            style="border-top: 1px solid #E6E6E6;box-sizing: border-box;"
            class="w-full h-14 flex px-4 items-center cursor-pointer justify-center hover:bg-[#E6E6E6]"
        >
          回收站
          <el-icon
              class="pl-1"
          >
            <Delete style="font-size: 15px;" />
          </el-icon>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>
