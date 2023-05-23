<template>
    <div>
        <page-header title="纸片" content="Chip" />
        <page-main>
            <chip>
                基础纸片
            </chip>
            <chip>
                <el-avatar>Fa</el-avatar>
                头像文字
            </chip>
            <chip>
                <el-avatar icon="el-icon-user-filled" />
                头像图标
            </chip>
            <chip>
                <el-avatar :src="avatar" />
                头像图片
            </chip>
            <chip v-if="isShow" closable @close="handleClose">
                关闭按钮
            </chip>
        </page-main>
        <page-main>
            <chip type="primary">
                Primary
            </chip>
            <chip type="success">
                Success
            </chip>
            <chip type="info">
                Info
            </chip>
            <chip type="warning">
                Waning
            </chip>
            <chip type="danger">
                Danger
            </chip>
        </page-main>
    </div>
</template>

<script>
import img from '@/assets/images/logo.png'

export default {
    data() {
        return {
            isShow: true,
            avatar: img
        }
    },
    methods: {
        handleClose() {
            this.isShow = false
        }
    }
}
</script>
