<template>
  <el-form label-width="60px" :rules="rules" :model="phone">
    <el-form-item label="手机号" prop="number">
      <el-input v-model="phone.number"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code"></el-input>
        <el-button type="primary" class="getbtn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      number: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要保存密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', phone.number)
            LocalCache.setCache('password', phone.code)
          }

          // 2.开始进行登录验证
          store.dispatch('login/phoneLoginAction', { ...phone })
        } else {
          LocalCache.deleteCache('name')
          LocalCache.deleteCache('password')
        }
      })
    }
    return { phone, loginAction }
  }
})
</script>
<style scoped lang="less">
.get-code {
  display: flex;
  .getbtn {
    margin-left: 5px;
  }
}
</style>
