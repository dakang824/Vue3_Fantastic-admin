<template>
    <div>
        <page-header title="电子签名">
            <template #content>
                <p>SignCanvas 三方组件</p>
                <p style="margin-bottom: 0;">该组件可用于电子合同签订等在线签名使用场景</p>
            </template>
            <el-button icon="el-icon-link" @click="open('https://github.com/langyuxiansheng/vue-sign-canvas')">组件仓库地址</el-button>
        </page-header>
        <page-main>
            <sign-canvas ref="signCanvasRef" :options="options" />
            <div>
                <el-button @click="canvasClear">清除画板</el-button>
                <el-button @click="saveAsImg">生成图片</el-button>
                <el-button @click="downloadSignImg">下载图片</el-button>
            </div>
            <img v-if="value" :src="value" :width="options.canvasWidth" :height="options.canvasHeight">
        </page-main>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const value = ref('')
const options = ref({
    isDpr: true, // 是否使用dpr兼容高倍屏 [Boolean] 可选
    lastWriteSpeed: 1, // 书写速度 [Number] 可选
    lastWriteWidth: 2, // 下笔的宽度 [Number] 可选
    lineCap: 'round', // 线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square] 正方形线帽
    lineJoin: 'bevel', // 线条交汇时边角的类型 [bevel]创建斜角 [round]创建圆角 [miter]创建尖角
    canvasWidth: 500, // canvas宽高 [Number] 可选
    canvasHeight: 250, // 高度  [Number] 可选
    isShowBorder: false, // 是否显示边框 [可选]
    bgColor: '#fee', // 背景色 [String] 可选
    borderWidth: 1, // 网格线宽度  [Number] 可选
    borderColor: '#ff787f', // 网格颜色  [String] 可选
    writeWidth: 5, // 基础轨迹宽度  [Number] 可选
    maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
    minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
    writeColor: '#101010', // 轨迹颜色  [String] 可选
    isSign: true, // 签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
    imgType: 'png' // 下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
})

// 清除画板
function canvasClear() {
    proxy.$refs.signCanvasRef.canvasClear()
}
// 生成图片
function saveAsImg() {
    value.value = proxy.$refs.signCanvasRef.saveAsImg()
}
// 下载图片
function downloadSignImg() {
    proxy.$refs.signCanvasRef.downloadSignImg()
}
function open(url) {
    window.open(url, 'top')
}
</script>
