<template>
    <el-aside v-if="!tabFullScreen" :class="layoutMode == 'Default' ? 'layout-aside-default' : 'layout-aside-classic'">
        <Logo />
        <MenuVertical />
    </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logo from './logo.vue'
import MenuVertical from './menuVertical.vue'
import { useStore } from '/@/store/index'

const store = useStore()

const tabFullScreen = computed(() => store.state.navTabs.tabFullScreen)
const menuWidth = computed(() => store.getters['config/menuWidth'])
const layoutMode = computed(() => store.state.config.layout.layoutMode)
</script>

<style lang="scss">
.layout-aside-default {
    background: var(--color-basic-white);
    margin: 16px 0 16px 16px;
    height: calc(100vh - 32px);
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    transition: width 0.3s ease;
    width: v-bind(menuWidth);
}
.layout-aside-classic {
    background: var(--color-basic-white);
    margin: 0px;
    height: 100vh;
    overflow: hidden;
    transition: width 0.3s ease;
    width: v-bind(menuWidth);
}
</style>
