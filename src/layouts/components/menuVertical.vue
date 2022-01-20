<template>
    <el-scrollbar ref="verticalMenusRef" class="vertical-menus-scrollbar">
        <el-menu
            class="layouts-menu-vertical"
            router
            :collapse-transition="false"
            :unique-opened="uniqueOpened"
            :default-active="state.defaultActive"
            :collapse="collapse"
            background-color="transparent"
        >
            <MenuTree :menus="menus" />
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import MenuTree from '/@/layouts/components/menuTree.vue'
import { useRoute, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'
import type { ElScrollbar } from 'element-plus'
import type { viewMenu } from '/@/store/interface'

interface Props {
    menus: viewMenu[]
}
const props = withDefaults(defineProps<Props>(), {
    menus: () => [],
})

const verticalMenusRef = ref<InstanceType<typeof ElScrollbar>>()

const state = reactive({
    defaultActive: '',
})

const route = useRoute()

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

const collapse = ref(false)
const uniqueOpened = ref(false)
</script>
<style>
.vertical-menus-scrollbar {
    height: calc(100vh - 80px);
}
.layouts-menu-vertical {
    border: 0;
}
</style>
