<template>
    <div>
        <el-table v-if="!(readonly && data.length == 0)" v-show="data.length != 0" :data="data" border class="freight">
            <el-table-column label="运送到">
                <template #default="scope">
                    <div v-if="readonly">
                        <el-tag v-for="(item, index) in scope.row.list" :key="index" type="info">{{ getProvinceByCode(item) }}</el-tag>
                    </div>
                    <el-row v-else type="flex" align="middle">
                        <el-col>
                            <el-tag v-for="(item, index) in scope.row.list" :key="index" :disable-transitions="true" type="info" closable @close="deleteSingleFreight(scope.$index, item)">{{ getProvinceByCode(item) }}</el-tag>
                        </el-col>
                        <el-col style="width: 100px; text-align: right;">
                            <el-button size="small" plain @click="editFreight(scope.$index)">编 辑</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="type == 1 ? '首件数（件）' : '首重量（kg）'" width="150" align="center">
                <template #default="scope">
                    <span v-if="readonly">{{ scope.row.first_step }}</span>
                    <el-input v-else v-model="scope.row.first_step" size="small" />
                </template>
            </el-table-column>
            <el-table-column label="首费（元）" width="150" align="center">
                <template #default="scope">
                    <span v-if="readonly">{{ scope.row.first_price }}</span>
                    <el-input v-else v-model="scope.row.first_price" size="small" />
                </template>
            </el-table-column>
            <el-table-column :label="type == 1 ? '续件数（件）' : '续重量（kg）'" width="150" align="center">
                <template #default="scope">
                    <span v-if="readonly">{{ scope.row.continued_step }}</span>
                    <el-input v-else v-model="scope.row.continued_step" size="small" />
                </template>
            </el-table-column>
            <el-table-column label="续费（元）" width="150" align="center">
                <template #default="scope">
                    <span v-if="readonly">{{ scope.row.continued_price }}</span>
                    <el-input v-else v-model="scope.row.continued_price" size="small" />
                </template>
            </el-table-column>
            <el-table-column v-if="!readonly" label="操作" width="100" align="center">
                <template #default="scope">
                    <el-button type="danger" size="small" plain @click="deleteFreight(scope.$index)">删 除</el-button>
                </template>
            </el-table-column>
            <template #empty>
                <span />
            </template>
            <template #append>
                <div v-if="!readonly" style="padding: 10px;">
                    <el-button type="primary" size="small" plain style="width: 100%;" @click="showFreightDialog">新增一条运费模版</el-button>
                </div>
            </template>
        </el-table>
        <el-button v-if="!readonly" v-show="data.length == 0" type="primary" size="small" plain @click="showFreightDialog">为指定地区设置运费模版</el-button>
        <el-dialog v-model="dialog.visible" title="选择地区" width="800px" custom-class="freight-dialog" append-to-body @closed="dialog.filter = ''">
            <div class="filter">
                <el-radio-group v-model="dialog.filter" size="small">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button label="north">华北地区</el-radio-button>
                    <el-radio-button label="northeast">东北地区</el-radio-button>
                    <el-radio-button label="east">华东地区</el-radio-button>
                    <el-radio-button label="central">华中地区</el-radio-button>
                    <el-radio-button label="south">华南地区</el-radio-button>
                    <el-radio-button label="southwest">西南地区</el-radio-button>
                    <el-radio-button label="northwest">西北地区</el-radio-button>
                    <el-radio-button label="autonomousRegion">自治区</el-radio-button>
                    <el-radio-button label="provinceLevelCity">直辖市</el-radio-button>
                </el-radio-group>
            </div>
            <el-checkbox-group v-model="dialog.checkList" style="margin-left: 50px;">
                <el-row>
                    <el-col v-for="(item, index) in province" :key="index" :span="6">
                        <el-checkbox :label="item.code" :disabled="dialog.disableList.includes(item.code)">{{ item.name }}</el-checkbox>
                    </el-col>
                </el-row>
            </el-checkbox-group>
            <template #footer>
                <el-button type="primary" @click="freightDialogSubmit(dialog.index)">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import area from '@/util/area'

const { proxy } = getCurrentInstance()

const props = defineProps({
    readonly: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        default: function() {
            return []
        }
    },
    type: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:data'])

const dialog = ref({
    index: '',
    visible: false,
    filter: '',
    checkList: [],
    disableList: []
})

const province = computed(() => {
    let arr
    switch (dialog.value.filter) {
        case '':
            arr = area
            break
        case 'autonomousRegion':
            arr = area.filter(item => item.autonomousRegion)
            break
        case 'provinceLevelCity':
            arr = area.filter(item => item.provinceLevelCity)
            break
        default:
            arr = area.filter(item => item.region == dialog.value.filter)
    }
    return arr
})

// 显示省份勾选对话框
function showFreightDialog() {
    dialog.value.index = ''
    dialog.value.checkList = []
    dialog.value.disableList = getDisableProvinceList()
    dialog.value.visible = true
}

function freightDialogSubmit(index) {
    if (dialog.value.checkList.length === 0) {
        proxy.$message({
            message: '请勾选区域',
            type: 'warning'
        })
    } else {
        let data = props.data
        if (index !== '') {
            data[index].list = dialog.value.checkList
        } else {
            data.push({
                list: dialog.value.checkList,
                first_step: '',
                first_price: '',
                continued_step: '',
                continued_price: ''
            })
        }
        emit('update:data', data)
        dialog.value.visible = false
    }
}

// 编辑运费模版
function editFreight(index) {
    dialog.value.index = index
    dialog.value.checkList = props.data[index].list
    dialog.value.disableList = getDisableProvinceList(index)
    dialog.value.visible = true
}

// 删除运费模版
function deleteFreight(index) {
    let data = props.data
    data.splice(index, 1)
    emit('update:data', data)
}

// 删除运费模版里的某个省份
function deleteSingleFreight(index, code) {
    let data = props.data
    data[index].list.splice(data[index].list.indexOf(code), 1)
    if (data[index].list.length === 0) {
        data.splice(index, 1)
    }
    emit('update:data', data)
}

// 根据code显示名称，用于运费模版表格内展示
function getProvinceByCode(code) {
    let name = ''
    for (const key in area) {
        if (area[key].code === code) {
            name = area[key].name
        }
    }
    return name
}

function getDisableProvinceList(index) {
    let arr = []
    for (let key = 0; key < props.data.length; key++) {
        if (index !== key) {
            arr = arr.concat(props.data[key].list)
        }
    }
    return arr
}
</script>

<style lang="scss" scoped>
.freight {
    margin-bottom: 10px;
    :deep(.el-tag) {
        margin: 2px;
    }
    :deep(.el-input__inner) {
        text-align: center;
    }
    :deep(.el-table__empty-block) {
        min-height: inherit;
    }
}
.freight-dialog {
    .filter {
        text-align: center;
        margin-bottom: 20px;
    }
}
</style>
