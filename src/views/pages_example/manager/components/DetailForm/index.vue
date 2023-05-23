<template>
    <div v-loading="data.loading">
        <el-form ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
            <el-form-item label="帐号" prop="account">
                <el-input v-model="data.form.account" placeholder="请输入帐号" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="data.form.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="data.form.mobile" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="data.form.sex" size="small">
                    <el-radio-button label="2">保密</el-radio-button>
                    <el-radio-button label="1">男</el-radio-button>
                    <el-radio-button label="0">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
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
        account: '',
        name: '',
        mobile: '',
        sex: '2'
    },
    rules: {
        account: [
            { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                let params = {
                    key: 'mobile',
                    value: value
                }
                if (data.value.form.id != '') {
                    params.id = data.value.form.id
                }
                proxy.$api.get('pages_example/manager/check', {
                    baseURL: '/mock/',
                    params: params
                }).then(res => {
                    if (res.data.exist) {
                        callback(new Error('手机号已存在'))
                    } else {
                        callback()
                    }
                })
            }, trigger: 'blur' }
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
    proxy.$api.get('pages_example/manager/detail', {
        baseURL: '/mock/',
        params: {
            id: data.value.form.id
        }
    }).then(res => {
        data.value.loading = false
        data.value.form.account = res.data.account
        data.value.form.name = res.data.name
        data.value.form.mobile = res.data.mobile
    })
}

defineExpose({
    submit(callback) {
        if (data.value.form.id == '') {
            proxy.$refs['form'].validate(valid => {
                if (valid) {
                    proxy.$api.post('pages_example/manager/create', data.value.form, {
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
                    proxy.$api.post('pages_example/manager/edit', data.value.form, {
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
// scss
</style>
