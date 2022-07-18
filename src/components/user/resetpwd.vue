<template>
  <div class="resetpwd">
    <Card title="修改密码">
      <!-- autocomplete关闭input自动提示，也可以给input单独加 -->
      <form autocomplete="off" ref="form">
        <div class="line">
          <label for="oldpwd">原密码</label>
          <input type="password" name="oldpwd" id="oldpwd" placeholder="请输入原密码" v-model="oldpwd">
        </div>
        <div class="line">
          <label for="newpwd1">新密码</label>
          <input type="password" name="newpwd1" id="newpwd1" placeholder="请输入新密码" v-model="newpwd1">
        </div>
        <div class="line">
          <label for="newpwd2">确认新密码</label>
          <input type="password" name="newpwd2" id="newpwd2" placeholder="请再次确认密码" v-model="newpwd2">
        </div>
        <div class="line">
          <button type="submit" @click.prevent="submit">修改密码</button>
          <button type="reset">重置</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
import { layer } from '@layui/layer-vue'
import Card from '../card.vue'
import { updatePwd } from '../../api/big_event_api'
export default {
  name: 'Resetpwd',
  data() {
    return {
      pwdReg: /\S{6,12}/,
      oldpwd: '',
      newpwd1: '',
      newpwd2: ''
    }
  },
  methods: {
    async submit() {
      try {
        if(!this.pwdReg.test(this.newpwd1)) return layer.msg("请输入6-12位的密码", { time: 1000 })
        if(this.newpwd1 === this.oldpwd) return layer.msg("新密码不能和原密码相同", { time: 1000 })
        if(this.newpwd1 !== this.newpwd2) return layer.msg("两次输入的密码不一致", { time: 1000 })
        const { data } = await updatePwd(this.oldpwd, this.newpwd1)
        // console.log(data)
        if(data.status !== 0) return layer.msg(data.message, { time: 1000 })
        layer.msg(data.message, { time: 1000 })
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: { Card }
}
</script>

<style lang="less" scoped>
.resetpwd {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f0f0f0;
  form {
    padding-left: 30px;
    .line {
      height: 60px;
      line-height: 60px;
      &:last-child {
        padding-left: 95px;
      }
      label {
        display: inline-block;
        width: 75px;
        font-size: 15px;
        text-align: right;
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