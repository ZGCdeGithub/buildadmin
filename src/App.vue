<template>
    <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import iconfontInit from '/@/utils/iconfont'
import { useRoute } from 'vue-router'
import { setTitle } from '/@/utils/common'

const route = useRoute()

onMounted(() => {
    iconfontInit()
})

// 监听路由变化时更新浏览器标题
watch(
    () => route.path,
    () => {
        setTitle()
    }
)
</script>
