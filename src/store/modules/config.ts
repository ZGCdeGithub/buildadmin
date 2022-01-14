import { Module } from 'vuex'
import { ConfigStateTypes, RootStateTypes } from '/@/store/interface/index'
import { Local } from '/@/utils/storage'

interface setObj {
    name: string
    value: any
}

const ConfigModule: Module<ConfigStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        // 默认语言，可选值<zh-cn|en>
        defaultLang: 'zh-cn',
        // 当在默认语言包找不到翻译时，继续在 fallbackLang 语言包内查找翻译
        fallbackLang: 'zh-cn',
    },
    getters: {
        // 从 state 或者本地缓存获取配置项
        getStateOrCache: (state) => (name: string) => {
            const baConfig = Local.get('baConfig') || {}
            if (baConfig[name]) {
                return baConfig[name]
            }
            return state.defaultLang
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
            let baConfig = Local.get('baConfig') || {}
            state[data.name] = baConfig[data.name] = data.value
            Local.set('baConfig', baConfig)
        },
    },
}

export default ConfigModule
