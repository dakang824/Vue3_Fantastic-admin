const Layout = () => import('@/layout/index.vue')
import store from '@/store'

export default {
    path: '/menu_badge_example',
    component: Layout,
    redirect: '/menu_badge_example/dot',
    name: 'menuBadgeExample',
    meta: {
        title: '动态导航标记',
        icon: 'ri-notification-badge-line',
        badge: 'PRO'
    },
    children: [
        {
            path: 'dot',
            name: 'menuBadgeExampleDot',
            component: () => import('@/views/menu_badge_example/dot.vue'),
            meta: {
                title: '点标记',
                badge: () => store.state.menuBadge.dot
            }
        },
        {
            path: 'number',
            name: 'menuBadgeExampleNumber',
            component: () => import('@/views/menu_badge_example/number.vue'),
            meta: {
                title: '数字标记',
                badge: () => store.state.menuBadge.number
            }
        },
        {
            path: 'text',
            name: 'menuBadgeExampleText',
            component: () => import('@/views/menu_badge_example/text.vue'),
            meta: {
                title: '文字标记',
                badge: () => store.state.menuBadge.text
            }
        }
    ]
}
