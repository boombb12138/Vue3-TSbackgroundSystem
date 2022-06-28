<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" :src="circleUrl" />
      <span>{{ name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>反馈</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    return { name, circleUrl }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-avatar {
    margin-right: 5px;
  }
}
</style>
