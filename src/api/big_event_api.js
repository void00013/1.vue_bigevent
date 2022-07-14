import request from "../utils/request";
import qs from 'qs'

// 注册
function reg(username, password) {
  return request.post('/api/reguser', qs.stringify({
      username,
      password
  }))
}
// 登录
function login(username, password) {
  return request.post('/api/login', qs.stringify({
    username,
    password
  }))
}
export { reg, login }
