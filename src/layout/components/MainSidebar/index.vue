<template>
    <transition name="main-sidebar">
        <div v-if="['side', 'only-side'].includes($store.state.settings.menuMode) || ($store.state.settings.mode === 'mobile' && $store.state.settings.menuMode !== 'single')" class="main-sidebar-container">
            <Logo :show-title="false" class="sidebar-logo" />
            <!-- 侧边栏模式（含主导航） -->
            <div
                v-if="$store.state.settings.menuMode === 'side' || ($store.state.settings.mode === 'mobile' && $store.state.settings.menuMode !== 'single')" class="nav" :class="{
                    'nav-radius': $store.state.settings.menuStyle === 'radius',
                    'nav-arrow': $store.state.settings.menuStyle === 'arrow'
                }"
            >
                <template v-for="(item, index) in $store.getters['menu/routes']">
                    <div
                        v-if="item.children && item.children.length !== 0" :key="index" :class="{
                            'item': true,
                            'active': index === $store.state.menu.headerActived
                        }" :title="item.meta.title" @click="switchMenu(index)"
                    >
                        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                        <span>{{ item.meta.title }}</span>
                    </div>
                </template>
            </div>
            <!-- 侧边栏精简模式 -->
            <el-menu
                v-else-if="$store.state.settings.menuMode === 'only-side'" collapse :default-active="$route.meta.activeMenu || $route.path" class="el-menu-nav" :class="{
                    'el-menu-nav-radius': $store.state.settings.menuStyle === 'radius',
                    'el-menu-nav-arrow': $store.state.settings.menuStyle === 'arrow'
                }"
            >
                <template v-for="(route, index) in $store.getters['menu/routes']">
                    <SidebarItem v-if="route.meta.sidebar !== false" :key="index" :item="route" />
                </template>
            </el-menu>
        </div>
    </transition>
</template>

<script setup>
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'

const switchMenu = inject('switchMenu')
</script>

<style lang="scss" scoped>
// 主侧边栏动画
.main-sidebar-enter-active {
    transition: 0.3s;
}
.main-sidebar-enter-from {
    transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
.main-sidebar-container {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    position: relative;
    z-index: 1;
    width: var(--g-main-sidebar-width);
    @include themeify {
        color: themed("g-main-sidebar-menu-color");
        background-color: themed("g-main-sidebar-bg");
    }
    .sidebar-logo {
        transition: 0.3s;
        @include themeify {
            background-color: themed("g-main-sidebar-bg");
        }
    }
    .nav {
        width: inherit;
        padding-top: $g-sidebar-logo-height;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 60px;
            padding: 0 5px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                @include themeify {
                    color: themed("g-main-sidebar-menu-hover-color");
                    background-color: themed("g-main-sidebar-menu-hover-bg");
                }
            }
            &.active {
                @include themeify {
                    color: themed("g-main-sidebar-menu-active-color");
                    background-color: themed("g-main-sidebar-menu-active-bg");
                }
            }
            .svg-icon {
                margin: 0 auto;
                font-size: 24px;
            }
            span {
                text-align: center;
                font-size: 14px;
                @include text-overflow(1, false);
            }
        }
        &.nav-radius {
            .item {
                border-radius: 5px;
                margin: 0 5px 5px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        &.nav-arrow {
            .item {
                position: relative;
                &.active::before {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -7px;
                    width: 0;
                    height: 0;
                    border-top: 7px solid transparent;
                    border-bottom: 7px solid transparent;
                    @include themeify {
                        border-right: 7px solid themed("g-sub-sidebar-bg");
                    }
                }
            }
        }
    }
    .el-menu-nav {
        padding-top: $g-sidebar-logo-height;
        border-right: none;
        background-color: inherit;
        width: initial;
        :deep(.el-sub-menu.is-active) {
            .el-sub-menu__title {
                @include themeify {
                    color: themed("g-main-sidebar-menu-active-color") !important;
                    background-color: themed("g-main-sidebar-menu-active-bg") !important;
                }
            }
        }
        :deep(.el-sub-menu__title) {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 60px;
            line-height: initial;
            transition: all 0.3s;
            @include themeify {
                color: themed("g-main-sidebar-menu-color") !important;
            }
            &:hover {
                @include themeify {
                    color: themed("g-main-sidebar-menu-hover-color") !important;
                    background-color: themed("g-main-sidebar-menu-hover-bg") !important;
                }
                .svg-icon {
                    transform: scale(1);
                }
            }
            .svg-icon {
                font-size: 24px;
                vertical-align: middle;
                color: inherit;
            }
            .title {
                flex: initial;
                margin-left: initial;
                height: initial;
                line-height: initial;
                text-align: center;
                font-size: 14px;
                @include text-overflow(1, false);
            }
            .el-sub-menu__icon-arrow {
                display: none;
            }
        }
        &.el-menu-nav-radius {
            .sidebar-item {
                :deep(.el-sub-menu__title) {
                    border-radius: 5px;
                    margin: 0 5px 5px;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        &.el-menu-nav-arrow {
            .sidebar-item {
                :deep(.is-active) {
                    .el-sub-menu__title {
                        &::before {
                            content: "";
                            position: absolute;
                            right: 0;
                            top: 50%;
                            margin-top: -7px;
                            width: 0;
                            height: 0;
                            border-top: 7px solid transparent;
                            border-bottom: 7px solid transparent;
                            border-right: 7px solid #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
