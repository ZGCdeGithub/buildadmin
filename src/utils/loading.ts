import { nextTick } from 'vue'
import '/@/styles/loading.scss'

export const loading = {
    show: () => {
        const bodys: Element = document.body
        const div = document.createElement('div')
        div.className = 'loading-small-circles'
        div.innerHTML = `
            <div class="loading-inner">
                <div class="small-circles circle-1"></div>
                <div class="small-circles circle-2"></div>
                <div class="small-circles circle-3"></div>
                <div class="small-circles circle-4"></div>
                <div class="small-circles circle-5"></div>
            </div>
        `
        bodys.insertBefore(div, bodys.childNodes[0])
    },
    hide: () => {
        nextTick(() => {
            const el = document.querySelector('.loading-small-circles')
            el && el.parentNode?.removeChild(el)
        })
    },
}
