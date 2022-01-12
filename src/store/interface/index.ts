// 为 build-admin 提供类型化的 State

export interface TestStateTypes {
    test: String
    test2: Boolean
}

// 顶级类型声明
export interface RootStateTypes {
    test: TestStateTypes
}
