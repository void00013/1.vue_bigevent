<template>
  <div class="index">
    <lay-layout class="example">
      <lay-header>
        <img src="../../assets/images/logo.png" alt="">
        <div class="controlBox">
          <lay-dropdown>
            <a href="javascript:;" class="headerLink">
              <img :src="user_pic" alt="" class="headerImg" v-if="user_pic">
              <span class="text-avatar" v-else>{{firstName}}</span>
              个人中心
            </a>
            <template #content>
                <lay-dropdown-menu>
                  <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
                  <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
                  <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
                </lay-dropdown-menu>
            </template>
          </lay-dropdown>
          <a href="javascript:;" @click.prevent="open"><span class="iconfont icon-tuichu"></span>退出</a>
        </div>
      </lay-header>
      <lay-layout>
        <!-- 侧边栏 -->
        <lay-side>
          <lay-menu
            :selectedKey="selectedKey"
            @changeSelectedKey="changeSelectedKey"
            @changeOpenKeys="changeOpenKeys"
            v-model:openKeys="openKeys2"
            :tree="true"
          >
            <div class="userinfo">
              <img :src="user_pic" alt="" class="userImg" v-if="user_pic">
              <span class="text-avatar" v-else>{{firstName}}</span>
              欢迎&nbsp;&nbsp;{{name}}
            </div>
            <lay-menu-item id="1" @click="$router.push('/index/home')">
              <span class="iconfont icon-home"></span>
              首页
            </lay-menu-item>
            <lay-sub-menu id="2">
              <template #title>
                <span class="iconfont icon-16"></span>
                文章管理
              </template>
              <lay-menu-item id="10" @click="$router.push('/index/articletype')">
                <lay-icon type="layui-icon-app"></lay-icon>
                文章类别
              </lay-menu-item>
              <lay-menu-item id="11">
                <lay-icon type="layui-icon-app"></lay-icon>
                文章列表
              </lay-menu-item>
              <lay-menu-item id="12">
                <lay-icon type="layui-icon-app"></lay-icon>
                发布文章
              </lay-menu-item>
            </lay-sub-menu>
            <lay-sub-menu id="3">
              <template #title>
                <span class="iconfont icon-user"></span>
                个人中心
              </template>
              <router-link to="/index/userinfo">
                <lay-menu-item id="13">
                  <lay-icon type="layui-icon-app"></lay-icon>基本资料
                </lay-menu-item>
              </router-link>
              <router-link to="/index/updateavatar">
                <lay-menu-item id="14">
                  <lay-icon type="layui-icon-app"></lay-icon>更换头像
                </lay-menu-item>
              </router-link>
              <router-link to="/index/resetpwd">
                <lay-menu-item id="15">
                  <lay-icon type="layui-icon-app"></lay-icon>重置密码
                </lay-menu-item>
              </router-link>
            </lay-sub-menu>
          </lay-menu>
        </lay-side>
        <lay-body>
          <router-view></router-view>
        </lay-body>
      </lay-layout>
    </lay-layout>
    <Alert
      :isShow="show"
      title="提示"
      content="确定退出登录?"
      :btn="btn"
      @close="close"
    >
    </Alert>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getUserInfo } from '../../api/big_event_api'
import Alert from '../../components/alert.vue'
export default {
  name: 'Index',
  setup() {
    const openKeys2 = ref(["2"])
    const selectedKey = ref("5")
    const changeSelectedKey = (val) => {
      selectedKey.value = val;
    }
    const changeOpenKeys = (val) => {
      openKeys2.value = val;
    }
    return {
      openKeys2,
      selectedKey,
      changeOpenKeys,
      changeSelectedKey
    }
  },
  data() {
    return {
      name: '',
      firstName: '',
      user_pic: '',
      show: false,
      btn: [
        {
          text: '确定',
          color: 'white',
          bgc: 'lightblue',
          callback: this.logout
        },
        {
          text: '取消',
          color: 'black',
          bgc: 'white'
        }
      ]
    }
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    async initUserInfo() {
      try {
        const { data:res } = await getUserInfo()
        // console.log(res)
        if(res.status !== 0) return
        this.name = res.data.nickname === '' ? res.data.username : res.data.nickname
        this.firstName = this.name[0].toUpperCase()
        this.user_pic = res.data.user_pic
      } catch (error) {
        console.log(error)
      }
    },
    open() {this.show = true},
    close() {this.show = false},
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  components: {
    Alert
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  .example {
    height: 100%;
    .iconfont {
      margin: 0 10px 0 0;
    }
    .layui-icon {
      margin: 0 10px
    }
    .layui-header {
      line-height: 60px;
      padding: 0 30px;
      background: #2E313A;
      color: white;
      .controlBox {
        float: right;
        a {
          color: #fff;
        }
        .headerLink {
          padding: 0 30px;
          .headerImg {
            margin: 0 15px;
            height: 40px;
            border-radius: 20px;
          }
          .text-avatar {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            text-align: center;
            border-radius: 50%;
            margin-right: 10px;
            background-color: #009688;
          }
          &::after {
            content: "";
            display: inline-block;
            margin: 0 10px;
            width: 5px;
            height: 5px;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: rotate(-45deg);
            transition: all 0.3s;
          }
          &:hover::after {
            transform: rotate(45deg);
          }
        }
      }
    }
    .layui-side {
      display: flex;
      background: #393D49;
      align-items: flex-start;
      justify-content: center;
      color: white;
      .userinfo {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #2E313A;
        .userImg {
          margin: 0 15px;
          height: 40px;
          border-radius: 50%;
        }
        .text-avatar {
          position: relative;
          top: 1px;
          display: inline-block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          text-align: center;
          border-radius: 50%;
          margin-right: 10px;
          background-color: #009688;
        }
      }
    }
    .layui-body {
      background: #fff;
      color: black;
    }
  }
}
</style>