<template>
    <div class="nav-bar">
        <div class="nav-tabs">
            <template v-for="(item, idx) in tabsView">
                <div @click="onChangeNavTab(item)" class="bd-nav-tab" :ref="tabsRefs.set">
                    {{ item.title }}
                    <transition @after-leave="selectNavTab(tabsRefs[activeIndex])" name="el-fade-in">
                        <Icon v-show="tabsView.length > 1" class="close-icon" @click.stop="closeTab(item)" size="15" name="el-icon-Close" />
                    </transition>
                </div>
            </template>
            <div :style="activeBoxStyle" class="nav-tabs-active-box"></div>
        </div>
        <navMenus />
    </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router'
import navMenus from '/@/layouts/components/navMenus.vue'
import { useStore } from '/@/store'
import { viewMenu } from '/@/store/interface'
import { useTemplateRefsList } from '@vueuse/core'
import { useState } from '/@/store/useMapper'

const tabsRefs = useTemplateRefsList<HTMLDivElement>()

const route = useRoute()
const router = useRouter()
const store = useStore()

const { activeIndex, activeRoute, tabsView, tabsViewRoutes } = useState('navTabs', ['activeIndex', 'activeRoute', 'tabsView', 'tabsViewRoutes'])

const activeBoxStyle = reactive({
    width: '0',
    transform: 'translateX(0px)',
})

const onChangeNavTab = (route: viewMenu) => {
    router.push(route.path)
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
