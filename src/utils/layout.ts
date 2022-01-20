import { CSSProperties } from 'vue'
import { store } from '/@/store/index'

/**
 * main高度
 * @param extra main高度额外减去的px数,可以实现隐藏原有的滚动条
 * @returns CSSProperties
 */
export function mainHeight(extra: number = 0): CSSProperties {
    let height = 75 + extra
    return {
        height: 'calc(100vh - ' + height.toString() + 'px)',
    }
}
