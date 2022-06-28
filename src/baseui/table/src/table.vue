<template>
  <!-- 表格 -->
  <div class="qn-table">
    <!-- 头部 -->
    <div class="header">
      <slot name="header" :scope="scope">
        <div class="title">{{ title }}</div>
        <div class="createNewUser"><slot name="headerhandler"></slot></div>
      </slot>
    </div>
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      class="userList"
      @selection-change="handleSelectChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelect"
        align="center"
        width="60"
        type="selection"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColum"
        type="index"
        label="序号"
        align="center"
        min-width="60"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <!-- 插槽是为了给某些列加按钮 或者 加粗的样式 -->
          <template #default="scope">
            <!-- :scope="scope"作用域插槽是为了给父组件传数据
            :name="item.slotname" 动态插槽名可以在user组件中动态指定template对应的插槽-->
            <slot :name="item.slotname" :scope="scope">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    propList: {
      type: Array,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    showIndexColum: {
      type: Boolean,
      required: true
    },
    showSelect: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    page: {
      type: Object,
      required: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, context) {
    const currentPage = ref(props.page.currentPage)
    const pageSize = ref(props.page.pageSize)
    const handleSizeChange = (pageSize: number) => {
      // console.log(`${val} items per page`)
      context.emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      // console.log(`current page: ${val}`)
      context.emit('update:page', { ...props.page, currentPage })
    }
    const handleSelectChange = (value: any) => {
      context.emit('selectChange', value)
    }
    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      pageSize
    }
  }
})
</script>
<style scoped lang="less">
.header {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  .title {
    font-weight: 700;
    font-size: 22px;
    margin-left: 20px;
    color: #3c3d3f;
  }
  .createNewUser {
    padding-right: 40px;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 40px 0 0;
}
</style>
