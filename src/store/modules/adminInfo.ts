import { Module } from 'vuex'
import { AdminInfoStateTypes, RootStateTypes } from '/@/store/interface/index'
import { Local } from '/@/utils/storage'
import { store } from '/@/store/index'

const AdminInfoModule: Module<AdminInfoStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        adminInfo: {},
    },
    getters: {
        // 从 state 或者本地缓存获取管理员资料
        getStateOrCache: (state) => () => {
            const adminInfo = Local.get(store.state.config.localKey.adminInfo) || {}
            if (adminInfo && adminInfo.token) {
                state.adminInfo = adminInfo
            }
            return state.adminInfo
        },
    },
    mutations: {
        // 设置管理员资料
        setAndCache(state, data: object): void {
            let adminInfo = Local.get(store.state.config.localKey.adminInfo) || {}
            state.adminInfo = adminInfo = data
            Local.set(store.state.config.localKey.adminInfo, adminInfo)
        },
    },
}

export default AdminInfoModule
