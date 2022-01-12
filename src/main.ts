import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import { registerElIcons } from '/@/utils/common'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/@/styles/base.scss'

const app = createApp(App)

registerElIcons(app)

app.use(router)
app.use(store, key)
app.use(ElementPlus)

app.mount('#app')
