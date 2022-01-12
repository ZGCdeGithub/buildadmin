import { Module } from 'vuex'
import { TestStateTypes, RootStateTypes } from '/@/store/interface/index'

const TestModule: Module<TestStateTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        test: '测试',
        test2: true,
    },
}

export default TestModule
