<template>
  <div class="container">
    <div class="loginBox">
      <a-form
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      >
        <a-form-item
        label="用户名"
        name="username"
        :rules="[{required: true, message: '请输入用户名!'}]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item class="loginBtn">
          <a-button
          type="primary"
          html-type="submit"
          >登录</a-button>
          <a-button
          type="info"
          >取消</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
interface FormState{
  username:string;
  password:string;
  remember: boolean;
}
const formState=reactive<FormState>({
  username:'',
  password:'',
  remember:true,
});
</script>

<style scoped>
.container{
  width: 100%;
  background-color:lightgrey;
}
.loginBox{
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 225px);
  width: 450px;
  height: 300px;
  bottom: 10%;
}
.loginBtn{
  display: flex;
  justify-content: flex-end;
}
</style>
