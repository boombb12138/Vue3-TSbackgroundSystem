<template>
  <div class="loginPanel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch class="demo-tabs" v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginaccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane label="Config" name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <loginphone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick">
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginaccount from './login-account.vue'
import loginphone from './login-phone.vue'
export default defineComponent({
  components: {
    loginaccount,
    loginphone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof loginaccount>>()
    const phoneRef = ref<InstanceType<typeof loginphone>>()
    const currentTab = ref('account')
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('调用phone组件的登录方法')
      }
    }
    return {
      handleLoginClick,
      isKeepPassword,
      accountRef,
      currentTab
    }
  }
})
</script>
<style scoped lang="less">
.loginPanel {
  width: 320px;
  margin-bottom: 100px;
  .title {
    text-align: center;
  }
}
.account-control {
  display: flex;
  margin-top: 3px;
  text-align: center;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 5px;
}
</style>
