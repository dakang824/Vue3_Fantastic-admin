const Layout = () => import('@/layout/index.vue')

export default {
    path: '/component_extend_example',
    component: Layout,
    redirect: '/component_extend_example/pageheader',
    name: 'componentExtendExample',
    meta: {
        title: '扩展组件',
        icon: 'sidebar-component',
        badge: true
    },
    children: [
        {
            path: 'pageheader',
            name: 'componentExtendExamplePageheader',
            component: () => import('@/views/component_extend_example/pageheader.demo.vue'),
            meta: {
                title: '页头'
            }
        },
        {
            path: 'pagemain',
            name: 'componentExtendExamplePagemain',
            component: () => import('@/views/component_extend_example/pagemain.demo.vue'),
            meta: {
                title: '内容块'
            }
        },
        {
            path: 'result',
            name: 'componentExtendExampleResult',
            component: () => import('@/views/component_extend_example/result.demo.vue'),
            meta: {
                title: '处理结果'
            }
        },
        {
            path: 'actionbar',
            name: 'componentExtendExampleActionbar',
            component: () => import('@/views/component_extend_example/actionbar.demo.vue'),
            meta: {
                title: '固定底部操作栏'
            }
        },
        {
            path: 'searchbar',
            name: 'componentExtendExampleSearchbar',
            component: () => import('@/views/component_extend_example/searchbar.demo.vue'),
            meta: {
                title: '搜索面板'
            }
        },
        {
            path: 'batchactionbar',
            name: 'componentExtendExampleBatchactionbar',
            component: () => import('@/views/component_extend_example/batchactionbar.demo.vue'),
            meta: {
                title: '批量操作栏'
            }
        },
        {
            path: 'tableautoheight',
            name: 'componentExtendExampleTableautoheight',
            component: () => import('@/views/component_extend_example/table.autoheight.demo.vue'),
            meta: {
                title: '表格高度自适应'
            }
        },
        {
            path: 'upload',
            name: 'componentExtendExampleUpload',
            component: () => import('@/views/component_extend_example/upload.demo.vue'),
            meta: {
                title: '上传'
            }
        },
        {
            path: 'imagepreview',
            name: 'componentExtendExampleImagePreview',
            component: () => import('@/views/component_extend_example/image.preview.demo.vue'),
            meta: {
                title: '图片预览'
            }
        },
        {
            path: 'trend',
            name: 'componentExtendExampleTrend',
            component: () => import('@/views/component_extend_example/trend.demo.vue'),
            meta: {
                title: '趋势标记'
            }
        },
        {
            path: 'area',
            name: 'componentExtendExampleArea',
            component: () => import('@/views/component_extend_example/area.demo.vue'),
            meta: {
                title: '省市区联动'
            }
        },
        {
            path: 'editor',
            name: 'componentExtendExampleEditor',
            component: () => import('@/views/component_extend_example/editor.demo.vue'),
            meta: {
                title: '编辑器'
            }
        },
        {
            path: 'amap',
            name: 'componentExtendExampleAmap',
            component: () => import('@/views/component_extend_example/amap.demo.vue'),
            meta: {
                title: '高德地图点标记',
                badge: 'PRO'
            }
        },
        {
            path: 'colorfulcard',
            name: 'componentExtendExampleColorfulCard',
            component: () => import('@/views/component_extend_example/colorful.card.demo.vue'),
            meta: {
                title: '多彩渐变卡片',
                badge: 'PRO'
            }
        },
        {
            path: 'chip',
            name: 'componentExtendExampleChip',
            component: () => import('@/views/component_extend_example/chip.demo.vue'),
            meta: {
                title: '纸片',
                badge: 'PRO'
            }
        },
        {
            path: 'iconpicker',
            name: 'componentExtendExampleIconPicker',
            component: () => import('@/views/component_extend_example/iconpicker.demo.vue'),
            meta: {
                title: '图标选择器',
                badge: 'PRO'
            }
        },
        {
            path: 'countto',
            name: 'componentExtendExampleCountTo',
            component: () => import('@/views/component_extend_example/count.to.demo.vue'),
            meta: {
                title: '计数器',
                badge: 'PRO'
            }
        },
        {
            path: 'signcanvas',
            name: 'componentExtendExampleSignCanvas',
            component: () => import('@/views/component_extend_example/sign.canvas.demo.vue'),
            meta: {
                title: '电子签名',
                badge: 'PRO'
            }
        },
        {
            path: 'sparkline',
            name: 'componentExtendExampleSpartline',
            component: () => import('@/views/component_extend_example/sparkline.demo.vue'),
            meta: {
                title: '迷你图',
                badge: 'PRO'
            }
        }
    ]
}
