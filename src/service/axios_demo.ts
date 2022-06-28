import axios from 'axios'

// axios是一个实例对象
// 模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})

// Promise本身有类型
// new Promise<string>((resolve) => {
//   resolve('123')
// }).then((res) => {
//   console.log(res)
// })

// axios的配置选项
// 模拟get请求并传入参数
axios.defaults.baseURL = 'http://httpbin.org'

// axios
//   .get('/get', {
//     params: {
//       name: 'why'
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 模擬post请求
// axios
//   .post('/post', {
//     data: {
//       name: 'why'
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

//5. axios.all能够同时返回多个请求的数据
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'why'
      }
    }),
    axios.post('/post', {
      data: {
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// 6.axios的拦截器
// fn1请求发送成功时回调函数
// fn2请求发送失败时回调函数
axios.interceptors.request.use(
  (config) => {
    // 1.携带token
    // 2.展示loading
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)

// fn1服务器有返回数据的回调
// fn2服务器没有返回数据的回调
axios.interceptors.response.use(
  (res) => {
    // console.log('响应成功的拦截', res)
  },
  (err) => {
    console.log('响应失败的拦截', err)
  }
)
