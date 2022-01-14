<template>
    <div>
        <div>index/index.vue</div>
        <div>{{ defaultLang }}</div>
        <div>{{ t(`layout.seting`) }}</div>
        <el-date-picker type="date"></el-date-picker>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import en from '/@/lang/frame/en'
// import messages from '/@/lang/pages/zh-cn/home'
import { store } from '/@/store/index'

/* const { t } = useI18n({
    locale: 'zh-cn',
    messages: {
        'zh-cn': messages,
    },
}) */

const defaultLang = computed(() => {
    return store.getters['config/getStateOrCache']('defaultLang')
})

const { locale, t, messages } = useI18n()
locale.value = 'en'
console.log(messages.value)

/* setTimeout(() => {
    store.commit('config/setAndCache', {
        name: 'defaultLang',
        value: 'en',
    })

}, 2000) */

// console.log(store.getters['config/getStateOrCache']('defaultLang'))

/* setTimeout(() => {
    store.commit('config/setMulti', {
        defaultLang: 'test1',
        fallbackLang: 'test2',
    })
}, 2000) */
</script>
