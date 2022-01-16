<template>
    <el-menu router :collapse-transition="false" :unique-opened="uniqueOpened" default-active="1" :collapse="collapse" background-color="transparent">
        <MenuTree :menus="menus" />
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuTree from '/@/layouts/components/menuTree.vue'

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

const collapse = ref(false)
const uniqueOpened = ref(false)
</script>
