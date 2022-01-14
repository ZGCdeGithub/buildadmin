import { nextTick } from 'vue'
import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import router from '/@/router/index'
/*
 * 全局注册element Plus的icon
 * 使用方式: <el-icon><el-icon-UserFilled /></el-icon>
 * 其中`UserFilled`为图标名称，请使用首字母大写驼峰规则
 */
export function registerElIcons(app: App) {
    const icons = elIcons as any
    for (const i in icons) {
        app.component(`el-icon-${icons[i].name}`, icons[i])
    }
}

/* 加载网络css文件 */
export function loadCss(url: string): void {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * 设置浏览器标题
 */
export function setTitle(t: any = null) {
    nextTick(() => {
        let webTitle = router.currentRoute.value.meta.title as any
        if (t) {
            webTitle = t(webTitle)
        }
        document.title = `${webTitle}`
    })
}
