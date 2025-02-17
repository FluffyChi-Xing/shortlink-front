<script setup lang="ts">
import {onMounted} from "vue";
import { ref } from "vue";
import {workerInterval} from "@/utils/TimeUtil.ts";
import type {UserTypes} from "@/componsables/apis/UserTypes";
import {getUserInfo, removeUserInfo, setUserInfo, userRefreshToken} from "@/componsables/apis/LoginPageApis.ts";
import {setWorkerInterval} from "set-worker-timer";
import {$const} from "@/componsables/const.ts";
import {useRouter} from "vue-router";




const router = useRouter();

//启动定时刷新token服务
async function handleTokenRefresher() {
  let userInfo: UserTypes.UserLoginInfoType = getUserInfo();
  let username = userInfo.username;
  let refreshToken = userInfo.refreshToken;
  let key = userInfo.key;
  if (refreshToken !== null && key !== null) {
    // 每 30min 刷新一次登录token
    setWorkerInterval(() => userRefreshToken().then((res: any) => {
      userInfo = {
        username: username,
        key: res.data.key,
        token: res.data.token,
        refreshToken: res.data.refreshToken
      }
      setUserInfo(userInfo);
    }).catch((error: any) => {
      console.error(error);
      removeUserInfo();
      router.push('/login');
        })
        , 30 * 60 * 1000);
  }
  // console.log(userInfo);
}

onMounted(async () => {
  await handleTokenRefresher();
  console.log('主页面已挂载');
});
</script>

<template>
  <div class="w-screen h-screen flex bg-red-500">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
