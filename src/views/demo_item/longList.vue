<template>
    <!--
        确认每一条数据的高度，可以确认可视区域内可以显示多少条数据，
        并且确认滚动时上去了几条，就要动态更新几条
     -->
    <div class="container" @scroll="handleSrcoll" ref="containerRef" :style="{ height: containerHeight }">
        <!-- 显示数据的地方：数据列表 -->
        <div class="list" :style="{ top: listTop }">
            <!-- 可视区域 -->
            <div v-for="item in showData" :key="item.id">
                {{ item.content }}
            </div>
        </div>
        <!-- 空白区域 -->
        <div class="bar" :style="{ height: barHeight }"></div>
    </div>
</template>

<script setup>
    // 要进行渲染的列表数据
    const list = reactive(new Array(10000).fill('').map((item,index)=>({
        id:index+1,
        content:`列表数据内容:${index+1}`
    })))
    // 每一条数据的高度
    const size = ref(40)
    // 每次渲染的数据条数
    const showNumber = ref(10)
    // 展示数据的起始下标
    const start = ref(0)
    // 展示数据的结束下标
    const end = showNumber
    // 最终显示的数据
    const showData = computed(()=>list.slice(unref(start), unref(end)))
    // 容器的高度
    const containerHeight = unref(size)*unref(showNumber)+'px'
    // 撑开高度，产生滚动
    let barHeight = computed(()=>unref(size)*list.length+'px')
    // 列表上移滚动的距离
    const listTop = computed(()=>{
        return unref(start)*unref(size)+'px'
    })
    // 容器的滚动事件
    const containerRef = ref(null)
    const handleSrcoll = ()=>{
        const scrollTop = containerRef.value.scrollTop
        console.log(scrollTop,'scrollTopscrollTop');
        // 起始下标
        start.value = Math.floor(scrollTop/size.value);
        // 结束下标
        end.value = start.value + 10
    }
    onUnmounted(() => {
        window.removeEventListener('scroll', handleSrcoll)
    })
</script>

<style scoped>
.container {
    overflow: scroll;
    background: rgba(150, 150, 150, .5);
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    width: 500px;
    margin: 0 auto;
    position: relative;
    text-align: center;
}

.list {
    position: absolute;
    top: 0;
    width: 100%;
}
</style>
