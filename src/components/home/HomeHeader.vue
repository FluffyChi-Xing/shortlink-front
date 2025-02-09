<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();


function goHome() {
  router.push('/home')
}
</script>

<template>
  <div class="w-full h-full flex flex-row row-span-2 px-4 gap-4 bg-[#252B30]">
    <!-- left title -->
    <div
        style="font-weight: 600;"
        class="w-full h-full flex items-center text-[1.2rem] cursor-pointer text-[#e8e8e8]"
        @click="goHome"
    >
      SaaS短链接服务平台
    </div>
    <!-- right functional slot -->
    <div class="w-full h-full flex justify-end overflow-hidden items-center">
      <slot name="body" />
    </div>
  </div>
</template>

<style scoped>

</style>
