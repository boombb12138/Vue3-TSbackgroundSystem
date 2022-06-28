import QnRequest from './request'
import { TIME_OUT, BASE_URL } from './request/config'
import { AxiosRequestHeaders } from 'axios'
import LocalCache from '@/utils/cache'
const qnRequest = new QnRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err: any) => {
      return err
    },
    responseInterceptor: (config) => {
      return config
    }
  }
})

export default qnRequest
