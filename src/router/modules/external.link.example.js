const Layout = () => import('@/layout/index.vue')
const IframeLayout = () => import('@/layout/iframe.vue')

export default {
    path: '/link',
    component: Layout,
    redirect: '/link/iframe',
    name: 'externalLinkExample',
    meta: {
        title: '外链',
        icon: 'ri-external-link-fill'
    },
    children: [
        {
            path: 'iframe',
            meta: {
                title: '内嵌 Iframe'
            },
            children: [
                {
                    path: 'iframeGitee',
                    component: IframeLayout,
                    name: 'linkExampleIframeGitee',
                    meta: {
                        title: 'Gitee 仓库',
                        link: 'https://gitee.com/hooray/fantastic-admin',
                        copyright: false
                    }
                },
                {
                    path: 'iframeGithub',
                    component: IframeLayout,
                    name: 'linkExampleIframeGithub',
                    meta: {
                        title: 'Github 仓库',
                        link: 'https://github.com/hooray/fantastic-admin',
                        copyright: false
                    }
                }
            ]
        },
        {
            path: 'window',
            meta: {
                title: '新窗口打开'
            },
            children: [
                {
                    path: 'https://gitee.com/hooray/fantastic-admin',
                    meta: {
                        title: 'Gitee 仓库'
                    }
                },
                {
                    path: 'https://github.com/hooray/fantastic-admin',
                    meta: {
                        title: 'Github 仓库'
                    }
                }
            ]
        }
    ]
}
