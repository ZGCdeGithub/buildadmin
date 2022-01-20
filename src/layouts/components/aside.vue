<template>
    <el-aside class="layout-aside">
        <Logo />
        <MenuVertical :menus="menus" />
    </el-aside>
</template>

<style lang="scss">
.layout-aside {
    background: var(--color-basic-white);
    position: fixed;
    top: 16px;
    left: 16px;
    width: var(--default-aside-width);
    height: calc(100vh - 32px);
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '/@/layouts/components/logo.vue'
import MenuVertical from '/@/layouts/components/menuVertical.vue'
import { store } from '/@/store/index'

import menus from '/@/mock/router.json'

const layout = store.getters['config/getStateOrCache']('adminLayout')
</script>
