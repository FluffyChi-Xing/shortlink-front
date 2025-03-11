<script setup lang="ts">
import {watch} from "vue";
import {
  checkUserLogin,
  removeUserInfo,
} from "@/componsables/apis/LoginPageApis.ts";
import {useRoute, useRouter} from "vue-router";
import { onMounted } from "vue";


const router = useRouter();
const route = useRoute();

//启动定时刷新token服务
// async function handleTokenRefresher() {
//   let userInfo: UserTypes.UserLoginInfoType = getUserInfo();
//   let username = userInfo.username;
//   let refreshToken = userInfo.refreshToken;
//   let key = userInfo.key;
//   if (refreshToken !== null && key !== null) {
//     // 每 30min 刷新一次登录token
//     setWorkerInterval(() => userRefreshToken().then((res: any) => {
//       userInfo = {
//         username: username,
//         key: res.data.key,
//         token: res.data.token,
//         refreshToken: res.data.refreshToken
//       }
//       setUserInfo(userInfo);
//     }).catch((error: any) => {
//       console.error(error);
//       removeUserInfo();
//       router.push('/login');
//         })
//         , 30 * 60 * 1000);
//   }
//   // console.log(userInfo);
// }


/**
 * 检查用户登录情况
 */
async function checkLogin() {
  await checkUserLogin().then((res: any) => {
    // console.log('检查登录状态:', res);
    if (!res) {
      // 未登录，跳转登录页面
      removeUserInfo();
      router.push('/login');
    }
  }).catch((error: any) => {
    console.error(error);
    removeUserInfo();
    router.push('/login');
  });
}



watch(() => route.path, async () => {
  // 监听路由变化，检查用户登录情况
  await checkLogin();
});

// 首次挂载主页的时候检查登录情况，防止因为浏览器缓存等原因，导致用户在不登录的情况下访问主页
onMounted(async () => {
  await checkLogin();
});



// onMounted(async () => {
//   // await handleTokenRefresher();
//   console.log('主页面已挂载');
// });
</script>

<template>
  <div class="w-screen h-screen flex bg-red-500">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
