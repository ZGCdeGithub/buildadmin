<template>
    <el-config-provider :locale="lang">
        <router-view></router-view>
    </el-config-provider>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import iconfontInit from '/@/utils/iconfont'
import { useRoute } from 'vue-router'
import { setTitle } from '/@/utils/common'
import { store } from '/@/store/index'
import { Language } from 'element-plus/lib/locale'

const route = useRoute()

// 初始化 element 的语言包
const { getLocaleMessage } = useI18n()
const lang = getLocaleMessage(store.getters['config/getStateOrCache']('defaultLang')) as Language

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
