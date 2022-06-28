<template>
  <div class="nav-search">
    <qn-form v-bind="formconfig" v-model="formData">
      <!-- <qn-form
      v-bind="formconfig"
      :model-value="formData"
      @update:modelValue="formData = $event"
    > -->
      <!-- 插槽要用在自定义组件里面 -->
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>

      <template #search>
        <div class="handleBtn">
          <el-button @click="handleReset">
            <el-icon><RefreshLeft /></el-icon>
            重置</el-button
          >
          <el-button type="primary" @click="handleSearch"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </qn-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QnForm from '@/baseui/form'
export default defineComponent({
  props: {
    formconfig: {
      type: Object,
      required: true
    }
  },
  components: { QnForm },
  emits: ['resetClick', 'searchClick'],
  setup(props, context) {
    const formItem = props.formconfig?.formItem ?? []
    // 新建一个对象
    const formOriginData: any = {}
    // 拿到item.field的值 给新对象赋新属性 属性就是item.field的值
    for (let item of formItem) {
      formOriginData[item.field] = ''
    }
    // 1.双向绑定的数据要由item的field来决定
    let formData = ref(formOriginData)
    // 2。用户点击了重置按钮
    // 方法2
    const handleReset = () => {
      // for (const key in formOriginData) {
      //   // formOriginData[key]是 ''
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      context.emit('resetClick')
    }
    // 3.搜索按钮处理
    const handleSearch = () => {
      context.emit('searchClick', formData.value)
    }
    return { formData, handleReset, handleSearch }
  }
})
</script>
<style scoped lang="less">
.nav-search {
  background-color: #fff;
}
.handleBtn {
  // 让按钮在右边
  text-align: right;
  padding: 0px 10px 10px 0px;
  .el-button > span i {
    margin-right: 5px;
  }
}
</style>
