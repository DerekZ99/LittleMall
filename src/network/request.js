import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // 联系微信coderwhy001获取真实接口
    baseURL:"http://106.54.54.237:8000/api/wh",
    
    timeout: 9000
  })

  instance.interceptors.request.use(config => {
    return config
  })
  instance.interceptors.response.use(res => {
    return res.data
  })

  // 发送真正网络请求
  return instance(config)
}