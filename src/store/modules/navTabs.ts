import { Module } from 'vuex'
import { viewMenu, NavTabs, RootStateTypes } from '/@/store/interface/index'
import { Local } from '/@/utils/storage'
import { store } from '/@/store/index'

const NavTabsModule: Module<NavTabs, RootStateTypes> = {
    namespaced: true,
    state: {
        tabsView: [],
        tabCurrenFull: false,
    },
    mutations: {
        // 添加tab
        addTab(state, data: viewMenu): void {
            // Local.set(store.state.config.localKey.lastTabView, data)
            if (state.tabsView.some((v) => v.path === data.path)) return
            state.tabsView.push(
                Object.assign({}, data, {
                    title: data.title || 'pagesTitle.noTitle',
                })
            )
            console.log(state.tabsView)
        },
    },
}

export default NavTabsModule
