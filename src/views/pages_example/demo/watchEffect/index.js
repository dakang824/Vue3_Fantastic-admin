export default function() {
    const count = ref(10)
    const msg = ref('123')
    setTimeout(() => count.value++, 1000)

    const effect = () => {
        console.log(count.value)
        // clearTimeout(time) // time是个id值，是什么并不重要，只需要知道它的值是唯一的
    }
    watchEffect(effect)
    watchEffect(onInvalidate => {
        onInvalidate(() => {
            console.log('==')
        })
    })
    return { count, msg }
}
