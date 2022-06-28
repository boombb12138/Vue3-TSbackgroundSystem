<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import 'normalize.css'
import './assets/css/index.less'
import { defineComponent } from 'vue'
// Element Plus 组件 默认 使用英语 改为中文
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: { ElConfigProvider },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less"></style>
