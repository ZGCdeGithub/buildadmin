import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { store } from '/@/store/index'

/*
 * 默认只引入 element-plus 的中英文语言包
 * 其他语言包请自行在此 import,并添加到 elementLocale 内
 * 动态 import 只支持相对路径，所以无法按需 import element-plus 的语言包
 * 但i18n的 messages 内是按需载入的
 */
import elementZhcnLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'

const elementLocale = {
    'zh-cn': elementZhcnLocale,
    en: elementEnLocale,
}

export async function loadLang(app: App) {
    const locale = 'zh-cn'

    // 加载框架语言包
    const lang = await import(`./frame/${locale}.ts`)
    const message = lang.default ?? {}

    const messages = {
        [locale]: {
            ...message,
        },
    }

    // 合并 element-plus 的语言包
    Object.assign(messages[locale], elementLocale[locale])

    const i18n = createI18n({
        locale: locale,
        legacy: false, // 组合式api
        globalInjection: true, // 挂载$t,$d等到全局
        fallbackLocale: 'zh-cn',
        messages,
    })

    app.use(i18n)
    return i18n
}
