<template>
    <div class="nav-bar">
        <div class="nav-tabs">
            <div @click="changeNavTab(0, $event)" :class="nav == 0 ? 'active' : ''" class="bd-nav-tab">
                控制台<Icon class="close-icon" @click.stop="closeTab(0)" size="15" name="el-icon-Close" />
            </div>
            <div @click="changeNavTab(1, $event)" :class="nav == 1 ? 'active' : ''" class="bd-nav-tab">自定义</div>
            <div @click="changeNavTab(2, $event)" :class="nav == 2 ? 'active' : ''" class="bd-nav-tab">系统配置</div>
            <div @click="changeNavTab(3, $event)" :class="nav == 3 ? 'active' : ''" class="bd-nav-tab">个人资料特别唱歌吧附件管理</div>
            <div @click="changeNavTab(4, $event)" :class="nav == 4 ? 'active' : ''" class="bd-nav-tab">个人资料特别唱歌吧</div>
            <div :style="activeBoxStyle" class="nav-tabs-active-box"></div>
        </div>
        <navMenus />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import navMenus from '/@/layouts/components/navMenus.vue'
const nav = ref(0)

const activeBoxStyle = reactive({
    width: '0',
    transform: 'translateX(0px)',
})

const changeNavTab = (index: number, el: any) => {
    nav.value = index
    activeBoxStyle.width = el.target.clientWidth + 'px'
    activeBoxStyle.transform = `translateX(${el.target.offsetLeft}px)`
}

const closeTab = (index: number) => {}

onMounted(() => {
    const nav = document.getElementsByClassName('bd-nav-tab')[0] as HTMLElement
    activeBoxStyle.width = nav.clientWidth + 'px'
    activeBoxStyle.transform = `translateX(${nav.offsetLeft}px)`
})

onBeforeRouteUpdate(async (to, from) => {
    console.log(to, from)
})
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    height: 40px;
    width: 100%;
    .nav-tabs {
        display: flex;
        height: 100%;
        position: relative;
        .bd-nav-tab {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            cursor: pointer;
            z-index: 1;
            height: 100%;
            user-select: none;
            .close-icon {
                padding: 2px;
                margin: 2px 0 0 4px;
            }
            .close-icon:hover {
                background: var(--color-primary-sub-0);
                color: var(--color-sub-1) !important;
                border-radius: 50%;
            }
        }
        .bd-nav-tab:hover {
            color: var(--color-primary-sub-0);
        }
        .nav-tabs-active-box {
            position: absolute;
            height: 40px;
            border-radius: var(--el-border-radius-base);
            background-color: #fff;
            box-shadow: var(--el-box-shadow-light);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
        }
    }
}
</style>
