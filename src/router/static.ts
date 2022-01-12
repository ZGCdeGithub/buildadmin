/*
 * 静态路由
 */
import { RouteRecordRaw } from 'vue-router'

const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: () => import('/@/views/frontend/index.vue'),
        meta: {
            title: '首页',
            loading: true,
        },
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('/@/views/backend/index.vue'),
        meta: {
            title: '后台',
        },
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('/@/views/backend/login.vue'),
        meta: {
            title: '登录',
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
            title: '页面找不到了',
        },
    },
    {
        path: '/401',
        name: 'noPower',
        component: () => import('/@/views/common/error/401.vue'),
        meta: {
            title: '无访问权限',
        },
    },
]

export default staticRoutes
