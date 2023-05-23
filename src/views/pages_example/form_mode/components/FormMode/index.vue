<template>
    <div>
        <el-dialog v-if="props.mode === 'dialog'" v-model="myVisible" :title="title" width="600px" :close-on-click-modal="false" append-to-body destroy-on-close>
            <DetailForm ref="form" v-bind="$props" />
            <template #footer>
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </template>
        </el-dialog>
        <el-drawer v-else-if="props.mode === 'drawer'" v-model="myVisible" :title="title" size="600px" :close-on-click-modal="false" custom-class="form-mode-drawer" destroy-on-close>
            <DetailForm ref="form" v-bind="$props" class="form-container" />
            <div class="buttons">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import DetailForm from '../DetailForm/index.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
    // eslint-disable-next-line vue/valid-define-props
    ...DetailForm.props,
    modelValue: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        default: 'dialog',
        validator: val => ['dialog', 'drawer'].includes(val)
    }
})

const emit = defineEmits(['update:modelValue', 'success'])

let myVisible = computed({
    get: function() {
        return props.modelValue
    },
    set: function(val) {
        emit('update:modelValue', val)
    }
})

const title = computed(() => props.id == '' ? '新增' : '编辑')

function onSubmit() {
    // submit() 为组件内部方法
    proxy.$refs['form'].submit(() => {
        emit('success')
        onCancel()
    })
}

function onCancel() {
    myVisible.value = false
}
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0;
}
.form-mode-drawer {
    .form-container {
        padding: 0 15px;
        overflow: auto;
        flex: 1;
    }
    .buttons {
        padding: 15px;
        text-align: right;
        background-color: #fff;
        border-top: 1px solid #ddd;
    }
}
</style>
