<template>
    <el-header class="layout-header">
        <NavBar />
    </el-header>
</template>
<script setup lang="ts">
import NavBar from '/@/layouts/components/navBar.vue'
</script>
<style scoped>
.layout-header {
    height: 40px;
    margin-top: 20px;
    padding-left: 0;
    padding-right: 10px;
}
</style>
