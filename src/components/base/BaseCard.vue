<script setup lang="ts">
withDefaults(defineProps<{
  shadows?: boolean
  title?: string;
}>(),{
  shadows: false
});
</script>

<template>
  <el-card
      :shadow="shadows"
      class="w-auto h-auto flex flex-col"
      :header="title"
  >
    <template #default>
      <slot name="body" />
    </template>
  </el-card>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
  padding: 0!important;
}
</style>
