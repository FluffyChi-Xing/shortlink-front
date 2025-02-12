<script setup lang="ts">
import {ref, watch} from "vue";
import {PieChart, Setting} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {$const} from "@/componsables/const.ts";
const props = withDefaults(defineProps<{
  groupName?: string | number; // 分组名称
  url?: string; // 分组跳转地址
  count?: number; // 分组短链接数量
  selected?: boolean; // 当前是否选中
  gid?: number | string; // 分组gid
}>(), {
  groupName: '默认分组',
  count: 0,
  selected: false
})


const flag = ref<boolean>(false);
const router = useRouter();
const selected = ref<boolean>(props?.selected);
const emits = defineEmits(['statistics', 'edit', 'delete', 'select']);



function handleRoute(path: string | undefined) {
  emits('select', props?.groupName)
  if (path) {
    router.push($const.DEFAULT_ROUTER_PREFIX + path)
  }
}


watch(() => props?.selected, (val: boolean) => {
  selected.value = val;
})
</script>

<template>
  <div
      @mouseenter="flag = true"
      @mouseleave="flag = false"
      @click="handleRoute(props.url)"
      class="w-full h-14 grid grid-cols-5 gap-1 items-center p-4 my-2 hover:shadow-md hover:bg-theme-light"
      :class="selected ? 'bg-theme-light' : 'bg-white'"
  >
    <!-- icon -->
    <div class="w-auto h-auto flex cursor-move">
      <img src="@/assets/img/drag.png" alt="拖动" style="width: 10px;height: 10px;background-repeat: no-repeat;">
    </div>
    <!-- groupName -->
    <div class="w-full h-full flex items-center col-span-2 overflow-hidden text-ellipsis whitespace-nowrap font-bold text-theme-color">
      <el-tooltip
          effect="dark"
          placement="bottom"
          :content="groupName"
      >
        {{ groupName }}
      </el-tooltip>
    </div>
    <!-- short-link account & other functional components -->
    <div class="w-full h-full flex items-center col-span-2">
      <!-- short-link count -->
      <div
          :class="flag ? 'hidden' : 'flex'"
          class="w-full h-full font-bold justify-end text-theme-color overflow-hidden"
      >
        {{ count > 99 ? '99+' : count }}
      </div>
      <!-- other functional components -->
      <div
          :class="flag ? 'flex' : 'hidden'"
          class="w-full h-full font-bold justify-end items-center overflow-hidden"
      >
        <el-tooltip
            effect="dark"
            content="统计"
            placement="bottom"
        >
          <el-icon
              @click="emits('statistics', props?.groupName)"
              :size="16"
              class="mr-2"
          >
            <PieChart class="hover:text-theme-color cursor-pointer" />
          </el-icon>
        </el-tooltip>
        <el-dropdown>
          <el-icon :size="16">
            <Setting class="hover:text-theme-color" />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                  @click="emits('edit', props?.groupName)"
              >
                编辑
              </el-dropdown-item>
              <el-dropdown-item
                  @click="emits('delete', props?.groupName)"
              >
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
