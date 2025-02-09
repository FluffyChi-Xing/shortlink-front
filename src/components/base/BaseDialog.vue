<script setup lang="ts">
import type {VNode} from "vue";
import {onMounted, ref, watch} from "vue";


const props = withDefaults(defineProps<{
  width?: string | number;
  draggable?: boolean;
  showClose?: boolean;
  modal?: boolean;
  title?: string;
  alignCenter?: boolean;
  closeIcon?: string | VNode;
  fullscreen?: boolean;
  visible?: boolean;
}>(), {
  width: 500,
  draggable: false,
  title: '提示',
  alignCenter: false,
  showClose: false,
  fullscreen: false,
  visible: false,
  modal: true
})


const dialogVisible = ref<boolean>(props?.visible);


watch(() => props?.visible, () => {
  dialogVisible.value = props?.visible;
})
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :width="props?.width"
      :draggable="props?.draggable"
      :show-close="props?.showClose"
      :modal="props?.modal"
      :title="props?.title"
      :align-center="props?.alignCenter"
      :close-icon="props?.closeIcon"
      :fullscreen="props?.fullscreen"
  >
    <template #default>
      <slot name="body" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
