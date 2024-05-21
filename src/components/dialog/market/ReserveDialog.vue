<template>
    <el-dialog v-model="dialogVisible" title="选择老人" width="700" @close="close">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="身份证号">
                <el-select v-model="formInline.region" placeholder="请输入" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
            <template #operate="{ data }">
                <el-button type="primary" v-if="data.isCarer == 0" @click="select(data)">选择</el-button>
                <el-button type="danger" v-else @click="select(data)">取消选择</el-button>
            </template>
        </MayTable>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import { staffList, careradd, updateList } from '@/service/staff/StaffApi'

import { ElMessage } from 'element-plus'
const identifier = 'Workers'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const data = reactive({

    tableData: [] as any,
    tableItem: [
        {
            prop: 'photo',
            label: '头像'
        },
        {
            prop: 'name',
            label: '姓名',
            width: '130'
        },
        {
            prop: 'departmentName',
            label: '性别',
          
        },
        {
            prop: 'roles',
            label: '身份证号',
            width:'200'
        },
    ]
})

// 选择取消选择
//选择的id  data.isCarer =1
const selectID: any = ref([])
const select = async (data: any) => {
    if (data.isCarer == 1) {
        data.isCarer = 0
        console.log(data);
        let res: any = await updateList(data).catch(() => { })
        if (res.code == 10000) {
            ElMessage.success('取消成功')
        }

    } else {
        data.isCarer = 1
        selectID.value.push(data.id)
    }
}
// 确定添加 护工
const add = async () => {

    let res: any = await careradd(selectID.value).catch(() => { })
    console.log(res);
    if (res.code == 10000) {
        ElMessage.success('添加成功')
        close(true)
    } else if (res.code == 10001) {
        ElMessage.error('请选择员工')
    }
}
// 查询

//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}


</script>

<style lang="less" scoped>
.demo-form-inline .el-input {
    --el-input-width: 150px;
}

.demo-form-inline .el-select {
    --el-select-width: 150px;
}
</style>