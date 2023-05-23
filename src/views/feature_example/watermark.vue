<template>
    <div>
        <page-header title="页面水印" content="在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生" />
        <page-main title="可在 src\layout\components\Watermark\index.vue 文件里定制水印文案内容">
            <el-radio-group v-model="enableWatermark">
                <el-radio-button :label="true">开启</el-radio-button>
                <el-radio-button :label="false">关闭</el-radio-button>
            </el-radio-group>
        </page-main>
    </div>
</template>

<script>
export default {
    computed: {
        enableWatermark: {
            get: function() {
                return this.$store.state.settings.enableWatermark
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableWatermark': newValue
                })
            }
        }
    }
}
</script>
