import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type callbackFn = () => void
export function usePageModal(editCB?: callbackFn, newCB?: callbackFn) {
  // 为了显示弹窗
  // 拿到page-modal组件
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  // 按下编辑按钮
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    // 彈出弹窗
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 由user页面决定是否展示密码框
    // 如果editCB有值的话 就执行editCB函数
    editCB && editCB()
  }
  // 按下新建按钮
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCB && newCB()
  }
  return [pageModalRef, defaultInfo, handleEditClick, handleNewClick]
}
