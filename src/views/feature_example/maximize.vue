<template>
    <div>
        <page-header title="主页面最大化" content="扩大可视范围和操作区域，能更专注于主页面上的操作" />
        <page-main>
            <p>可通过双击标签页，或在标签页上右键并选择“最大化”进入。</p>
            <p>同时框架还提供全局函数，可自由控制主页面是否最大化。</p>
            <el-button @click="toggle">{{ $store.state.settings.mainPageMaximizeStatus ? '退出' : '开启' }}最大化</el-button>
        </page-main>
    </div>
</template>

<script>
export default {
    methods: {
        toggle() {
            if (this.$store.state.settings.mainPageMaximizeStatus) {
                this.$mainPageMaximize(false)
            } else {
                this.$mainPageMaximize(true)
            }
        }
    }
}
</script>
