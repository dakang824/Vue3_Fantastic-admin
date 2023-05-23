<template>
    <transition name="header">
        <header
            v-if="$store.state.settings.mode === 'pc' && ['head', 'only-head'].includes($store.state.settings.menuMode)">
            <div class="header-container">
                <div class="main">
                    <Logo />
                    <!-- 顶部模式 -->
                    <div v-if="$store.state.settings.menuMode === 'head'" class="nav" :class="{
                        'nav-radius': $store.state.settings.menuStyle === 'radius',
                        'nav-arrow': $store.state.settings.menuStyle === 'arrow'
                    }">
                        <template v-for="(item, index) in $store.getters['menu/routes']" :key="index">
                            <div v-if="item.children && item.children.length !== 0" class="item"
                                :class="{ 'active': index == $store.state.menu.headerActived }" @click="switchMenu(index)">
                                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                                <span v-if="item.meta.title">{{ item.meta.title }}</span>
                            </div>
                        </template>
                    </div>
                    <!-- 顶部精简模式 -->
                    <el-menu v-else-if="$store.state.settings.menuMode === 'only-head'" mode="horizontal"
                        :default-active="$route.meta.activeMenu || $route.path" class="el-menu-nav" :class="{
                            'el-menu-nav-radius': $store.state.settings.menuStyle === 'radius',
                            'el-menu-nav-arrow': $store.state.settings.menuStyle === 'arrow'
                        }">
                        <template v-for="(route, index) in $store.getters['menu/routes']">
                            <SidebarItem v-if="route.meta.sidebar !== false" :key="index" :item="route" />
                        </template>
                    </el-menu>
                </div>
                <UserMenu />
            </div>
        </header>
    </transition>
</template>

<script setup>
import Logo from '../Logo/index.vue'
import UserMenu from '../UserMenu/index.vue'
import SidebarItem from '../SidebarItem/index.vue'

const switchMenu = inject('switchMenu')
</script>

<style lang="scss" scoped>
// 头部动画
.header-enter-active {
    transition: 0.2s;
}

.header-enter-from {
    transform: translateY(-#{$g-header-height});
}

header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: $g-header-height;

    @include themeify {
        color: themed("g-header-color");
        background-color: themed("g-header-bg");
    }

    .header-container {
        width: $g-header-width;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .main {
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
        }
    }

    @media screen and (max-width: $g-header-width) {
        .header-container {
            width: 100%;
        }
    }

    :deep(.title) {
        position: relative;
        width: inherit;
        height: inherit;
        padding: inherit;
        background-color: inherit;

        .logo {
            width: 50px;
            height: 50px;
        }

        span {
            font-size: 24px;
            letter-spacing: 1px;

            @include themeify {
                color: themed("g-header-color");
            }
        }
    }

    .nav {
        display: flex;
        height: 100%;
        margin-left: 50px;

        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 5px;
            width: 80px;
            cursor: pointer;
            transition: all 0.3s;

            @include themeify {
                color: themed("g-header-menu-color");
                background-color: themed("g-header-bg");
            }

            &:hover {
                @include themeify {
                    color: themed("g-header-menu-hover-color");
                    background-color: themed("g-header-menu-hover-bg");
                }
            }

            &.active {
                @include themeify {
                    color: themed("g-header-menu-active-color");
                    background-color: themed("g-header-menu-active-bg");
                }
            }

            .svg-icon {
                font-size: 24px;
                vertical-align: middle;

                &+span {
                    vertical-align: middle;
                    @include text-overflow(1, false);
                }
            }
        }

        &.nav-radius {
            .item {
                border-radius: 5px;
                margin: 5px 5px 5px 0;

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        &.nav-arrow {
            .item {
                position: relative;

                &.active::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -7px;
                    width: 0;
                    height: 0;
                    border-right: 7px solid transparent;
                    border-left: 7px solid transparent;
                    border-bottom: 7px solid #fff;
                }
            }
        }
    }

    .el-menu-nav {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 50px;
        border-bottom: none;
        background-color: inherit;

        .sidebar-item,
        :deep(.el-sub-menu),
        :deep(.el-sub-menu__title) {
            height: 100%;
            display: flex;
            align-items: center;
        }

        :deep(.el-sub-menu.is-active) {
            .el-sub-menu__title {
                @include themeify {
                    color: themed("g-header-menu-active-color") !important;
                    background-color: themed("g-header-menu-active-bg") !important;
                }
            }
        }

        :deep(.el-sub-menu__title) {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 5px;
            width: 80px;
            line-height: initial;
            transition: all 0.3s;

            @include themeify {
                color: themed("g-header-menu-color") !important;
            }

            &:hover {
                @include themeify {
                    color: themed("g-header-menu-hover-color") !important;
                    background-color: themed("g-header-menu-hover-bg") !important;
                }

                .svg-icon {
                    transform: scale(1);
                }
            }

            .svg-icon {
                font-size: 24px;
                vertical-align: middle;
            }

            .title {
                flex: initial;
                margin-left: initial;
                height: initial;
                line-height: initial;
                text-align: center;
                font-size: 16px;
                @include text-overflow(1, false);
            }

            .el-sub-menu__icon-arrow {
                display: none;
            }
        }

        &.el-menu-nav-radius {
            .sidebar-item {
                :deep(.el-sub-menu__title) {
                    height: calc(100% - 10px);
                    border-radius: 5px;
                    margin: 5px 5px 5px 0;
                }

                &:last-child {
                    margin-right: 0;
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
                            bottom: 0;
                            left: 50%;
                            margin-left: -7px;
                            width: 0;
                            height: 0;
                            border-right: 7px solid transparent;
                            border-left: 7px solid transparent;
                            border-bottom: 7px solid #fff;
                        }
                    }
                }
            }
        }
    }

    :deep(.user) {
        padding: 0;

        .tools [class^="ri-"] {
            @include themeify {
                color: themed("g-header-color");
            }
        }

        .user-container {
            font-size: 16px;

            @include themeify {
                color: themed("g-header-color");
            }
        }
    }
}
</style>
