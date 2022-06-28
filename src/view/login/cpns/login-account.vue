<template>
  <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" type="password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/accountconfig'

import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要保存密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          }

          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          LocalCache.deleteCache('name')
          LocalCache.deleteCache('password')
        }
      })
    }

    return { account, rules, loginAction, formRef }
  }
})
</script>
<style scoped></style>
