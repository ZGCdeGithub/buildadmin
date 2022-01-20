<template>
    <el-container class="layout-container">
        <Aside />
        <el-container class="content-wrapper">
            <Header />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Aside from '/@/layouts/components/aside.vue'
import Header from '/@/layouts/components/header.vue'
</script>

<style scoped>
.content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-left: calc(32px + var(--default-aside-width));
}
</style>
