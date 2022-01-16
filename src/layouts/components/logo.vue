<template>
    <div class="layout-logo">
        <img class="logo-img" src="~assets/logo.png" alt="logo" />
        <div class="website-name">BuildAdmin</div>
        <Icon name="el-icon-Fold" size="20" class="fold" />
    </div>
</template>
<style lang="scss">
.layout-logo {
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background: var(--color-bg-2);
}
.logo-img {
    width: 28px;
}
.website-name {
    padding-left: 4px;
    font-size: var(--el-font-size-extra-large);
    font-weight: 600;
}
.fold {
    color: var(--color-primary) !important;
    margin-left: auto;
}
</style>
