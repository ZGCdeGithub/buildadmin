import { loadCss } from './common'
const cssUrls: Array<string> = ['//at.alicdn.com/t/font_3135462_d9pvpnvg0bg.css']

export default function init() {
    if (cssUrls.length <= 0) {
        return false
    }
    cssUrls.map((v) => {
        loadCss(v)
    })
}
