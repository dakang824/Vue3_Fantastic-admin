<template>
    <el-config-provider :locale="locales[$store.state.settings.defaultLang]">
        <RouterView :style="{
            '--g-main-sidebar-actual-width': mainSidebarActualWidth,
            '--g-sub-sidebar-actual-width': subSidebarActualWidth
        }" />
        <!-- <ReloadPrompt /> -->
    </el-config-provider>
</template>

<script setup>
import { getElementLocales } from '@/locales'
// import ReloadPrompt from '@/pwa/reloadPrompt.vue'

const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()

provide('generateI18nTitle', generateI18nTitle)

const locales = computed(() => getElementLocales())

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (['head', 'single', 'only-head'].includes(store.state.settings.menuMode)) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (store.state.settings.sidebarCollapse) {
        actualWidth = 64
    }
    if (['only-side', 'only-head'].includes(store.state.settings.menuMode)) {
        actualWidth = 0
    }
    if (
        store.state.settings.sidebarOnylOneHide &&
        store.getters['menu/sidebarRoutes'].length === 1 &&
        (
            !store.getters['menu/sidebarRoutes'][0].children ||
            store.getters['menu/sidebarRoutes'][0]?.children.every(item => item.meta.sidebar === false)
        )
    ) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

watch(() => store.state.settings.mode, () => {
    if (store.state.settings.mode === 'pc') {
        store.commit('settings/updateThemeSetting', {
            'sidebarCollapse': store.state.settings.sidebarCollapseLastStatus
        })
    } else if (store.state.settings.mode === 'mobile') {
        store.commit('settings/updateThemeSetting', {
            'sidebarCollapse': true
        })
    }
    document.body.setAttribute('data-mode', store.state.settings.mode)
}, {
    immediate: true
})

watch(() => store.state.settings.theme, () => {
    document.body.setAttribute('data-theme', store.state.settings.theme)
}, {
    immediate: true
})

watch(() => store.state.settings.menuMode, () => {
    document.body.setAttribute('data-menu-mode', store.state.settings.menuMode)
}, {
    immediate: true
})

watch(() => store.state.settings.appWidthMode, () => {
    document.body.setAttribute('data-app-width-mode', store.state.settings.appWidthMode)
}, {
    immediate: true
})

watch([
    () => store.state.settings.enableDynamicTitle,
    () => store.state.settings.title
], () => {
    if (store.state.settings.enableDynamicTitle && store.state.settings.title) {
        let title = generateI18nTitle(route.meta.i18n, store.state.settings.title)
        document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    } else {
        document.title = import.meta.env.VITE_APP_TITLE
    }
}, {
    immediate: true
})

onMounted(() => {
    window.onresize = () => {
        store.commit('settings/setMode', document.documentElement.clientWidth)
    }
    window.onresize()
})

function generateI18nTitle(key, defaultTitle) {
    return !!key && proxy.$te(key) ? proxy.$t(key) : defaultTitle
}
</script>
