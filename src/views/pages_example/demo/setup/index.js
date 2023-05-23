export default function() {
    const msg = '今天天气不错哟！'
    const alertFun = () => {
        alert(msg)
    }
    return { msg, alertFun }
}