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
            // 最后选项卡(刷新页面时取回)
            lastTabView: 'lastTabView',
        },
        // 支持的语言列表
        langArray: [
            { name: 'zh-cn', value: '中文简体' },
            { name: 'en', value: 'English' },
        ],
        layout: {
            // 后台主页面切换动画，可选值<slide-right|slide-left|el-fade-in-linear|el-fade-in|el-zoom-in-center|el-zoom-in-top|el-zoom-in-bottom>
            mainAnimation: 'slide-right',
            // 后台菜单项默认图标
            menuDefaultIcon: 'el-icon-Minus',
            // 是否水平折叠收起菜单
            menuCollapse: false,
            // 是否只保持一个子菜单的展开
            menuUniqueOpened: false,
        },
    },
    getters: {
        // 从 state 或者本地缓存获取配置项
        // name 支持`.`，列如 layout.menuCollapse
        getStateOrCache: (state: any) => (name: string) => {
            const baConfig = Local.get(store.state.config.localKey.config) || {}
            let nameArr = name.split('.')
            if (nameArr[1]) {
                if (baConfig[nameArr[0]][nameArr[1]]) {
                    state[nameArr[0]][nameArr[1]] = baConfig[nameArr[0]][nameArr[1]]
                }
                return state[nameArr[0]][nameArr[1]]
            } else {
                if (baConfig[name]) {
                    state[name] = baConfig[name]
                }
                return state[name]
            }
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
        // name 支持`.`，列如 layout.menuCollapse
        setAndCache(state: any, data: setObj): void {
            let baConfig = Local.get(store.state.config.localKey.config) || {}

            let name = data.name.split('.')
            if (name[1]) {
                state[name[0]][name[1]] = baConfig[name[0]][name[1]] = data.value
            } else {
                state[data.name] = baConfig[data.name] = data.value
            }
            Local.set(store.state.config.localKey.config, baConfig)
        },
    },
}

export default ConfigModule
