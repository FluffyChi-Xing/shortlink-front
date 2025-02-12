<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import { ref, reactive } from "vue";
import type {UserTypes} from "@/componsables/apis/UserTypes";
import BaseDialog from "@/components/base/BaseDialog.vue";


/** ======= 用户信息页面-start ====== */
const userInfo = reactive({
  username: '默认用户名',
  phone: '默认手机号',
  nickName: '默认姓名',
  email: '默认邮箱'
});

const dialogVisible = ref<boolean>(false);
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

function cancel() {
  dialogVisible.value = false;
  resetData();
}
/** ======= 用户信息页面-end ====== */
</script>

<template>
  <div class="w-full h-full flex">
    <BaseCard title="个人信息" class="w-full h-full p-4">
     <template #body>
       <div class="w-full h-full flex pt-4">
         <el-form>
           <el-form-item>
             <template #label>
               <span class="w-auto px-4 bg-[#EEF0F5] font-bold">用户名</span>
             </template>
             <el-input
                 v-model="userInfo.username"
                 placeholder="默认用户名"
                 disabled
             />
           </el-form-item>
           <el-form-item>
             <template #label>
               <span class="w-auto px-4 bg-[#EEF0F5] font-bold">手机号</span>
             </template>
             <el-input
                 v-model="userInfo.phone"
                 placeholder="默认手机号"
                 disabled
             />
           </el-form-item>
           <el-form-item>
             <template #label>
               <span class="w-auto px-4 bg-[#EEF0F5] font-bold">姓名</span>
             </template>
             <el-input
                 v-model="userInfo.nickName"
                 placeholder="默认姓名"
                 disabled
             />
           </el-form-item>
           <el-form-item>
             <template #label>
               <span class="w-auto px-4 bg-[#EEF0F5] font-bold">邮箱</span>
             </template>
             <el-input
                 v-model="userInfo.email"
                 placeholder="默认邮箱"
                 disabled
             />
           </el-form-item>
           <el-form-item>
             <el-button @click="() => dialogVisible = true" type="primary">修改个人信息</el-button>
           </el-form-item>
         </el-form>
       </div>
     </template>
    </BaseCard>
  </div>
  <!-- 修改用户信息弹窗 -->
  <BaseDialog
      v-model:visible="dialogVisible"
      title="修改个人信息"
  >
    <template #body>
      <el-form label-width="auto">
        <el-form-item label="用户名">
          <el-input
              v-model="username"
              placeholder="暂无用户名"
              disabled
              class="w-full"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
              v-model="email"
              placeholder="请输入邮箱"
              clearable
              class="w-full"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
              v-model="phone"
              placeholder="请输入手机号"
              clearable
              class="w-full"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
              v-model="nickName"
              placeholder="请输入姓名"
              clearable
              class="w-full"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
              v-model="password"
              type="password"
              show-password
              placeholder="默认密码， 如有需要，请输入新密码"
              clearable
              class="w-full"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="w-full h-auto flex justify-center items-center">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
