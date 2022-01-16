<template>
    <div v-if="isUrl" :style="urlIconStyle" class="url-svg svg-icon" />
    <svg v-else class="svg-icon" :style="iconStyle" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { isExternal } from '/@/utils/common'
interface Props {
    name: string
    size: string
    color: string
}

const props = withDefaults(defineProps<Props>(), {
    name: '',
    size: '18px',
    color: '#000000',
})

const s = `${props.size.replace('px', '')}px`
const iconName = computed(() => `#${props.name}`)
const iconStyle = computed((): CSSProperties => {
    return {
        fontSize: s,
    }
})
const isUrl = computed(() => isExternal(props.name))
const urlIconStyle = computed(() => {
    return {
        width: s,
        height: s,
        mask: `url(${props.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
    }
})
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: v-bind(color);
    overflow: hidden;
}
</style>
