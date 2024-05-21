<template>
    <!-- dialog写在market文件夹下 -->
    <!-- 预定登记 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人姓名">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="预定床位">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="预定状态">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%;margin-top: 20px;">
        <el-button type="primary" style="margin-bottom: 20px;" @click="isdialog = true">新增</el-button>
        <ReserveDialog @close="close" v-if="isdialog"></ReserveDialog>

        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
            <template #operate>
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text>提交预定</el-button>
                <el-button type="primary" text>取消预定</el-button>
                <el-button type="primary" text>删除</el-button>
                <el-button type="primary" text>详情</el-button>
                <el-button type="primary" text>转入院</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import ReserveDialog from '@/components/dialog/market/ReserveDialog.vue';
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const identifier = 'administration'
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'image',
      label: '头像'
    },
    {
      prop: 'name',
      label: '老人姓名'
    },
    {
      prop: 'gender',
      label: '性别'
    },
    {
      prop: 'idCard',
      label: '身份证号'
    },
    {
      prop: 'begName',
      label: '预定人姓名'
    },
    {
      prop: 'stateName',
      label: '联系电话'
    },
    {
      prop: 'stateName',
      label: '老人姓名'
    },
    {
      prop: 'stateName',
      label: '与老人关系'
    }
  ]
})

//弹出框
const isdialog = ref(false)
const close = (val: boolean) => {

  isdialog.value = val
  if (val) {
    isdialog.value = false

  }
}
  // 删除
  const del = async () => {
    let res = await getMessageBox('是否确认删除该预定登记', '删除后将不可恢复')
    console.log(11112, res)
    if (res) {
      ElMessage.success('删除成功')
    } else {
      ElMessage.info('取消删除')
    }
  }

</script>

<style lang="less" scoped>
.demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 200px;
}
</style>