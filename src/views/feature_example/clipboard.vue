<template>
    <div>
        <page-header title="剪贴板">
            <el-button icon="el-icon-link" @click="open('https://github.com/soerenmartius/vue3-clipboard')">vue3-clipboard 官网</el-button>
        </page-header>
        <page-main title="输入内容，并点击复制按钮">
            <el-input v-model="input">
                <template #append>
                    <el-button @click="copy">复制</el-button>
                </template>
            </el-input>
        </page-main>
        <page-main title="复制成功后可在这粘贴测试">
            <el-input v-model="input2" />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            input2: ''
        }
    },
    methods: {
        copy() {
            this.$clipboard(this.input)
            this.$message.success(`复制成功：${this.input}`)
        },
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>
