<template>
    <div class="son">
        <input v-model.number="setPlusOne" type="text">
        {{ aaa }}-- {{ count }} ** {{ plusOne }} ** {{ setPlusOne }}
        <button @click="changeNum">子组件按钮</button>
        <p>值： {{ num }}</p>
        <button @click="getEvent($event, 1)">$event</button>
        <slot name="mySlot" />
    </div>
</template>

<script>
export default {
    props: {
        myData: {
            type: Object,
            require: true
        }
    },
    emits: ['acceptChange'],
    setup(props, { emit, expose }) {
        let aaa = ref('/////////')
        const count = ref(1)
        const plusOne = computed(() => count.value + 1) /* 不支持修改【只读的】 */
        plusOne.value += 2
        const setPlusOne = computed({
            get() {
                return count.value - 1            
            },
            set(val) { // 先进行set再进行get
                count.value = val * 2
                console.log(setPlusOne.value, 'setPlusOne.value')
            }
        })
        console.log(setPlusOne.value, 'setPlusOne.value')
        function add() {
            console.log(123)
        }
        expose({ aaa, add })
        let num = ref(123)
        const changeNum = () => {
            num.value = num.value + 1
            emit('acceptChange', num.value, false, true)
        }
        const getEvent = (e, value) => {
            console.log(value, e)
        }
        console.log('expose', expose)
        return { num, changeNum, getEvent, add, aaa, count, plusOne, setPlusOne }
    }
}
</script>

<style lang="scss" scoped>
</style>