<template>
    <!-- 护理项目 -->
    <el-card style="max-width: 100%">
        <el-button type="primary" @click="isdialog = true">新增护理项目</el-button>
        <ProjectDialog @close="close" v-if="isdialog"></ProjectDialog>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text @click="del">删除</el-button>
                <el-button type="primary" text @click="serve">配置服务</el-button>
            </template>
        </MayTable>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import ProjectView from '@/database/ProjectView.json'
import ProjectDialog from '@/components/dialog/config/ProjectDialog.vue';
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号',
            width: '60'
        },
        {
            prop: 'project',
            label: '护理项目',
            width: '100'

        },
        {
            prop: 'shape',
            label: '任务形式'
        },
        {
            prop: 'frequency',
            label: '执行频次'
        },
        {
            prop: 'describe',
            label: '项目描述'
        },


    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = ProjectView
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
//配置服务跳转页面
const serve = () => {
    router.push('Industry')
}
</script>

<style lang="less" scoped>
.el-button {
    margin-bottom: 20px;
}
</style>