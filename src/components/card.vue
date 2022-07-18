<template>
  <div class="card">
    <div class="title">{{title}}</div>
    <div class="content">
      <slot>内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
}
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px solid #f0f0f0;
  }
  .content {
    padding: 10px;
  }
}
</style>