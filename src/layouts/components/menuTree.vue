<template>
    <template v-for="menu in menus" :key="menu.path">
        <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu :index="menu.path">
                <template #title>
                    <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                    <span>{{ menu.title ? menu.title : $t('noTitle') }}</span>
                </template>
                <menu-tree :menus="menu.children"></menu-tree>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item v-if="menu.type == 'tab'" :index="menu.path">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ menu.title ? menu.title : $t('noTitle') }}</span>
            </el-menu-item>
            <el-menu-item v-if="menu.type == 'link'" index="" @click="onLink(menu.path)">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ menu.title ? menu.title : $t('noTitle') }}</span>
            </el-menu-item>
            <el-menu-item v-if="menu.type == 'iframe'" :index="menu.path">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ menu.title ? menu.title : $t('noTitle') }}</span>
            </el-menu-item>
        </template>
    </template>
</template>
<script setup lang="ts">
import { store } from '/@/store'
import type { viewMenu } from '/@/store/interface'

interface Props {
    menus: viewMenu[]
}
const props = withDefaults(defineProps<Props>(), {
    menus: () => [],
})

const defaultIcon = store.state.config.defaultMenuIcon

const onLink = (url: string) => {
    window.open(url, '_blank')
}
</script>

<style scoped lang="scss">
.el-menu-item .icon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
}
.is-active .icon {
    color: var(--el-menu-active-color) !important;
}
</style>
