<template>
  <div>
    <div class="page-modal">
      <el-dialog
        v-model="dialogVisible"
        title="新建用户"
        width="30%"
        center
        close-on-press-escape
        destroy-on-close
      >
        <qn-form v-bind="modalformconfig" v-model="formData"></qn-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleConfirmClick"
              >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import QnForm from '@/baseui/form'
import { useStore } from 'vuex'

export default defineComponent({
  components: { QnForm },
  props: {
    modalformconfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let dialogVisible = ref(false)
    const formData = ref<any>({})
    // 接收defaultInfo, watch监听defaultInfo 对象的改变 如果defaultInfo 对象改变 说明按了编辑按钮
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalformconfig.formItem) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
        console.log('formData', formData.value.id)
      }
    )
    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用戶')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
    }
    return { dialogVisible, handleConfirmClick, formData }
  }
})
</script>
<style scoped></style>
