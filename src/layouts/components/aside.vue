<template>
    <el-aside class="layout-aside">
        <Logo />
        <MenuVertical />
    </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logo from '/@/layouts/components/logo.vue'
import MenuVertical from '/@/layouts/components/menuVertical.vue'
import { useStore } from '/@/store/index'

const store = useStore()
</script>

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
