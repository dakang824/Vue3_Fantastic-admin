<template>
    <div>
        <page-header title="高级表单" content="当一次性提交大量数据时，可使用高级表单。" />
        <el-form label-position="top" label-width="80px" size="small">
            <page-main title="员工信息">
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="请输入真实姓名" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="生日">
                            <el-date-picker v-model="form.birthday" type="date" placeholder="请选择你的出生日期" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio-button label="1">男</el-radio-button>
                                <el-radio-button label="0">女</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="身份证号">
                            <el-input v-model="form.idcard" placeholder="请输入18位身份证号" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="籍贯">
                            <cascader-area v-model="form.area" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="家庭住址">
                            <el-input v-model="form.address" placeholder="请输入家庭住址" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </page-main>
            <page-main title="家庭成员">
                <el-table :data="form.familyMember" style="width: 100%;">
                    <el-table-column label="姓名">
                        <template #default="scope">
                            <el-input v-if="scope.row.isEdit" v-model="scope.row.name" size="mini" />
                            <span v-else>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template #default="scope">
                            <el-input v-if="scope.row.isEdit" v-model="scope.row.mobile" size="mini" />
                            <span v-else>{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="关系">
                        <template #default="scope">
                            <el-input v-if="scope.row.isEdit" v-model="scope.row.relationship" size="mini" />
                            <span v-else>{{ scope.row.relationship }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template #default="scope">
                            <template v-if="scope.row.isEdit">
                                <el-button type="primary" plain size="mini" @click="scope.row.isEdit = false">保存</el-button>
                            </template>
                            <template v-else>
                                <el-button type="primary" plain size="mini" @click="scope.row.isEdit = true">编辑</el-button>
                                <el-popconfirm title="是否要删除此行？" style="margin-left: 10px;" @confirm="removeFamilyMember(scope.$index)">
                                    <template #reference>
                                        <el-button type="danger" plain size="mini">删除</el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button :disabled="!canAddFamilyMeber" icon="el-icon-plus" size="small" style="margin-top: 20px; width: 100%;" @click="addFamilyMember">新增成员</el-button>
            </page-main>
        </el-form>
        <fixed-action-bar>
            <el-button type="primary">提交</el-button>
        </fixed-action-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                sex: 1,
                birthday: '',
                idcard: '',
                area: [],
                address: '',
                familyMember: [
                    {
                        isEdit: false,
                        name: '张三',
                        mobile: '13111111111',
                        relationship: '父亲'
                    },
                    {
                        isEdit: false,
                        name: '李四',
                        mobile: '13122222222',
                        relationship: '母亲'
                    }
                ]
            }
        }
    },
    computed: {
        canAddFamilyMeber() {
            return this.form.familyMember.every(item => {
                return !item.isEdit
            })
        }
    },
    methods: {
        addFamilyMember() {
            this.form.familyMember.push({
                isEdit: true,
                name: '',
                mobile: '',
                relationship: ''
            })
        },
        removeFamilyMember(index) {
            this.form.familyMember.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
    width: 100%;
}
</style>
