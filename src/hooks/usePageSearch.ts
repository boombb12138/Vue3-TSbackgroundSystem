import { ref } from 'vue'
import pageContent from '@/components/page-content'
export function usePageSearch() {
  // 拿到pageContent组件实例
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchClick = (queryInfo: any) => {
    console.log('handleSearchClick', queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleSearchClick]
}
