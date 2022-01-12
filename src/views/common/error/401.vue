<template>
    <div class="page">
        <div class="container">
            <div class="fbi">401 WARNING</div>
            <div class="warning">
                这不是你想要的，但我们是认真的。我只是想用一种特殊的方式告诉你，你无权访问此页面，或者该文件无效。您可以联系网站管理员以更快地解决问题，或返回网站首页浏览其他页面。
            </div>
            <div class="page-footer">
                <el-button-group>
                    <el-button size="large" type="info">
                        <router-link class="stopcode-a" to="/">返回首页</router-link>
                    </el-button>
                    <el-button size="large" type="info">
                        <router-link class="stopcode-a" to="">
                            <span @click="$router.back()">返回上一页</span>
                        </router-link>
                    </el-button>
                </el-button-group>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    height: 100vh;
    width: 100vw;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.container {
    color: #fff;
    width: 60vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.fbi {
    display: inline-block;
    font-size: 80px;
    font-weight: bold;
    text-align: center;
    background: #aa0000;
    margin: 20px auto;
    padding: 0 30px;
}
.warning {
    font-size: 24px;
    width: 100%;
}
.warning:first-letter {
    font-size: 40px;
}
.page-footer {
    padding-top: 60px;
}
.stopcode-a {
    color: #fff;
    text-decoration: none;
}
@media screen and (max-width: 768px) {
    .container {
        width: 90vw;
    }
    .fbi {
        font-size: 50px;
        padding: 10px 30px;
    }
    .warning {
        font-size: 16px;
    }
    .warning:first-letter {
        font-size: 30px;
    }
}
</style>
