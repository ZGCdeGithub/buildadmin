<template>
    <component :is="layout"></component>
</template>

<script setup lang="ts">
import { useStore } from '/@/store'
import Default from '/@/layouts/container/default.vue'
import Classic from '/@/layouts/container/classic.vue'
import Streamline from '/@/layouts/container/streamline.vue'
import menus from '/@/mock/router.json' // 模拟api请求数据
import { computed } from 'vue'

const store = useStore()
const layout = computed(() => store.state.config.adminLayout)

// 更新vuex中的路由菜单数据
store.dispatch('navTabs/setTabsViewRoutes', menus)
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script lang="ts">
export default {
    components: { Default, Classic, Streamline },
}
</script>
