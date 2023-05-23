const Layout = () => import('@/layout/index.vue')

export default {
    path: '/tab_example',
    component: Layout,
    redirect: '/tab_example/index',
    name: 'tabExample',
    meta: {
        title: '标签栏',
        icon: 'sidebar-tab',
        badge: 'PRO'
    },
    children: [
        {
            path: 'index',
            name: 'tabExampleIndex',
            component: () => import('@/views/tab_example/index.vue'),
            meta: {
                title: '标签栏演示',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/tab_example'
            }
        }
    ]
}
