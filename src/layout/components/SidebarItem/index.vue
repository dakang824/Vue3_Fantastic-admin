<template>
    <div v-if="item.meta.sidebar !== false" class="sidebar-item">
        <el-sub-menu v-if="item.path == undefined" :title="item.meta.title" :index="JSON.stringify(item)">
            <template #title>
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                <span class="title">{{ item.meta.title }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" />
        </el-sub-menu>
        <router-link v-else-if="!hasChildren" v-slot="{ href, navigate, isActive, isExactActive }" custom :to="resolveRoutePath(basePath, item.path)">
            <a :href="isExternalLink(resolveRoutePath(basePath, item.path)) ? resolveRoutePath(basePath, item.path) : href" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" :target="isExternalLink(resolveRoutePath(basePath, item.path)) ? '_blank' : '_self'" @click="navigate">
                <el-menu-item :title="generateI18nTitle(item.meta.i18n, item.meta.title)" :index="resolveRoutePath(basePath, item.path)">
                    <svg-icon v-if="iconName(isActive || isExactActive, item.meta.icon, item.meta.activeIcon)" :name="iconName(isActive || isExactActive, item.meta.icon, item.meta.activeIcon)" />
                    <span class="title">{{ generateI18nTitle(item.meta.i18n, item.meta.title) }}</span>
                    <span
                        v-if="badge(item.meta.badge).visible" :class="{
                            'badge': true,
                            'badge-dot': badge(item.meta.badge).type === 'dot',
                            'badge-text': badge(item.meta.badge).type === 'text'
                        }"
                    >{{ badge(item.meta.badge).type === 'text' ? badge(item.meta.badge).value : '' }}</span>
                </el-menu-item>
            </a>
        </router-link>
        <el-sub-menu v-else :title="generateI18nTitle(item.meta.i18n, item.meta.title)" :index="resolveRoutePath(basePath, item.path)">
            <template #title>
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="unactive" />
                <svg-icon v-if="item.meta.activeIcon || item.meta.icon" :name="item.meta.activeIcon || item.meta.icon" class="active" />
                <span class="title">{{ generateI18nTitle(item.meta.i18n, item.meta.title) }}</span>
                <span
                    v-if="badge(item.meta.badge).visible" :class="{
                        'badge': true,
                        'badge-dot': badge(item.meta.badge).type === 'dot',
                        'badge-text': badge(item.meta.badge).type === 'text'
                    }"
                >{{ badge(item.meta.badge).type === 'text' ? badge(item.meta.badge).value : '' }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" :base-path="resolveRoutePath(basePath, item.path)" />
        </el-sub-menu>
    </div>
</template>

<script setup>
import SidebarItem from './index.vue'
import { isExternalLink, resolveRoutePath } from '@/util'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
})

const generateI18nTitle = inject('generateI18nTitle')

const hasChildren = computed(() => {
    let flag = true
    if (props.item.children) {
        if (props.item.children.every(item => item.meta.sidebar === false)) {
            flag = false
        }
    } else {
        flag = false
    }
    return flag
})

function iconName(isActive, icon, activeIcon) {
    let name = ''
    if ((!isActive && icon) || (isActive && !activeIcon)) {
        name = icon
    } else if (isActive && activeIcon) {
        name = activeIcon
    }
    return name
}
function badge(badge) {
    let res = {
        type: '', // text or dot
        value: '',
        visible: false
    }
    if (badge) {
        res.visible = true
        res.value = typeof badge == 'function' ? badge() : badge
        if (typeof res.value == 'boolean') {
            res.type = 'dot'
            if (!res.value) {
                res.visible = false
            }
        } else if (typeof res.value == 'number') {
            res.type = 'text'
            if (res.value <= 0) {
                res.visible = false
            }
        } else {
            res.type = 'text'
            if (!res.value) {
                res.visible = false
            }
        }
    }
    return res
}
</script>

<style lang="scss" scoped>
:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
    flex: 1;
    vertical-align: inherit;
    @include text-overflow;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
}
:deep(.el-sub-menu),
:deep(.el-menu-item) {
    .svg-icon {
        font-size: 20px;
        vertical-align: -0.25em;
        transition: transform 0.3s;
        color: unset;
        &[class^="el-icon-"],
        &[class*=" el-icon-"] {
            vertical-align: middle;
        }
    }
    .svg-icon + .title {
        margin-left: 10px;
    }
    &:hover > .svg-icon,
    .el-sub-menu__title:hover > .svg-icon {
        transform: scale(1.2);
    }
}
:deep(.el-sub-menu) {
    > .el-sub-menu__title > .svg-icon.active {
        display: none;
    }
    &.is-active {
        > .el-sub-menu__title > .svg-icon.unactive {
            display: none;
        }
        > .el-sub-menu__title > .svg-icon.active {
            display: block;
        }
    }
}
a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}
.badge {
    position: absolute;
    z-index: 1;
    @include themeify {
        background-color: themed("g-badge-bg");
        box-shadow: 0 0 0 1px themed("g-badge-border-color");
    }
    @include position-center(y);
    &-dot {
        right: 15px;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        &::after {
            content: "";
            pointer-events: none;
            position: absolute;
            top: 0;
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: dot-twinkling 1s infinite ease-in-out;
            @include themeify {
                background-color: themed("g-badge-bg");
            }
        }
    }
    @keyframes dot-twinkling {
        0% {
            opacity: 0.6;
            transform: scale(0.8);
        }
        100% {
            opacity: 0;
            transform: scale(2.4);
        }
    }
    &-text {
        right: 15px;
        border-radius: 10px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        @include themeify {
            color: themed("g-badge-color");
        }
    }
}
.el-sub-menu__title {
    > .badge {
        &-dot {
            right: 40px;
        }
        &-text {
            right: 40px;
        }
    }
}
</style>
