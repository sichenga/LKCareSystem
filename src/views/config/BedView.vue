<template>
    <!-- 床位管理 -->
    <div class="card-container">
        <el-card class="left-card" style="max-width: 15%">
            <div class="room-list">
                <p>房间列表</p>
                <ul>
                    <li>
                        <span>4楼</span>
                        <ul>
                            <li>401</li>
                            <li>402</li>
                            <li>403</li>
                            <li>404</li>
                        </ul>
                    </li>
                    <li>
                        <span class="floor">5楼</span>
                        <ul>
                            <li>501</li>
                            <li>502</li>
                            <li>503</li>
                            <li>504</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </el-card>
        <el-card class="right-card" style="max-width: 84%">
            <el-button type="primary" @click="isdialog = true">新增床位</el-button>
            <BerthDialog @close="close" v-if="isdialog"></BerthDialog>
            <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
                <template #operate>
                    <el-button type="primary" text>编辑</el-button>
                    <el-button type="primary" text @click="del">删除</el-button>
                </template>
            </MayTable>
            <Pagination :total="50"></Pagination>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import BerthView from '@/database/BerthView.json'
import BerthDialog from '@/components/dialog/config/BerthDialog.vue';
const identifier = 'Workers'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))

const data = reactive({

    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'bed',
            label: '床位号'
        },
        {
            prop: 'image',
            label: '入住老人'
        },
        {
            prop: 'price',
            label: '价格'
        },
        {
            prop: 'founder',
            label: '创建人'
        },
        {
            prop: 'addtime',
            label: '创建日期'
        },
        {
            prop: 'condition',
            label: '状态'
        },
    ]
})

const getlist = () => {
    setTimeout(() => {
        data.tableData = BerthView
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
    let res = await getMessageBox('是否确认删除该床位', '删除后将不可恢复')
    console.log(1111, res)
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
}
</script>

<style lang="less" scoped>
.card-container {
    display: flex;
    justify-content: space-between;
}

.left-card {
    flex: 1;
}

.right-card {
    flex: 1;
}

.el-button {
    margin-bottom: 20px;
}

:deep .el-image {
    border-radius: 50%;
}

.room-list ul {
    list-style-type: none;
    padding: 0;
}

.room-list ul li {
 
    margin: 20px 40px;
}

.room-list ul li span {
    font-weight: bold;
   
}
</style>