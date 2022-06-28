<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="image" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">后台管理系统</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu class="el-sub-menu" :index="item.id + ''">
            <!-- 二级菜单的标题 -->
            <template #title>
              <el-icon :size="30">
                <component :is="item.icon.slice(7)"></component>
              </el-icon>
              <span class="span">{{ item.name }}</span>
            </template>
            <!-- 二级菜单的子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon :size="30">
                  <component
                    v-if="subitem.icon"
                    :is="subitem.icon.slice(7)"
                  ></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menu'
export default defineComponent({
  props: ['collapse'],
  setup() {
    //store
    const store = useStore()
    // computed返回的是ref对象 要取到值 要用.value
    const userMenu = computed(() => {
      return store.state.login.userMenu
    })
    //router
    const router = useRouter()

    //拿到子组件的路径
    const route = useRoute()
    const currentpath = route.path
    const menu = pathMapToMenu(userMenu.value, currentpath)
    const defaultValue = ref(menu.id + '')
    // let id = 0
    // 拿到点击的组件
    const handleMenuItemClick = (item: any) => {
      // id = item.id
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenu, handleMenuItemClick, defaultValue }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  // 图标
  .logo {
    display: flex;
    height: 28px;
    flex-direction: row;
    justify-content: flex-start; //justify-content属性定义了项目在主轴上的对齐方式。
    align-items: center;
    padding: 12px 10px 8px 10px;
    background-color: #0e73ee;
    .image {
      height: 100%;
    }
    .title {
      color: #fff;
      margin-left: 3px;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-sub-menu {
    background-color: #fff !important;

    .el-menu-item {
      padding-left: 30px;
      background-color: #fff !important;
      color: rgb(75, 75, 75) !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #fff !important;
    color: rgb(75, 75, 75) !important;
    font-size: 14px;
    span {
      padding-left: 4px;
    }
  }
  // 高亮
  .el-menu-item:hover {
    color: #0e73ee;
  }
  .el-menu-item.is-active {
    color: #0e73ee !important;
    background-color: #ecf3fe !important;
    border-right: #0e73ee 3px solid;
    // background-color: #fff !important;
  }
  .el-menu-vertical {
    background-color: #fff;
  }
}
</style>
