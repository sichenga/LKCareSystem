<template>
    <!-- 护理服务 -->
  <el-card style="max-width: 100%">
    <el-button type="primary"  @click="isdialog = true">新增服务</el-button>
        <ServeDialog @close="close" v-if="isdialog"></ServeDialog>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text >编辑</el-button>
                <el-button type="primary" text @click="del">删除</el-button>
            </template>
        </MayTable>
  </el-card>
</template>
<script lang="ts" setup>
import { ref,reactive,defineAsyncComponent,onMounted } from 'vue'
import ServeView from '@/database/ServeView.json'
import ServeDialog from '@/components/dialog/ServeDialog.vue';
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))

const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号',
            width:'60'
        },
        {
            prop: 'name',
            label: '服务名称',
            width:'100'

        },
        {
            prop: 'describe',
            label: '服务描述'
        },
     

    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = ServeView
    }, 1000)
}
onMounted(() => {
    getlist()
})
//弹出框
const isdialog = ref(false)
const close = () => {
  isdialog.value = false
}
//删除
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const del = async () => {
  let res = await getMessageBox('是否确认删除该服务', '删除后将不可恢复')
  console.log(1111, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
</script>

<style lang="less" scoped>
.el-button {
    margin-bottom: 20px;
}
</style>