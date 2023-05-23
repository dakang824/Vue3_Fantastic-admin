<template>
    <div class="sectionOne">{{ num }}--{{ msg }}</div>
    <button @click="changeNum">增加</button>
    <button @click="alertFun">提醒</button>
    <p>{{ person }} </p>
    <!-- 
    <Father />
    <Father2 /> -->  
    <component :is="flag ? Father2 :Father" />
</template>

<script setup>
import  fun from './index.js'
import { person, add } from './lib.js'
import Father from './components/father.vue'
import Father2 from './components/father2.vue'
const flag = ref(false)
const  { alertFun, msg } = fun()
const num = ref(123)
const changeNum = () => {
    num.value += 1
}
add()
</script>

<style lang="scss" scoped>
</style>