<template>
    <div>
        <page-header title="水波纹" />
        <el-row :gutter="20" style="margin: 20px 10px;">
            <el-col :span="12">
                <page-main title="默认" style="margin: 0;">
                    <el-button v-waves>默认按钮</el-button>
                    <el-button v-waves type="primary">主要按钮</el-button>
                    <el-button v-waves type="success">成功按钮</el-button>
                    <el-button v-waves type="info">信息按钮</el-button>
                    <el-button v-waves type="warning">警告按钮</el-button>
                    <el-button v-waves type="danger">危险按钮</el-button>
                    <div v-waves class="block">作用于 div</div>
                    <img v-waves :src="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`">
                </page-main>
            </el-col>
            <el-col :span="12">
                <page-main title="悬浮" style="margin: 0;">
                    <el-button v-waves.float>默认按钮</el-button>
                    <el-button v-waves.float type="primary">主要按钮</el-button>
                    <el-button v-waves.float type="success">成功按钮</el-button>
                    <el-button v-waves.float type="info">信息按钮</el-button>
                    <el-button v-waves.float type="warning">警告按钮</el-button>
                    <el-button v-waves.float type="danger">危险按钮</el-button>
                    <div v-waves.float class="block">作用于 div</div>
                    <img v-waves.float :src="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`">
                </page-main>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 20px 10px;">
            <el-col :span="12">
                <page-main title="亮色" style="margin: 0;">
                    <el-button v-waves.light>默认按钮</el-button>
                    <el-button v-waves.light type="primary">主要按钮</el-button>
                    <el-button v-waves.light type="success">成功按钮</el-button>
                    <el-button v-waves.light type="info">信息按钮</el-button>
                    <el-button v-waves.light type="warning">警告按钮</el-button>
                    <el-button v-waves.light type="danger">危险按钮</el-button>
                    <div v-waves.light class="block">作用于 div</div>
                    <img v-waves.light :src="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`">
                </page-main>
            </el-col>
            <el-col :span="12">
                <page-main title="经典" style="margin: 0;">
                    <el-button v-waves.classic>默认按钮</el-button>
                    <el-button v-waves.classic type="primary">主要按钮</el-button>
                    <el-button v-waves.classic type="success">成功按钮</el-button>
                    <el-button v-waves.classic type="info">信息按钮</el-button>
                    <el-button v-waves.classic type="warning">警告按钮</el-button>
                    <el-button v-waves.classic type="danger">危险按钮</el-button>
                    <div v-waves.classic class="block">作用于 div</div>
                    <img v-waves.classic :src="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`">
                </page-main>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {}
    },
    computed: {
        locationOrigin: () => location.origin
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    width: 100px;
    height: 100px;
    color: #fff;
    background: #409eff;
}
img {
    display: block;
    width: 100px;
    height: 100px;
}
</style>
