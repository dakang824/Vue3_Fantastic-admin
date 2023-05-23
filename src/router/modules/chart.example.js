const Layout = () => import('@/layout/index.vue')

export default {
    path: '/chart_example',
    component: Layout,
    redirect: '/chart_example/echarts',
    name: 'chartExample',
    meta: {
        title: '可视化',
        icon: 'ri-bar-chart-2-line',
        badge: '演示'
    },
    children: [
        {
            path: 'echarts',
            name: 'chartExampleEcharts',
            component: () => import('@/views/chart_example/echarts.vue'),
            meta: {
                title: 'Echarts'
            }
        },
        {
            path: 'g2plot',
            name: 'chartExampleG2plot',
            component: () => import('@/views/chart_example/g2plot.vue'),
            meta: {
                title: 'G2plot'
            }
        }
    ]
}
