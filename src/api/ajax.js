import axios from 'axios'
import store from '@/store/index.js'
// 进度条
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置axios
const requests = axios.create({
  // 基础路径，发请求，路径会出现 api
  baseURL: '/api',
  // 请求时间超时的时间为5秒
  timeout: 5000
})

// 配置请求拦截器
requests.interceptors.request.use((config) => {
  // 现在的问题是config是什么?配置对象
  // 可以让进度条开始动
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nProgress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

// 配置响应拦截器
requests.interceptors.response.use(function (response) {
  nProgress.done()
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 对外暴露
export default requests
