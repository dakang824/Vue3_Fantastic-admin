<template>
    <page-main>
        <el-button @click="edit">将标题修改为「 测试标题 」</el-button>
    </page-main>
</template>

<script setup>
const store = useStore()

function edit() {
    store.dispatch('settings/setTitle', '测试标题')
}
</script>
