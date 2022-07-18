<template>
  <div class="home">
    <div class="echartsBox">
      <div class="count">
        <lay-row space="10">
          <lay-col md="6"><div class="grid-demo"><em>10015</em><span>篇</span><b>总文章数</b></div></lay-col>
          <lay-col md="6"><div class="grid-demo"><em>123</em><span>篇</span><b>日新增文章数</b></div></lay-col>
          <lay-col md="6"><div class="grid-demo"><em>35</em><span>篇</span><b>评论总数</b></div></lay-col>
          <lay-col md="6"><div class="grid-demo"><em>123</em><span>篇</span><b>日新增评论数</b></div></lay-col>
        </lay-row>
      </div>
      <!-- echarts的盒子要明确指定宽高 -->
      <div class="addArticleNum" ref="addArticleNum"></div>
      <div class="articleTypeNumRatio" ref="articleTypeNumRatio"></div>
    </div>
  </div>
</template>

<script>
// 初始化echarts实例方法1：ref引用获取dom元素，再按官方流程初始化
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data() {
    return {
      addArticleNumEcharts: null,           //月新增文章数echarts实例
      articleTypeNumRatioEcharts: null,     //文章分类数量比echrts实例
      addArticleNumOption: {
        title: {
          text: '月新增文章数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Search Engine',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      articleTypeNumRatioOption: {
        title: {
          text: '分类文章数量比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 500, name: '爱旅行' },
              { value: 580, name: '奇趣事' },
              { value: 484, name: '趣美味' },
              { value: 300, name: '会生活' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    // this是取到当前组件实例
    // console.log(this)
    // this.$el是取到当前组件的根元素(.home)实例
    // console.log(this.$el)
    // 初始化echats实例
    // 初始化代码不可以写在生命周期函数外面，且只能写在mounted生命周期函数中，因为在外面dom元素还未渲染就获取，这是获取不到的
    this.addArticleNumEcharts = echarts.init(this.$refs.addArticleNum)
    this.articleTypeNumRatioEcharts = echarts.init(this.$refs.articleTypeNumRatio)
    this.addArticleNumEcharts.setOption(this.addArticleNumOption)
    this.articleTypeNumRatioEcharts.setOption(this.articleTypeNumRatioOption)
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  padding: 20px;
  background-color: #f0f0f0;
  .echartsBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .count {
      width: 100%;
      margin: 0 0 10px 0;
    }
    .grid-demo {
      position: relative;
      padding-bottom: 20px;
      line-height: 50px;
      border-radius: 2px;
      font-size: 30px;
      text-align: center;
      background-color: #fff;
      color: black;
      span {
        font-size: 10px;
        margin-left: 10px;
      }
      b {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        background-color: #e0e0e0;
      }
    }
    .addArticleNum {
      width: 1000px;
      height: 650px;
      background-color: #fff;
    }
    .articleTypeNumRatio {
      width: 650px;
      height: 650px;
      background-color: #fff;
    }
  }
}
</style>