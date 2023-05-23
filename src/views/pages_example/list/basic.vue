<template>
    <div>
        <page-header title="基础列表" content="最常见的列表展示形式，包含增删改查等基础操作。" />
        <page-main>
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
            <search-bar>
                <el-form :model="search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名称">
                                <el-input v-model="search.title" placeholder="请输入名称，支持模糊查询" clearable @keydown.enter="getDataList" @clear="getDataList" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getDataList">筛 选</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
            <el-table ref="table" class="list-table" :data="dataList" border stripe highlight-current-row>
                <el-table-column prop="title" label="名称" />
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="mini" plain @click="onEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" plain @click="onDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="page" :total="100" :page-size="10" :page-sizes="[10, 50, 100]" layout="total, sizes, ->, prev, pager, next, jumper" :hide-on-single-page="false" class="pagination" background />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 搜索
            search: {
                title: ''
            },
            // 列表数据
            dataList: [
                { id: 1, title: '标题1' },
                { id: 2, title: '标题2' },
                { id: 3, title: '标题3' },
                { id: 4, title: '标题4' },
                { id: 5, title: '标题5' },
                { id: 6, title: '标题6' },
                { id: 7, title: '标题7' },
                { id: 8, title: '标题8' },
                { id: 9, title: '标题9' },
                { id: 10, title: '标题10' }
            ],
            page: 3

        }
    },
    methods: {
        getDataList() {
            this.$message.success({
                message: '你点击了筛选',
                center: true
            })
        },
        onCreate() {
            this.$message.success({
                message: '你点击了新增',
                center: true
            })
        },
        onEdit() {
            this.$message.success({
                message: '你点击了编辑',
                center: true
            })
        },
        onDel(row) {
            this.$confirm(`确认删除「${row.title}」吗？`, '确认信息').then(() => {
                this.$message.success({
                    message: '你点击了删除',
                    center: true
                })
            }).catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
