export default function useCounter() {
    // 把数据的操作可以提成一个函数来使用
    const data = reactive({
        num: 1000,
        text: 'lwxlwx',
        setNum: computed({
            get() {
                return data.num * 2
            },
            set() {
                data.num += 1
            }
        }),
        doubleNum: computed(() => {
            return data.num * 2
        })
    })
    let timer
    onMounted(() => {
        timer = setInterval(() => {
            data.num++
        }, 1000)
        clearInterval(timer)
    })
    onUnmounted(() => {
        clearInterval(timer)
    })
    return data
    // toRefs 可以把proxy对象转为ref对象
}
