export default [
    {
        url: '/mock/route/list',
        method: 'get',
        response: () => {
            return {
                error: '',
                status: 1,
                data: [
                    {
                        meta: {
                            title: '演示',
                            icon: 'sidebar-default'
                        },
                        children: [
                            {
                                path: '/pages_example/general',
                                component: 'Layout',
                                redirect: '/pages_example/general/manager',
                                name: 'pagesExampleGeneral',
                                meta: {
                                    title: '通用',
                                    icon: 'ri-function-line'
                                },
                                children: [
                                    {
                                        path: 'manager',
                                        name: 'pagesExampleGeneralManager',
                                        redirect: '/pages_example/general/manager',
                                        meta: {
                                            title: '管理员管理'
                                        },
                                        children: [
                                            {
                                                path: '',
                                                name: 'pagesExampleGeneralManagerList',
                                                component: 'pages_example/manager/list.vue',
                                                meta: {
                                                    title: '管理员列表',
                                                    sidebar: false,
                                                    breadcrumb: false
                                                }
                                            },
                                            {
                                                path: 'detail',
                                                name: 'pagesExampleGeneralManagerCreate',
                                                component: 'pages_example/manager/detail.vue',
                                                meta: {
                                                    title: '新增管理员',
                                                    sidebar: false,
                                                    activeMenu: '/pages_example/general/manager'
                                                }
                                            },
                                            {
                                                path: 'detail/:id',
                                                name: 'pagesExampleGeneralManagerEdit',
                                                component: 'pages_example/manager/detail.vue',
                                                meta: {
                                                    title: '编辑管理员',
                                                    sidebar: false,
                                                    activeMenu: '/pages_example/general/manager'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
]
