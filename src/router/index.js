import { createRouter, createWebHashHistory } from "vue-router"
import Login from '../views/login/login.vue'
import Index from '../views/index/index.vue'
import Home from '../components/home.vue'
import ArticleType from '../components/articleType.vue'

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/index',
    component: Index,
    redirect: '/index/home',
    children: [
      { path: 'home', component: Home },
      { path: 'articletype', component: ArticleType }
    ]
  }
]
const router = createRouter({
  // 指定工作模式
  history: createWebHashHistory(),
  // 指定路由规则
  routes
})

export default router
