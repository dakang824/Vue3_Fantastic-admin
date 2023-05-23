<template>
    <div class="portals">
        <button @click="showNotification">Trigger Notification!</button>
    </div>
    <cpn :num="123123" @click="showCpn" />
</template>
 
<script>
import { ref } from 'vue'
import cpn from './cpn.vue'
export default {
    components: { cpn },
    setup() {
        const isOpen = ref(false)
        const showNotification = () => {
            isOpen.value = !isOpen.value
           
        }
        const showCpn = () => {
            console.log('click me!')
        }
        return {
            isOpen,
            showNotification,
            showCpn
        }
    }
}
</script>
 
<style scoped>
.notification {
    font-family: myriad-pro, sans-serif;
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 300px;
    padding: 30px;
    background-color: #fff;
}
</style>