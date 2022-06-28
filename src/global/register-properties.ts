import { App } from 'vue'
import { formatUtcToString } from '@/utils/data-format'

export function registerProperties(app: App) {
  // 时间格式化
  // globalProperties上的属性或方法 是可以全局调用的
  // 定义方法一般以$开头 来区分全局函数和局部的函数
  app.config.globalProperties.$filters = {
    timeFormat(value: string) {
      return formatUtcToString(value)
    }
  }
}
