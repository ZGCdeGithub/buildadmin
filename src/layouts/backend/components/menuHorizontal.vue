<template>
    <div class="layouts-menu-horizontal">
        <div class="menu-horizontal-logo" v-if="layoutConfig.menuShowTopBar">
            <Logo />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logo from './logo.vue'
import { useStore } from '/@/store/index'

const store = useStore()

const layoutConfig = computed(() => store.state.config.layout)
</script>

<style scoped lang="scss">
.layouts-menu-horizontal {
    width: 100vw;
    background-color: #ffffff;
}
.menu-horizontal-logo {
    width: 180px;
    &:hover {
        background-color: v-bind('layoutConfig.headerBarHoverBackground');
    }
}
</style>
