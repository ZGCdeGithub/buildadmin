<template>
    <div :style="{ backgroundColor: menuTopBarBackground }" class="layout-logo">
        <img v-if="!menuCollapse" class="logo-img" src="~assets/logo.png" alt="logo" />
        <div v-if="!menuCollapse" :style="{ color: menuActiveColor }" class="website-name">BuildAdmin</div>
        <Icon
            @click="onMenuCollapse"
            :name="menuCollapse ? 'fa fa-indent' : 'fa fa-dedent'"
            :class="menuCollapse ? 'unfold' : ''"
            :color="menuActiveColor"
            size="18"
            class="fold"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '/@/store'

const store = useStore()
const menuCollapse = computed(() => store.state.config.layout.menuCollapse)
const menuTopBarBackground = computed(() => store.state.config.layout.menuTopBarBackground)
const menuActiveColor = computed(() => store.state.config.layout.menuActiveColor)

const onMenuCollapse = function () {
    store.commit('config/setAndCache', {
        name: 'layout.menuCollapse',
        value: !menuCollapse.value,
    })
}
</script>

<style scoped lang="scss">
.layout-logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background: var(--color-bg-2);
}
.logo-img {
    width: 28px;
}
.website-name {
    padding-left: 4px;
    font-size: var(--el-font-size-extra-large);
    font-weight: 600;
}
.fold {
    margin-left: auto;
}
.unfold {
    margin: 0 auto;
}
</style>
