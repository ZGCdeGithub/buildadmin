<template>
    <component :is="layout"></component>
</template>

<script setup lang="ts">
import { store } from '/@/store/index'
import Default from '/@/layouts/container/default.vue'
import Classic from '/@/layouts/container/classic.vue'
import Streamline from '/@/layouts/container/streamline.vue'
const layout = store.getters['config/getStateOrCache']('adminLayout')
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script lang="ts">
export default {
    components: { Default, Classic, Streamline },
}
</script>
