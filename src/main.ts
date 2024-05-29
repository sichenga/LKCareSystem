import './assets/main.css'
import 'default-passive-events'
import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/utils/browserPatch'
import '@/permission'
export const app = createApp(App)
console.log(app);

app.use(ElementPlus, {
  locale
})
app.use(router)
app.use(pinia)
app.mount('#app')
