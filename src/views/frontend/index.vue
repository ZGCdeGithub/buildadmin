<template>
    <div>
        <div>index/index.vue</div>
        <div>{{ defaultLang }}</div>
        <div>{{ $t(`layout.seting`) }}</div>
        <el-date-picker type="date"></el-date-picker>
        <br />
        <Icon size="60" color="red" name="local-lang" />
        <Icon size="50" color="blue" name="el-icon-Edit" />
        <Icon size="80" color="red" name="iconfont icon-ellipsis" />
        <Icon name="fa fa-address-book" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import en from '/@/lang/frame/en'
import { useRouter } from 'vue-router'
// import messages from '/@/lang/pages/zh-cn/home'
import { store } from '/@/store/index'
import { editDefaultLang } from '/@/lang/index'

/* const { t } = useI18n({
    locale: 'zh-cn',
    messages: {
        'zh-cn': messages,
    },
}) */

const defaultLang = computed(() => {
    return store.getters['config/getStateOrCache']('defaultLang')
})

/* if (store.getters['config/getStateOrCache']('defaultLang') == 'zh-cn') {
    setTimeout(() => {
        editDefaultLang('en')
    }, 5000)
} */

/* setTimeout(() => {
    store.commit('config/setAndCache', {
        name: 'defaultLang',
        value: 'en',
    })
    console.log('设置了')
}, 2000) */

// console.log(store.getters['config/getStateOrCache']('defaultLang'))

/* setTimeout(() => {
    store.commit('config/setMulti', {
        defaultLang: 'test1',
        fallbackLang: 'test2',
    })
}, 2000) */
</script>
