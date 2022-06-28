import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

// 全局引入样式
import 'element-plus/dist/index.css'
import { globalRegister } from './global/index'
// import './service/axios_demo'
import qnRequest from './service/index'
import { setupStore } from '@/store/index'
const app = createApp(App)
// 先注册好路由（映射关系）
setupStore()

app.use(router)
app.use(store)

// registerApp(app)等同于
app.use(globalRegister)
app.mount('#app')

// 同一个实例 不同的请求
// 拦截请求的实例
// qnRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       return config
//     },
//     responseInterceptor: (res) => {
//       return res
//     }
//   }
// })
// 不拦截请求的实例
// qnRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false
// })
interface dataType {
  data: any
  returnCode: string
  success: boolean
}
// 在实例调用get后拿到结果
// qnRequest.get<dataType>({
//   url: '/home/multidata',
//   showLoading: false
// })
