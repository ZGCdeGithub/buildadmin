import { Module } from 'vuex'
import { ConfigStateTypes, RootStateTypes } from '/@/store/interface/index'
import { Local } from '/@/utils/storage'
import { store } from '/@/store/index'

interface setObj {
    name: string
    value: any
}

const ConfigModule: Module<ConfigStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        // 后台管理布局方法，可选值<Default|Classic|Streamline>
        adminLayout: 'Default',
        // 默认语言，可选值<zh-cn|en>
        defaultLang: 'zh-cn',
        // 当在默认语言包找不到翻译时，继续在 fallbackLang 语言包内查找翻译
        fallbackLang: 'zh-cn',
        // 本地缓存 Key
        localKey: {
            // 管理员资料
            adminInfo: 'adminInfo',
            // 全局配置
            config: 'baConfig',
        },
        // 支持的语言列表
        langArray: [
            { name: 'zh-cn', value: '中文简体' },
            { name: 'en', value: 'English' },
        ],
        // 需要缓存的页面路由 name
        keepAliveViews: [],
        // 后台菜单项默认图标
        defaultMenuIcon: 'el-icon-Minus',
    },
    getters: {
        // 从 state 或者本地缓存获取配置项
        getStateOrCache: (state: any) => (name: string) => {
            const baConfig = Local.get(store.state.config.localKey.config) || {}
            if (baConfig[name]) {
                state[name] = baConfig[name]
            }
            return state[name]
        },
    },
    mutations: {
        // 设置单个配置项
        set(state: any, data: setObj): void {
            state[data.name] = data.value
        },
        // 批量设置配置项
        setMulti(state: any, data: object): void {
            for (let [key, val] of Object.entries(data)) {
                state[key] = val
            }
        },
        // 设置单个配置项并缓存到本地存储
        setAndCache(state: any, data: setObj): void {
            let baConfig = Local.get(store.state.config.localKey.config) || {}
            state[data.name] = baConfig[data.name] = data.value
            Local.set(store.state.config.localKey.config, baConfig)
        },
    },
}

export default ConfigModule
