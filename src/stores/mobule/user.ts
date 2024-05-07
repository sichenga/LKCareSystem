import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', ()=>{
    // token
    const token = ref('')
    return {
        token
    }
},{
  // 持久化
    persist: {
      storage:sessionStorage
    }
})
