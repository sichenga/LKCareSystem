<template>
    <!-- 房间管理 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-form-item label="房间号">
                <el-input v-model="params.name" placeholder="请输入房间号" clearable />
            </el-form-item>
            <el-form-item label="楼栋">
                <el-cascader v-model="floorArr" :options="options" @change="handleChange" :props="defaultProps" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%;margin-top: 20px;">
        <el-button type="primary" @click="add" class="btn">新增房间</el-button>
        <RoomDialog @close="close" v-if="isdialog" :datail="datail"></RoomDialog>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate="{ data }">
                <el-button type="primary" text @click="handleEdit(data)">编辑</el-button>
                <el-button type="primary" text @click="handleDelete(data.id)">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="data.total" @page="page" @psize="psize" :page="params.page" :pszie="params.page">
        </Pagination>
    </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import RoomDialog from '@/components/dialog/config/RoomDialog.vue';
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
//房间列表
import { getHouseList, deleteHouse, buildingList } from '@/service/config/ConfigApi'
import type { HouseViewType } from '@/service/config/ConfigType'

import { TreeData } from '@/utils/utils'
const defaultProps = {
    children: 'children',
    value: 'id',
    label: 'name',
}
const floorArr = ref([])
const handleChange = () => {
   // params.value.buildingId = floorArr.value.join(',')
}
// 获取楼栋列表
const getbuildingList = async () => {
    let res: any = await buildingList().catch(() => { })
    console.log(33, res);
    if (res?.code === 10000) {
        // options.value=res.data.list
        // console.log(44444,options.value);
        options.value = TreeData(res.data.list)
    }
}
const options = ref<any>([])
const data = reactive({
    tableData: [] as any,
    total: undefined,
    tableItem: [
        {
            prop: 'id',
            label: '序号',
            width: '60'
        },
        {
            prop: 'buildingId',
            label: '房间号'
        },
        {
            prop: 'buildingName',
            label: '楼层'
        },
        {
            prop: 'beds',
            label: '床位数'
        },
        {
            prop: '',
            label: '入住老人'
        },

        {
            prop: 'addTime',
            label: '创建时间'
        },
        {
            prop: 'addAccountName',
            label: '创建人'
        }
    ]
})


const add = (() => {
    isdialog.value = true
    datail.value = {}
})
//弹出框
const isdialog = ref(false)
const close = () => {
    isdialog.value = false
}
//删除
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const handleDelete = async (id: number) => {
    console.log('删除', id)
    let res = await getMessageBox('是否确认删除该房屋', '删除后将不可恢复')
    console.log(11112, res)
    if (res) {
        const del: any = await deleteHouse(id)
        console.log('删除', del)
        if (del?.code === 10000) {
            ElMessage.success('删除成功')
            getHouselist()
        }
    } else {
        ElMessage.info('取消删除')
    }
}
//房间列表
const params = reactive<HouseViewType>({
    page: 1,
    pageSize: 5,
    name: ''
})
const getHouselist = async () => {
    const res: any = await getHouseList(params)
    console.log('房间列表', res);
    if (res.code === 10000) {
        data.tableData = res.data.list
        data.total = res.data.counts
    }

}
//分页
const page = (val: number) => {
    params.page = val
    getHouselist()
}
const psize = (val: number) => {
    params.pageSize = val
    getHouselist()
}
//查询
const search = () => {
    params.page = 1
    getHouselist()
}
//修改
const datail = ref<any>([])
const handleEdit = (data: any) => {
    isdialog.value = true
    datail.value = data
}
onMounted(() => {
    getbuildingList()
    getHouselist()
})
</script>

<style lang="less" scoped>
.btn {
    margin-bottom: 20px;
}
</style>