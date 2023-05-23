<template>
    <div>
        <page-header title="可拖动对话框" />
        <page-main>
            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
            <div v-drag>
                <el-dialog v-model="dialogVisible" width="30%">
                    <template #title>
                        <div>
                            按住我进行拖动
                        </div>
                    </template>
                    <span>这是一段信息</span>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        }
    }
}
</script>
