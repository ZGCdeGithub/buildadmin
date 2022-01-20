// 为 build-admin 提供类型化的 State
// 变量名对应含义请在 ./modules/ 里边找

export interface ConfigStateTypes {
    adminLayout: string
    defaultLang: string
    fallbackLang: string
    localKey: {
        adminInfo: string
        config: string
        lastTabView: string
    }
    langArray: {
        name: string
        value: string
    }[]
    keepAliveViews: []
    defaultMenuIcon: string
}

// 管理员信息
export interface AdminInfoStateTypes {
    adminInfo: object
}

export interface viewMenu {
    title: string
    path: string
    type?: string
    icon?: string
    children?: viewMenu[]
}

export interface NavTabs {
    tabsView: Array<viewMenu>
    tabCurrenFull: Boolean
}

// 顶级类型声明
export interface RootStateTypes {
    config: ConfigStateTypes
    adminInfo: AdminInfoStateTypes
    navTabs: NavTabs
}
