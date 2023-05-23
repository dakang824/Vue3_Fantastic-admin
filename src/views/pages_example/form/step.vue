<template>
    <div>
        <page-header title="分步表单" content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。" />
        <page-main>
            <el-row type="flex" justify="center">
                <el-col :md="12" :sm="18">
                    <el-steps :active="step" finish-status="success" align-center style="margin: 20px 0 40px;">
                        <el-step title="填写转账信息" />
                        <el-step title="确认转账信息" />
                        <el-step title="完成" />
                    </el-steps>
                    <el-form :model="form" size="small" label-width="100px">
                        <div v-if="step == 0">
                            <el-form-item label="付款账户">
                                <el-select v-model="form.payAccount" placeholder="请选择付款账户">
                                    <el-option v-for="item in accounts" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收款账户">
                                <el-input v-model="form.receiptAccount" placeholder="请输入内容" class="input-with-select">
                                    <template #prepend>
                                        <el-select v-model="form.receiptType" placeholder="请选择" style="width: 100px;">
                                            <el-option label="支付宝" :value="1" />
                                            <el-option label="微信" :value="2" />
                                        </el-select>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="收款人姓名">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="转账金额">
                                <el-input v-model="form.price">
                                    <template #prefix>
                                        <div style="width: 25px;">￥</div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="step = 1">下一步</el-button>
                            </el-form-item>
                        </div>
                        <div v-else-if="step == 1">
                            <el-form-item label="付款账户">{{ form.payAccount }}</el-form-item>
                            <el-form-item label="收款账户">{{ form.receiptAccount }}</el-form-item>
                            <el-form-item label="收款人姓名">{{ form.name }}</el-form-item>
                            <el-form-item label="转账金额">{{ form.price }}</el-form-item>
                            <el-divider />
                            <el-form-item label="支付密码">
                                <el-input v-model="form.password" type="password" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="submit">提 交</el-button>
                                <el-button @click="step = 0">上一步</el-button>
                            </el-form-item>
                        </div>
                        <div v-else>
                            <result type="success" title="交易成功" desc="预计两小时内到账">
                                <template #extra>
                                    <el-form-item label="付款账户">{{ form.payAccount }}</el-form-item>
                                    <el-form-item label="收款账户">{{ form.receiptAccount }}</el-form-item>
                                    <el-form-item label="收款人姓名">{{ form.name }}</el-form-item>
                                    <el-form-item label="转账金额">{{ form.price }}</el-form-item>
                                </template>
                                <el-button type="primary" size="small" @click="step = 0">再转一笔</el-button>
                                <el-button size="small">查看账单</el-button>
                            </result>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 0,
            accounts: [
                {
                    value: 'admin@fantastic.admin',
                    label: 'admin@fantastic.admin'
                },
                {
                    value: 'test@fantastic.admin',
                    label: 'test@fantastic.admin'
                }
            ],
            loading: false,
            form: {
                payAccount: 'admin@fantastic.admin',
                receiptAccount: 'test@alipay.com',
                receiptType: 1,
                name: 'Hooray',
                price: '596.00',
                password: '123456'
            }
        }
    },
    methods: {
        submit() {
            this.loading = true
            setTimeout(() => {
                this.step = 2
                this.loading = false
            }, 2000)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>
