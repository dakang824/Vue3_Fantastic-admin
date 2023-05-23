const Layout = () => import('@/layout/index.vue')

export default {
    path: '/icon_example',
    component: Layout,
    redirect: '/icon_example/remix',
    name: 'iconExample',
    meta: {
        title: '扩展图标',
        icon: 'ri-remixicon-line',
        badge: true
    },
    children: [
        {
            path: 'svg',
            name: 'iconExampleSvg',
            component: () => import('@/views/icon_example/svg.vue'),
            meta: {
                title: 'SVG Icon'
            }
        },
        {
            path: 'remix',
            name: 'iconExampleRemix',
            component: () => import('@/views/icon_example/remix.vue'),
            meta: {
                title: 'Remix Icon',
                badge: 'PRO',
                paddingBottom: '100px'
            }
        }
    ]
}
