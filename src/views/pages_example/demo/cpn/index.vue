<template>
    <div class="content">
        <myInput :label="name" @updateInputVal="updateInputVal" />
    </div>
</template>

<script>
import myInput from './components/myInput.vue'
export default {
    components: { myInput },
    data() {
        return {
            name: '姓名'
        }
    },
    methods: {
        updateInputVal(val) {
            console.log(val, '发送过来的值')
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 10px;
}
</style>
