/*
 * 静态路由
 */
import { RouteRecordRaw } from 'vue-router'

const title = (name: string): string => {
    return `pagesTitle.${name}`
}

const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: () => import('/@/views/frontend/index.vue'),
        meta: {
            title: title('home'),
            loading: true,
        },
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('/@/layouts/backend/index.vue'),
        meta: {
            title: title('admin'),
        },
        children: [
            {
                path: 'iframe/:url',
                name: 'layoutIframe',
                component: () => import('/@/layouts/router-view/iframe.vue'),
                meta: {
                    title: title('layoutIframe'),
                },
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('/@/views/backend/dashboard.vue'),
                meta: {
                    title: title('dashboard'),
                },
            },
        ],
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('/@/views/backend/login.vue'),
        meta: {
            title: title('adminLogin'),
            loading: true,
        },
    },
    {
        path: '/:path(.*)*',
        redirect: '/404',
    },
    {
        path: '/404',
        name: 'notFound',
        component: () => import('/@/views/common/error/404.vue'),
        meta: {
            title: title('notFound'),
        },
    },
    {
        path: '/401',
        name: 'noPower',
        component: () => import('/@/views/common/error/401.vue'),
        meta: {
            title: title('noPower'),
        },
    },
]

export default staticRoutes
