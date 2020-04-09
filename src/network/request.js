import axios from 'axios'
// 封装axios↓
export function request(config) {
  const instance = axios.create({
    // 联系微信coderwhy001获取真实接口
    baseURL: "http://106.54.54.237:8000/api/h8",
    timeout: 9000
  })
  // 请求拦截↓
  instance.interceptors.request.use(config => {
    return config
  })
  // 响应拦截↓
  instance.interceptors.response.use(res => {
    return res.data
  })

  // 发送真正网络请求
  return instance(config)
}