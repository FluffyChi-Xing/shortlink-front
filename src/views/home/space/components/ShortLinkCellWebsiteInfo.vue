<script setup lang="ts">
import BaseQRCode from "@/components/base/BaseQRCode.vue";
import {Share} from "@element-plus/icons-vue";
import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import { ref } from "vue";
import {copyTextToClipboard} from "@/utils/CopyUtil.ts";
import {$message} from "@/componsables/element-plus.ts";
import {DEFAULT_SHORT_LINK_PREFIX_URL} from "@/componsables/constants/CommonConstants.ts";
import {jumpUrl} from "@/utils/CommonUtil.ts";
import {checkDateBefore} from "@/componsables/annotation/DateUtilAnnotation.ts";

withDefaults(defineProps<{
  row?: SpaceTypes.ShortLinkIPageTableDataType
}>(), {

})


const downLoadFlag = ref<boolean>(false);


function downloadQrCode() {
  downLoadFlag.value = !downLoadFlag.value;
}


async function copyFullShortUrl(text: string) {
  await copyTextToClipboard(text).then(() => {
    $message({
      type: "success",
      message: '复制成功'
    });
  }).catch(() => {
    $message({
      type: "error",
      message: '复制失败'
    });
  });
}
</script>

<template>
  <div
      :class="checkDateBefore(row?.shortLinkInfo.validDate) ? '' : 'cursor-not-allowed grayscale opacity-50'"
      class="w-full h-auto flex items-center"
  >
    <div
        style="width: calc(100% - 40px);"
        class="w-full h-auto flex items-center"
    >
      <div class="w-full h-auto flex flex-col items-center">
        <div
            @click="jumpUrl(DEFAULT_SHORT_LINK_PREFIX_URL + row?.shortLinkWebsiteInfo.fullShortUrl)"
            class="w-full h-auto cursor-pointer text-blue-400 hover:underline flex items-center overflow-hidden text-ellipsis"
        >
          http://{{ row?.shortLinkWebsiteInfo.fullShortUrl ? row?.shortLinkWebsiteInfo.fullShortUrl : '未知地址' }}
        </div>
        <div class="w-full h-auto text-gray-400 flex items-center overflow-hidden text-ellipsis">
          {{ row?.shortLinkWebsiteInfo.originUrl ? row?.shortLinkWebsiteInfo.originUrl : '未知地址' }}
        </div>
      </div>
    </div>
    <div class="w-10 h-10 flex items-center justify-between">
      <!-- qr-code popover -->
      <el-popover
          trigger="click"
          effect="light"
          placement="bottom"
          width="172"
      >
        <template #reference>
          <el-image
              src="http://shortlink.nageoffer.com/assets/%E4%BA%8C%E7%BB%B4%E7%A0%81-2c225c0e.svg"
              loading="lazy"
              fit="contain"
              style="width: 15px;height: 15px;"
              class="cursor-pointer"
          />
        </template>
        <template #default>
          <!-- qrcode -->
          <div class="w-full h-[132px] flex items-center">
            <BaseQRCode :flag="downLoadFlag" :link="row?.shortLinkWebsiteInfo.fullShortUrl" :width="200" :height="200" />
          </div>
          <!-- download qrcode img -->
          <div class="w-full h-auto mt-2">
            <el-button @click="downloadQrCode" type="primary" class="w-full">下载</el-button>
          </div>
        </template>
      </el-popover>
      <!-- full short-link copy btn -->
      <el-tooltip
          effect="light"
          placement="bottom"
          content="复制"
      >
        <el-icon size="20">
          <Share @click="copyFullShortUrl('https://' + row?.shortLinkWebsiteInfo.fullShortUrl)" class="text-blue-400 cursor-pointer" />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>

</style>
