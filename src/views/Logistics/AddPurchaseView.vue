<template>
  <!-- 编辑采购申请 -->
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary">选择食材</el-button>
      <div class="quantity">
        1
      </div>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :label="'采购数量'">
      <template #custom="data">
        <el-input v-model="data.data.creators" style="width: 130px"></el-input>
      </template>
      <template #operate>
        <el-button type="primary" text @click="del">删除</el-button>
      </template>
    </MayTable>
    <div class="title-image">
      <div>
        合计：采购品种数9，采购总成本：1000.00
      </div>
      <div class="image">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item label="期望到货日期">
            <el-select v-model="form.region" placeholder="请选择">
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
  <div class="button-body">
    <el-button class="btn-body" @click="back">返回</el-button>
    <el-button type="primary" class="btn-body" @click="confirm">保存</el-button>
    <el-button type="primary" class="primary" @click="save">保存并提交</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import {useRouter} from 'vue-router'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const router = useRouter()
const form = reactive({

  region: '',

})
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '物料名称'
    },
    {
      prop: 'address',
      label: '单位'
    },
    {
      prop: 'manager',
      label: '供应商'
    },
    {
      prop: 'phone',
      label: '批发价'
    },
    {
      prop: 'creator',
      label: '零售价'
    },
    {
      prop: 'addtime',
      label: '采购价'
    },

  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}

const del =async () => {
  let res =await getMessageBox('是否确认删除该采购申请', '删除后将不可恢复')
 
  if(res){
    ElMessage.success('删除成功')
  }else{
    ElMessage.info('取消删除')
  }
  
}
const back = () =>{
  router.push('/dashboard/apply')
}
const confirm = ()=>{
    router.push('/dashboard/apply')
}
const save = ()=>{
  router.push('/dashboard/examine')
} 
onMounted(() => {
  getlist()
})
</script>
<style lang="less" scoped>
.el-input {
  height: 40px;
}

.el-button {
  height: 40px;
  line-height: 40px;
}

.quantity {
  position: relative;
  font-family: Helvetica, Arial;
  width: 14px;
  height: 14px;
  top: -50px;
  left: 65px;
  line-height: 14px;
  text-align: center;
  font-size: 10px;
  background-color: #fff849
}

.title-image {
  margin-top: 20px;

  .image {
    margin: 50px 0;
    .el-form-item{
      width: 230px;
      height: 20px;
    }
  }
}

.button-body {
  margin: 70px 740px;
  display: flex;

  .btn-body {
    width: 160px;
    height: 40px;
  }

  .primary {
    width: 220px;
    height: 40px;
  }
}
</style>