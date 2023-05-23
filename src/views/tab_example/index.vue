<template>
    <div>
        <page-header title="标签栏" content="功能类似于浏览器的标签栏，支持右键操作" />
        <page-main>
            <p>访问侧边栏导航里的任意路由，都会在标签栏里自动创建一个标签。</p>
            <p>除了在标签栏里操作关闭标签，你也可以使用全局方法关闭当前页面的标签。但如果当前只有一个标签时，则无法关闭。</p>
            <el-button @click="close">关闭当前标签页</el-button>
        </page-main>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$tabbar.close('/dashboard')
        }
    }
}
</script>
