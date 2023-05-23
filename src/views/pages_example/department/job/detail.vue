<template>
    <div>
        <page-header :title="$route.name == 'routerName' ? '新增职位' : '编辑职位'">
            <el-button icon="el-icon-arrow-left" size="mini" round @click="goBack">返 回</el-button>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="16">
                    <DetailForm :id="$route.params.id" ref="form" :department-id="$route.params.department_id" />
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" @click="onSubmit">提 交</el-button>
            <el-button @click="onCancel">取 消</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup name="PagesExampleDepartmentJobDetail">
import DetailForm from './components/DetailForm/index.vue'

const { proxy } = getCurrentInstance()
const store = useStore()

function onSubmit() {
    proxy.$refs['form'].submit(() => {
        proxy.$eventBus.emit('get-data-list')
        goBack()
    })
}

function onCancel() {
    goBack()
}

// 返回列表页
function goBack() {
    if (store.state.settings.enableTabbar && !store.state.settings.enableMergeTabbar) {
        proxy.$tabbar.close({ name: 'pagesExampleGeneralDepartmentList' })
    } else {
        proxy.$router.push({ name: 'pagesExampleGeneralDepartmentList' })
    }
}
</script>

<style lang="scss" scoped>
// scss
</style>
