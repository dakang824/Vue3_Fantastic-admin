import { auth, authAll } from '@/util'
import Waves from 'node-waves'
import 'node-waves/dist/waves.min.css'

export default function directive(app) {
    // 注册 v-auth 和 v-auth-all 指令
    app.directive('auth', {
        mounted: (el, binding) => {
            if (!auth(binding.value)) {
                el.remove()
            }
        }
    })
    app.directive('auth-all', {
        mounted: (el, binding) => {
            if (!authAll(binding.value)) {
                el.remove()
            }
        }
    })
    // 注册 Waves 指令
    app.directive('waves', {
        created: () => {
            Waves.init()
        },
        mounted: (el, binding) => {
            let classes = ['button', 'circle', 'block', 'float', 'light', 'classic'].filter(cls => binding.modifiers[cls]).map(cls => `waves-${cls}`)
            Waves.attach(el, classes)
        }
    })
    // 注册 el-dialog 的 drag 指令
    app.directive('drag', {
        mounted: el => {
            const dialogDom = el.querySelector('.el-dialog')
            const dialogHeaderDom = el.querySelector('.el-dialog__header')

            function down(e) {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.type == 'mousedown' ? e.clientX - dialogHeaderDom.offsetLeft : e.touches[0].clientX - dialogHeaderDom.offsetLeft
                const disY = e.type == 'mousedown' ? e.clientY - dialogHeaderDom.offsetTop : e.touches[0].clientY - dialogHeaderDom.offsetTop

                // body当前宽度
                const screenWidth = document.body.clientWidth
                // 可见区域高度(应为body高度，可某些环境下无法获取)
                const screenHeight = document.documentElement.clientHeight

                // 对话框宽度
                const dialogDomWidth = dialogDom.offsetWidth
                // 对话框高度
                const dialogDomheight = dialogDom.offsetHeight

                const minDialogDomLeft = dialogDom.offsetLeft
                const maxDialogDomLeft = screenWidth - dialogDom.offsetLeft - dialogDomWidth

                const minDialogDomTop = dialogDom.offsetTop
                const maxDialogDomTop = screenHeight - dialogDom.offsetTop - dialogDomheight

                // 获取到的值带px 正则匹配替换
                let styL = getComputedStyle(dialogDom).left
                let styT = getComputedStyle(dialogDom).top

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (styL.includes('%')) {
                    styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
                    styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
                } else {
                    styL = +styL.replace(/\px/g, '')
                    styT = +styT.replace(/\px/g, '')
                }

                return {
                    disX,
                    disY,
                    minDialogDomLeft,
                    maxDialogDomLeft,
                    minDialogDomTop,
                    maxDialogDomTop,
                    styL,
                    styT
                }
            }
            function move(e, obj) {
                let { disX, disY, minDialogDomLeft, maxDialogDomLeft, minDialogDomTop, maxDialogDomTop, styL, styT } = obj

                // 通过事件委托，计算移动的距离
                let left = e.type == 'mousemove' ? e.clientX - disX : e.touches[0].clientX - disX
                let top = e.type == 'mousemove' ? e.clientY - disY : e.touches[0].clientY - disY

                // 边界处理
                if (-left > minDialogDomLeft) {
                    left = -minDialogDomLeft
                } else if (left > maxDialogDomLeft) {
                    left = maxDialogDomLeft
                }

                if (-top > minDialogDomTop) {
                    top = -minDialogDomTop
                } else if (top > maxDialogDomTop) {
                    top = maxDialogDomTop
                }

                // 移动当前元素
                dialogDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
            }

            if (dialogDom) {
                dialogHeaderDom.onmouseover = () => {
                    dialogHeaderDom.style.cursor = 'move'
                }
                dialogHeaderDom.onmousedown = dialogHeaderDom.ontouchstart = e => {
                    const obj = down(e)
                    document.onmousemove = document.ontouchmove = e => move(e, obj)
                    document.onmouseup = document.ontouchend = () => {
                        document.onmousemove = document.ontouchmove = null
                        document.onmouseup = document.ontouchend = null
                    }
                }
            }
        }
    })
}
