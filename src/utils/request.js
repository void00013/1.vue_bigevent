import axios from "axios";
import { layer } from '@layui/layer-vue'

const request = axios.create({ baseURL: 'http://big-event-api-t.itheima.net' })

// 全局统一配置有权限接口的token 使用拦截器
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    if(config.url.indexOf('/my/') !== -1)
      config.headers = { 'Authorization': localStorage.getItem('token') || '' }
    return config;
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    const {data:res} = response
    // console.log(res)
    if(res.status === 1) {
      layer.msg(res.message, { time: 1000 })
      localStorage.removeItem('token')
      location.href = '/login'
    }
    return response;
  }
);
export default request
