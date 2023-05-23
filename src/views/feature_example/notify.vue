<template>
    <div>
        <page-header title="通知" content="基于 iNotify ，支持 favicon、网页标题、Chrome桌面通知">
            <el-button icon="el-icon-link" @click="open('https://github.com/jaywcjlove/iNotify')">访问 iNotify</el-button>
        </page-header>
        <page-main title="Favicon 通知">
            <el-button @click="setFavicon">设置 Favicon</el-button>
            <el-button @click="setFaviconColor">设置 Favicon 颜色(白底黑字)</el-button>
            <el-button :disabled="!isSetFavicon" @click="clearFavicon">清空 Favicon</el-button>
        </page-main>
        <page-main title="标题通知">
            <el-button @click="setTitle">开始滚动标题</el-button>
            <el-button :disabled="!isSetTitle" @click="clearTitle">停止滚动标题</el-button>
        </page-main>
        <page-main title="桌面通知（如果按钮被禁用，说明当前环境不支持）">
            <el-button :disabled="!isNotify" @click="setNotify">打开通知</el-button>
            <el-button :disabled="!isNotify" @click="setNotifyWithUrl">打开通知(点击打开页面)</el-button>
            <el-button :disabled="!isNotify" @click="setNotifyWithIcon">打开通知(设置 icon)</el-button>
            <el-button @click="setNotifyWithEvent">打开通知(回调事件)</el-button>
        </page-main>
    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()

const notify = proxy.$iNotify({
    effect: 'scroll',
    interval: 500
})

const isNotify = ref(notify.isPermission())

// Favicon 通知
const isSetFavicon = ref(false)
function setFavicon() {
    notify.setFavicon(5).setFaviconColor('#fff').setFaviconBackgroundColor('#2F9A00')
    isSetFavicon.value = true
}
function setFaviconColor() {
    notify.setFaviconColor('#000').setFaviconBackgroundColor('#fff')
    isSetFavicon.value = true
}
function clearFavicon() {
    notify.faviconClear()
    isSetFavicon.value = false
}

// 标题通知
const isSetTitle = ref(false)
function setTitle() {
    notify.setTitle('您有5条通知未处理，请尽快处理噢~')
    isSetTitle.value = true
}
function clearTitle() {
    notify.setTitle()
    isSetTitle.value = false
}

// 桌面通知
function setNotify() {
    notify.notify({
        title: 'Fantastic-admin',
        body: 'Fantastic-admin 是一款开箱即用的中后台框架'
    })
}
function setNotifyWithUrl() {
    notify.notify({
        title: '温馨提示',
        body: '用 Fantastic-admin 做开发记得要看开发文档噢，点击我访问开发文档',
        openurl: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin`
    })
}
function setNotifyWithIcon() {
    notify.notify({
        title: '温馨提示',
        body: 'icon 默认显示 favicon ，也可以手动设置',
        icon: 'https://picsum.photos/100'
    })
}
function setNotifyWithEvent() {
    notify.notify({
        title: '温馨提示',
        body: '注意看相关触发事件',
        onshow: () => {
            proxy.$message('触发 onshow 事件')
        },
        onclick: () => {
            proxy.$message('触发 onclick 事件')
        },
        onerror: () => {
            proxy.$message('触发 onerror 事件')
        },
        onclose: () => {
            proxy.$message('触发 onclose 事件')
        }
    })
}

function open(url) {
    window.open(url, 'top')
}
</script>
