<template>
    <div class="watermark-contaner" ref="parentRef">
        <slot></slot>
    </div>
</template>

<script setup>
import unseWatermarkBg from './img'
    const props = defineProps({
        text:{
            type:String,
            required:true,
            default:'watermark'
        },
        fontSize:{
            type:String,
            default:40
        },
        gap:{
            type:Number,
            default:20
        }
    })
    const bg = unseWatermarkBg(props)
    const{ base64, styleSize} = bg.value
    console.log(bg.value,'bg.value');
    const parentRef = ref(null)
    let div
    const flag = ref(0)
    watchEffect(()=>{
        flag.value
        if(!parentRef.value){
            return
        }
        if(div){
            div.remove()
        }
        div = document.createElement('div')
        // 内联元素防篡改
        div.style.backgroundImage = `url(${base64})`
        div.style.backgroundSize = `${styleSize}px ${styleSize}px`
        div.style.backgroundRepeat = 'repeat'
        div.style.width='100%'
        div.style.height='100%'
        div.style.zIndex = 9999
        div.style.position ='absolute'
        div.style.pointerEvents ='none'//防止层级过高遮挡其他层级的事件
        div.style.inset = 0
        parentRef.value.appendChild(div)
    })
    let ob;
    // 监控手动删除的操作
    onMounted(() => {
        ob = new MutationObserver((records)=>{
            for (const record of records) {
              for (const dom of record.removedNodes) {
                // 监控到了删除
                if(dom ===div){
                    flag.value++
                    return
                    console.log('sanshussss');
                }
              }
              if(record.target ===div){
                flag.value++
                return
              }
            }
            console.log('records',records);
            // flag.value++
        })
        ob.observe(parentRef.value,{
            childList:true,
            attributes:true,
            subtree:true
        })
    })
    onUnmounted(() => {
        ob && ob.disconnect()
        div = null
    })
</script>

<style></style>
