<template>
  <div class="pageContent">
    <qn-table
      v-bind="TableConfig"
      :listData="dataList"
      :pageCount="dataCount"
      v-model:page="pageInfo"
    >
      <template v-slot:headerhandler>
        <el-button v-if="isCreate" type="primary" plain @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <template v-slot:status="slotProps">
        <el-button
          plain
          :type="slotProps.scope.row.enable ? 'success' : 'danger'"
        >
          {{ slotProps.scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template v-slot:createAt="slotProps">
        <span>{{ $filters.timeFormat(slotProps.scope.row.createAt) }}</span>
      </template>
      <template v-slot:handle="slotProps">
        <el-button
          v-if="isUpdate"
          size="mini"
          text="true"
          style="color: #79bbff"
          @click="handleEditClick(slotProps.scope.row)"
        >
          <el-icon><Edit /></el-icon>
          编辑</el-button
        >
        <el-button
          v-if="isDelete"
          size="mini"
          text="true"
          style="color: #f88080"
          @click="handleDeteleClick(slotProps.scope.row)"
        >
          <el-icon><Delete /></el-icon>
          删除</el-button
        >
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropslot"
        :key="item.prop"
        v-slot:[item.slotname]="slotProps"
      >
        <!-- 接收users/goods页面的插槽 -->
        <template v-if="item.slotname">
          <slot :name="item.slotname" :row="slotProps.scope.row"></slot>
        </template>
      </template>
    </qn-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import qnTable from '@/baseui/table'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  props: {
    TableConfig: {
      type: Object
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: { qnTable },
  emits: ['newBtnClick', 'editBtnClick'],
  // setup的第一个参数 props组件外部传递过来，且组件内部声明接收了的属性。
  setup(props, context) {
    //0. 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    const isUpdate = usePermission(props.pageName, 'update')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    // 1.发送网络请求
    // 触发action里的函数
    const store = useStore()
    const getPageData = (queryInfo: any = {}) => {
      // 有查找的权限才发送网络请求
      if (!isQuery) return
      store.dispatch('system/getPageList', {
        // url: 'users/list',
        pageName: props.pageName,
        //对url的请求限制
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, //分页 请求第二页数据的时候将第一页的数据偏移掉
          size: pageInfo.value.pageSize, //一页要请求的10个数据
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.监听pageInfo的改变 要换页就要重新发送网络请求
    watch(pageInfo, () => getPageData())
    // 服务器返回的用户信息列表
    const dataList = computed(() => {
      return store.getters[`system/getPageData`](props.pageName)
    })
    const dataCount = computed(() => {
      //有可能是 usersCount 或者 listCount不能写死
      return store.getters['system/getPageCount'](props.pageName)
    })

    //4.获取动态的插槽名称
    const otherPropslot = props.TableConfig?.propList.filter((item: any) => {
      // 过滤调固定的插槽名（列）名
      if (item.slotname === 'createAt') return false
      if (item.slotname === 'handle') return false
      return true
    })

    // 5.删除、创建操作
    const handleDeteleClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      context.emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      context.emit('editBtnClick', item)
    }
    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropslot,
      isDelete,
      isUpdate,
      isQuery,
      isCreate,
      handleDeteleClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>
<style scoped lang="less">
.pageContent {
  border-top: 20px solid #f5f5f5;
}
</style>
