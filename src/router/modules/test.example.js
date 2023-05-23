const Layout = () => import("@/layout/index.vue");

export default [
    {
        path: "/demo_item",
        component: Layout,
        redirect: "/demo_item/longList",
        meta: {
            title: "长列表数据处理",
        },
        children: [
            {
                path: "",
                name: "demoItemLongList",
                component: () => import("@/views/demo_item/longList.vue"),
                meta: {
                    title: "长列表数据",
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: "/longList",
                },
            },
        ],
    },
];
