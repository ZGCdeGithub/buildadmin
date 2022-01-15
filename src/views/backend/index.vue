<template>
    <div>{{ adminInfo }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { store } from '/@/store/index'

/* setTimeout(() => {
    store.commit('adminInfo/setAndCache', {
        test: 4444444,
        test1: 5555555555,
        token: '66666666'
    })
}, 3000) */

const adminInfo = computed(() => {
    return store.getters['adminInfo/getStateOrCache']()
})
</script>
