<template>
    <el-aside class="layout-aside">
        <Logo />
        <el-scrollbar>
            <MenuVertical :menus="menus" />
        </el-scrollbar>
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

const menus = ref([
    {
        title: '控制台',
        path: '/admin/dashboard',
        type: 'tab',
        icon: 'el-icon-Odometer',
    },
    {
        title: '百度',
        path: 'https://baidu.com',
        type: 'link',
    },
    {
        title: '百度iframe',
        path: 'https://baidu.com',
        type: 'iframe',
    },
])

const layout = store.getters['config/getStateOrCache']('adminLayout')
</script>
