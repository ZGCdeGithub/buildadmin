<template>
    <div class="page">
        <div class="container">
            <div class="font-h1">:(</div>
            <div class="tip">你的网页遇到了一些问题，系统正在优化和上报故障信息，我们在未来将改善和减少这种情况的发生.</div>
            <div class="complete">
                完成 <span class="percentage">{{ complete }}</span
                >%
            </div>
            <div class="details">
                <div class="qr-image">
                    <img src="~/assets/qr.png" alt="QR Code" />
                </div>
                <div class="stopcode">
                    <div class="stopcode-text">我们将在完成后自动返回到上一页。</div>
                    <div class="stopcode-text">
                        <router-link class="stopcode-a" to="">
                            <span @click="$router.back()">返回上一页</span>
                        </router-link>
                        <router-link class="stopcode-a" to="/">返回首页</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const complete = ref(0)
var timer: any = null

function process() {
    complete.value += Math.floor(Math.random() * 50)
    if (complete.value >= 100) {
        complete.value = 100
        router.back()
    } else {
        processInterval()
    }
}

function processInterval() {
    timer = setTimeout(process, Math.random() * (1000 - 500) + 500)
}

onMounted(() => {
    processInterval()
})
onBeforeUnmount(() => {
    clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #0078d7;
    color: #fff;
    .container {
        width: 50vw;
        .font-h1 {
            font-size: 120px;
        }
        .tip {
            font-size: 30px;
            padding-top: 20px;
        }
        .complete {
            font-size: 30px;
            padding: 30px 0;
        }
        .details {
            display: flex;
            align-items: center;
            .qr-image img {
                height: 80px;
                width: 80px;
            }
            .stopcode {
                padding-left: 10px;
                .stopcode-text {
                    display: block;
                    padding: 4px 0;
                    font-size: 16px;
                }
            }
        }
    }
}
.stopcode-a {
    font-size: 16px;
    color: #fff;
    padding-right: 16px;
}

@media screen and (max-width: 720px) {
    .container {
        width: 90vw !important;
    }
    .tip {
        font-size: 20px !important;
        padding-top: 20px;
    }
    .complete {
        font-size: 20px !important;
        padding: 30px 0;
    }
    .stopcode-text {
        font-size: 15px !important;
    }
}
</style>
