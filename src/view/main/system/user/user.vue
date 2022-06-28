<template>
  <div class="user">
    <div>
      <!-- 组件的双向绑定 -->
      <!-- 第一种方法 -->
      <!-- <qn-form v-bind="formconfig" :modelValue="formData"></qn-form> -->
      <!-- 第二种方法 -->
      <!-- <qn-form v-bind="formconfig" v-model="formData"></qn-form> -->
      <page-search
        :formconfig="formconfig"
        @resetClick="handleResetClick"
        @searchClick="handleSearchClick"
      ></page-search>
    </div>
    <page-content
      ref="pageContentRef"
      :TableConfig="TableConfig"
      :pageName="pageName"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      :modalformconfig="modalformconfigRef"
      ref="pageModalRef"
      :pageName="pageName"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from 'vuex'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import formconfig from './config/searchFormconfig'
import { TableConfig } from './config/content.config'
import modalformconfig from './config/modal.config'

export default defineComponent({
  name: 'users',
  components: { pageSearch, pageContent, pageModal },
  setup() {
    // 解决配置项过多 见./config/searchFormconfig
    const pageName = 'users'
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    //1. pageModal相關的hook逻辑
    const editCallBack = () => {
      const item = modalformconfig.formItem.find(
        (item) => item.field === 'password'
      )
      item!.isHidden = true
    }
    const newCallBack = () => {
      const item = modalformconfig.formItem.find(
        (item) => item.field === 'password'
      )
      item!.isHidden = false
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    // 將vuex的数据放在computed里面 这样数据一变化 就会调用computed里的函数
    // departmentItem对象里的options就会改变  modalformconfig就会改变
    //  modalformconfigRef就会改变 进而影响template里面的
    // 如果不放在computed里面 vuex的数据变化也不会导致departmentItem.options改变
    // 因为entireDepartment是异步拿到的 而departmentItem.options在setup时就确定好，此时仍然是undefined 只执行一次
    const modalformconfigRef = computed(() => {
      const departmentItem = modalformconfig.formItem.find((item) => {
        // 箭头函数需要写return
        return item.field === 'departmentId'
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )

      const roleItem = modalformconfig.formItem.find((item) => {
        return item.field === 'roleId'
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalformconfig
    })

    const [pageModalRef, defaultInfo, handleEditClick, handleNewClick] =
      usePageModal(editCallBack, newCallBack)
    return {
      formconfig,
      TableConfig,
      pageName,
      pageContentRef,
      handleResetClick,
      handleSearchClick,
      modalformconfigRef,
      handleEditClick,
      handleNewClick,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
.userList {
  padding: 20px;
}
</style>
