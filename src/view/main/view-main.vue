<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '220px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu/src/nav-menu.vue'
import NavHeader from '@/components/nav-header/index'
export default defineComponent({
  setup() {
    let isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { handleFoldChange, isCollapse }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  width: 100%;
  height: 100%;
}

.page-header {
  height: 48px;
  background-color: #fff;
  padding: 0;
  // align-items: center;
  // text-align: center;
}

.page-main {
  height: calc(100% -48px);
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  line-height: 200px;
  background-color: #fff;
  cursor: pointer;
  scrollbar-width: none; //fireFox
  -ms-overflow-style: none; //IE10+

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
}
</style>
