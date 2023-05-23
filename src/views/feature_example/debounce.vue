<template>
    <div>
        <page-header title="防抖节流" />
        <page-main title="防抖：debounce">
            <p>所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。</p>
            <el-button @click="debounce">连续点击我，只会执行最后一次点击事件，立即执行</el-button>
            <el-button @click="debounce2">连续点击我，只会执行最后一次点击事件，延后执行</el-button>
        </page-main>
        <page-main title="节流：throttle">
            <p>所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。</p>
            <el-button @click="throttle">连续点击我，每一秒只会执行一次点击事件</el-button>
        </page-main>
    </div>
</template>

<script>
import { debounce, throttle } from '@/util'

export default {
    methods: {
        debounce: debounce(function() {
            this.message()
        }, 1000),
        debounce2: debounce(function() {
            this.message()
        }, 1000, false),
        throttle: throttle(function() {
            this.message()
        }, 1000),
        message() {
            this.$message.success({
                message: '恭喜你，这是一条成功消息'
            })
        }
    }
}
</script>
