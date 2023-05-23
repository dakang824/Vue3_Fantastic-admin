import watermark from '@/util/watermark'

export const useWatermark = store => {
    watch(() => store.state.settings.enableWatermark, val => {
        if (val) {
            loadWatermark()
        } else {
            removeWatermark()
        }
    }, {
        immediate: true
    })

    function loadWatermark() {
        // 水印更多设置请查看 https://github.com/saucxs/watermark-dom
        watermark.init({
            watermark_txt: `Fantastic-admin 水印测试 ${store.state.user.account}`,
            watermark_width: 150,
            watermark_x: 0,
            watermark_y: 0,
            watermark_x_space: 50,
            watermark_y_space: 50,
            watermark_alpha: 0.1
        })
    }

    function removeWatermark() {
        try {
            watermark.remove()
        } catch (err) {
            // 忽略报错
        }
    }

    return {
        loadWatermark,
        removeWatermark
    }
}
