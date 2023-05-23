<template>
    <div>
        <page-header title="图标选择器" content="IconPicker" />
        <page-main>
            <div style="margin-bottom: 15px;">
                <icon-picker v-model="icon1" />
            </div>
            <div>
                <icon-picker v-model="icon2" />
            </div>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon1: '',
            icon2: 'el-icon-success-filled'
        }
    }
}
</script>
