<template>
    <div>
        routine/config
        <el-input v-model="input2"></el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'routineConfig',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const input2 = ref('')
</script>
