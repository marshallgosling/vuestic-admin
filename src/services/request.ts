// 进行axios二次封装:使用请求与响应拦截器
// 引入axios和axios的类型定义
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useToast } from 'vuestic-ui'

//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request: AxiosInstance = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  headers: {
    get: {
      'Content-Type': 'application/json;charset=utf-8',
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
  },
  timeout: 50000, //超时的时间的设置
})
const { init } = useToast()

//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //登录信息
    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    //返回配置对象
    return config
  },
  (error: any) => {
    // 处理请求错误
    console.error(error)
    return Promise.reject(error)
  },
)

//第三步:响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    // 处理响应错误
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        localStorage.removeItem('token')
        //push({ name: 'login'} )
        window.location.href = '/#/login'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    // //提示错误信息
    init({ message: message, color: 'error' })
    
    return Promise.reject(error)
  },
)
//对外暴露
export default request
