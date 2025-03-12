<script setup lang="ts">
import {VueDraggableNext} from "vue-draggable-next";

const props = withDefaults(defineProps<{
  list?: any[]; // 拖拽绑定数组
  sort?: boolean; // 是否开启拖拽排序
  delay?: number; // 拖拽延迟时间
  disabled?: boolean; // 是否禁用拖拽
  animation?: number; // 拖拽动画效果
  handle?: string; // 可被拖动的元素类名
  filter?: string; // 不可被拖动的元素类名
  ghostClass?: string; // 拖拽元素类名
  chosenClass?: string; // 选中元素类名
  start?: Function // 拖拽开始事件
  ended?: Function // 拖拽停止事件
  height?: number | string;
}>(), {
  sort: false,
  delay: 0,
  disabled: false,
  animation: 500,
  start: () => console.log("开始拖拽"),
  ended: () => console.log("拖拽结束"),
  height: 444,
  list: () => []
})



const emit = defineEmits(['drag-end']);
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-scrollbar :height="height">
      <VueDraggableNext
          :list="props?.list"
          :ghost-class="ghostClass"
          :chosen-class="chosenClass"
          :animation="animation"
          :sort="sort"
          @start="start"
          @end="() => emit('drag-end')"
      >
        <transition-group>
          <slot
              v-if="props?.list.length > 0"
              name="component"
          />
          <el-empty
              v-else
              class="w-auto h-auto flex m-auto"
          />
        </transition-group>
      </VueDraggableNext>
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
