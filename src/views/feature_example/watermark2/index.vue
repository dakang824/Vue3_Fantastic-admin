<template>
    <div class="container">
        <Watermark text="禁止转载" fontSize="16">
            <img src="@/assets/images/logo.png" alt="">
        </Watermark>
        <button @click="changeNum">按钮{{ num }}</button>
    </div>
</template>
<script setup>
import Watermark from './Watermark.vue'
const num = ref(0)
const changeNum =()=>{
    console.log('点击了我');
    num.value++
}
// watermark
// vue 中elementui和andesing没有这个水印组件

</script>

<style scoped>
/* button {
    pointer-events: none;
} */
</style>
