// import { apiRequest, myRequest } from "../utils/request";
import request from "../utils/request";
import qs from 'qs'

// 注册
function reg(username, password) {
  return request.post('/api/reguser', qs.stringify({ username, password }))
}
// 登录
function login(username, password) {
  return request.post('/api/login', qs.stringify({ username, password }))
}

/*******************个人中心********************/
// 获取用户基本信息
// var config = {
//   method: 'get',
//   url: '/my/userinfo',
// }
// return request(config)
function getUserInfo() {
  return request.get('/my/userinfo')
}
// 更新用户基本信息
function updateUserInfo(id, nickname, email) {
  return request.post('/my/userinfo', qs.stringify({id, nickname, email}))
}
// 修改密码
function updatePwd(oldPwd, newPwd) {
  return request.post('/my/updatepwd', qs.stringify({oldPwd, newPwd}))
}
// 修改头像
function updateAvatar() {}

/*******************分类相关********************/
// 获取文章分类列表
function getArticleTypeList() {}
// 新增文章分类
function addArticleType() {}
// 删除文章分类
function delArticleType() {}
// 获取文章分类详情
function getArticleTypeInfo() {}
// 更新文章分类详情
function updateArticleTypeInfo() {}

/*******************文章相关********************/
// 添加新文章
function addArticle() {}
// 获取文章列表
function getArticleList() {}
// 删除文章
function delArticle() {}
// 获取文章详情
function getArticleInfo() {}
// 更新文章详情
function updateArticleInfo() {}

// 导出
export {
  reg,
  login,
  getUserInfo,
  updateUserInfo,
  updatePwd,
  updateAvatar,
  getArticleTypeList,
  addArticleType,
  delArticleType,
  getArticleTypeInfo,
  updateArticleTypeInfo,
  addArticle,
  getArticleList,
  delArticle,
  getArticleInfo,
  updateArticleInfo
}
