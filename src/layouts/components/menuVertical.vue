<template>
    <el-scrollbar ref="verticalMenusRef" class="vertical-menus-scrollbar">
        <el-menu
            class="layouts-menu-vertical"
            router
            :collapse-transition="false"
            :unique-opened="layoutConfig.menuUniqueOpened"
            :default-active="state.defaultActive"
            :collapse="layoutConfig.menuCollapse"
            background-color="transparent"
        >
            <MenuTree :menus="menus" />
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import MenuTree from '/@/layouts/components/menuTree.vue'
import { useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'
import type { ElScrollbar } from 'element-plus'
import { useStore } from '/@/store'

const store = useStore()
const route = useRoute()

const verticalMenusRef = ref<InstanceType<typeof ElScrollbar>>()

const state = reactive({
    defaultActive: '',
})

const menus = computed(() => store.state.navTabs.tabsViewRoutes)
const layoutConfig = computed(() => store.getters['config/getStateOrCache']('layout'))

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        let activeMenu: HTMLElement | null = document.querySelector('.el-menu.layouts-menu-vertical li.is-active')
        if (!activeMenu) return false
        verticalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
    })
}

onMounted(() => {
    currentRouteActive(route)
    verticalMenusScroll()
})

onBeforeRouteUpdate((to) => {
    currentRouteActive(to)
})
</script>
<style>
.vertical-menus-scrollbar {
    height: calc(100vh - 92px);
}
.layouts-menu-vertical {
    border: 0;
}
</style>
