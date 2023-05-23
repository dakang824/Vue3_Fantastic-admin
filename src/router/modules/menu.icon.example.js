const Layout = () => import('@/layout/index.vue')

export default {
    path: '/menu_icon_example',
    component: Layout,
    redirect: '/menu_icon_example/child',
    name: 'menuIconExample',
    meta: {
        title: '导航图标激活',
        icon: 'sidebar-activeicon',
        badge: 'PRO'
    },
    children: [
        {
            path: 'child',
            name: 'menuIconExampleChild',
            component: () => import('@/views/menu_icon_example/child.vue'),
            meta: {
                title: '子级图标激活',
                icon: 'sidebar-activeicon-unactive',
                activeIcon: 'sidebar-activeicon-active'
            }
        },
        {
            path: 'parent',
            name: 'menuIconExampleParent',
            meta: {
                title: '父级图标激活',
                icon: 'sidebar-activeicon-unactive',
                activeIcon: 'sidebar-activeicon-active'
            },
            children: [
                {
                    path: 'index',
                    name: 'menuIconExampleParentIndex',
                    component: () => import('@/views/menu_icon_example/parent.vue'),
                    meta: {
                        title: '测试页面'
                    }
                }
            ]
        }
    ]
}
