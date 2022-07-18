<template>
  <div class="alert" v-if="show">
    <div class="alertbody">
      <div class="title">{{title}}<span @click="hide">x</span></div>
      <div class="content">{{content}}</div>
      <div class="btn">
        <button
          v-for="item in btn"
          :key="item"
          @click="hide(item.callback)"
          :style="{
            color: item.color,
            backgroundColor: item.bgc,
          }"
        >
          {{item.text}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '内容'
    },
    btn: {
      type: Array,
      default: [{ text: '按钮', color: 'black', bgc: 'white', callback: null }]
    }
  },
  // data() {
  //   return {
  //     show: this.isShow
  //   }
  // },
  computed: {
    show() {
      return this.isShow
    }
  },
  methods: {
    hide(callback) {
      this.$emit('close')
      callback()
    }
  },
}
</script>

<style lang="less" scoped>
.alert {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.5);
  .alertbody {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    transform: translate(-50%, -50%);
    background-color: #f0f0f0;
    .title {
      position: relative;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(153, 153, 153, 0.5);
      span {
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
    }
    .content {
      height: 80px;
      padding: 10px;
    }
    .btn {
      float: right;
      height: 50px;
      line-height: 50px;
      button {
        cursor: pointer;
        margin: 0 10px;
        padding: 5px 10px;
        border: 1px solid rgba(153, 153, 153, 0.5);
        border-radius: 5px;
      }
    }
  }
}
</style>