<template>
    <div class="nav-bar">
        <div class="nav-tabs">
            <template v-for="(item, idx) in tabsView">
                <div @click="router.push(item.path)" @contextmenu.prevent="onContextmenu(item, $event)" class="bd-nav-tab" :ref="tabsRefs.set">
                    {{ item.title }}
                    <transition @after-leave="selectNavTab(tabsRefs[activeIndex])" name="el-fade-in">
                        <Icon v-show="tabsView.length > 1" class="close-icon" @click.stop="closeTab(item)" size="15" name="el-icon-Close" />
                    </transition>
                </div>
            </template>
            <div :style="activeBoxStyle" class="nav-tabs-active-box"></div>
        </div>
        <NavMenus />
        <Contextmenu ref="contextmenuRef" :items="contextmenuItems" @contextmenuItemClick="onContextmenuItem" />
    </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router'
import { useStore } from '/@/store'
import { viewMenu } from '/@/store/interface'
import { useTemplateRefsList } from '@vueuse/core'
import { useState } from '/@/store/useMapper'
import NavMenus from '/@/layouts/components/navMenus.vue'
import Contextmenu from '/@/components/contextmenu/index.vue'
import type { ContextMenuItem, ContextmenuItemClickEmitArg } from '/@/components/contextmenu/interface'
import useCurrentInstance from '/@/utils/useCurrentInstance'

const { proxy } = useCurrentInstance()

const tabsRefs = useTemplateRefsList<HTMLDivElement>()

const route = useRoute()
const router = useRouter()
const store = useStore()

const { activeIndex, activeRoute, tabsView } = useState('navTabs', ['activeIndex', 'activeRoute', 'tabsView'])

const activeBoxStyle = reactive({
    width: '0',
    transform: 'translateX(0px)',
})

const contextmenuRef = ref()
const contextmenuItems: ContextMenuItem[] = [
    { name: 'refresh', label: '重新加载', icon: 'fa fa-refresh' },
    { name: 'close', label: '关闭标签', icon: 'fa fa-times' },
    { name: 'fullScreen', label: '当前标签全屏', icon: 'el-icon-FullScreen' },
    { name: 'closeOther', label: '关闭其他标签', icon: 'fa fa-minus' },
    { name: 'closeAll', label: '关闭全部标签', icon: 'fa fa-stop' },
]
const onContextmenu = (menu: viewMenu, el: MouseEvent) => {
    const { clientX, clientY } = el
    contextmenuRef.value.onShowContextmenu(menu, {
        x: clientX,
        y: clientY,
    })
}
const onContextmenuItem = async (item: ContextmenuItemClickEmitArg) => {
    const { name, menu } = item
    switch (name) {
        case 'refresh':
            proxy.eventBus.emit('onTabViewRefresh', menu)
            break
        case 'close':
            closeTab(menu as viewMenu)
            break
        case 'closeOther':
            store.commit('navTabs/closeTabs', menu)
            store.commit('navTabs/setActiveRoute', menu?.path)
            break
        case 'closeAll':
            store.commit('navTabs/closeTabs')
            if (route.path === '/admin/dashboard') {
                router.go(0)
            } else {
                router.push('/admin')
            }
            break
        case 'fullScreen':
            if (route.path !== menu?.path) {
                router.push(menu?.path as string)
            }
            store.commit('navTabs/setFullScreen', true)
            break
    }
}

// tab 激活状态切换
const selectNavTab = function (dom: HTMLDivElement) {
    activeBoxStyle.width = dom.clientWidth + 'px'
    activeBoxStyle.transform = `translateX(${dom.offsetLeft}px)`
}

const updateTab = function (newRoute: RouteLocationNormalized | viewMenu) {
    // 添加tab
    store.commit('navTabs/addTab', newRoute.path)
    // 激活当前tab
    store.commit('navTabs/setActiveRoute', newRoute.path)

    nextTick(() => {
        selectNavTab(tabsRefs.value[activeIndex.value])
    })
}

const toLastTab = () => {
    const lastTab = tabsView.value.slice(-1)[0]
    if (lastTab) {
        router.push(lastTab.path)
    } else {
        router.push('/admin')
    }
}

const closeTab = (route: viewMenu) => {
    store.commit('navTabs/closeTab', route)
    proxy.eventBus.emit('onTabViewClose', route)
    if (activeRoute.value.path === route.path) {
        toLastTab()
    } else {
        store.commit('navTabs/setActiveRoute', activeRoute.value.path)
        nextTick(() => {
            selectNavTab(tabsRefs.value[activeIndex.value])
        })
    }
}

onBeforeRouteUpdate(async (to, from) => {
    updateTab(to)
})

onMounted(() => {
    updateTab(route)
})
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    height: 40px;
    width: 100%;
    .nav-tabs {
        display: flex;
        height: 100%;
        position: relative;
        .bd-nav-tab {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            cursor: pointer;
            z-index: 1;
            height: 100%;
            user-select: none;
            .close-icon {
                padding: 2px;
                margin: 2px 0 0 4px;
            }
            .close-icon:hover {
                background: var(--color-primary-sub-0);
                color: var(--color-sub-1) !important;
                border-radius: 50%;
            }
        }
        .bd-nav-tab:hover {
            color: var(--color-primary-sub-0);
        }
        .nav-tabs-active-box {
            position: absolute;
            height: 40px;
            border-radius: var(--el-border-radius-base);
            background-color: #fff;
            box-shadow: var(--el-box-shadow-light);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
        }
    }
}
</style>
