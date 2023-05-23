const Layout = () => import("@/layout/index.vue");

export default {
    path: "/feature_example",
    component: Layout,
    redirect: "/feature_example/i18n",
    name: "featureExample",
    meta: {
        title: "功能",
        icon: "sidebar-feature",
        badge: "PRO",
    },
    children: [
        {
            path: "i18n",
            name: "featureExampleI18n",
            component: () => import("@/views/feature_example/i18n.vue"),
            meta: {
                title: "国际化",
                i18n: "route.i18n",
                icon: "ri-earth-line",
            },
        },
        {
            path: "font",
            name: "featureExampleFont",
            component: () => import("@/views/feature_example/font.vue"),
            meta: {
                title: "自定义字体",
                icon: "ri-font-size",
            },
        },
        {
            path: "waves",
            name: "featureExampleWaves",
            component: () => import("@/views/feature_example/waves.vue"),
            meta: {
                title: "水波纹",
                icon: "sidebar-waves",
            },
        },
        {
            path: "drag/dialog",
            name: "featureExampleDragDialog",
            component: () => import("@/views/feature_example/drag.dialog.vue"),
            meta: {
                title: "可拖动对话框",
                icon: "sidebar-drag-dialog",
            },
        },
        {
            path: "print",
            name: "featureExamplePrint",
            component: () => import("@/views/feature_example/print.vue"),
            meta: {
                title: "打印",
                icon: "ri-printer-line",
            },
        },
        {
            path: "watermark",
            name: "featureExampleWatermark",
            component: () => import("@/views/feature_example/watermark.vue"),
            meta: {
                title: "页面水印",
                icon: "sidebar-watermark",
            },
        },
        {
            path: "watermark2",
            name: "featureExampleWatermark2",
            component: () =>
                import("@/views/feature_example/watermark2/index.vue"),
            meta: {
                title: "页面水印面试demo",
                icon: "sidebar-watermark",
            },
        },
        {
            path: "clipboard",
            name: "featureExampleClipboard",
            component: () => import("@/views/feature_example/clipboard.vue"),
            meta: {
                title: "剪贴板",
                icon: "sidebar-clipboard",
            },
        },
        {
            path: "qrcode",
            name: "featureExampleQrcode",
            component: () => import("@/views/feature_example/qrcode.vue"),
            meta: {
                title: "二维码",
                icon: "sidebar-qrcode",
            },
        },
        {
            path: "bug",
            name: "featureExampleBug",
            component: () => import("@/views/feature_example/bug.vue"),
            meta: {
                title: "错误日志",
                icon: "ri-bug-line",
            },
        },
        {
            path: "rules",
            name: "featureExampleRules",
            component: () => import("@/views/feature_example/rules.vue"),
            meta: {
                title: "常用正则",
                icon: "sidebar-regex",
            },
        },
        {
            path: "debounce",
            name: "featureExampleDebounce",
            component: () => import("@/views/feature_example/debounce.vue"),
            meta: {
                title: "防抖节流",
                icon: "sidebar-debounce",
            },
        },
        {
            path: "notify",
            name: "featureExampleNotify",
            component: () => import("@/views/feature_example/notify.vue"),
            meta: {
                title: "通知",
                icon: "sidebar-notify",
            },
        },
        {
            path: "title",
            name: "featureExampleTitle",
            component: () => import("@/views/feature_example/title.vue"),
            meta: {
                title: "动态标题",
                icon: "sidebar-title",
            },
        },
        {
            path: "index",
            name: "featureMaximize",
            component: () => import("@/views/feature_example/maximize.vue"),
            meta: {
                title: "主页面最大化",
                icon: "ri-picture-in-picture-exit-line",
            },
        },
    ],
};
