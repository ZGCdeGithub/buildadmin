// 为 build-admin 提供类型化的 State
// 变量名对应含义请在 ./modules/ 里边找

export interface ConfigStateTypes {
    defaultLang: string
    fallbackLang: string
}

// 顶级类型声明
export interface RootStateTypes {
    config: ConfigStateTypes
}
