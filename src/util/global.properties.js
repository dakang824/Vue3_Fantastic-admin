import api from '@/api'
import { auth, authAll } from '@/util'
import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import hotkeys from 'hotkeys-js'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import QRCode from 'qrcode'
import mitt from 'mitt'
import Notify from '@wcjiang/notify'

export default function globalProperties(app) {
    // 请求
    app.config.globalProperties.$api = api
    // 鉴权
    app.config.globalProperties.$auth = auth
    app.config.globalProperties.$authAll = authAll
    // 标签栏关闭
    app.config.globalProperties.$tabbar = {
        getId: () => {
            return store.state.settings.enableTabbarMergeTabs ? (router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath) : router.currentRoute.value.fullPath
        },
        closeById: tabId => {
            let activedTabId = store.state.settings.enableTabbarMergeTabs ? (router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath) : router.currentRoute.value.fullPath
            // 如果关闭的标签正好是当前路由，并且标签栏数目大于 1
            if (tabId == activedTabId && store.state.tabbar.list.length > 1) {
                let index = ~~Object.keys(store.state.tabbar.list).find(i => {
                    return store.state.tabbar.list[i].tabId == tabId
                })
                if (index < store.state.tabbar.list.length - 1) {
                    router.push(store.state.tabbar.list[index + 1].fullPath)
                } else {
                    router.push(store.state.tabbar.list[index - 1].fullPath)
                }
            }
            if (store.state.tabbar.list.length > 1) {
                store.dispatch('tabbar/remove', tabId)
            } else {
                ElMessage.error('当前只有一个标签页，已阻止关闭')
            }
        },
        close: to => {
            let tabId = store.state.settings.enableTabbarMergeTabs ? (router.currentRoute.value.meta.activeMenu || router.currentRoute.value.fullPath) : router.currentRoute.value.fullPath
            store.dispatch('tabbar/remove', tabId)
            router.push(to)
        }
    }
    // 主页面最大化
    app.config.globalProperties.$mainPageMaximize = status => {
        store.commit('settings/setMainPageMaximize', status)
    }
    dayjs.locale('zh-cn')
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$cookies = Cookies
    app.config.globalProperties.$hotkeys = hotkeys
    app.config.globalProperties.$clipboard = toClipboard
    app.config.globalProperties.$qrcode = QRCode
    app.config.globalProperties.$eventBus = mitt()
    app.config.globalProperties.$iNotify = options => new Notify(options)
}
