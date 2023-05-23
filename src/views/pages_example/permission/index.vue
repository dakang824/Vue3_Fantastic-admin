<template>
    <div>
        <page-header title="权限" content="该页面生成的权限格式，可直接用于本项目的权限模式" />
        <page-main>
            <el-row>
                <el-col :md="24" :lg="18">
                    <el-form :model="form" :rules="rules" label-width="120px" label-suffix="：">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入角色名称" />
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="form.brief" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请输入角色简介" />
                        </el-form-item>
                        <el-form-item label="权限" prop="authorization_list">
                            <el-table :data="authorizationList" border stripe highlight-current-row style="line-height: normal;">
                                <el-table-column prop="name" width="200" label="模块">
                                    <template #default="scope">
                                        <el-checkbox v-model="checkAll[scope.$index].checkAll" :indeterminate="checkAll[scope.$index].indeterminate" @change="handleCheckAll($event, scope.$index)">{{ scope.row.name }}</el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="权限">
                                    <template #default="scope">
                                        <el-checkbox-group v-model="form.authorization_list">
                                            <el-checkbox v-for="auth in scope.row.authorization_list" :key="`${scope.row.module}.${auth.module}`" :label="`${scope.row.module}.${auth.module}`">{{ auth.name }}</el-checkbox>
                                        </el-checkbox-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>

<script setup>
const authorizationList = ref([
    {
        name: '站点管理',
        module: 'station',
        authorization_list: [
            { name: '查看列表', module: 'list' },
            { name: '查看详情', module: 'info' },
            { name: '停用', module: 'disabled' },
            { name: '编辑', module: 'edit' },
            { name: '启用', module: 'enable' }
        ]
    },
    {
        name: '部门管理',
        module: 'department',
        authorization_list: [
            { name: '查看列表', module: 'list' },
            { name: '查看详情', module: 'info' },
            { name: '删除', module: 'delete' },
            { name: '编辑', module: 'edit' },
            { name: '新增', module: 'new' }
        ]
    },
    {
        name: '职位管理',
        module: 'department_job',
        authorization_list: [
            { name: '查看列表', module: 'list' },
            { name: '查看详情', module: 'info' },
            { name: '新增', module: 'new' },
            { name: '编辑', module: 'edit' },
            { name: '删除', module: 'delete' }
        ]
    },
    {
        name: '角色管理',
        module: 'role',
        authorization_list: [
            { name: '查看列表', module: 'list' },
            { name: '查看详情', module: 'info' },
            { name: '删除', module: 'delete' },
            { name: '编辑', module: 'edit' },
            { name: '新增', module: 'new' }
        ]
    },
    {
        name: '管理员管理',
        module: 'admin_manager',
        authorization_list: [
            { name: '查看列表', module: 'list' },
            { name: '查看详情', module: 'info' },
            { name: '编辑权限', module: 'authorization_edit' },
            { name: '查看权限详情', module: 'authorization_info' },
            { name: '删除', module: 'delete' },
            { name: '停用', module: 'disabled' },
            { name: '编辑', module: 'edit' },
            { name: '启用', module: 'enable' },
            { name: '新增', module: 'new' },
            { name: '重置密码', module: 'reset' }
        ]
    }
])

const form = ref({
    name: '',
    brief: '',
    authorization_list: []
})

const rules = ref({
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    authorization_list: [
        { validator: (rule, value, callback) => {
            if (value.length == 0) {
                callback(new Error('至少选择一个权限'))
            } else {
                callback()
            }
        }, trigger: 'change' }
    ]
})

const checkAll = computed(() => {
    let isCheckAll = []
    authorizationList.value.forEach(module => {
        let arr = []
        module.authorization_list.forEach(auth => {
            if (form.value.authorization_list.includes(`${module.module}.${auth.module}`)) {
                arr.push(`${module.module}.${auth.module}`)
            }
        })
        isCheckAll.push({
            checkAll: arr.length == module.authorization_list.length,
            indeterminate: arr.length > 0 && arr.length < module.authorization_list.length
        })
    })
    return isCheckAll
})

function handleCheckAll(flag, index) {
    if (flag) {
        authorizationList.value[index].authorization_list.forEach(auth => {
            if (!form.value.authorization_list.includes(`${authorizationList.value[index].module}.${auth.module}`)) {
                form.value.authorization_list.push(`${authorizationList.value[index].module}.${auth.module}`)
            }
        })
    } else {
        authorizationList.value[index].authorization_list.forEach(auth => {
            form.value.authorization_list = form.value.authorization_list.filter(item => item != `${authorizationList.value[index].module}.${auth.module}`)
        })
    }
}
</script>
