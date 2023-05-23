<template>
    <div class="user">
        <div class="tools">
            <span v-if="$store.state.settings.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <i class="ri-search-line" />
            </span>
            <el-popover v-if="$store.state.settings.enableNotification" trigger="hover" :show-after="200" placement="bottom" :width="350">
                <Notification ref="tabs" />
                <template #reference>
                    <span class="item">
                        <el-badge type="primary" :value="5">
                            <i class="ri-notification-3-line" />
                        </el-badge>
                    </span>
                </template>
            </el-popover>
            <i18n-selector>
                <span class="item">
                    <i class="ri-translate" />
                </span>
            </i18n-selector>
            <span v-if="$store.state.settings.mode === 'pc' && isFullscreenEnable && $store.state.settings.enableFullscreen" class="item" @click="fullscreen">
                <i :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'" />
            </span>
            <span v-if="$store.state.settings.enablePageReload" class="item" @click="reload()">
                <svg-icon name="toolbar-reload" />
            </span>
            <span v-if="$store.state.settings.enableThemeSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <svg-icon name="toolbar-theme" />
            </span>
        </div>
        <el-dropdown class="user-container" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="medium">
                    <el-icon><el-icon-user-filled /></el-icon>
                </el-avatar>
                {{ $store.state.user.account }}
                <el-icon><el-icon-caret-bottom /></el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <el-dropdown-item v-if="$store.state.settings.enableDashboard" command="dashboard">{{ $t('route.dashboard') }}</el-dropdown-item>
                    <el-dropdown-item command="setting">{{ $t('app.profile') }}</el-dropdown-item>
                    <el-dropdown-item divided command="logout">{{ $t('app.logout') }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import screenfull from 'screenfull'
import Notification from '../Notification/index.vue'

const reload = inject('reload')
const store = useStore()
const router = useRouter()

const isFullscreenEnable = computed(() => screenfull.isEnabled)
const isFullscreen = ref(false)

onMounted(() => {
    if (isFullscreenEnable.value) {
        screenfull.on('change', fullscreenChange)
    }
})
onBeforeUnmount(() => {
    if (isFullscreenEnable.value) {
        screenfull.off('change', fullscreenChange)
    }
})

function fullscreen() {
    screenfull.toggle()
}
function fullscreenChange() {
    isFullscreen.value = screenfull.isFullscreen
}
function userCommand(command) {
    switch (command) {
        case 'dashboard':
            router.push({
                name: 'dashboard'
            })
            break
        case 'setting':
            router.push({
                name: 'personalSetting'
            })
            break
        case 'logout':
            store.dispatch('user/logout').then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
    }
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
}
.tools {
    margin-right: 20px;
    .item {
        margin-left: 5px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: all 0.3s;
        [class^="ri-"] {
            vertical-align: -0.15em;
        }
        .el-badge {
            vertical-align: initial;
        }
    }
}
:deep(.language-container) {
    font-size: 16px;
}
:deep(.user-container) {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
</style>
