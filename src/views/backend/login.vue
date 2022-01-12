<template>
    <div>
        <div id="bubble" class="bubble">
            <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
        </div>
        <div class="login">
            <div class="login-box">
                <div class="head">
                    <img src="~assets/login-header.png" alt="" />
                </div>
                <div class="form">
                    <img class="profile-avatar" src="~assets/avatar.png" alt="" />
                    <div class="content">
                        <el-form ref="formRef" :rules="rules" size="large" :model="form">
                            <el-form-item prop="username">
                                <el-input ref="username" type="text" clearable v-model="form.username" placeholder="请输入账号">
                                    <template #prefix>
                                        <i class="iconfont icon-user"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input ref="password" v-model="form.password" type="password" placeholder="请输入密码" show-password>
                                    <template #prefix>
                                        <i class="iconfont icon-unlock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-row :gutter="15">
                                    <el-col :span="18">
                                        <el-input ref="code" type="text" placeholder="请输入验证码" v-model="form.code" clearable autocomplete="off">
                                            <template #prefix>
                                                <i class="iconfont icon-ellipsis"></i>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <span>1234</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-checkbox v-model="form.keep" label="保持会话" size="default"></el-checkbox>
                            <el-form-item>
                                <el-button :loading="form.loading" class="submit-button" round type="primary" size="large" @click="onSubmit(formRef)">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import * as pageBubble from '/@/utils/pageBubble'
import type { ElForm } from 'element-plus'

const formRef = ref<InstanceType<typeof ElForm>>()
const form = reactive({
    username: '',
    password: '',
    code: '',
    keep: false,
    loading: false,
})

// 表单验证规则
const rules = reactive({
    username: [
        {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
        },
        {
            min: 3,
            message: '账号长度必须大于3位',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 32,
            message: '密码长度必须在6到32位之间',
            trigger: 'blur',
        },
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
        },
        {
            min: 4,
            max: 6,
            message: '验证码长度必须在4到6位之间',
            trigger: 'blur',
        },
    ],
})

onMounted(() => {
    setTimeout(() => {
        pageBubble.init()
    }, 1000)
    const vm: any = getCurrentInstance()
    if (form.username === '') {
        vm.ctx.$refs.username.focus()
    } else if (form.password === '') {
        vm.ctx.$refs.password.focus()
    } else if (form.code === '') {
        vm.ctx.$refs.code.focus()
    }
})

onBeforeUnmount(() => {
    pageBubble.removeListeners()
})

const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            form.loading = true
            console.log(form)
        } else {
            console.log('error submit!')
            return false
        }
    })
}
</script>

<style scoped lang="scss">
.bubble {
    overflow: hidden;
    background: url(/@/assets/bg.jpg) repeat;
}
.login {
    position: absolute;
    top: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: flex-start;
    justify-content: center;
    .login-box {
        overflow: hidden;
        width: 430px;
        padding: 0;
        background: #fff;
        margin-top: 130px;
    }
    .head {
        background: #ccccff;
        img {
            display: block;
            width: 430px;
            margin: 0 auto;
            user-select: none;
        }
    }
    .form {
        position: relative;
        .profile-avatar {
            display: block;
            position: absolute;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: 4px solid #fff;
            top: -50px;
            right: 175px;
            z-index: 2;
            user-select: none;
        }
        .content {
            padding: 100px 40px 40px 40px;
        }
        .submit-button {
            width: 100%;
            letter-spacing: 2px;
            font-weight: 300;
            margin-top: 15px;
        }
    }
}

@media screen and (max-width: 720px) {
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        .login-box {
            width: 340px;
            margin-top: 0;
        }
    }
}
</style>
