<template>
    <div class="box">
        <button @click="count++">counter</button>
        {{ msg }}-{{ myNum }}
    </div>
</template>

<script>
import getData from './index.js'
export default {
    setup() {
        const reactiveData = reactive({
            num: 1,
            msg: 'msg11'
        })
        const { count, msg } = getData()
        let myNum = toRef(reactiveData, 'num')
        let myData = toRefs(reactiveData)
        console.log(myNum, 'myNum')
        console.log(myData, 'myData')
        return { count, msg, reactiveData, myNum, myData }
    }
}
</script>

<style lang="scss" scoped>
</style>