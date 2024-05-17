<template>
    <!-- 楼层管理 -->
    <el-card style="max-width: 100%;">
        <el-button type="primary" @click="isdialog = true">新增楼层</el-button>
        <FloorDialog @close="close" v-if="isdialog"></FloorDialog>
        <el-tree style="max-width: 600px" :data="dataSource" show-checkbox node-key="id" default-expand-all
            :expand-on-click-node="false" :props="{ label: 'name', children: 'children' }">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="success" @clcik="add(data.id)" :icon="Plus" circle />
                        <el-button type="primary" :icon="Edit" circle />
                        <el-button type="danger" @click="del(data.id)" :icon="Delete" circle />
                    </span>
                </span>
            </template>
        </el-tree>
    </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import FloorDialog from '@/components/dialog/FloorDialog.vue';
import {
    Plus,
    Delete,
    Edit,
} from '@element-plus/icons-vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { ConfigBuildingList, delBuilding, BuildingAdd } from '@/service/config/ConfigApi'
import { convertToTree } from '@/utils/treeUtils'
//树形控件
const dataSource = ref<any[]>([])
const buildingList = async () => {
    let res: any = await ConfigBuildingList()
    if (res.code === 10000) {
        dataSource.value = convertToTree(res.data.list)
    }
}


//弹出框
const isdialog = ref(false)
const close = (val: boolean) => {
    isdialog.value = val
    if (val) {
        isdialog.value = false
        buildingList()
    }
}

//删除
const del = async (id: any) => {
    let res = await getMessageBox('是否确认删除该楼层', '删除后将不可恢复')
    if (res) {
        let list: any = await delBuilding(id)
        if (list.code === 10000) {
            buildingList()
            ElMessage.success('删除成功')
        }

    } else {
        ElMessage.info('取消删除')
    }
}
//添加楼栋
const add = (id: any) => {
    if (id) {
        isdialog.value = true
        let res: any = BuildingAdd(id)
        console.log(res);
        if (res.code == 10000) {
            buildingList()
            ElMessage.success('添加成功')
        }
    }
}

onMounted(() => {
    buildingList()
})
</script>

<style lang="less" scoped>
.custom-tree-node {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span:last-child {
        margin-left: 5px;
    }
}

:deep(.el-tree-node__content) {
    margin-bottom: 5px;
    height: 35px;
}
</style>