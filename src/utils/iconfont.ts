import { loadCss, loadJs } from './common'
const cssUrls: Array<string> = []
const jsUrls: Array<string> = []

export default function init() {
    if (cssUrls.length > 0) {
        cssUrls.map((v) => {
            loadCss(v)
        })
    }

    if (jsUrls.length > 0) {
        jsUrls.map((v) => {
            loadJs(v)
        })
    }
}
