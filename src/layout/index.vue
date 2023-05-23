<template>
    <div class="layout">
        <div id="app-main" :class="{'main-page-maximize': $store.state.settings.mainPageMaximizeStatus}">
            <Header />
            <div class="wrapper">
                <div class="sidebar-container" :class="{'show': $store.state.settings.mode === 'mobile' && !$store.state.settings.sidebarCollapse}">
                    <MainSidebar />
                    <SubSidebar />
                </div>
                <div class="sidebar-mask" :class="{'show': $store.state.settings.mode === 'mobile' && !$store.state.settings.sidebarCollapse}" @click="$store.commit('settings/toggleSidebarCollapse')" />
                <div class="main-container" :style="{'padding-bottom': $route.meta.paddingBottom}">
                    <component :is="tabbarAndTopbarComponent(item)" v-for="(item, index) in tabbarAndTopbarOrder" :key="index" />
                    <div class="main">
                        <div v-show="$store.state.settings.mainPageMaximizeStatus" class="exit-main-page-maximize" @click="$store.commit('settings/setMainPageMaximize')">
                            <svg-icon name="ri-logout-box-line" />
                        </div>
                        <router-view v-slot="{ Component, route }">
                            <transition name="main" mode="out-in" appear>
                                <keep-alive :include="$store.state.keepAlive.list">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </div>
                    <Copyright v-if="showCopyright" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <Search />
        <ThemeSetting />
        <BuyIt />
    </div>
</template>

<script setup>
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Tabbar from './components/Tabbar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Search from './components/Search/index.vue'
import ThemeSetting from './components/ThemeSetting/index.vue'
import BuyIt from './components/BuyIt/index.vue'
import { isExternalLink } from '@/util'

const { proxy } = getCurrentInstance()
const store = useStore()
const routeInfo = useRoute(), router = useRouter()

import { useWatermark } from '@/util/useWatermark'
useWatermark(store)

const tabbarAndTopbarOrder = computed(() => {
    let order = []
    if (store.state.settings.enableTabbar) {
        order.push('tabbar')
    }
    if (
        !(
            (store.state.settings.menuMode === 'head' && !store.state.settings.enableSidebarCollapse && !store.state.settings.enableBreadcrumb) ||
            (store.state.settings.menuMode === 'only-head' && !store.state.settings.enableBreadcrumb)
        )
    ) {
        order.push('topbar')
    }
    if (store.state.settings.switchTabbarAndTopbar) {
        order.reverse()
    }
    return order
})

const showCopyright = computed(() => {
    return typeof routeInfo.meta.copyright !== 'undefined' ? routeInfo.meta.copyright : store.state.settings.showCopyright
})

watch(() => store.state.settings.sidebarCollapse, val => {
    if (store.state.settings.mode === 'mobile') {
        if (!val) {
            document.querySelector('body').classList.add('hidden')
        } else {
            document.querySelector('body').classList.remove('hidden')
        }
    }
})

watch(() => routeInfo.path, () => {
    if (store.state.settings.mode === 'mobile') {
        store.commit('settings/updateThemeSetting', {
            sidebarCollapse: true
        })
    }
})

onMounted(() => {
    proxy.$hotkeys('f5', e => {
        if (store.state.settings.enablePageReload) {
            e.preventDefault()
            reload()
        }
    })
})
provide('reload', reload)
function reload() {
    router.push({
        name: 'reload'
    })
}

provide('switchMenu', switchMenu)
function switchMenu(index) {
    store.commit('menu/switchHeaderActived', index)
    if (store.state.settings.switchSidebarAndPageJump) {
        if (isExternalLink(store.getters['menu/sidebarRoutesFirstDeepestPath'])) {
            window.open(store.getters['menu/sidebarRoutesFirstDeepestPath'], '_blank')
        } else {
            router.push(store.getters['menu/sidebarRoutesFirstDeepestPath'])
        }
    }
}

function tabbarAndTopbarComponent(name) {
    const components = {
        'tabbar': Tabbar,
        'topbar': Topbar
    }
    return components[name]
}
</script>

<style lang="scss" scoped>
[data-app-width-mode="adaption"] {
    #app-main {
        width: 100%;
    }
}
[data-app-width-mode="adaption-min-width"] {
    #app-main {
        min-width: $g-app-width;
    }
}
[data-app-width-mode="center"] {
    #app-main {
        width: $g-app-width;
    }
}
[data-app-width-mode="center-max-width"] {
    #app-main {
        width: $g-app-width;
        max-width: 100%;
    }
}
[data-mode="mobile"] {
    #app-main {
        width: 100%;
        min-width: unset;
        max-width: unset;
    }
    .sidebar-container {
        transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));
        &.show {
            transform: translateX(0);
        }
    }
    .main-container {
        margin-left: 0 !important;
    }
    &[data-menu-mode="single"] {
        .sidebar-container {
            transform: translateX(calc(var(--g-main-sidebar-width) * -1));
            &.show {
                transform: translateX(0);
            }
        }
    }
}
.layout {
    height: 100%;
}
#app-main {
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;
    // 当前标签页全屏
    &.main-page-maximize {
        header,
        .sidebar-container {
            display: none;
        }
        .wrapper {
            padding-top: 0;
            .main-container {
                margin-left: 0;
                .tabbar-container,
                .topbar-container {
                    display: none;
                }
                .main {
                    margin: 0;
                }
            }
        }
        :deep([data-fixed-calc-width]) {
            width: 100%;
            transform: translateX(-50%);
        }
    }
}
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        transition: transform 0.3s;
        width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
        @include themeify {
            box-shadow: -1px 0 0 0 darken(themed("g-main-bg"), 10);
        }
    }
    .sidebar-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 50%);
        backdrop-filter: blur(2px);
        transition: all 0.2s;
        transform: translateZ(0);
        opacity: 0;
        visibility: hidden;
        &.show {
            opacity: 1;
            visibility: visible;
        }
    }
    .main-sidebar-container + .sub-sidebar-container {
        left: var(--g-main-sidebar-width);
    }
    .main-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        transition: margin-left 0.3s;
        margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
        @include themeify {
            background-color: themed("g-main-bg");
            box-shadow: -1px 0 0 0 darken(themed("g-main-bg"), 10), 1px 0 0 0 darken(themed("g-main-bg"), 10);
        }
        .tabbar-container + .topbar-container {
            top: $g-tabbar-height;
            z-index: 998;
        }
        .topbar-container + .tabbar-container {
            top: $g-topbar-height;
        }
        .main {
            height: 100%;
            flex: auto;
            position: relative;
            overflow: hidden;
            transition: 0.3s;
            .exit-main-page-maximize {
                position: fixed;
                z-index: 1000;
                right: -40px;
                top: -40px;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: rgb(0 0 0 / 30%);
                cursor: pointer;
                transition: 0.3s;
                i {
                    position: absolute;
                    bottom: 16px;
                    left: 16px;
                    transition: 0.3s;
                }
                &:hover {
                    background-color: rgb(0 0 0 / 70%);
                    i {
                        color: #fff;
                    }
                }
            }
        }
        .tabbar-container + .main {
            margin: $g-tabbar-height 0 0;
        }
        .topbar-container + .main {
            margin: $g-topbar-height 0 0;
        }
        .tabbar-container + .topbar-container + .main,
        .topbar-container + .tabbar-container + .main {
            margin: calc(#{$g-tabbar-height} + #{$g-topbar-height}) 0 0;
        }
    }
}
header + .wrapper {
    padding-top: $g-header-height;
    .sidebar-container {
        top: $g-header-height;
        :deep(.sidebar-logo) {
            display: none;
        }
        :deep(.el-menu) {
            padding-top: 0;
        }
    }
    .main-container {
        .tabbar-container {
            top: $g-header-height;
        }
        .topbar-container {
            top: $g-header-height;
            :deep(.user) {
                display: none;
            }
        }
        .tabbar-container + .topbar-container {
            top: calc(#{$g-header-height} + #{$g-tabbar-height});
        }
        .topbar-container + .tabbar-container {
            top: calc(#{$g-header-height} + #{$g-topbar-height});
        }
    }
}

// 主内容区动画
.main-enter-active {
    transition: 0.2s;
}
.main-leave-active {
    transition: 0.15s;
}
.main-enter-from {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>
