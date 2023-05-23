<template>
    <div class="container">
        <input v-model.number="p.num" type="text">
        <input v-model.number="p.setNum" type="text">
        <input v-model.number="myMsg.b.c.d" type="text">
        <input v-model.number="myMsg2.b.c.d" type="text">
        <div class="content">{{ p.num }}</div>
        <div class="content">{{ myMsg.b.c.d }}</div>
        <div class="content">{{ myMsg2.b.c.d }}</div>
        {{ myMsg }}
        {{ myMsg2 }}
        <div @click="changeMsg">{{ msg }}</div>
        {{ obj }}
        {{ myArr }}
        {{ myArr2 }}
        <div ref="myRrf" class="content">{{ p.doubleNum }}</div>
        <input v-model.number="person.age" type="text">
        <div class="content">{{ person.age }}</div>
        <input v-model.number="shu" type="text">
        <div class="content">{{ shu }}</div>
        <input v-model.number="person.msg.form" type="text">
        <div class="content">{{ person.msg.form }}</div>
        <button @click="shu++">counter</button>
    </div>
</template>

<script>
// import { h } from 'vue'
import useCounter from './container.js'
export default {
    name: 'Demo',
    setup() {
        const shu = ref(0)
        watch(shu, (newVal, oldVal) => {
            setTimeout(() => {
                shu.value = 0
                console.log(newVal, oldVal)
            }, 3000)
        })
        
        const person = ref({ // person是个proxy对象,而person.age是一个具体的值：12
            age: 12,
            name: 'lwx',
            msg: { // person.msg是个proxy对象
                form: '湖北',
                station: '江汉'
            }
        })
      
        // proxy中的具体的值并没有被ref或者reactive包裹，所以深层次监听一个具体的reactive里面的属性值是不可行的
        // console.log(person.name, 'person')// ref包裹的ref对象，这就是一个ref对象,其中的.value是一个proxy对象l;reactive包裹的proxy对象，自动深层次监听,不需要加.vlaue和deep:true
        // reacitve 对象(只有复杂数据类型，复杂数据类型里面可以包含基本类型)
        // ()=> person X
        // person X 只会得到新值newVal 和 oldVal一样,且不知道哪个值变了
        // person.age  X
        // ()=> person.age  √
        // ()=> person.msg.form  √
        // () =>  person.msg 加上了 deep: true也监听不到person.msg.form 的变化 X
        // 总结：①在监听reactive对象时具体的基本数据类型,要加上箭头函数监听,复杂数据类型可以不加箭头函数；在监听reactive复杂数据对象时，当内层数据改变了，而监听的是外层数据，只会监听到改变且不会监听到具体是内层哪个数据变了（新值newVal 和 oldVal一样）；②deep: true是无效的，因为reactive集成的proxy对象默认是深度监听（deep: true针对的是ref的复杂类型数据）
                
        // ref 对象(可以是基本数据类型；也可以是复杂数据类型，复杂数据类型里面可以包含基本类型)
        // person 加上了 deep: true X 只会得到新值newVal 和 oldVal一样,且不知道哪个值变了
        // person.value  X 只会得到新值newVal 和 oldVal一样,且不知道哪个值变了
        // () => person.value.age √
        // person.value.age 加上了 deep: true也监听不到person.value.age 的变化 X
        // () => person.value.msg.form  加上了 deep: true √
        // () => person.value.msg.form  不加上 deep: true √
        // person.value.msg.form 加上了 deep: true X
        // person.value.msg.form 不加上了 deep: true X
        // () => person.value.msg.form X
        // 总结：①在监听ref对象时具体的基本数据类型,要加上箭头函数监听,复杂数据类型可以不加箭头函数；在监听ref复杂数据对象时，当内层数据改变了，而监听的是外层数据，只会监听到改变且不会监听到具体是内层哪个数据变了（新值newVal 和 oldVal一样）；②deep: true最好加上，虽然某些情况不加也是对的 （ref中嵌套的proxy对象才能deep: true）

        // 1、ref对象中-基本数据类型 
        // ①推荐使用（即() => shu.value）  ②shu不加.value( 如果加了就相当于取出了0这个具体的值,且基本数据类型最好不加deep: true，虽然某些情况不加也是对的） ；

        // 2、ref对象中-复杂数据类型中的基本数据类型
        // () => person.value.age 和 deep:true即可 
        // 3、ref对象中-复杂数据类型中的复杂数据类型，可以监听一个复杂数据类型的变化，但是不能监听里面具体的属性变化
        
        watch(() => person.value.msg, (newVal, oldVal) => { 
            console.log(newVal, oldVal, '*****person.msg')
            
        }, { deep: true })
        
        watch(() => shu.value, (newVal, oldVal) => { 
            console.log('改变了', newVal, oldVal)
        }, { deep: true })
        const p = useCounter()
        let msg = ref('信息') // 改了数据但是需要别vue检测到就要变成响应式数据ref函数
        let myRrf = ref(null) // 这个时期处于dom未渲染阶段，div都没有，所以只有当在mounted之后才能获取这个dom
        let myMsg = ref({
            a: 1,
            b: {
                c: {
                    d: 'd'
                }
            }
        })
        let myArr = ref(['刘晓', '刘翔'])
        let myArr2 = reactive(['刘晓', '刘翔'])
        console.log(myMsg, 'myMsg')
        let obj = reactive('123')
        let myMsg2 = reactive({
            a: 111,
            b: {
                c: {
                    d: 'd'
                }
            }
        })
        onMounted(() => {
            console.log(myRrf.value)
            msg.value += 'loaidng' // 这个一个RefImpl(reference implement 引用实现对象)即引用对象，所以要加上.value ，而proxy对象不用.value里面就是一个对象没有value属性，ref处理基本数据类型会好一点，基本数据类型是用get set definepropty,对象数据类型是用reactive函数（是具体的proxy实现），reactive不能处理基本数据类型（会有警告）,reactive处理对象的多个嵌套也可以实现响应式 const 代理对象 = reactive(源 对象)
            // $attrs中就在捡漏，即父传子数据了，但是子没有用props来接收，在vue3中传递给子组件的props需要用props接收，取值可以在setup的第一个参数中取；$slots中是父传子的插槽vnode；且都是在vuecomponents中（$attrs、$slots）
            // expose 就是在vue3中访问子组件的数据和方法，因为默认vue3中都没有暴露。二在vue2中默认是全部暴露了的通过this.$refs.xxx访问，而在3中只有expose({xxx})才能通过myref.value.xxx来访问
        })
        // watch(
        //     () => p.num, // 侦听reactive对象
        //     (newVal, oldVal) => {
        //         console.log(newVal, oldVal, '== ')
        //     }
        // )
      
        watch(
            [
                () => p.num,
                () => p.setNum,
                () => myMsg.value.b.c.d,
                () => myMsg2.b
            ],
            // (newVal, oldVal) => {
            //     console.log('num或setNum或text改变了,', newVal, oldVal)两种写法，① 数组
            // },
            ([newVal1, newVal2, newVal3, newVal4], [oldVal1, oldVal2, oldVal3, oldVal4]) => {
                // console.log('num或setNum或text改变了,', newVal, oldVal) // ② 单个的数值
                console.log('num或setNum或text改变了,', newVal1, newVal2, newVal3, newVal4, '========', oldVal1, oldVal2, oldVal3, oldVal4)
            },
            { immediate: true, deep: true } // 监听的是外层的属性，而内层的数据改变了，应该深度监视
        )

        const changeMsg = () => {
            msg.value = '改变后的msg'
            myMsg.value.a = 11111111111111
            myMsg.value.b.c.d = '/////'
            myMsg2.a = 123
            myMsg2.b.c.d = '---'
            myArr.value[0] = '改变了文字'
            myArr2[0] = '也改变了'
            console.log(myMsg2)
        }
        // watch(
        //     [() => p.num, p.doubleNum],
        //     ([newNum, newDoubleNum], [oldNum, oldDoubleNum]) => {
        //         console.log(`num或doubleNum改变了,newNum:${newNum},newDoubleNum:${newDoubleNum},oldNum:${oldNum},oldDoubleNum:${oldDoubleNum}`)
        //     }
        // )
        return { p, myRrf, msg, changeMsg, myMsg, myMsg2, obj, myArr, myArr2, person, shu }
    // return () => h('h1', {}, 'Some title')
    }
}

</script>

<style lang="scss">
.container {
    color: red;
}
</style>