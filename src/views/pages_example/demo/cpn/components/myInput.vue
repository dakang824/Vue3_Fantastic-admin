<template>
    <div class="search">
        <el-form-item :label="label ? label + ':' : ''">
            <el-input v-model.trim="input" :placeholder="placeholder" :clearable="clearable" :maxlength="maxlength"
                :size="size" :show-password="showPassword" @blur="updateInputVal" />
        </el-form-item>
    </div>
</template>

<script>
import { toRaw } from 'vue'
export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number
            // default: 5
        },
        size: {
            type: String,
            default: 'small'
        },
        showPassword: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            input: ''
        }
    },
    created() {
        console.log('----------', this.$attrs)
    },
    methods: {
            updateInputVal() {
            this.$emit('updateInputVal', this.input)
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-flow: row wrap;

    ::v-deep .el-form-item__label {
        --el-text-color-regular: black;
    }
}
</style>>
