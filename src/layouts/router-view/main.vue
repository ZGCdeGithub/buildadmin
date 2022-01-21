<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-main-scrollbar" :style="layoutMainScrollbarStyle()" ref="mainScrollbarRef">
            <router-view v-slot="{ Component }">
                <!-- 避免动画失效 -->
                <transition :name="layoutMainAnimation" mode="out-in">
                    <!-- 不使用 include 因为 setup 语法糖不方便为组件命名 -->
                    <!-- v-if需要写到 keep-alive 里边，否则第二个路由 keepAlive 失效 -->
                    <keep-alive>
                        <component v-if="state.keepAlive" :is="Component" :key="state.componentKey" />
                    </keep-alive>
                </transition>
                <transition :name="layoutMainAnimation" mode="out-in">
                    <component v-if="!state.keepAlive" :is="Component" :key="state.componentKey" />
                </transition>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts">
import { reactive, onMounted, CSSProperties, watch, computed } from 'vue'
import { useStore } from '/@/store/index'
import { useRoute } from 'vue-router'
import { mainHeight as layoutMainScrollbarStyle } from '/@/utils/layout'

const route = useRoute()
const store = useStore()

const state = reactive({
    componentKey: route.fullPath,
    keepAlive: false,
})

const layoutMainAnimation = computed(() => store.state.config.layoutMainAnimation)

onMounted(() => {
    // 确保刷新页面时也能正确取得当前路由 keepAlive 参数
    state.keepAlive = store.state.navTabs.activeRoute?.keepAlive ? store.state.navTabs.activeRoute.keepAlive : false
})

watch(
    () => route.path,
    () => {
        state.componentKey = route.fullPath
        state.keepAlive = store.state.navTabs.activeRoute?.keepAlive ? store.state.navTabs.activeRoute.keepAlive : false
    }
)
</script>

<style scoped lang="scss">
.layout-container .layout-main {
    padding: 0 !important;
    margin-top: 15px;
    overflow: hidden;
    width: 100%;
}
.layout-main-scrollbar {
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>
