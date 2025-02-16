<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
const props = withDefaults(defineProps<{
  captchaUrl?: string;
  width?: number;
  height?: number;
}>(), {
  width: 100,
  height: 40
})


const picUrl = ref<string>(props?.captchaUrl);
const captcha = ref();
const emits = defineEmits(['refresh']);

/**
 * 验证码绘制api
 * @param width
 * @param height
 */
function captchaGenerator() {
  if (picUrl.value !== null && picUrl.value !== undefined) {
    const ctx = captcha.value.getContext('2d');
    if (ctx) {
      const img = new Image();
      img.src = picUrl.value;
      img.onload = () => {
        ctx.clearRect(0, 0, props.width, props.height); // 清除之前的内容
        ctx.drawImage(img, 0, 0, props.width, props.height);
      }
    }
  }
}


/**
 * 刷新验证码调用接口
 */
function refreshCaptcha() {
  emits('refresh')
}


onMounted(() => {
  captchaGenerator();
})


watch(() => props?.captchaUrl, (val) => {
  picUrl.value = val as string;
  // 验证码刷新后重新绘制验证码
  captchaGenerator();
})
</script>

<template>
  <div class="w-auto h-auto flex cursor-pointer border box-border border-theme-dark">
    <canvas
        ref="captcha"
        @click="refreshCaptcha"
        :height="props.height"
        :width="props.width"
    />
  </div>
</template>

<style scoped>

</style>
