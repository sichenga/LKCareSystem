import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
// 持久化存储插件
const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia

// 导出所有store
export * from './mobule/user'
export * from './mobule/appearance'
