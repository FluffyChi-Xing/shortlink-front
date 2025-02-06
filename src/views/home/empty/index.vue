<script setup lang="ts">

import BaseCard from "@/components/base/BaseCard.vue";
</script>

<template>
  <BaseCard class="w-full h-full flex">
    <template #body>
      <div class="w-full h-full flex p-4 justify-center items-center">
        <el-empty
            description="暂无已有短链"
        />
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>
