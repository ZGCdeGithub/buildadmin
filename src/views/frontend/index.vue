<template>
    <div>
        <div>index/index.vue</div>
        <div>{{ t(`index`) }}</div>
        <el-date-picker type="date"></el-date-picker>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '/@/lang/pages/zh-cn/home'

const { t } = useI18n({
    locale: 'zh-cn',
    messages: {
        'zh-cn': messages,
    },
})
</script>
