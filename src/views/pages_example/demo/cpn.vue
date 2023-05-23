<template>
    <div>
        <button @click="$emit('click')">按钮</button>
    </div>
</template>

<script>
export default {
    props: {
        num: {
            type: String,
            require: true
        }
    },
    emits: ['click'], // 类型于2中的props
    setup(props, context) {
        const state = reactive({
            count: 0
        })
        onMounted(() => {
            console.log('-------', props, context, '-------')
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>