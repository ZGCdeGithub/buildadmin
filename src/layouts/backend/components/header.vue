<template>
    <el-header v-if="!tabFullScreen" class="layout-header">
        <NavBar />
    </el-header>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '/@/store'
import NavBar from './navBar.vue'

const store = useStore()
const tabFullScreen = computed(() => store.state.navTabs.tabFullScreen)
</script>
<style scoped>
.layout-header {
    height: 40px;
    margin: 20px var(--main-space) 0 var(--main-space);
    padding: 0;
}
</style>
