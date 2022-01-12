import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfig } from 'vite'
import { isProd, loadEnv } from '/@/utils/vite'

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv()

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
    assets: pathResolve('./src/assets'),
}

// https://vitejs.cn/config/
const viteConfig: UserConfig = {
    plugins: [vue()],
    root: process.cwd(),
    resolve: { alias },
    base: isProd(process.env.NODE_ENV) ? VITE_PUBLIC_PATH : './',
    server: {
        host: '0.0.0.0',
        port: VITE_PORT,
        open: VITE_OPEN,
    },
}

export default viteConfig
