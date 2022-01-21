<template>
    <div>
        <el-input v-model="input"></el-input>
        <div class="dashboard">dashboard</div>
        <div class="dashboard" :style="{ background: '#fff' }">dashboard</div>
        1
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
</script>

<style>
.dashboard {
    height: 700px;
    width: 100px;
    background: #fff;
    color: #fff;
}
</style>
