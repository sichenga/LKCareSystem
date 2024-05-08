import './assets/main.css'

import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import '@/permission'
const app = createApp(App)
app.use(ElementPlus, {
  locale
})
app.use(router)
app.use(pinia)
app.mount('#app')
