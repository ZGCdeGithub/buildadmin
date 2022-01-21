import { Module } from 'vuex'
import { viewMenu, NavTabs, RootStateTypes } from '/@/store/interface/index'
import { Local } from '/@/utils/storage'

const NavTabsModule: Module<NavTabs, RootStateTypes> = {
    namespaced: true,
    state: {
        // 激活tab的index
        activeIndex: 0,
        // 激活的tab
        activeRoute: null,
        // tab列表
        tabsView: [],
        // 当前tab是否全屏
        tabCurrenFull: false,
        // 从后台加载到的菜单路由列表
        tabsViewRoutes: [],
    },
    mutations: {
        // 添加tab
        addTab(state, path: string): void {
            if (state.tabsView.some((v) => v.path === path)) return
            const currentRoute: viewMenu | undefined = state.tabsViewRoutes.find((route: viewMenu) => {
                return route.path == path
            })
            if (!currentRoute) return

            state.tabsView.push(
                Object.assign({}, currentRoute, {
                    title: currentRoute.title || 'pagesTitle.noTitle',
                })
            )
        },
        closeTab(state, route: viewMenu): void {
            state.tabsView.map((v, k) => {
                if (v.path == route.path) {
                    state.tabsView.splice(k, 1)
                }
            })
        },
        setActiveRoute(state, path: string): void {
            const currentRoute: viewMenu | undefined = state.tabsViewRoutes.find((route: viewMenu) => {
                return route.path === path
            })
            if (!currentRoute) return
            const currentRouteIndex: number = state.tabsView.findIndex((route: viewMenu) => {
                return route.path === path
            })
            if (!currentRoute) return
            state.activeRoute = currentRoute
            state.activeIndex = currentRouteIndex
        },
        setTabsViewRoutes(state, data: viewMenu[]): void {
            state.tabsViewRoutes = data
        },
    },
    actions: {
        setTabsViewRoutes({ commit }, data: viewMenu[]) {
            // 对iframe的url进行编码
            data.forEach((item: viewMenu) => {
                if (item.type == 'iframe') {
                    item.path = '/admin/iframe/' + encodeURIComponent(item.path)
                }
            })
            commit('setTabsViewRoutes', data)
        },
    },
}

export default NavTabsModule
