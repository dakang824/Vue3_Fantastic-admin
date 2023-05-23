<template>
    <div>
        <page-header title="管理员管理" content="页面数据为 Mock 示例数据，非真实数据。" />
        <page-main>
            <el-button type="primary" icon="el-icon-plus" @click="onCreate">新增管理员</el-button>
            <search-bar show-more @toggle="data.searchMore = $event">
                <el-form :model="data.search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :md="8">
                            <el-form-item label="帐号">
                                <el-input v-model="data.search.account" placeholder="请输入帐号，支持模糊查询" clearable @keydown.enter="currentChange()" @clear="currentChange()" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="8">
                            <el-form-item label="姓名">
                                <el-input v-model="data.search.name" placeholder="请输入姓名，支持模糊查询" clearable @keydown.enter="currentChange()" @clear="currentChange()" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="8">
                            <el-form-item label="手机号">
                                <el-input v-model="data.search.mobile" placeholder="请输入手机号" clearable @keydown.enter="currentChange()" @clear="currentChange()" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="data.searchMore">
                        <el-col :md="8">
                            <el-form-item label="性别">
                                <el-radio-group v-model="data.search.sex" @change="currentChange()">
                                    <el-radio-button label="">全部</el-radio-button>
                                    <el-radio-button label="1">男</el-radio-button>
                                    <el-radio-button label="0">女</el-radio-button>
                                    <el-radio-button label="2">保密</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="currentChange()">筛 选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <batch-action-bar v-if="data.batch.enable" :data="data.dataList" :selection-data="data.batch.selectionDataList" @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()">
                <el-button size="small">批量操作</el-button>
            </batch-action-bar>
            <el-table ref="table" v-loading="data.loading" class="list-table" :data="data.dataList" border stripe highlight-current-row @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
                <el-table-column v-if="data.batch.enable" type="selection" align="center" fixed />
                <el-table-column prop="account" sortable label="帐号" />
                <el-table-column prop="name" label="姓名" width="100" align="center" />
                <el-table-column prop="sex" label="性别" width="100" align="center">
                    <template #default="scope">
                        <el-tag v-if="scope.row.sex == 1" type="success" size="small">男</el-tag>
                        <el-tag v-else-if="scope.row.sex == 0" type="warning" size="small">女</el-tag>
                        <el-tag v-else type="info" size="small">保密</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="150" align="center" />
                <el-table-column label="状态" width="100" align="center">
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" @change="onChangeStatus($event, scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" size="mini" plain @click="onEdit(scope.row)">编辑</el-button>
                        <el-dropdown @command="handleMoreOperating($event, scope.row)">
                            <el-button size="mini">
                                更多操作
                                <svg-icon name="el-icon-arrow-down" />
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="resetPassword">重置密码</el-dropdown-item>
                                    <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @current-change="currentChange" @size-change="sizeChange" />
        </page-main>
        <FormMode v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id" v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList" />
    </div>
</template>

<script setup name="PagesExampleManagerList">
import usePagination from '@/util/pagination.js'
import FormMode from './components/FormMode/index.vue'

const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()
const { proxy } = getCurrentInstance()
const router = useRouter()

const data = ref({
    loading: false,
    /**
     * 详情展示模式
     * router 路由跳转
     * dialog 对话框
     * drawer 抽屉
     */
    formMode: 'router',
    // 详情
    formModeProps: {
        visible: false,
        id: ''
    },
    // 搜索
    search: {
        account: '',
        name: '',
        mobile: '',
        sex: ''
    },
    searchMore: false,
    // 批量操作
    batch: {
        enable: true,
        selectionDataList: []
    },
    // 列表数据
    dataList: []
})

onMounted(() => {
    getDataList()
    if (data.value.formMode === 'router') {
        proxy.$eventBus.on('get-data-list', () => {
            getDataList()
        })
    }
})

onBeforeUnmount(() => {
    if (data.value.formMode === 'router') {
        proxy.$eventBus.off('get-data-list')
    }
})

function getDataList() {
    data.value.loading = true
    let params = getParams()
    data.value.search.account && (params.account = data.value.search.account)
    data.value.search.name && (params.name = data.value.search.name)
    data.value.search.mobile && (params.mobile = data.value.search.mobile)
    data.value.search.sex != '' && (params.sex = data.value.search.sex)
    proxy.$api.get('pages_example/manager/list', {
        baseURL: '/mock/',
        params
    }).then(res => {
        data.value.loading = false
        data.value.dataList = res.data.list
        pagination.value.total = res.data.total
    })
}

// 每页数量切换
function sizeChange(size) {
    onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
    onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange(prop, order) {
    onSortChange(prop, order).then(() => getDataList())
}

function onCreate() {
    if (data.value.formMode === 'router') {
        router.push({
            name: 'pagesExampleGeneralManagerCreate'
        })
    } else {
        data.value.formModeProps.id = ''
        data.value.formModeProps.visible = true
    }
}

function onEdit(row) {
    if (data.value.formMode === 'router') {
        router.push({
            name: 'pagesExampleGeneralManagerEdit',
            params: {
                id: row.id
            }
        })
    } else {
        data.value.formModeProps.id = row.id
        data.value.formModeProps.visible = true
    }
}

function onChangeStatus(val, row) {
    proxy.$confirm(`确认${val ? '启用' : '停用'}「${row.account}」吗？`, '确认信息').then(() => {
        proxy.$api.post('pages_example/manager/change/status', {
            id: row.id,
            status: val
        }, {
            baseURL: '/mock/'
        }).then(() => {
            proxy.$message.success({
                message: `模拟${val ? '启用' : '停用'}成功`,
                center: true
            })
        })
    }).catch(() => {
        row.status = !val
    })
}

function onResetPassword(row) {
    proxy.$confirm(`确认将「${row.account}」的密码重置为 “123456” 吗？`, '确认信息').then(() => {
        proxy.$api.post('pages_example/manager/password/reset', {
            id: row.id
        }, {
            baseURL: '/mock/'
        }).then(() => {
            proxy.$message.success({
                message: '模拟重置成功',
                center: true
            })
        })
    }).catch(() => {})
}

function onDel(row) {
    proxy.$confirm(`确认删除「${row.account}」管理员吗？`, '确认信息').then(() => {
        proxy.$api.post('pages_example/manager/delete', {
            id: row.id
        }, {
            baseURL: '/mock/'
        }).then(() => {
            getDataList()
            proxy.$message.success({
                message: '模拟删除成功',
                center: true
            })
        })
    }).catch(() => {})
}

function handleMoreOperating(command, row) {
    switch (command) {
        case 'resetPassword':
            onResetPassword(row)
            break
        case 'delete':
            onDel(row)
            break
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
