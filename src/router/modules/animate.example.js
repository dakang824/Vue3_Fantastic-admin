const Layout = () => import('@/layout/index.vue')

export default {
    path: '/animate_example',
    component: Layout,
    redirect: '/animate_example/index',
    name: 'animateExample',
    meta: {
        title: '动画',
        icon: 'ri-play-fill',
        badge: 'PRO'
    },
    children: [
        {
            path: 'index',
            name: 'animateExampleIndex',
            component: () => import('@/views/animate_example/index.vue'),
            meta: {
                title: '过渡动画'
            }
        },
        {
            path: 'spinkit',
            name: 'animateExampleSpinkit',
            component: () => import('@/views/animate_example/spinkit.vue'),
            meta: {
                title: '加载动画'
            }
        },
        {
            path: 'svg',
            name: 'animateExampleSvg',
            component: () => import('@/views/animate_example/svg.vue'),
            meta: {
                title: 'SVG 动画'
            }
        },
        {
            path: 'swiper',
            name: 'animateExampleSwiper',
            component: () => import('@/views/animate_example/swiper.vue'),
            meta: {
                title: '轮播动画'
            }
        }
    ]
}
