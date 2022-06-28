<template>
  <div class="navHeader">
    <el-icon class="fold" @click="foldOrExpand">
      <!-- 动态组件切换组件 -->
      <component :is="isFold ? 'Fold' : 'Expand'"></component
    ></el-icon>
    <div class="content">
      <qn-bread-crumb :breadcrumbs="breadcrumbs"></qn-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './userInfo.vue'
import qnBreadCrumb from '@/baseui/breadcrumb'
import { pathMaptoBreadCrumb } from '@/utils/map-menu'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { userInfo, qnBreadCrumb },
  emits: ['foldChange'],
  setup(props, context) {
    const isFold = ref(false)
    const foldOrExpand = () => {
      isFold.value = !isFold.value
      // 组件间通信 触发父组件的foldChange事件
      context.emit('foldChange', isFold.value)
    }
    const store = useStore()
    // 菜单和路径改变的时候 pathMaptoBreadCrumb的参数会相应改变
    //点击刷新之后 computed会重新被执行 那么pathMaptoBreadCrumb会执行 breadCrumb才会被改变
    const breadcrumbs = computed(() => {
      const userMenu = store.state.login.userMenu
      //拿到子组件的路径
      const route = useRoute()
      const currentpath = route.path
      return pathMaptoBreadCrumb(userMenu, currentpath)
    })
    return { isFold, foldOrExpand, breadcrumbs }
  }
})
</script>
<style scoped lang="less">
.navHeader {
  display: flex;
  justify-content: center;
  .fold {
    font-size: 2em;
    padding: 5px 0 0 10px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
  }
}
</style>
