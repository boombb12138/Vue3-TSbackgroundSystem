import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 自定义拦截器
export interface QnRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
export interface QnRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: QnRequestInterceptors<T>
  showLoading?: boolean
}
