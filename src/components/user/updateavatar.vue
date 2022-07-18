<template>
  <div class="updateavatar">
    <Card title="更换头像">
      <div class="boxflex">
        <div class="box">
          <div class="line">
            <!-- 裁剪区域 -->
            <div class="cropper-box">
              <!-- <img src="../../assets/images/img.jpg"> -->
              <VueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :canScale='option.canScale'
                :autoCrop='option.autoCrop'
                :autoCropWidth='option.autoCropWidth'
                :autoCropHeight='option.autoCropHeight'
                :canMoveBox='option.canMoveBox'
                :canMove='option.canMove'
                :centerBox='option.centerBox'
                :info='option.info'
                :fixedBox='option.fixedBox'
              ></VueCropper>
            </div>
            <!-- 预览区域 -->
            <div class="proview-box">
              <div>
                <div class="view w100"></div>
                <p>100*100</p>
              </div>
              <div>
                <div class="view w50"></div>
                <p>50*50</p>
              </div>
            </div>
          </div>
          <div class="line">
            <button>上传</button>
            <button>确定</button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper"
import Card from '../card.vue'
export default {
  name: 'Updateavatar',
  data() {
    return {
      option: {
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        // img: import.meta.globEager('../../assets/images/img.jpg'),
        outputSize: 1, // 裁剪生成图片质量
        outputType: 'jepg', // 裁剪生成图片格式
        canScale: true, // 图片是否允许滚轮播放
        autoCrop: true, // 是否默认生成截图框 false
        info: false, // 是否展示截图框信息
        autoCropWidth: 200, // 生成截图框的宽度
        autoCropHeight: 200, // 生成截图框的高度
        canMoveBox: true, // 截图框是否可以拖动
        fixedBox: true, // 固定截图框的大小
        canMove: false, // 上传图片是否可拖动
        centerBox: true, // 截图框限制在图片里面
      }
    }
  },
  components: { VueCropper, Card }
}
</script>

<style lang="less" scoped>
.updateavatar {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f0f0f0;
  .boxflex {
    width: 100%;
    display: flex;
    justify-content: center;
    .box {
      width: 800px;
      .line {
        &:first-child {
          display: flex;
          justify-content: space-around;
        }
        .cropper-box {
          width: 500px;
          height: 500px;
          line-height: 500px;
          text-align: center;
        }
        .proview-box {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 300px;
          .w100 {
            width: 100px;
            height: 100px;
            background-color: #01989b;
          }
          .w50 {
            width: 50px;
            height: 50px;
            background-color: #01989b;
          }
          p {
            text-align: center;
          }
        }
        &:last-child {
          padding-top: 30px;
          text-align: center;
        }
        button {
          padding: 8px 15px;
          border: 1px solid #f0f0f0;
          border-radius: 5px;
          transition: all 0.3s;
          color: #fff;
          &:first-child {
            background-color: lightseagreen;
            &:hover {
              background-color: #01989b;
            }
          }
          &:last-child {
            background-color: lightsalmon;
            margin-left: 20px;
            &:hover {
              background-color: #ff8250;
            }
          }
        }
      }
    }
  }
}
</style>