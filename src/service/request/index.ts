import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { QnRequestConfig, QnRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true
class QnRequest {
  instance: AxiosInstance
  interceptors?: QnRequestInterceptors
  loading?: any
  showLoading?: boolean
  constructor(config: QnRequestConfig) {
    //  创建axios实例
    this.instance = axios.create(config)
    // 保存传入的拦截函数
    this.interceptors = config.interceptors
    // 保存showloading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 1.一个实例对应的一个拦截器
    // 请求的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应的拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加loding图标
        // 判断是否显示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载...',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 响应成功就移除loading
        setTimeout(() => {
          this.loading?.close()
        }, 3000)
        // 第二种错误 响应成功，但是没有返回数据
        if (res.data.returnCode === '-1001') {
          console.log('-1001的错误')
        }
        return res.data
      },
      (err) => {
        // 第一种错误 响应失败 返回错误码
        if (err.response.data === '404') {
          console.log('响应失败，404的错误')
        }
        return err
      }
    )
  }
  request<T = any>(config: QnRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.实例的具体请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      // 不展示loading的时候 将showLoading改为false
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }
      // 通过实例发送axios请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // 响应拦截
            res = config.interceptors?.responseInterceptor(res)
          }
          // 将showLoading改为默认值
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          console.log('err')
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: QnRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: QnRequestConfig<T>): Promise<T> {
    console.log(config)
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: QnRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: QnRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default QnRequest
