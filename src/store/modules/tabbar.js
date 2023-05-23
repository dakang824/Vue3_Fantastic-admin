import storage from '@/util/storage'

const state = () => ({
    list: []
})

const getters = {}

const actions = {
    add({ rootState, commit }, route) {
        return new Promise(resolve => {
            let names = []
            route.matched.map((v, i) => {
                if (i > 0) {
                    v.components.default.name && names.push(v.components.default.name)
                }
            })
            commit('add', { route: route, name: names, enableTabbarMergeTabs: rootState.settings.enableTabbarMergeTabs })
            // 更新固定标签页的数据，数据会记录在 localstorage 里
            commit('updateStorage', rootState.user.account)
            resolve()
        })
    },
    remove({ rootState, state, commit }, tabId) {
        let keepName = [], removeName = []
        state.list.map(v => {
            if (v.tabId == tabId) {
                removeName.push(v.name)
            } else {
                keepName.push(v.name)
            }
        })
        keepName = keepName.flat()
        removeName = removeName.flat()
        let name = []
        removeName.map(v => {
            if (!keepName.includes(v)) {
                name.push(v)
            }
        })
        commit('remove', tabId)
        commit('updateStorage', rootState.user.account)
        // 如果是手动点击关闭 tab 标签页，则删除页面缓存
        commit('keepAlive/remove', name, { root: true })
    },
    removeOtherSide({ rootState, state, commit }, tabId) {
        let keepName = [], removeName = []
        state.list.map(v => {
            if (v.tabId != tabId && !v.isPin) {
                removeName.push(v.name)
            } else {
                keepName.push(v.name)
            }
        })
        keepName = keepName.flat()
        removeName = removeName.flat()
        let name = []
        removeName.map(v => {
            if (!keepName.includes(v)) {
                name.push(v)
            }
        })
        commit('removeOtherSide', tabId)
        commit('updateStorage', rootState.user.account)
        commit('keepAlive/remove', name, { root: true })
    },
    removeLeftSide({ rootState, state, commit }, tabId) {
        let index = ~~Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        let keepName = [], removeName = []
        state.list.map((v, i) => {
            if (i < index && !v.isPin) {
                removeName.push(v.name)
            } else {
                keepName.push(v.name)
            }
        })
        keepName = keepName.flat()
        removeName = removeName.flat()
        let name = []
        removeName.map(v => {
            if (!keepName.includes(v)) {
                name.push(v)
            }
        })
        commit('removeLeftSide', tabId)
        commit('updateStorage', rootState.user.account)
        commit('keepAlive/remove', name, { root: true })
    },
    removeRightSide({ rootState, state, commit }, tabId) {
        let index = ~~Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        let keepName = [], removeName = []
        state.list.map((v, i) => {
            if (i > index && !v.isPin) {
                removeName.push(v.name)
            } else {
                keepName.push(v.name)
            }
        })
        keepName = keepName.flat()
        removeName = removeName.flat()
        let name = []
        removeName.map(v => {
            if (!keepName.includes(v)) {
                name.push(v)
            }
        })
        commit('removeRightSide', tabId)
        commit('updateStorage', rootState.user.account)
        commit('keepAlive/remove', name, { root: true })
    },
    pin({ rootState, commit }, tabId) {
        commit('pin', tabId)
        commit('updateStorage', rootState.user.account)
    },
    unPin({ rootState, commit }, tabId) {
        commit('unPin', tabId)
        commit('updateStorage', rootState.user.account)
    }
}

const mutations = {
    // 根据 localstorage 数据复原当前帐号的固定标签页
    recoveryStorage(state, account) {
        if (storage.local.get('tabbarPinData') != null) {
            state.list = JSON.parse(storage.local.get('tabbarPinData'))[account] || []
        }
    },
    // 更新 localstorage 数据
    updateStorage(state, account) {
        let data = JSON.parse(storage.local.get('tabbarPinData')) || {}
        data[account] = state.list.filter(item => {
            return item.isPin
        })
        storage.local.set('tabbarPinData', JSON.stringify(data))
    },
    // 清空所有标签页，登出的时候需要清空
    clean(state) {
        state.list = []
    },
    // 添加标签页
    add(state, { route, name, enableTabbarMergeTabs }) {
        let tabId = enableTabbarMergeTabs ? (route.meta.activeMenu || route.fullPath) : route.fullPath
        if (route.name != 'reload') {
            if (
                !state.list.some(item => {
                    return item.tabId == tabId
                })
            ) {
                state.list.push({
                    tabId: tabId,
                    fullPath: route.fullPath,
                    activeMenu: route.meta.activeMenu,
                    title: route.meta.title,
                    i18n: route.meta.i18n,
                    name: name,
                    isPin: false,
                    isPermanent: false
                })
            } else {
                state.list.map(item => {
                    if (item.tabId == tabId) {
                        item.fullPath = route.fullPath
                        item.activeMenu = route.meta.activeMenu
                        item.title = route.meta.title
                        item.i18n = route.meta.i18n
                    }
                })
            }
        }
    },
    // 添加常驻标签页
    addPermanentTab(state, { routes, enableTabbarMergeTabs }) {
        let tabs = []
        routes.map(items => {
            items.children && items.children.map(route => {
                if (route.meta.permanent) {
                    let fullPath = route.meta.breadcrumbNeste[route.meta.breadcrumbNeste.length - 1].path
                    let tabId = enableTabbarMergeTabs ? (route.meta.activeMenu || fullPath) : fullPath
                    tabs.push({
                        tabId: tabId,
                        fullPath: fullPath,
                        activeMenu: route.meta.activeMenu,
                        title: route.meta.title,
                        i18n: route.meta.i18n,
                        name: route.name,
                        isPin: false,
                        isPermanent: true
                    })
                }
            })
        })
        // 常驻的标签页添加到标签栏开头
        tabs.length && state.list.unshift(...tabs)
    },
    // 删除指定标签页
    remove(state, tabId) {
        state.list = state.list.filter(item => {
            return item.tabId != tabId
        })
    },
    // 删除两侧非常驻和固定标签页
    removeOtherSide(state, tabId) {
        state.list = state.list.filter(item => {
            return item.tabId == tabId || item.isPermanent || item.isPin
        })
    },
    // 删除左侧非常驻和固定标签页
    removeLeftSide(state, tabId) {
        // 查找指定路由对应在标签页列表里的下标
        let index = ~~Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        state.list = state.list.filter((item, i) => {
            return i >= index || item.isPermanent || item.isPin
        })
    },
    // 删除右侧非常驻和固定标签页
    removeRightSide(state, tabId) {
        // 查找指定路由对应在标签页列表里的下标
        let index = ~~Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        state.list = state.list.filter((item, i) => {
            return i <= index || item.isPermanent || item.isPin
        })
    },
    // 固定标签页（移动到最后一个常驻或固定标签页后面，如果没有则移动至第一个）
    pin(state, tabId) {
        let index = ~~Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        let toIndex = -1
        state.list.map((item, index) => {
            if (item.isPermanent || item.isPin) {
                toIndex = index
            }
        })
        if (index > toIndex) {
            state.list.splice(toIndex + 1, 0, state.list[index])
            state.list.splice(index + 1, 1)
        }
        // 修改状态
        state.list.map(item => {
            if (item.tabId == tabId) {
                item.isPin = true
            }
        })
    },
    // 取消固定标签页（移动到最后一个常驻或固定标签页后面）
    unPin(state, tabId) {
        let index = Object.keys(state.list).find(i => {
            return state.list[i].tabId == tabId
        })
        index = ~~index
        let toIndex = -1
        state.list.map((item, index) => {
            if (item.isPermanent || item.isPin) {
                toIndex = index
            }
        })
        state.list.splice(toIndex + 1, 0, state.list[index])
        state.list.splice(index, 1)
        // 修改状态
        state.list.map(item => {
            if (item.tabId == tabId) {
                item.isPin = false
            }
        })
    },
    sort(state, data) {
        state.list = data
    },
    editTitle(state, { tabId, title }) {
        state.list.map(item => {
            if (item.tabId === tabId && item.title !== title) {
                item.title = title
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
