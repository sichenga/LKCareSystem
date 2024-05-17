<template>
  <el-dialog v-model="dialogVisible" title="新增楼层" width="500" @close="close">
    <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="楼层号" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入楼层号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps } from 'vue'
import {ElMessage} from 'element-plus'
import type { ComponentSize, FormInstance, FormRules} from 'element-plus'
import { BuildingAdd, Buildingupdate } from '@/service/config/ConfigApi'
import type { RuleForm } from '@/service/config/ConfigType'


const params = defineProps({
  pid: {
    type: Number,
    default: 0
  },
  id: {
    type: Number,
    default: 0
  }
})



const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id: params.id,
  name: '',
  pid: params.pid //楼栋父ID
})



const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入楼栋名称', trigger: 'blur' },
  ],

})


// 添加
const add = async () => {


  if (params.id >= 1) {
    //修改楼栋
    console.log('修改楼栋');
    
    let res: any = await Buildingupdate(ruleForm)
    console.log(res);
    if(res.code==10000){
      emit('close', true)
      ElMessage.success('修改成功')
    }
  } else {
    //添加楼栋
    console.log('添加楼栋');
    console.log(ruleForm);
    
    let res: any = await BuildingAdd(ruleForm)
    console.log(res);
    if (res.code == 10000) {
      emit('close', true)
      ElMessage.success('添加成功')
      
    }
  }
}


//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
  emit('close', close)
}
</script>

<style lang="less" scoped></style>