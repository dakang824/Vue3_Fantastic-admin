<template>
    <el-dropdown v-if="$store.state.settings.enableI18n" class="language-container" size="medium" @command="languageCommand">
        <slot />
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in locales" :key="index" :disabled="$store.state.settings.defaultLang === item.name" :command="item.name">{{ item.labelName }}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { getElementLocales } from '@/locales'

const { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()

const locales = computed(() => getElementLocales())

const generateI18nTitle = inject('generateI18nTitle')

function languageCommand(command) {
    proxy.$i18n.locale = command
    store.commit('settings/setDefaultLang', command)
    route.meta.title && store.commit('settings/setTitle', generateI18nTitle(route.meta.i18n, route.meta.title))
}
</script>

<style lang="scss" scoped>
// scss
</style>
