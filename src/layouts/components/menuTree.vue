<template>
    <template v-for="menu in menus" :key="menu.path">
        <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu :index="menu.path">
                <template #title>
                    <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                    <span>{{ $t(menu.title) }}</span>
                </template>
                <menu-tree :menus="menu.children"></menu-tree>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item v-if="menu.type == 'tab'" :index="menu.path">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ $t(menu.title) }}</span>
            </el-menu-item>
            <el-menu-item v-if="menu.type == 'link'" index="/link">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ $t(menu.title) }}</span>
            </el-menu-item>
            <el-menu-item v-if="menu.type == 'iframe'" index="/iframe">
                <Icon :name="menu.icon ? menu.icon : defaultIcon" />
                <span>{{ $t(menu.title) }}</span>
            </el-menu-item>
        </template>
    </template>
</template>
<script setup lang="ts">
interface menu {
    title: string
    path: string
    type?: string
    icon?: string
    children?: menu[]
}
interface Props {
    menus: menu[]
}
const props = withDefaults(defineProps<Props>(), {
    menus: () => [],
})
const defaultIcon = 'el-icon-Minus'
</script>
