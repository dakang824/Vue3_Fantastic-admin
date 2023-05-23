<template>
    <div>
        <el-drawer v-model="isShow" title="主题配置" direction="rtl" :size="350">
            <el-alert title="主题配置可实时预览效果，更多设置请在 src/settings.js 中进行设置，建议在生产环境隐藏主题配置功能" type="error" :closable="false" />
            <el-divider v-if="$store.state.settings.mode === 'pc'">导航栏模式</el-divider>
            <div v-if="$store.state.settings.mode === 'pc'" class="menu-mode">
                <el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-side" :class="{'active': menuMode === 'side'}" @click="menuMode = 'side'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="顶部模式" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-head" :class="{'active': menuMode === 'head'}" @click="menuMode = 'head'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-single" :class="{'active': menuMode === 'single'}" @click="menuMode = 'single'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="侧边栏精简模式" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-only-side" :class="{'active': menuMode === 'only-side'}" @click="menuMode = 'only-side'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="顶部精简模式" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-only-head" :class="{'active': menuMode === 'only-head'}" @click="menuMode = 'only-head'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider v-if="$store.state.settings.mode === 'pc'">页宽模式</el-divider>
            <div v-if="$store.state.settings.mode === 'pc'" class="app-width-mode">
                <el-tooltip content="自适应" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-adaption" :class="{'active': appWidthMode === 'adaption'}" @click="appWidthMode = 'adaption'">
                        <svg-icon name="el-icon-back" class="left" />
                        <svg-icon name="el-icon-right" class="right" />
                        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
                    </div>
                </el-tooltip>
                <el-tooltip content="自适应（有最小宽度）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-adaption-min-width" :class="{'active': appWidthMode === 'adaption-min-width'}" @click="appWidthMode = 'adaption-min-width'">
                        <svg-icon name="el-icon-back" class="left" />
                        <svg-icon name="el-icon-right" class="right" />
                        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
                    </div>
                </el-tooltip>
                <el-tooltip content="定宽居中" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-center" :class="{'active': appWidthMode === 'center'}" @click="appWidthMode = 'center'">
                        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
                    </div>
                </el-tooltip>
                <el-tooltip content="定宽居中（有最大宽度）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-center-max-width" :class="{'active': appWidthMode === 'center-max-width'}" @click="appWidthMode = 'center-max-width'">
                        <svg-icon name="el-icon-back" class="left" />
                        <svg-icon name="el-icon-right" class="right" />
                        <svg-icon name="ri-checkbox-circle-fill" class="active-icon" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider>导航栏风格</el-divider>
            <div class="menu-style">
                <el-tooltip content="卡片" placement="top" :show-after="500" :append-to-body="false">
                    <div class="style style-card" :class="{'active': menuStyle === 'card'}" @click="menuStyle = 'card'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="圆角" placement="top" :show-after="500" :append-to-body="false">
                    <div class="style style-radius" :class="{'active': menuStyle === 'radius'}" @click="menuStyle = 'radius'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip v-if="$store.state.settings.menuMode !== 'single'" content="箭头" placement="top" :show-after="500" :append-to-body="false">
                    <div
                        class="style" :class="{
                            'style-arrow-right': ['side', 'only-side'].includes($store.state.settings.menuMode),
                            'style-arrow-bottom': ['head', 'only-head'].includes($store.state.settings.menuMode),
                            'active': menuStyle === 'arrow'
                        }" @click="menuStyle = 'arrow'"
                    >
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider>主题风格</el-divider>
            <div class="theme">
                <el-tooltip content="默认" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-default" :class="{'active': theme === 'default'}" @click="theme = 'default'">
                        <div class="content" />
                    </div>
                </el-tooltip>
                <el-tooltip content="Vue CLI 风格" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-vue-cli" :class="{'active': theme === 'vue-cli'}" @click="theme = 'vue-cli'">
                        <div class="content" />
                    </div>
                </el-tooltip>
                <el-tooltip content="码云风格" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-gitee" :class="{'active': theme === 'gitee'}" @click="theme = 'gitee'">
                        <div class="content" />
                    </div>
                </el-tooltip>
                <el-tooltip content="清新" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-freshness" :class="{'active': theme === 'freshness'}" @click="theme = 'freshness'">
                        <div class="content" />
                    </div>
                </el-tooltip>
                <el-tooltip content="素雅" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-elegant" :class="{'active': theme === 'elegant'}" @click="theme = 'elegant'">
                        <div class="content" />
                    </div>
                </el-tooltip>
                <el-tooltip content="纯白" placement="top" :show-after="500" :append-to-body="false">
                    <div class="theme-pure-white" :class="{'active': theme === 'pure-white'}" @click="theme = 'pure-white'">
                        <div class="content" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider>侧边栏</el-divider>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">折叠按钮</div>
                <el-switch v-model="enableSidebarCollapse" :disabled="['only-side', 'only-head'].includes($store.state.settings.menuMode)" />
            </div>
            <div class="setting-item">
                <div class="label">是否折叠</div>
                <el-switch v-model="sidebarCollapse" :disabled="['only-side', 'only-head'].includes($store.state.settings.menuMode)" />
            </div>
            <div class="setting-item">
                <div class="label">
                    切换跳转
                    <el-tooltip content="开启该功能后，切换侧边栏时，页面自动跳转至该侧边栏导航下第一个路由地址" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="switchSidebarAndPageJump" :disabled="['single', 'only-side', 'only-head'].includes($store.state.settings.menuMode)" />
            </div>
            <div class="setting-item">
                <div class="label">
                    自动隐藏
                    <el-tooltip content="开启该功能后，切换侧边栏时，如果次导航里只有一项时，则自动隐藏。搭配开启「切换跳转」可实现点击主导航跳转" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="sidebarOnylOneHide" :disabled="['single', 'only-side', 'only-head'].includes($store.state.settings.menuMode)" />
            </div>
            <div class="setting-item">
                <div class="label">
                    保持展开一个
                    <el-tooltip content="开启该功能后，侧边栏只保持一个子菜单的展开" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="sidebarUniqueOpened" :disabled="['only-side', 'only-head'].includes($store.state.settings.menuMode)" />
            </div>
            <el-divider>顶栏</el-divider>
            <div class="setting-item">
                <div class="label">
                    顶栏固定
                    <el-tooltip content="包含顶部导航栏和标签栏" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="topbarFixed" />
            </div>
            <div class="setting-item">
                <div class="label">标签栏</div>
                <el-switch v-model="enableTabbar" />
            </div>
            <div class="setting-item">
                <div class="label">标签栏风格</div>
                <el-select v-model="tabbarStyle" size="small" :disabled="!$store.state.settings.enableTabbar">
                    <el-option label="时尚" value="fashion" />
                    <el-option label="卡片" value="card" />
                    <el-option label="方块" value="square" />
                </el-select>
            </div>
            <div class="setting-item">
                <div class="label">顶栏展示切换</div>
                <el-switch v-model="switchTabbarAndTopbar" :disabled="!$store.state.settings.enableTabbar" />
            </div>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">面包屑导航</div>
                <el-switch v-model="enableBreadcrumb" />
            </div>
            <el-divider>功能按钮</el-divider>
            <div class="setting-item">
                <div class="label">
                    导航栏搜索
                    <el-tooltip content="对导航栏进行快捷搜索" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableNavSearch" />
            </div>
            <div class="setting-item">
                <div class="label">
                    通知中心
                    <el-tooltip content="该功能具体业务功能需自行开发，框架仅提供示例模版" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableNotification" />
            </div>
            <div class="setting-item">
                <div class="label">国际化</div>
                <el-switch v-model="enableI18n" />
            </div>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">
                    全屏
                    <el-tooltip content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableFullscreen" />
            </div>
            <div class="setting-item">
                <div class="label">
                    页面刷新
                    <el-tooltip content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enablePageReload" />
            </div>
            <el-divider>其它</el-divider>
            <div class="setting-item">
                <div class="label">
                    组件尺寸
                    <el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-select v-model="elementSize" size="small">
                    <el-option label="默认 (large)" value="large" />
                    <el-option label="中等 (medium)" value="medium" />
                    <el-option label="小 (small)" value="small" />
                    <el-option label="极小 (mini)" value="mini" />
                </el-select>
            </div>
            <div class="setting-item">
                <div class="label">底部版权</div>
                <el-switch v-model="showCopyright" />
            </div>
            <div class="setting-item">
                <div class="label">
                    加载进度条
                    <el-tooltip content="该功能开启时，跳转路由会看到页面顶部有条蓝色的进度条" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableProgress" />
            </div>
            <div class="setting-item">
                <div class="label">
                    动态标题
                    <el-tooltip content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableDynamicTitle" />
            </div>
            <div class="setting-item">
                <div class="label">
                    欢迎页
                    <el-tooltip content="欢迎页即控制台页面，该功能开启时，登录成功默认进入控制台页面；关闭时则默认进入侧边栏导航第一个导航页面" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableDashboard" />
            </div>
            <div class="setting-item">
                <div class="label">页面水印</div>
                <el-switch v-model="enableWatermark" />
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()

const reload = inject('reload')

const isShow = ref(false)

const menuMode = computed({
    get: function() {
        return store.state.settings.menuMode
    },
    set: function(newValue) {
        store.commit('menu/switchHeaderActived', 0)
        store.commit('settings/updateThemeSetting', {
            'menuMode': newValue
        })
        store.state.settings.menuMode !== 'single' && store.commit('menu/setHeaderActived', route.fullPath)
    }
})
const appWidthMode = computed({
    get: function() {
        return store.state.settings.appWidthMode
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'appWidthMode': newValue
        })
    }
})
const menuStyle = computed({
    get: function() {
        return store.state.settings.menuStyle
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'menuStyle': newValue
        })
    }
})
const theme = computed({
    get: function() {
        return store.state.settings.theme
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'theme': newValue
        })
    }
})
const elementSize = computed({
    get: function() {
        return store.state.settings.elementSize
    },
    set: function(newValue) {
        proxy.$ELEMENT.size = newValue
        store.commit('settings/updateThemeSetting', {
            'elementSize': newValue
        })
        reload()
    }
})
const enableSidebarCollapse = computed({
    get: function() {
        return store.state.settings.enableSidebarCollapse
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableSidebarCollapse': newValue
        })
    }
})
const sidebarCollapse = computed({
    get: function() {
        return store.state.settings.sidebarCollapse
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'sidebarCollapse': newValue
        })
    }
})
const switchSidebarAndPageJump = computed({
    get: function() {
        return store.state.settings.switchSidebarAndPageJump
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'switchSidebarAndPageJump': newValue
        })
    }
})
const sidebarOnylOneHide = computed({
    get: function() {
        return store.state.settings.sidebarOnylOneHide
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'sidebarOnylOneHide': newValue
        })
    }
})
const sidebarUniqueOpened = computed({
    get: function() {
        return store.state.settings.sidebarUniqueOpened
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'sidebarUniqueOpened': newValue
        })
    }
})
const enableTabbar = computed({
    get: function() {
        return store.state.settings.enableTabbar
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableTabbar': newValue
        })
    }
})
const tabbarStyle = computed({
    get: function() {
        return store.state.settings.tabbarStyle
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'tabbarStyle': newValue
        })
    }
})
const topbarFixed = computed({
    get: function() {
        return store.state.settings.topbarFixed
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'topbarFixed': newValue
        })
    }
})
const switchTabbarAndTopbar = computed({
    get: function() {
        return store.state.settings.switchTabbarAndTopbar
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'switchTabbarAndTopbar': newValue
        })
    }
})
const enableBreadcrumb = computed({
    get: function() {
        return store.state.settings.enableBreadcrumb
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableBreadcrumb': newValue
        })
    }
})
const showCopyright = computed({
    get: function() {
        return store.state.settings.showCopyright
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'showCopyright': newValue
        })
    }
})
const enableNavSearch = computed({
    get: function() {
        return store.state.settings.enableNavSearch
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableNavSearch': newValue
        })
    }
})
const enableNotification = computed({
    get: function() {
        return store.state.settings.enableNotification
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableNotification': newValue
        })
    }
})
const enableI18n = computed({
    get: function() {
        return store.state.settings.enableI18n
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableI18n': newValue
        })
    }
})
const enableFullscreen = computed({
    get: function() {
        return store.state.settings.enableFullscreen
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableFullscreen': newValue
        })
    }
})
const enablePageReload = computed({
    get: function() {
        return store.state.settings.enablePageReload
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enablePageReload': newValue
        })
    }
})
const enableProgress = computed({
    get: function() {
        return store.state.settings.enableProgress
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableProgress': newValue
        })
    }
})
const enableDynamicTitle = computed({
    get: function() {
        return store.state.settings.enableDynamicTitle
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableDynamicTitle': newValue
        })
    }
})
const enableDashboard = computed({
    get: function() {
        return store.state.settings.enableDashboard
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableDashboard': newValue
        })
    }
})
const enableWatermark = computed({
    get: function() {
        return store.state.settings.enableWatermark
    },
    set: function(newValue) {
        store.commit('settings/updateThemeSetting', {
            'enableWatermark': newValue
        })
    }
})

watch(() => store.state.settings.menuMode, val => {
    if (val === 'single' && store.state.settings.menuStyle === 'arrow') {
        store.commit('settings/updateThemeSetting', {
            'menuStyle': 'card'
        })
    }
})

onMounted(() => {
    proxy.$eventBus.on('global-theme-toggle', () => {
        isShow.value = !isShow.value
    })
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    padding: 0 15px 20px;
    overflow: auto;
}
:deep(.el-input) {
    width: 150px;
}
.menu-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    .mode {
        position: relative;
        width: 50px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        background-color: #e1e3e6;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        &::before,
        &::after {
            pointer-events: none;
        }
        &-side {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background-color: #222b45;
            }
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 10px;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        &-head {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background-color: #222b45;
            }
            &::after {
                content: "";
                position: absolute;
                top: 10px;
                left: 0;
                width: 15px;
                height: calc(100% - 10px);
                background-color: #fff;
            }
        }
        &-single {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        &-only-side {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background-color: #222b45;
            }
        }
        &-only-head {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background-color: #222b45;
            }
        }
        i {
            position: absolute;
            right: 2px;
            bottom: 2px;
            display: none;
        }
        &.active i {
            display: block;
            color: #409eff;
        }
    }
}
.app-width-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    .mode {
        position: relative;
        width: 65px;
        height: 50px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        background-color: #e1e3e6;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        &-adaption {
            .left,
            .right {
                position: absolute;
                top: 50%;
                margin-top: -8px;
            }
            .left {
                left: 5px;
            }
            .right {
                right: 5px;
            }
        }
        &-adaption-min-width {
            background: #fff;
            &::before {
                content: "";
                position: absolute;
                left: 50%;
                margin-left: -15px;
                height: 100%;
                width: 30px;
                background-color: #e1e3e6;
            }
            .left,
            .right {
                position: absolute;
                top: 50%;
                margin-top: -8px;
            }
            .left {
                left: 0;
            }
            .right {
                right: 0;
            }
        }
        &-center {
            background: #fff;
            &::before {
                content: "";
                position: absolute;
                left: 50%;
                margin-left: -20px;
                height: 100%;
                width: 40px;
                background-color: #e1e3e6;
            }
        }
        &-center-max-width {
            background: #fff;
            &::before {
                content: "";
                position: absolute;
                left: 50%;
                margin-left: -20px;
                height: 100%;
                width: 40px;
                background-color: #e1e3e6;
            }
            .left,
            .right {
                position: absolute;
                top: 50%;
                margin-top: -8px;
            }
            .left {
                left: 13px;
            }
            .right {
                right: 13px;
            }
        }
        .active-icon {
            position: absolute;
            right: 2px;
            bottom: 2px;
            display: none;
        }
        &.active .active-icon {
            display: block;
            color: #409eff;
        }
    }
}
.menu-style {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    .style {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 60px;
        height: 30px;
        overflow: hidden;
        cursor: pointer;
        background-color: #334067;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        &-radius {
            border-radius: 10px;
        }
        &-arrow-right {
            &::before {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -7px;
                width: 0;
                height: 0;
                border-top: 7px solid transparent;
                border-right: 7px solid #fff;
                border-bottom: 7px solid transparent;
            }
        }
        &-arrow-bottom {
            &::before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -7px;
                width: 0;
                height: 0;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-bottom: 7px solid #fff;
            }
        }
        i {
            display: none;
        }
        &.active i {
            display: block;
            color: #409eff;
        }
    }
}
.theme {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    [class^="theme-"] {
        position: relative;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &::before,
        &::after {
            content: "";
            position: absolute;
            width: 50%;
            height: 50%;
            pointer-events: none;
        }
        &::before {
            top: 0;
            left: 0;
        }
        &::after {
            top: 0;
            left: 50%;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        .content {
            position: absolute;
            width: 100%;
            height: 100%;
            &::before,
            &::after {
                content: "";
                position: absolute;
                width: 50%;
                height: 50%;
                pointer-events: none;
            }
            &::before {
                bottom: 0;
                left: 0;
            }
            &::after {
                bottom: 0;
                left: 50%;
            }
        }
    }
    .theme-default {
        &::before {
            background-color: map-get($theme-default, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-default, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-default, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-default, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
    .theme-vue-cli {
        &::before {
            background-color: map-get($theme-vue-cli, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-vue-cli, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-vue-cli, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-vue-cli, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
    .theme-gitee {
        &::before {
            background-color: map-get($theme-gitee, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-gitee, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-gitee, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-gitee, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
    .theme-freshness {
        &::before {
            background-color: map-get($theme-freshness, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-freshness, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-freshness, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-freshness, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
    .theme-elegant {
        &::before {
            background-color: map-get($theme-elegant, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-elegant, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-elegant, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-elegant, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
    .theme-pure-white {
        &::before {
            background-color: map-get($theme-pure-white, "g-header-bg");
        }
        &::after {
            background-color: map-get($theme-pure-white, "g-header-menu-active-bg");
        }
        .content {
            &::before {
                background-color: map-get($theme-pure-white, "g-sub-sidebar-bg");
            }
            &::after {
                background-color: map-get($theme-pure-white, "g-sub-sidebar-menu-active-bg");
            }
        }
    }
}
.setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
        background: #f1f1f1;
    }
    .label {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        i {
            margin-left: 4px;
            font-size: 17px;
            color: #e6a23c;
            cursor: help;
        }
    }
}
</style>
