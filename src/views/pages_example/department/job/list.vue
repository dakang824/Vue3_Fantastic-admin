<template>
    <div>
        <page-header :title="`「${data.department}」职位管理`" content="页面数据为 Mock 示例数据，非真实数据。">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="$router.go(-1)">返回</el-button>
        </page-header>
        <page-main>
            <el-button type="primary" icon="el-icon-plus" @click="onCreate">新增职位</el-button>
            <search-bar>
                <el-form :model="data.search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="职位">
                                <el-input v-model="data.search.title" placeholder="请输入职位名称，支持模糊查询" clearable @keydown.enter="currentChange()" @clear="currentChange()" />
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
                <el-table-column prop="title" label="职位" />
                <el-table-column label="操作" width="250" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="mini" plain @click="onEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" plain @click="onDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
        </page-main>
        <FormMode v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id" v-model="data.formModeProps.visible" :department-id="$route.params.department_id" :mode="data.formMode" @success="getDataList" />
    </div>
</template>

<script setup name="PagesExampleDepartmentJobList">
import usePagination from '@/util/pagination.js'
import FormMode from './components/FormMode/index.vue'

const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()
const { proxy } = getCurrentInstance()
const route = useRoute()
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
    dataList: [],
    department: ''
})

onMounted(() => {
    getDepartmentInfo()
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

function getDepartmentInfo() {
    proxy.$api.get('pages_example/department/detail', {
        baseURL: '/mock/',
        params: {
            id: route.params.department_id
        }
    }).then(res => {
        data.value.department = res.data.title
    })
}

function getDataList() {
    data.value.loading = true
    let params = getParams()
    params.department_id = route.params.department_id
    data.value.search.title && (params.title = data.value.search.title)
    proxy.$api.get('pages_example/job/list', {
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
            name: 'pagesExampleGeneralJobCreate',
            params: {
                department_id: route.params.department_id
            }
        })
    } else {
        data.value.formModeProps.id = ''
        data.value.formModeProps.visible = true
    }
}

function onEdit(row) {
    if (data.value.formMode === 'router') {
        router.push({
            name: 'pagesExampleGeneralJobEdit',
            params: {
                id: row.id,
                department_id: route.params.department_id
            }
        })
    } else {
        data.value.formModeProps.id = row.id
        data.value.formModeProps.visible = true
    }
}

function onDel(row) {
    proxy.$confirm(`确认删除「${row.title}」吗？`, '确认信息').then(() => {
        proxy.$api.post('pages_example/job/delete', {
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
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
