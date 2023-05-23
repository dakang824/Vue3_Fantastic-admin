const Layout = () => import('@/layout/index.vue')

export default [
    {
        path: '/pages_example/general',
        component: Layout,
        redirect: '/pages_example/general/form/mode',
        name: 'pagesExampleGeneral',
        meta: {
            title: '通用',
            icon: 'ri-function-line'
        },
        children: [
            {
                path: 'form/mode',
                name: 'pagesExampleGeneralFormMode',
                redirect: '/pages_example/general/form/mode',
                meta: {
                    title: '表单展示模式'
                },
                children: [
                    {
                        path: '',
                        name: 'pagesExampleGeneralFormModeList',
                        component: () => import('@/views/pages_example/form_mode/list.vue'),
                        meta: {
                            title: '列表',
                            sidebar: false,
                            breadcrumb: false,
                            cache: ['pagesExampleGeneralFormModeCreate', 'pagesExampleGeneralFormModeEdit']
                        }
                    },
                    {
                        path: 'detail',
                        name: 'pagesExampleGeneralFormModeCreate',
                        component: () => import('@/views/pages_example/form_mode/detail.vue'),
                        meta: {
                            title: '新增',
                            sidebar: false,
                            activeMenu: '/pages_example/general/form/mode',
                            cache: true,
                            noCache: 'pagesExampleGeneralFormModeList'
                        }
                    },
                    {
                        path: 'detail/:id',
                        name: 'pagesExampleGeneralFormModeEdit',
                        component: () => import('@/views/pages_example/form_mode/detail.vue'),
                        meta: {
                            title: '编辑',
                            sidebar: false,
                            activeMenu: '/pages_example/general/form/mode',
                            cache: true,
                            noCache: 'pagesExampleGeneralFormModeList'
                        }
                    }
                ]
            },
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
                        component: () => import('@/views/pages_example/manager/list.vue'),
                        meta: {
                            title: '管理员列表',
                            sidebar: false,
                            breadcrumb: false,
                            cache: ['pagesExampleGeneralManagerCreate', 'pagesExampleGeneralManagerEdit']
                        }
                    },
                    {
                        path: 'detail',
                        name: 'pagesExampleGeneralManagerCreate',
                        component: () => import('@/views/pages_example/manager/detail.vue'),
                        meta: {
                            title: '新增管理员',
                            sidebar: false,
                            activeMenu: '/pages_example/general/manager',
                            cache: true,
                            noCache: 'pagesExampleGeneralManagerList'
                        }
                    },
                    {
                        path: 'detail/:id',
                        name: 'pagesExampleGeneralManagerEdit',
                        component: () => import('@/views/pages_example/manager/detail.vue'),
                        meta: {
                            title: '编辑管理员',
                            sidebar: false,
                            activeMenu: '/pages_example/general/manager',
                            cache: true,
                            noCache: 'pagesExampleGeneralManagerList'
                        }
                    }
                ]
            },
            {
                path: 'department',
                name: 'pagesExampleGeneralDepartment',
                redirect: '/pages_example/general/department',
                meta: {
                    title: '部门管理'
                },
                children: [
                    {
                        path: '',
                        name: 'pagesExampleGeneralDepartmentList',
                        component: () => import('@/views/pages_example/department/list.vue'),
                        meta: {
                            title: '部门列表',
                            sidebar: false,
                            breadcrumb: false,
                            cache: ['pagesExampleGeneralDepartmentCreate', 'pagesExampleGeneralDepartmentEdit']
                        }
                    },
                    {
                        path: 'detail',
                        name: 'pagesExampleGeneralDepartmentCreate',
                        component: () => import('@/views/pages_example/department/detail.vue'),
                        meta: {
                            title: '新增部门',
                            sidebar: false,
                            activeMenu: '/pages_example/general/department'
                        }
                    },
                    {
                        path: 'detail/:id',
                        name: 'pagesExampleGeneralDepartmentEdit',
                        component: () => import('@/views/pages_example/department/detail.vue'),
                        meta: {
                            title: '编辑部门',
                            sidebar: false,
                            activeMenu: '/pages_example/general/department'
                        }
                    },
                    {
                        path: ':department_id/job',
                        name: 'pagesExampleGeneralJob',
                        meta: {
                            title: '职位管理',
                            sidebar: false
                        },
                        children: [
                            {
                                path: '',
                                name: 'pagesExampleGeneralJobList',
                                component: () => import('@/views/pages_example/department/job/list.vue'),
                                meta: {
                                    title: '职位列表',
                                    sidebar: false,
                                    breadcrumb: false,
                                    activeMenu: '/pages_example/general/department',
                                    cache: ['pagesExampleGeneralJobCreate', 'pagesExampleGeneralJobEdit']
                                }
                            },
                            {
                                path: 'detail',
                                name: 'pagesExampleGeneralJobCreate',
                                component: () => import('@/views/pages_example/department/job/detail.vue'),
                                meta: {
                                    title: '新增职位',
                                    sidebar: false,
                                    activeMenu: '/pages_example/general/department'
                                }
                            },
                            {
                                path: 'detail/:id',
                                name: 'pagesExampleGeneralJobEdit',
                                component: () => import('@/views/pages_example/department/job/detail.vue'),
                                meta: {
                                    title: '编辑职位',
                                    sidebar: false,
                                    activeMenu: '/pages_example/general/department'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: 'permission',
                name: 'pagesExampleGeneralPermission',
                component: () => import('@/views/pages_example/permission/index.vue'),
                meta: {
                    title: '权限'
                }
            }
        ]
    },
    {
        path: '/pages_example/form',
        component: Layout,
        redirect: '/pages_example/form/basic',
        name: 'pagesExampleForm',
        meta: {
            title: '表单',
            icon: 'ri-file-list-2-line'
        },
        children: [
            {
                path: 'basic',
                name: 'pagesExampleFormBasic',
                component: () => import('@/views/pages_example/form/basic.vue'),
                meta: {
                    title: '基础表单'
                }
            },
            {
                path: 'advanced',
                name: 'pagesExampleFormAdvanced',
                component: () => import('@/views/pages_example/form/advanced.vue'),
                meta: {
                    title: '高级表单'
                }
            },
            {
                path: 'step',
                name: 'pagesExampleFormStep',
                component: () => import('@/views/pages_example/form/step.vue'),
                meta: {
                    title: '分步表单'
                }
            }
        ]
    },
    {
        path: '/pages_example/list',
        component: Layout,
        redirect: '/pages_example/list/basic',
        name: 'pagesExampleList',
        meta: {
            title: '列表',
            icon: 'ri-grid-line'
        },
        children: [
            {
                path: 'basic',
                name: 'pagesExampleListBasic',
                component: () => import('@/views/pages_example/list/basic.vue'),
                meta: {
                    title: '基础列表'
                }
            },
            {
                path: 'card',
                name: 'pagesExampleListCard',
                component: () => import('@/views/pages_example/list/card.vue'),
                meta: {
                    title: '卡片列表'
                }
            },
            {
                path: 'goods',
                name: 'pagesExampleListGoods',
                component: () => import('@/views/pages_example/list/goods.vue'),
                meta: {
                    title: '商品列表'
                }
            }
        ]
    },
    {
        path: '/pages_example/shop',
        component: Layout,
        redirect: '/pages_example/shop/delivery',
        name: 'pagesExampleShop',
        meta: {
            title: '电商',
            icon: 'sidebar-shop'
        },
        children: [
            {
                path: 'delivery',
                name: 'pagesExampleShopDelivery',
                redirect: '/pages_example/shop/delivery',
                meta: {
                    title: '运费模版管理'
                },
                children: [
                    {
                        path: '',
                        name: 'pagesExampleShopDeliveryList',
                        component: () => import('@/views/pages_example/delivery/list.vue'),
                        meta: {
                            title: '运费模版列表',
                            sidebar: false,
                            breadcrumb: false
                        }
                    },
                    {
                        path: 'detail',
                        name: 'pagesExampleShopDeliveryCreate',
                        component: () => import('@/views/pages_example/delivery/detail.vue'),
                        meta: {
                            title: '新增运费模版',
                            sidebar: false,
                            activeMenu: '/pages_example/shop/delivery'
                        }
                    },
                    {
                        path: 'detail/:id',
                        name: 'pagesExampleShopDeliveryEdit',
                        component: () => import('@/views/pages_example/delivery/detail.vue'),
                        meta: {
                            title: '编辑运费模版',
                            sidebar: false,
                            activeMenu: '/pages_example/shop/delivery'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/pages_example/demo',
        component: Layout,
        redirect: '/pages_example/demo/container',
        name: 'container',
        meta: {
            title: 'Demo',
            icon: 'ri-file-list-2-line'
        },
        children: [
            {
                path: 'cpn',
                name: 'cpn',
                component: () => import('@/views/pages_example/demo/cpn/index.vue'),
                meta: {
                    title: '简单的基础组件'
                }
            }
            // {
            //     path: 'container',
            //     name: 'container',
            //     component: () => import('@/views/pages_example/demo/container.vue'),
            //     meta: {
            //         title: '基础demo'
            //     }
            // },

            // {
            //     path: 'container',
            //     name: 'container',
            //     component: () => import('@/views/pages_example/demo/container.vue'),
            //     meta: {
            //         title: '基础demo'
            //     }
            // },
            // {
            //     path: 'section',
            //     name: 'section',
            //     component: () => import('@/views/pages_example/demo/section.vue'),
            //     meta: {
            //         title: '基础teleport'
            //     }
            // },
            // {
            //     path: 'basis',
            //     name: 'basis',
            //     component: () => import('@/views/pages_example/demo/basis/father.vue'),
            //     meta: {
            //         title: 'vue3中组合式api特性'
            //     }
            // },
            // {
            //     path: 'watchEffect',
            //     name: 'watchEffect',
            //     component: () => import('@/views/pages_example/demo/watchEffect/index.vue'),
            //     meta: {
            //         title: 'watchEffect用法'
            //     }
            // },
            // {
            //     path: 'setup',
            //     name: 'setup',
            //     component: () => import('@/views/pages_example/demo/setup/index.vue'),
            //     meta: {
            //         title: 'setup语法糖用法'
            //     }
            // }
          
        ]
    }
]
