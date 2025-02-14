<script setup lang="ts">
import {onMounted, ref} from "vue";
import {vantaFactory} from "@/utils/VantaUtil.ts";
import type {VantaJsTypes} from "@/componsables/apis/VantaJsTypes";
import {VantaEnums} from "@/componsables/enums/VantaEnums.ts";
import * as THREE from 'three';
import BaseCard from "@/components/base/BaseCard.vue";
import { useRouter } from "vue-router";
import {$const} from "@/componsables/const.ts";
import BaseCaptcha from "@/components/base/BaseCaptcha.vue";


/** ====== 登录-start ====== */
const router = useRouter();
// 登录背景初始化
const options = ref<VantaJsTypes.VantaFuncParamsTypes>({
  el: '#loginContainer',
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  speed: 0.5,
  THREE: THREE
});
function initBackground() {
  return vantaFactory(VantaEnums.FOG, options.value);
}


onMounted(() => {
  initBackground();
});


// 登录逻辑块
const username = ref<string>();
const password = ref<string>();
const captcha = ref<string>($const.DEFAULT_CAPTCHA_URL);
const code = ref<string>();

function handleRefreshCaptcha() {
  console.log('刷新验证码');
  // TODO: 调用获取验证码接口
}

async function handleLogin() {
  await router.push('/home');
  // TODO: 校验
  // TODO: 调用登录接口
}
/** ====== 登录-end ====== */
</script>

<template>
  <div
      id="loginContainer"
      class="w-screen h-screen flex justify-center overflow-hidden"
  >
    <!-- title -->
    <div class="w-auto h-20 flex font-bold text-white text-[40px] mt-[10%]">S a a S 短 链 接 平 台</div>
    <!-- login form card -->
    <BaseCard
        class="w-[600px] h-auto absolute top-[26%]"
    >
      <template #body>
        <div class="w-full h-auto grid grid-cols-3 gap-4">
          <!-- login form -->
          <div class="w-full h-auto col-span-2 flex flex-col p-4 items-center">
            <div class="text-[20px] font-bold text-black">用户登录</div>
            <el-form class="w-full h-auto mt-20">
              <el-form-item required>
                <el-input
                    v-model="username"
                    placeholder="请输入用户名"
                    clearable
                    class="w-full"
                >
                  <template #prepend>
                    用户名
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item required>
                <el-input
                    v-model="password"
                    clearable
                    placeholder="请输入密码"
                    type="password"
                    show-password
                    class="w-full mt-5"
                >
                  <template #prepend>
                    密 码
                  </template>
                </el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item required>
                <template #default>
                  <div class="w-full h-8 grid grid-cols-2 gap-4">
                    <div class="w-full h-auto flex items-center">
                      <el-input
                          v-model="code"
                          clearable
                          show-word-limit
                          maxlength="6"
                          class="w-full"
                      >
                        <template #prepend>
                          验证码
                        </template>
                      </el-input>
                    </div>
                    <div class="w-full h-auto flex items-center overflow-hidden">
                      <BaseCaptcha
                          :captcha-url="captcha"
                          width="100"
                          height="32"
                          @refresh="handleRefreshCaptcha"
                      />
                    </div>
                  </div>
                </template>
              </el-form-item>
              <div class="w-full h-auto flex justify-end items-center mt-10">
                <el-button @click="handleLogin" type="primary" plain>登录</el-button>
              </div>
            </el-form>
          </div>
          <!-- registry form jump button -->
          <div class="w-full text-white h-auto flex flex-col justify-center bg-theme-color items-center">
            <span>还没有账号?</span>
            <span>马上注册 !</span>
            <el-button type="primary" plain class="mt-4">注册账号</el-button>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>

</style>
