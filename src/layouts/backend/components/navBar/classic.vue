<template>
    <div class="nav-bar">
        <NavTabs />
        <NavMenus />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '/@/store'
import NavTabs from '/@/layouts/backend/components/navBar/tabs.vue'
import NavMenus from '../navMenus.vue'

const store = useStore()

const headerBarTabColor = computed(() => store.state.config.layout.headerBarTabColor)
const headerBarBackground = computed(() => store.state.config.layout.headerBarBackground)
const headerBarHoverBackground = computed(() => store.state.config.layout.headerBarHoverBackground)
const headerBarTabActiveColor = computed(() => store.state.config.layout.headerBarTabActiveColor)
const headerBarTabActiveBackground = computed(() => store.state.config.layout.headerBarTabActiveBackground)
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: v-bind(headerBarBackground);
    :deep(.nav-tabs) {
        display: flex;
        height: 100%;
        position: relative;
        &::-webkit-scrollbar-thumb {
            background: #dedfe1;
        }
        .bd-nav-tab {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            cursor: pointer;
            z-index: 1;
            height: 100%;
            user-select: none;
            color: v-bind(headerBarTabColor);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            .close-icon {
                padding: 2px;
                margin: 2px 0 0 4px;
            }
            .close-icon:hover {
                background: var(--color-primary-sub-0);
                color: var(--color-sub-1) !important;
                border-radius: 50%;
            }
            &.active {
                color: v-bind(headerBarTabActiveColor);
            }
            &:hover {
                background-color: v-bind(headerBarHoverBackground);
            }
        }
        .nav-tabs-active-box {
            position: absolute;
            height: 50px;
            background-color: v-bind(headerBarTabActiveBackground);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
        }
    }
}
</style>
