<template>
    <div>
        <page-header title="二维码">
            <el-button icon="el-icon-link" @click="open('https://github.com/soldair/node-qrcode')">node-qrcode 官网</el-button>
        </page-header>
        <el-row :gutter="20" style="margin: 0 10px;">
            <el-col :sm="6">
                <page-main title="渲染成 img 标签" style="margin: 0;">
                    <img :src="url1">
                </page-main>
            </el-col>
            <el-col :sm="6">
                <page-main title="渲染成 canvas 标签" style="margin: 0;">
                    <canvas ref="canvas" />
                </page-main>
            </el-col>
            <el-col :sm="6">
                <page-main title="自定义颜色" style="margin: 0;">
                    <img :src="url2">
                </page-main>
            </el-col>
            <el-col :sm="6">
                <page-main title="指定宽度" style="margin: 0;">
                    <img :src="url3">
                </page-main>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url1: '',
            url2: '',
            url3: ''
        }
    },
    mounted() {
        // 渲染成 img 标签
        this.$qrcode.toDataURL('Fantastic-admin 真棒！').then(url => {
            this.url1 = url
        }).catch(err => {
            console.log(err)
        })
        // 渲染成 canvas 标签
        this.$qrcode.toCanvas(this.$refs.canvas, 'Fantastic-admin 真棒！').then(() => {
            console.log('success')
        }).catch(err => {
            console.log(err)
        })
        // 自定义颜色
        this.$qrcode.toDataURL('Fantastic-admin 真棒！', {
            color: {
                dark: '#5482EE',
                light: '#E8E8E8'
            }
        }).then(url => {
            this.url2 = url
        }).catch(err => {
            console.log(err)
        })
        // 指定宽度
        this.$qrcode.toDataURL('Fantastic-admin 真棒！', {
            width: 100
        }).then(url => {
            this.url3 = url
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.page-main {
    text-align: center;
}
</style>
