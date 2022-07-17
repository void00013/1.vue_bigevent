<template>
  <!-- 背景区域 -->
  <div class="login_bg">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>
  </div>

  <!-- 登录注册区域 -->
  <div class="loginAndRegBox">
    <div class="title-box"></div>
    <!-- 登录区域 -->
    <lay-form :model="model" v-if="isLogin">
      <lay-input prefix-icon="layui-icon-username" v-model="model.username" placeholder="请输入用户名"></lay-input>
      <lay-input prefix-icon="layui-icon-password" v-model="model.password" type="password" placeholder="请输入密码"></lay-input>
      <lay-button type="normal" fluid="true" @click="btnLogin">登录</lay-button>
      <a href="javascript:;" @click="isLogin = false">去注册</a>
    </lay-form>
    <!-- 注册区域 -->
    <lay-form :model="model" v-else>
      <lay-input prefix-icon="layui-icon-username" v-model="model.username" placeholder="请输入用户名"></lay-input>
      <lay-input prefix-icon="layui-icon-password" v-model="model.password" type="password" placeholder="请输入密码"></lay-input>
      <lay-input prefix-icon="layui-icon-password" v-model="model.repassword" type="password" placeholder="再次确认密码"></lay-input>
      <lay-button type="normal" fluid="true" @click="btnReg">注册</lay-button>
      <a href="javascript:;" @click="isLogin = true">去登录</a>
    </lay-form>
  </div>
</template>

<script>
// import { reactive } from 'vue'
import { layer } from '@layui/layer-vue'
import { reg, login } from '../../api/big_event_api'
export default {
  name: 'Login',
  data() {
    return {
      isLogin: true,
      reguser: /^\w{3,10}$/,
      model: {
        username: '',
        password: '',
        repassword: '',
      }
    }
  },

  methods: {
    async btnLogin() {
      try {
        if(!this.reguser.test(this.model.username)) return layer.msg('请输入3-10位的用户名!', {time: 1000})
        const {data} = await login(this.model.username, this.model.password)
        if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
        layer.msg("登录成功", { time: 1000 })
        localStorage.setItem('token', data.token)
        this.$router.push('/index')
      } catch (error) {
        layer.msg("登录失败", { time: 1000 })
        console.log(error)
      }
    },
    async btnReg() {
      try {
        if(!this.reguser.test(this.model.username)) return layer.msg('请输入3-10位的用户名!', {time: 1000})
        if(this.model.repassword !== this.model.password) return layer.msg('两次输入的密码不一致，请重新输入!', {time: 1000})
        const {data} = await reg(this.model.username, this.model.password)
        if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
        layer.msg("注册成功，请登录", { time: 1000 })
        this.isLogin = true
      } catch (error) {
        layer.msg("注册失败", { time: 1000 })
        console.log(error)
      }
    }
  }

  // layui中提供的节点,内部不能访问this组件实例
  // setup() {
  //   const model = reactive({
  //       isLogin: true,
  //       username: '',
  //       password: '',
  //       repassword: '',
  //   })

  //   const btnLogin = async function() {
  //     const {data} = await login(model.username, model.password)
  //     if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
  //     layer.msg("登录成功", { time: 1000 })
  //     localStorage.setItem('token', data.token)
  //   }

  //   const btnReg = async function() {
  //     const {data} = await reg(model.username, model.password)
  //     if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
  //     layer.msg("注册成功，请登录", { time: 1000 })
  //     model.isLogin = true
  //   }
  //   return {
  //     model,
  //     btnLogin,
  //     btnReg,
  //   }
  // }
}
</script>

<style lang="less" scoped>
  .login_bg {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/login_bg.jpg') no-repeat center;
    background-size: cover;
    .logo {
      width: 1140px;
      margin: 0 auto;
    }
  }
  .loginAndRegBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 310px;
    border-radius: 10px;
    box-shadow: 0 0 50px 5px rgba(224, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.6);
    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat center;
    }
    form {
      padding: 0 30px;

      .layui-input-wrapper, button {
        margin: 5px 0;
      }

      a {
        float: right;
        font-size: 12px;
      }
    }
    // .layui-form-item {
    //   position: relative;
    //   .layui-icon {
    //     position: absolute;
    //     top: 10px;
    //     left: 10px;
    //   }
    //   .layui-input {
    //     padding-left: 32px;
    //   }
    //   .a-link {
    //     float: right;
    //     font-size: 12px;
    //   }
    // }
  }
</style>