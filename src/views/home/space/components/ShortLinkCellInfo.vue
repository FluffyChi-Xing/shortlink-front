<script setup lang="ts">
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {checkDateBefore} from "@/componsables/annotation/DateUtilAnnotation.ts";

withDefaults(defineProps<{
  row?: SpaceTypes.ShortLinkIPageTableDataType
}>(), {

})
</script>

<template>
  <div class="w-full h-10 flex items-center">
    <!-- favicon -->
    <div class="w-5 h-5 mx-2 flex items-center">
      <el-image
          :src="row?.shortLinkInfo.favicon"
          class="w-full h-full"
          fit="contain"
          loading="lazy"
      />
    </div>
    <!-- other info -->
    <div
        style="width: calc(100% - 28px);"
        class="w-auto h-full flex flex-col items-center"
    >
      <div class="w-full h-auto flex text-4 items-center overflow-hidden text-ellipsis">
        {{ row?.shortLinkInfo.describe ? row?.shortLinkInfo.describe : '未知' }}
      </div>
      <div class="w-full h-auto grid grid-cols-2 items-center">
        <div class="w-full h-auto flex items-center text-ellipsis overflow-hidden">
          {{ row?.shortLinkInfo.createTime ? row?.shortLinkInfo.createTime : '未知' }}
        </div>
        <div class="w-full h-auto flex justify-end items-center">
          <el-tag
              :type="checkDateBefore(row?.shortLinkInfo.validDate) ? 'success' : 'danger'"
              size="small"
              :effect="checkDateBefore(row?.shortLinkInfo.validDate) ? 'plain' : 'dark'"
          >
            {{ checkDateBefore(row?.shortLinkInfo.validDate) ? '有效' : '已过期' }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
