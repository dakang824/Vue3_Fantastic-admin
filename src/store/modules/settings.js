/**
 * 存放全局公用状态
 */
import settings from '@/settings'
import router from '@/router'
import api from '@/api'

const state = () => ({
    ...settings,
    // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
    sidebarCollapseLastStatus: settings.sidebarCollapse,
    // 主页面是否最大化
    mainPageMaximizeStatus: false,
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 页面标题
    title: ''
})

const getters = {}

const actions = {
    setTitle({ state, commit }, title) {
        commit('setTitle', title)
        if (state.enableTabbar) {
            const route = router.currentRoute.value
            commit('tabbar/editTitle', {
                tabId: state.enableTabbarMergeTabs ? (route.meta.activeMenu || route.fullPath) : route.fullPath,
                title
            }, { root: true })
        }
    }
}

const mutations = {
    // 设置访问模式
    setMode(state, width) {
        if (state.enableMobileAdaptation) {
            // 先判断 UA 是否为移动端设备（手机&平板）
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                state.mode = 'mobile'
            } else {
                // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
                if (width < 992) {
                    state.mode = 'mobile'
                } else {
                    state.mode = 'pc'
                }
            }
        } else {
            state.mode = 'pc'
        }
    },
    // 设置网页标题
    setTitle(state, title) {
        state.title = title
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse(state) {
        state.sidebarCollapse = !state.sidebarCollapse
        if (state.mode == 'pc') {
            state.sidebarCollapseLastStatus = !state.sidebarCollapseLastStatus
        }
    },
    // 设置默认语言
    setDefaultLang(state, lang) {
        state.defaultLang = lang
        api.defaults.headers.common['Accept-Language'] = lang
    },
    // 切换当前主页面最大化
    setMainPageMaximize(state, value = !state.mainPageMaximizeStatus) {
        state.mainPageMaximizeStatus = value
    },
    // 更新主题配置
    updateThemeSetting(state, data) {
        Object.assign(state, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
