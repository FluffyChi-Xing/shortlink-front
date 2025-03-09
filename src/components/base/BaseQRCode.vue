<script setup lang="ts">
import QRCode from "qrcode";
import {onMounted, ref, watch} from "vue";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {downloadLink} from "@/utils/DownLoadFileUtil.ts";


/** ==================== 二维码组件-start ==================== */
const qrcode = ref<HTMLCanvasElement | null>();
const props = withDefaults(defineProps<{
  link?: string | null;
  width?: string | number;
  height?: string | number;
  flag?: boolean; // 下载标志
}>(), {
  link: null,
  width: 50,
  height: 50,
  flag: false
})



const width = ref<number | string>(props.width);
const height = ref<string | number>(props.width);
const flag = ref<boolean>(props.flag);

function qrCodeGenerator() {
  if (qrcode.value) {
    if (props.link) {
      QRCode.toCanvas(qrcode.value, props.link || "默认二维码内容填充", (error) => {
        if (error) {
          LogUtil.error(error);
        }
        LogUtil.info('QRCode generate !');
      })
    } else {
      LogUtil.alert('二维码连接不存在');
    }
  }
}


function initCanvas() {
  width.value = props.width;
  height.value = props.height;
}


async function downloadQrCode() {
  if (qrcode.value) {
    const dataUrl = qrcode.value?.toDataURL("image/png");
    await downloadLink(dataUrl, '二维码.png');
    flag.value = false;
  }
}


watch(() => props.width, () => {
  initCanvas();
  qrCodeGenerator();
})


watch(() => props.flag, () => {
  flag.value = props.flag;
  // console.log('下载二维码')
  if (flag.value) {
    downloadQrCode();
  }
})


onMounted(() => {
  qrCodeGenerator();
})
/** ==================== 二维码组件-end ==================== */
</script>

<template>
  <canvas ref="qrcode" :style="`width: ${props.width}px;height: ${props.height}px;`" />
</template>

<style scoped>

</style>
