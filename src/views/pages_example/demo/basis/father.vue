<template>
    <div class="container">
        <!-- <button @click="changeNum">父组件按钮</button> -->
        <div ref="myRef">122222</div>
        <Son ref="sonRef" :my-data="myData" @acceptChange="changeNum">
            <template #mySlot>
                <div>
                    mySlotmySlot
                </div>
            </template>
        </Son>
        <button @click="changeExposeData">changeExposeData</button>
    </div>
</template>

<script>
import Son from './son.vue'
export default {
    components: { Son },
    setup() {
        const myData = reactive({
            name: 'lwx',
            age: 23
        })
        const changeNum = (msg1, msg2, msg3) => {
            console.log(
                `你触发了acceptChange时间,传递的参数是${msg1}--${msg2}--${msg3},默认event事件是`
            )
        }
        const sonRef = ref(null)
        const myRef = ref(null)
        onMounted(() => {
            console.log(myRef.value.innerText)
        })
        function changeExposeData() {

            console.log(sonRef.value.aaa, 'numnum')
            sonRef.value.add()
            sonRef.value.aaa = '*********   '
        }
        
        return { myData, changeNum, sonRef, changeExposeData, myRef }
    }
}
</script>

<style lang="scss" scoped>
</style>