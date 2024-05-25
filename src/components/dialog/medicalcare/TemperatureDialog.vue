<template>
  <el-dialog v-model="dialogVisible" title="新增/编辑药品" width="500" @close="close">
    <el-form ref="ruleFormRef" style="max-width: 368px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" size status-icon>

      <el-form-item label="请选择测量体温的老人" prop="name" class="Special_line">
        <el-select v-model="ruleForm.name" placeholder="请选择" size="large">
          <el-option v-for="item in oldList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="老人体温" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close(true)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getElderlyList } from "@/service/old/OldApi"
const ruleFormRef = ref<FormInstance>()


const ruleForm = reactive<any>({
  elderlyId: null,
  val: ''
})
const rules = reactive<FormRules<any>>({})
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
  emit('close', close)
}
//获取老人列表
const params = reactive({
  page: 1,
  pageSize: 999,
  name: '',
  idCard:undefined ,
  begId: undefined,
  state:undefined
})

//老人
let oldList = reactive<any>([{ value: '粒', label: '粒' }])
//老人列表
const oldListDate=async()=>{
  let res:any =await getElderlyList(params)
  console.log(res);
  
  if(res?.code==10000){
    oldList=res.data.list.map((item:any)=>({
        id:item.id,
        name:item.name
    }))
  }
}
onMounted(()=>{
  oldListDate()//老人列表
})
</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}

.Special_line {
  :deep(.el-form-item__content) {
    justify-content: space-between;

    .el-input {
      width: 140px;
    }

    .el-select {
      width: 140px;
    }
  }
}
</style>