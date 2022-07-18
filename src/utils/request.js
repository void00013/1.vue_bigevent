import axios from "axios";
import { layer } from '@layui/layer-vue'

const request = axios.create({ baseURL: 'http://big-event-api-t.itheima.net' })

// 全局统一配置有权限接口的token 使用拦截器
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    if(config.url.indexOf('/my/') !== -1)
      config.headers = { ...config.headers, 'Authorization': localStorage.getItem('token') || '' }
      // 注意：headers中有原先浏览器中配置的请求头，如果直接覆盖掉原来的数据，虽然服务器发送回来的响应看着没有问题，但是往往由于发送者身份不够明确，所有一般也无法真正操作成功
      // 注意：************* 之后配置请求时，如果原来有数据，一定要追加，而不是覆盖
    // console.log(config)
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
      if(res.message === "身份认证失败！") {
        localStorage.removeItem('token')
        location.href = '#/login'
      }
    }
    return response;
  }
);
export default request
