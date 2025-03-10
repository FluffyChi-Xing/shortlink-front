<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import {ref, reactive, onMounted} from "vue";
import {DEFAULT_USER_AVATAR} from "@/componsables/constants/CommonConstants.ts";
import {getUsername} from "@/componsables/request.ts";
import {getUserDesensitizationInfo} from "@/componsables/apis/UserApis.ts";
import {$message} from "@/componsables/element-plus.ts";
import {useCounterStore} from "@/stores/counter.ts";


/** ======= 用户信息页面-start ====== */
const store = useCounterStore();
const userInfo = reactive({
  username: getUsername() ? getUsername() : '默认用户名',
  phone: '默认手机号',
  nickName: '默认姓名',
  email: '默认邮箱'
});

const currentTabs = ref<string>('0');
const username = ref<string>();
const phone = ref<string>();
const nickName = ref<string>();
const password = ref<string>();
const email = ref<string>();
function resetData() {
  username.value = '';
  password.value = '';
  nickName.value = '';
  phone.value = '';
  email.value = '';
}

/**
 * 获取用户信息
 */
async function getUserInfo() {
  // 如果缓存中不存在用户数据，那么就请求接口获取用户数据
  // 否则使用缓存数据，避免重复请求接口，提升用户体验
  if (!store.userInfo) {
    await getUserDesensitizationInfo().then((res: any) => {
      store.userInfo = {
        ...res
      };
      userInfo.email = res?.email;
      userInfo.nickName = res?.username;
      userInfo.phone = res?.phone;
      userInfo.username = res?.realName;
      // console.log(res)
    }).catch((error: any) => {
      $message({
        type: 'error',
        message: error
      });
    })
  }
}

function cancel() {
  currentTabs.value = '0';
  resetData();
}


function initDataBinding() {
  // 如果缓存中存在用户数据，那么就使用缓存中的数据
  if (!store.userInfo) {
    username.value = userInfo.username;
    phone.value = userInfo.phone;
    nickName.value = userInfo.nickName;
    email.value = userInfo.email;
  } else {
    username.value = store.userInfo.username;
    phone.value = store.userInfo.phone;
    nickName.value = store.userInfo.realName;
    email.value = store.userInfo.email;
  }
}


onMounted(async () => {
  await getUserInfo();
  initDataBinding();
})
/** ======= 用户信息页面-end ====== */
</script>

<template>
  <div class="w-full h-full flex">
    <BaseCard title="个人信息" class="w-full h-full">
     <template #body>
       <div class="w-full h-full flex-col flex p-4">
         <!-- user avatar & username -->
         <div class="w-full h-auto mb-2 flex">
           <el-avatar
               :src="DEFAULT_USER_AVATAR"
               size="large"
               shape="circle"
               alt="用户头像"
               fit="contain"
               class="mr-2"
           />
           <div class="w-auto h-auto flex items-center justify-center text-black">
             {{ userInfo.username }}
           </div>
         </div>
         <el-tabs
             v-model="currentTabs"
             class="w-full h-auto"
         >
           <el-tab-pane
               label="基础信息"
           >
             <div class="w-full h-auto flex flex-col justify-center items-center">
               <el-form label-width="auto">
                 <el-form-item
                     label="用户名"
                     required
                 >
                   <el-input
                       v-model="username"
                       placeholder="暂无用户名"
                       maxlength="20"
                       style="width: 240px;"
                       disabled
                   />
                 </el-form-item>
                 <el-form-item label="手机号" required>
                   <el-input
                       v-model="phone"
                       placeholder="暂无手机号"
                       maxlength="11"
                       style="width: 240px;"
                       disabled
                   />
                 </el-form-item>
                 <el-form-item label="姓名" required>
                   <el-input
                       v-model="nickName"
                       placeholder="暂无姓名"
                       maxlength="20"
                       style="width: 240px;"
                       disabled
                   />
                 </el-form-item>
                 <el-form-item label="邮箱" required>
                   <el-input
                       v-model="email"
                       placeholder="暂无邮箱"
                       maxlength="50"
                       style="width: 240px;"
                       disabled
                   />
                 </el-form-item>
               </el-form>
             </div>
           </el-tab-pane>
           <el-tab-pane
               label="修改信息"
           >
             <div class="w-full h-auto flex flex-col justify-center items-center">
               <el-form label-width="auto">
                 <el-form-item label="用户名">
                   <el-input
                       v-model="username"
                       placeholder="暂无用户名"
                       disabled
                       style="width: 240px;"
                   />
                 </el-form-item>
                 <el-form-item label="邮箱">
                   <el-input
                       v-model="email"
                       placeholder="请输入邮箱"
                       clearable
                       style="width: 240px;"
                   />
                 </el-form-item>
                 <el-form-item label="手机号">
                   <el-input
                       v-model="phone"
                       placeholder="请输入手机号"
                       clearable
                       style="width: 240px;"
                   />
                 </el-form-item>
                 <el-form-item label="姓名">
                   <el-input
                       v-model="nickName"
                       placeholder="请输入姓名"
                       clearable
                       style="width: 240px;"
                   />
                 </el-form-item>
                 <el-form-item label="密码">
                   <el-input
                       v-model="password"
                       type="password"
                       show-password
                       placeholder="默认密码， 如有需要，请输入新密码"
                       clearable
                       style="width: 240px;"
                   />
                 </el-form-item>
                 <el-form-item>
                   <div class="w-full h-auto flex justify-end items-center">
                     <el-button type="primary">确认</el-button>
                     <el-button type="info" @click="cancel">取消</el-button>
                   </div>
                 </el-form-item>
               </el-form>
             </div>
           </el-tab-pane>
         </el-tabs>
       </div>
     </template>
    </BaseCard>
  </div>
</template>

<style scoped>

</style>
