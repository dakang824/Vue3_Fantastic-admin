<template>
    <div v-loading="data.loading">
        <el-form ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
            <el-form-item label="名称" prop="title">
                <el-input v-model="data.form.title" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="发货地址" prop="address">
                <cascader-area v-model="data.form.address" />
            </el-form-item>
            <el-form-item label="计价方式">
                <el-radio-group v-model="data.form.type">
                    <el-radio-button :label="1">按件数</el-radio-button>
                    <el-radio-button :label="2">按重量</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="运费模版">
                <div class="freight">
                    <el-card shadow="never">
                        <template #header>默认运费</template>
                        <el-row :gutter="20">
                            <el-col :md="6">
                                <el-input v-model="data.form.first_step" size="small">
                                    <template #prepend>{{ data.form.type == 1 ? '首件' : '首重' }}</template>
                                    <template #append>{{ data.form.type == 1 ? '件' : 'kg' }}</template>
                                </el-input>
                            </el-col>
                            <el-col :md="6">
                                <el-input v-model="data.form.first_price" size="small">
                                    <template #prepend>首费</template>
                                    <template #append>元</template>
                                </el-input>
                            </el-col>
                            <el-col :md="6">
                                <el-input v-model="data.form.continued_step" size="small">
                                    <template #prepend>{{ data.form.type == 1 ? '续件' : '续重' }}</template>
                                    <template #append>{{ data.form.type == 1 ? '件' : 'kg' }}</template>
                                </el-input>
                            </el-col>
                            <el-col :md="6">
                                <el-input v-model="data.form.continued_price" size="small">
                                    <template #prepend>续费</template>
                                    <template #append>元</template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-row>
                        <el-col :span="24">
                            <Freight :data="data.form.infos" :type="data.form.type" />
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-radio-group v-model="data.form.status">
                    <el-radio-button :label="true">启用</el-radio-button>
                    <el-radio-button :label="false">停用</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import Freight from '../Freight/index.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
    id: {
        type: [Number, String],
        default: ''
    }
})

const data = ref({
    loading: false,
    form: {
        id: props.id,
        title: '',
        address: [],
        type: 1,
        status: true,
        first_step: '',
        first_price: '',
        continued_step: '',
        continued_price: '',
        infos: []
    },
    rules: {
        title: [
            { required: true, message: '请输入名称', trigger: 'blur' }
        ]
    }
})

onMounted(() => {
    if (data.value.form.id != '') {
        getInfo()
    }
})

function getInfo() {
    data.value.loading = true
    proxy.$api.get('pages_example/delivery/detail', {
        baseURL: '/mock/',
        params: {
            id: data.value.form.id
        }
    }).then(res => {
        data.value.loading = false
        Object.assign(data.value.form, res.data)
    })
}

defineExpose({
    submit(callback) {
        if (data.value.form.id == '') {
            proxy.$refs['form'].validate(valid => {
                if (valid) {
                    proxy.$api.post('pages_example/delivery/create', data.value.form, {
                        baseURL: '/mock/'
                    }).then(() => {
                        proxy.$message.success({
                            message: '模拟新增成功',
                            center: true
                        })
                        callback && callback()
                    })
                }
            })
        } else {
            proxy.$refs['form'].validate(valid => {
                if (valid) {
                    proxy.$api.post('pages_example/delivery/edit', data.value.form, {
                        baseURL: '/mock/'
                    }).then(() => {
                        proxy.$message.success({
                            message: '模拟编辑成功',
                            center: true
                        })
                        callback && callback()
                    })
                }
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.freight {
    line-height: initial;
    :deep(.el-card) {
        line-height: initial;
        margin-bottom: 10px;
        .el-input__inner {
            text-align: center;
        }
    }
}
</style>
