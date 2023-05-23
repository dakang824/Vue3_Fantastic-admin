<template>
    <div
        class="tabbar-container" :class="{
            'fixed': $store.state.settings.topbarFixed,
            'shadow': !$store.state.settings.switchTabbarAndTopbar
        }" data-fixed-calc-width
    >
        <div
            ref="tabs" class="tabs" :class="{
                'tabs-ontop': $store.state.settings.switchTabbarAndTopbar,
                'tabs-fashion': $store.state.settings.tabbarStyle === 'fashion',
                'tabs-square': $store.state.settings.tabbarStyle === 'square',
                'tabs-card': $store.state.settings.tabbarStyle === 'card'
            }" @mousewheel.prevent
        >
            <draggable
                ref="tab-container" v-model="tabbarList" v-bind="dragOptions" item-key="tabId" draggable=".tab" handle=".drag-handle" tag="transition-group" :component-data="{
                    tag: 'div',
                    type: 'transition-group',
                    name: !isDragging ? 'tabbar' : null
                }" class="tab-container" :class="{'dragging': isDragging}" @start="isDragging = true" @end="isDragging = false"
            >
                <template #item="{element}">
                    <div
                        :ref="`tab-${element.tabId}`" class="tab" :class="{
                            'tab-ontop': $store.state.settings.switchTabbarAndTopbar,
                            'actived': element.tabId == activedTabId
                        }" :title="generateI18nTitle(element.i18n, element.title)" @click="$router.push(element.fullPath)" @dblclick="$store.commit('settings/setMainPageMaximize')" @contextmenu="onTabbarContextmenu($event, element)"
                    >
                        <div class="tab-dividers" />
                        <div class="tab-background">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" /></symbol><symbol id="tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#tab-geometry-left" /></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0" /></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#tab-geometry-left" width="214" height="36" class="tab-geometry" /></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#tab-geometry-right" width="214" height="36" class="tab-geometry" /></svg></g></svg>
                        </div>
                        <div class="tab-content">
                            <transition name="tabbar-title" mode="out-in">
                                <div :key="generateI18nTitle(element.i18n, element.title)" class="title">{{ generateI18nTitle(element.i18n, element.title) }}</div>
                            </transition>
                            <div v-if="!element.isPermanent && !element.isPin" class="drag-handle" />
                            <i v-if="!element.isPermanent && element.isPin" class="ri-pushpin-2-fill action-icon" @click.stop="$store.dispatch('tabbar/unPin', element.tabId)" />
                            <i v-else-if="!element.isPermanent && $store.state.tabbar.list.length > 1" class="ri-close-fill action-icon" @click.stop="onTabClose(element.tabId)" />
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <div v-if="isShowMoreAction" class="more-action">
            <el-dropdown placement="bottom-end" @command="actionCommand">
                <i class="ri-arrow-down-s-fill" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="other-side" :disabled="!hasTabbarOtherSideCanClose">
                            <svg-icon name="el-icon-close" />
                            关闭其它标签页
                        </el-dropdown-item>
                        <el-dropdown-item command="left-side" :disabled="!hasTabbarLeftSideCanClose">
                            <svg-icon name="el-icon-arrow-left" />
                            关闭左侧标签页
                        </el-dropdown-item>
                        <el-dropdown-item command="right-side" :disabled="!hasTabbarRightSideCanClose">
                            <svg-icon name="el-icon-arrow-right" />
                            关闭右侧标签页
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import storage from '@/util/storage'
import draggable from 'vuedraggable'

const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute(), router = useRouter()

const reload = inject('reload')
const generateI18nTitle = inject('generateI18nTitle')

const isDragging = ref(false)

const dragOptions = computed(() => {
    return {
        animation: 200,
        disabled: store.state.settings.mode === 'mobile',
        ghostClass: 'tab-ghost'
    }
})
// 当前标签页指向路由
const activedTabId = computed(() => store.state.settings.enableTabbarMergeTabs ? (route.meta.activeMenu || route.fullPath) : route.fullPath)
// 当前标签页两侧是否有可关闭的标签页
const hasTabbarOtherSideCanClose = computed(() => checkOtherSideHasTabCanClose())
// 当前标签页左侧是否有可关闭的标签页
const hasTabbarLeftSideCanClose = computed(() => checkLeftSideHasTabCanClose())
// 当前标签页右侧是否有可关闭的标签页
const hasTabbarRightSideCanClose = computed(() => checkRightSideHasTabCanClose())

const isShowMoreAction = computed(() => store.state.tabbar.list.length > 1 && (hasTabbarOtherSideCanClose.value || hasTabbarLeftSideCanClose.value || hasTabbarRightSideCanClose.value))

const tabbarList = computed({
    get() {
        return store.state.tabbar.list
    },
    set(value) {
        store.commit('tabbar/sort', value)
    }
})

watch(() => route, val => {
    if (store.state.settings.enableTabbar) {
        val.meta.title = store.state.settings.title
        store.dispatch('tabbar/add', val).then(() => {
            if (proxy.$refs[`tab-${activedTabId.value}`]) {
                scrollTo(proxy.$refs[`tab-${activedTabId.value}`].offsetLeft)
                tabbarScrollTip()
            }
        })
    }
}, {
    immediate: true,
    deep: true
})

onMounted(() => {
    proxy.$refs['tabs'].addEventListener('DOMMouseScroll', handlerMouserScroll, false)
    proxy.$refs['tabs'].addEventListener('mousewheel', handlerMouserScroll, false)
})
onBeforeUnmount(() => {
    proxy.$refs['tabs'].removeEventListener('DOMMouseScroll', handlerMouserScroll)
    proxy.$refs['tabs'].removeEventListener('mousewheel', handlerMouserScroll)
})

function tabbarScrollTip() {
    if (proxy.$refs['tab-container'].$el.clientWidth > proxy.$refs['tabs'].clientWidth && !storage.local.has('tabbarScrollTip')) {
        proxy.$confirm('顶部标签栏数量超过展示区域范围，你可以将鼠标移到标签栏上，然后通过鼠标滚轮滑动浏览', '温馨提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'info',
            center: true
        }).then(() => {
            storage.local.set('tabbarScrollTip', true)
        })
    }
}
function tabbarMaximizeTip() {
    if (!storage.local.has('tabbarMaximizeTip')) {
        proxy.$confirm('你也可以通过双击标签栏进行最大化操作', '温馨提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'info',
            center: true
        }).then(() => {
            storage.local.set('tabbarMaximizeTip', true)
        })
    }
}
function handlerMouserScroll(event) {
    let detail = event.wheelDelta || event.detail
    let moveForwardStep = -1
    let moveBackStep = 1
    let step = 0
    step = detail > 0 ? moveForwardStep * 50 : moveBackStep * 50
    proxy.$refs['tabs'].scrollBy({
        left: step
    })
}
function scrollTo(offsetLeft) {
    proxy.$refs['tabs'].scrollTo({
        left: offsetLeft - 50,
        behavior: 'smooth'
    })
}
// 校验指定标签两侧是否有可关闭的标签
function checkOtherSideHasTabCanClose(tabId = activedTabId.value) {
    return store.state.tabbar.list.some(item => {
        return !item.isPermanent && !item.isPin && item.tabId != tabId
    })
}
// 校验指定标签左侧是否有可关闭的标签
function checkLeftSideHasTabCanClose(tabId = activedTabId.value) {
    let flag = true
    if (tabId == store.state.tabbar.list[0].tabId) {
        flag = false
    } else {
        let index = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == tabId
        })
        flag = store.state.tabbar.list.some((item, i) => {
            return i < index && !item.isPermanent && !item.isPin && item.tabId != tabId
        })
    }
    return flag
}
// 校验指定标签右侧是否有可关闭的标签
function checkRightSideHasTabCanClose(tabId = activedTabId.value) {
    let flag = true
    if (tabId == store.state.tabbar.list[store.state.tabbar.list.length - 1].tabId) {
        flag = false
    } else {
        let index = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == tabId
        })
        flag = store.state.tabbar.list.some((item, i) => {
            return i >= index && !item.isPermanent && !item.isPin && item.tabId != tabId
        })
    }
    return flag
}
function onTabClose(tabId) {
    proxy.$tabbar.closeById(tabId)
}
function onOtherSideTabClose(tabId, fullPath) {
    // 如果操作的是非当前路由标签页，则先跳转到指定路由标签页
    tabId != activedTabId.value && router.push(fullPath)
    store.dispatch('tabbar/removeOtherSide', tabId)
}
function onLeftSideTabClose(tabId, fullPath) {
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页左侧，如果是则先跳转到指定路由标签页
    if (tabId != activedTabId.value) {
        let pathIndex = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == tabId
        })
        let activedPathIndex = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == activedTabId.value
        })
        if (activedPathIndex < pathIndex) {
            router.push(fullPath)
        }
    }
    store.dispatch('tabbar/removeLeftSide', tabId)
}
function onRightSideTabClose(tabId, fullPath) {
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页右侧，如果是则先跳转到指定路由标签页
    if (tabId != activedTabId.value) {
        let pathIndex = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == tabId
        })
        let activedPathIndex = ~~Object.keys(store.state.tabbar.list).find(i => {
            return store.state.tabbar.list[i].tabId == activedTabId.value
        })
        if (activedPathIndex > pathIndex) {
            router.push(fullPath)
        }
    }
    store.dispatch('tabbar/removeRightSide', tabId)
}
function actionCommand(command) {
    switch (command) {
        case 'other-side':
            onOtherSideTabClose(activedTabId.value, route.fullPath)
            break
        case 'left-side':
            onLeftSideTabClose(activedTabId.value, route.fullPath)
            break
        case 'right-side':
            onRightSideTabClose(activedTabId.value, route.fullPath)
            break
    }
}
function onTabbarContextmenu(event, routeItem) {
    event.preventDefault()
    proxy.$contextmenu({
        x: event.x,
        y: event.y,
        zIndex: 3,
        iconFontClass: '',
        customClass: 'contextmenu-custom',
        items: [
            {
                label: '重新加载',
                icon: 'ri-refresh-line',
                disabled: routeItem.tabId != activedTabId.value,
                onClick: () => reload()
            },
            {
                label: '关闭标签页',
                icon: 'ri-close-line',
                disabled: store.state.tabbar.list.length <= 1 || routeItem.isPin || routeItem.isPermanent,
                divided: true,
                onClick: () => {
                    onTabClose(routeItem.tabId)
                }
            },
            {
                label: routeItem.isPin ? '取消固定' : '固定',
                icon: routeItem.isPin ? 'ri-pushpin-fill' : 'ri-pushpin-2-fill',
                // 控制台页面不允许被固定，因为如果固定控制台且控制台被关闭后，会导致登录时进入路由死循环状态
                disabled: routeItem.path == '/dashboard' || routeItem.isPermanent,
                onClick: () => {
                    if (routeItem.isPin) {
                        store.dispatch('tabbar/unPin', routeItem.tabId)
                    } else {
                        store.dispatch('tabbar/pin', routeItem.tabId)
                    }
                }
            },
            {
                label: '最大化',
                icon: 'ri-picture-in-picture-exit-line',
                divided: true,
                onClick: () => {
                    if (routeItem.tabId != activedTabId.value) {
                        router.push(routeItem.fullPath)
                    }
                    tabbarMaximizeTip()
                    store.commit('settings/setMainPageMaximize')
                }
            },
            {
                label: '关闭其它标签页',
                disabled: !checkOtherSideHasTabCanClose(routeItem.tabId),
                onClick: () => {
                    onOtherSideTabClose(routeItem.tabId, routeItem.fullPath)
                }
            },
            {
                label: '关闭左侧标签页',
                disabled: !checkLeftSideHasTabCanClose(routeItem.tabId),
                onClick: () => {
                    onLeftSideTabClose(routeItem.tabId, routeItem.fullPath)
                }
            },
            {
                label: '关闭右侧标签页',
                disabled: !checkRightSideHasTabCanClose(routeItem.tabId),
                onClick: () => {
                    onRightSideTabClose(routeItem.tabId, routeItem.fullPath)
                }
            }
        ]
    })
}
</script>

<style lang="scss">
.contextmenu-custom {
    .mx-context-menu-items .mx-context-menu-item {
        .text {
            display: flex;
            align-items: center;
        }
        &.disabled .text .icon {
            color: #9f9f9f;
        }
    }
}
</style>
<style lang="scss" scoped>
.tabbar-container {
    position: absolute;
    z-index: 999;
    top: 0;
    height: $g-tabbar-height;
    transition: 0.3s;
    @include themeify {
        background-color: themed("g-tabbar-bg");
    }
    &.fixed {
        position: fixed;
    }
    &.shadow {
        @include themeify {
            box-shadow: 0 4px 0 0 themed("g-tabbar-tab-active-bg");
        }
    }
    .tabs {
        position: absolute;
        left: 0;
        right: 0;
        padding-right: 50px;
        overflow-y: hidden;
        white-space: nowrap;
        // firefox隐藏滚动条
        scrollbar-width: none;
        // chrome隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }
        &.tabs-ontop {
            top: 0;
            bottom: inherit;
        }
        .tab-container {
            display: inline-block;
            &:not(.dragging) {
                .tab {
                    &:not(.actived):hover {
                        z-index: 3;
                        &::before,
                        &::after {
                            content: none;
                        }
                        .tab-content {
                            .title,
                            .action-icon {
                                @include themeify {
                                    color: themed("g-tabbar-tab-hover-color");
                                }
                            }
                        }
                    }
                }
            }
            .tab {
                position: relative;
                display: inline-block;
                width: 150px;
                height: 40px;
                line-height: 38px;
                vertical-align: bottom;
                font-size: 14px;
                cursor: pointer;
                pointer-events: none;
                * {
                    user-select: none;
                }
                &:last-child {
                    margin-right: 30px;
                }
                &.actived {
                    z-index: 5;
                    &::before,
                    &::after {
                        content: none;
                    }
                    .tab-content {
                        .title,
                        .action-icon {
                            @include themeify {
                                color: themed("g-tabbar-tab-active-color");
                            }
                        }
                    }
                }
                &.tab-ghost {
                    opacity: 0 !important;
                }
                .tab-dividers {
                    position: absolute;
                    z-index: 0;
                    height: 14px;
                    top: 50%;
                    left: 0;
                    right: 0;
                    margin-top: -7px;
                    &::before {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        width: 1px;
                        opacity: 1;
                        transition: opacity 0.2s ease;
                        left: 1px;
                        @include themeify {
                            background-color: themed("g-tabbar-dividers-bg");
                        }
                    }
                }
                &:first-child .tab-dividers::before {
                    opacity: 0;
                }
                .tab-background {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    svg {
                        display: none;
                    }
                }
                .tab-content {
                    position: absolute;
                    z-index: 5;
                    left: 0;
                    right: 0;
                    height: 100%;
                    display: flex;
                    pointer-events: all;
                    .title {
                        position: absolute;
                        height: 100%;
                        left: 12px;
                        right: 28px;
                        flex: 1;
                        /* stylelint-disable-next-line property-no-vendor-prefix */
                        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);
                        overflow: hidden;
                        white-space: nowrap;
                        @include themeify {
                            color: themed("g-tabbar-tab-color");
                        }
                    }
                    .drag-handle {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                    .action-icon {
                        position: absolute;
                        top: 50%;
                        right: 6px;
                        margin-top: -8px;
                        padding: 2px;
                        border-radius: 50%;
                        font-size: 12px;
                        @include themeify {
                            color: themed("g-tabbar-tab-color");
                        }
                        &:hover {
                            background-color: #e8eaed;
                        }
                    }
                }
            }
        }
        &.tabs-fashion {
            bottom: -1px;
            .tab-container {
                &:not(.dragging) {
                    .tab:not(.actived):hover {
                        & + .tab .tab-dividers::before {
                            opacity: 0;
                        }
                        .tab-background {
                            opacity: 1;
                        }
                        .tab-background > svg .tab-geometry {
                            @include themeify {
                                fill: themed("g-tabbar-tab-hover-bg");
                            }
                        }
                    }
                }
                .tab {
                    height: 34px;
                    line-height: 32px;
                    margin-right: -20px;
                    .tab-dividers {
                        left: 8px;
                        right: 8px;
                    }
                    &.tab-ontop .tab-background {
                        transform: rotate(180deg);
                    }
                    &:not(.actived) .tab-background {
                        opacity: 0;
                        > svg .tab-geometry {
                            transition: fill 0.2s ease;
                        }
                    }
                    .tab-background {
                        top: -1px;
                        transition: opacity 0.2s ease;
                        svg {
                            display: block;
                            width: 100%;
                            height: 100%;
                            .tab-geometry {
                                @include themeify {
                                    fill: themed("g-tabbar-tab-hover-bg");
                                }
                            }
                        }
                    }
                    &.actived {
                        & + .tab .tab-dividers::before {
                            opacity: 0;
                        }
                        .tab-background {
                            opacity: 1;
                        }
                        .tab-background > svg .tab-geometry {
                            @include themeify {
                                fill: themed("g-tabbar-tab-active-bg");
                            }
                        }
                    }
                    .tab-content {
                        .title {
                            left: 20px;
                            right: 36px;
                        }
                        .drag-handle {
                            left: 8px;
                            right: 8px;
                        }
                        .action-icon {
                            right: 18px;
                        }
                    }
                }
            }
        }
        &.tabs-card {
            .tab-container {
                &:not(.dragging) {
                    .tab:not(.actived):hover {
                        .tab-background {
                            @include themeify {
                                background-color: themed("g-tabbar-tab-hover-bg");
                            }
                        }
                    }
                }
                .tab {
                    height: 30px;
                    line-height: 28px;
                    margin-top: 5px;
                    margin-left: 5px;
                    .tab-dividers {
                        display: none;
                    }
                    .tab-background {
                        border-radius: 5px;
                    }
                    &.actived {
                        .tab-background {
                            @include themeify {
                                background-color: themed("g-tabbar-tab-active-bg");
                            }
                        }
                    }
                }
            }
        }
        &.tabs-square {
            .tab-container {
                &:not(.dragging) {
                    .tab:not(.actived):hover {
                        & + .tab .tab-dividers::before {
                            opacity: 0;
                        }
                        .tab-background {
                            &::before {
                                height: 100%;
                                @include themeify {
                                    background-color: themed("g-tabbar-tab-hover-bg");
                                }
                            }
                        }
                    }
                }
                .tab {
                    .tab-dividers {
                        left: -1px;
                        right: -1px;
                    }
                    &.tab-ontop .tab-background {
                        transform: rotateX(180deg);
                    }
                    .tab-background {
                        &::before {
                            content: "";
                            transition: 0.3s;
                            position: absolute;
                            width: 100%;
                            height: 0;
                            bottom: 0;
                        }
                        &::after {
                            content: "";
                            transition: 0.3s;
                            position: absolute;
                            width: 0;
                            height: 2px;
                            bottom: 0;
                            background-color: #5482ee;
                        }
                    }
                    &.actived {
                        & + .tab .tab-dividers::before {
                            opacity: 0;
                        }
                        .tab-background {
                            &::before {
                                height: calc(100% - 2px);
                                bottom: 2px;
                                @include themeify {
                                    background-color: themed("g-tabbar-tab-active-bg");
                                }
                            }
                            &::after {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
    .more-action {
        position: absolute;
        z-index: 10;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 100%;
        width: 50px;
        padding-left: 15px;
        @include themeify {
            background: linear-gradient(to right, transparent, themed("g-tabbar-bg"));
        }
        i {
            padding: 4px;
            border-radius: 5px;
            font-size: 16px;
            background-color: #fff;
            box-shadow: 0 0 5px #ccc;
            cursor: pointer;
        }
    }
}
// 标签栏动画
.tabs {
    .tabbar-enter-from,
    .tabbar-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    &.tabs-ontop {
        .tabbar-enter-from,
        .tabbar-leave-to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    .tabbar-enter-active {
        transition: all 0.2s;
    }
    .tabbar-leave-active {
        position: absolute !important;
        transition: all 0.2s;
    }
    .tabbar-move {
        transition: transform 0.2s;
    }
    // 标签栏 title
    .tabbar-title-enter-active,
    .tabbar-title-leave-active {
        transition: all 0.2s;
    }
    .tabbar-title-enter-from,
    .tabbar-title-leave-to {
        transform: translateX(10px);
    }
}
</style>
