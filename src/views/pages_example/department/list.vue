<template>
    <div>
        <page-header title="部门管理" content="页面数据为 Mock 示例数据，非真实数据。" />
        <page-main>
            <el-button type="primary" icon="el-icon-plus" @click="onCreate">新增部门</el-button>
            <search-bar>
                <el-form :model="data.search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="部门">
                                <el-input v-model="data.search.title" placeholder="请输入部门，支持模糊查询" clearable @keydown.enter="currentChange()" @clear="currentChange()" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="currentChange()">筛 选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <batch-action-bar v-if="data.batch.enable" :data="data.dataList" :selection-data="data.batch.selectionDataList" @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()">
                <el-button size="small">单个批量操作按钮</el-button>
                <el-button-group>
                    <el-button size="small">批量操作按钮组1</el-button>
                    <el-button size="small">批量操作按钮组2</el-button>
                </el-button-group>
            </batch-action-bar>
            <el-table ref="table" v-loading="data.loading" class="list-table" :data="data.dataList" border stripe highlight-current-row @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event">
                <el-table-column v-if="data.batch.enable" type="selection" width="40" />
                <el-table-column prop="title" label="部门" />
                <el-table-column label="操作" width="250" align="center">
                    <template #default="scope">
                        <el-button type="info" size="mini" plain @click="onIntoJob(scope.row)">查看职位</el-button>
                        <el-button type="primary" size="mini" plain @click="onEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" plain @click="onDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
        </page-main>
        <FormMode v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id" v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList" />
    </div>
</template>

<script setup name="PagesExampleDepartmentList">
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
    formMode: 'dialog',
    // 详情
    formModeProps: {
        visible: false,
        id: ''
    },
    // 搜索
    search: {
        title: ''
    },
    // 批量操作
    batch: {
        enable: false,
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
    data.value.search.title && (params.title = data.value.search.title)
    proxy.$api.get('pages_example/department/list', {
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
            name: 'pagesExampleGeneralDepartmentCreate'
        })
    } else {
        data.value.formModeProps.id = ''
        data.value.formModeProps.visible = true
    }
}

function onEdit(row) {
    if (data.value.formMode === 'router') {
        router.push({
            name: 'pagesExampleGeneralDepartmentEdit',
            params: {
                id: row.id
            }
        })
    } else {
        data.value.formModeProps.id = row.id
        data.value.formModeProps.visible = true
    }
}

function onDel(row) {
    proxy.$confirm(`确认删除「${row.title}」吗？`, '确认信息').then(() => {
        proxy.$api.post('pages_example/department/delete', {
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

function onIntoJob(row) {
    router.push({
        name: 'pagesExampleGeneralJobList',
        params: {
            department_id: row.id
        }
    })
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
