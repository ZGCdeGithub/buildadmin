<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-main-scrollbar" :style="layoutMainScrollbarStyle()" ref="mainScrollbarRef">
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="keepAliveViews">
                        <component :is="Component" :key="path" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, CSSProperties } from 'vue'
import { store } from '/@/store/index'
import { useRoute } from 'vue-router'
import { mainHeight as layoutMainScrollbarStyle } from '/@/utils/layout'

const { path } = useRoute()

const keepAliveViews = computed(() => {
    return store.state.config.keepAliveViews
})
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
