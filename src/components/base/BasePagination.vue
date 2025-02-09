<script setup lang="ts">
withDefaults(defineProps<{
  currentPage?: number;
  pageSize?: number;
  pageSizes?: number[];
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  background?: boolean;
  total?: number;
  hidden?: boolean; // 当只有一页时，是否隐藏分页器
  layout?: string;
}>(), {
  hidden: false,
  total: 50,
  pageSize: 10,
  background: true,
  size: 'default',
  layout: "prev, pager, next"
})


const emits = defineEmits(['sizeChange', 'currentChange', 'change']);

function sizeChange(index: number) {
  emits('sizeChange', index);
}

function currentChange(index: number) {
  emits('currentChange', index);
}

function change(pageNo: number, pageSize: number) {
  emits('change', pageNo, pageSize);
}
</script>

<template>
  <div class="w-auto h-full flex items-center justify-center">
    <el-pagination
        :page-sizes="pageSizes"
        :size="size"
        :disabled="disabled"
        :background="background"
        :layout="layout"
        :total="total"
        :hide-on-single-page="hidden"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        @change="change"
    />
  </div>
</template>

<style scoped>

</style>
