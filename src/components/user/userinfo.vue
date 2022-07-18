<template>
  <div class="userinfo">
    <Card title="修改用户信息">
      <!-- autocomplete关闭input自动提示，也可以给input单独加 -->
      <form autocomplete="off">
        <div class="line">
          <label for="username">登录名称</label>
          <input type="text" name="username" id="username" placeholder="请输入登录名称" :value="username" readonly>
        </div>
        <div class="line">
          <label for="nickname">用户昵称</label>
          <input type="text" name="nickname" id="nickname" placeholder="请输入用户昵称" v-model="nickname">
        </div>
        <div class="line">
          <label for="email">用户邮箱</label>
          <input type="text" name="email" id="email" placeholder="请输入用户邮箱" v-model="email">
        </div>
        <div class="line">
          <button type="submit" @click.prevent="submit">提交修改</button>
          <button type="reset" @click.prevent="reset">重置</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
import { layer } from '@layui/layer-vue'
import { getUserInfo, updateUserInfo } from '../../api/big_event_api'
import Card from '../card.vue'
export default {
  name: 'Userinfo',
  data() {
    return {
      userInfo: null,
      id: 0,
      username: '',
      nickname: '',
      email: '',
      nicknameReg: /^\w{3,10}$/,
      emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
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
        this.username = res.data.username
        this.nickname = res.data.nickname
        this.email = res.data.email
        this.id = res.data.id
        this.userInfo = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async submit() {
      try {
        if(!this.nicknameReg.test(this.nickname)) return layer.msg("请输入3-10位的用户昵称!", { time: 1000 })
        if(!this.emailReg.test(this.email)) return layer.msg("邮箱格式错误!", { time: 1000 })
        const { data } = await updateUserInfo(this.id, this.nickname, this.email)
        // console.log(data)
        if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
        layer.msg(data.message, { time: 1000 })
        // this.$options.name可以拿到组件name
        // console.log(this.$parent.$parent.$parent.$parent.$parent.$options.name)
        this.$parent.$parent.$parent.$parent.$parent.initUserInfo()
        // TODO:优化
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
        this.nickname = this.userInfo.nickname
        this.email = this.userInfo.email
    }
  },
  components: { Card }
}
</script>

<style lang="less" scoped>
.userinfo {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #f0f0f0;
  form {
    padding-left: 30px;
    .line {
      height: 60px;
      line-height: 60px;
      &:last-child {
        padding-left: 80px;
      }
      label {
        display: inline-block;
        width: 60px;
        font-size: 15px;
      }
      input {
        width: 500px;
        height: 40px;
        margin-left: 20px;
        border: 1px solid #f0f0f0;
      }
      button {
        padding: 8px 15px;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        transition: all 0.3s;
        &:first-child {
          color: #fff;
          background-color: lightseagreen;
          &:hover {
            background-color: #01989b;
          }
        }
        &:last-child {
          background-color: #fff;
          margin-left: 20px;
          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
}
</style>