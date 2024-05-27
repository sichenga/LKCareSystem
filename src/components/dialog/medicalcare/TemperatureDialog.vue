<template>
  <el-dialog v-model="dialogVisible" :title="props.id?'修改':'添加'" width="500" @close="close">
    <el-form ref="ruleFormRef" style="max-width: 368px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" size status-icon>

      <el-form-item label="请选择测量体温的老人" prop="elderlyId" class="Special_line">
        <el-select v-model="ruleForm.elderlyId" placeholder="请选择" size="large">
          <el-option v-for="item in oldList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="老人体温" prop="val">
        <el-input v-model="ruleForm.val" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close(false)">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits,defineProps } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getElderlyList } from "@/service/old/OldApi"
import { TemperatureAdd,GetTemperature,TemperatureUpdate } from '@/service/medicalcare/MedicalcareApi'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const  props=defineProps({
    id:{
      type:Number,
      default: 0
    }
})
console.log(props.id);

//老人
let oldList = ref<any>([])

const ruleForm = reactive<any>({
  elderlyId: null,
  val: ''
})
const rules = reactive<FormRules<any>>({
  elderlyId: [
    {
      required: true,
      message: '请选择老人',
      trigger: 'change',
    },
  ],
})
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
  idCard: undefined,
  begId: undefined,
  state: undefined
})
//老人列表
const oldListDate = async () => {
  let res: any = await getElderlyList(params)
  if (res?.code == 10000) {
    oldList.value = res.data.list.map((item: any) => ({
      id: item.id,
      name: item.name
    }))
  }
}
//查询单挑体温
const TemperatureList=async()=>{
  let res:any =await GetTemperature(props.id)

  if(res?.code==10000){
    Object.assign(ruleForm,res.data)    
  }

}
//确定
const confirm = async () => {
  let res:any;
  if(props.id){
    res= await TemperatureUpdate(ruleForm)
  }else{
    res = await TemperatureAdd(ruleForm)
  }
  if (res?.code == 10000) {
    ElMessage.success(props.id?'修改成功':'添加成功')
    close(true)
  }
}
onMounted(async() => {
 await oldListDate()//老人列表
 await TemperatureList() //单挑体温
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