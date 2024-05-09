<template>
    <el-card style="margin-top: 15px" class="section">
        <div class='body'>
            <div class="body-title">
                <div>老人姓名： 张国峰</div>
                <div>性别：男</div>
                <div>身份证号：32030293023033</div>
                <div>老人状况： 健康</div>
            </div>
            <div class="body-title-size">
                <div>家属姓名： 张笑天</div>
                <div>联系方式：1776288238</div>
                <div>房间需求：需要干净整洁的单人间</div>
                <div>意向描述：需要尽快办理入住手续</div>
            </div>
        </div>
    </el-card>
    <el-card style="margin-top: 15px" class="section">
        <div style="margin: 10px 0">
            <el-button type="primary" @click='addRelation'>新增咨询</el-button>
        </div>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text @click="del">删除</el-button>
                <el-button type="primary" text @click="particulars">详情</el-button>
                <el-button type="primary" text @click="router.push('/dashboard/returnLeg')">回访记录</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>

    </el-card>
    <div class="title-btn">
        <el-button>返回</el-button>
    </div>
    <AddRelation v-if="dialogVisible" @close="Holedclose"></AddRelation>

    <Particulars v-if="dialogVisibles" @close="Holedcloses"></Particulars>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()
const AddRelation = defineAsyncComponent(() => import('@/components/dialog/consult/AddConsult.vue'))
const Particulars = defineAsyncComponent(() => import('@/components/dialog/consult/particulars.vue'))
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
            prop: 'name',
            label: '咨询类型'
        },
        {
            prop: 'address',
            label: '咨询渠道'
        },
        {
            prop: 'manager',
            label: '咨询人'
        },
        {
            prop: 'phone',
            label: '联系方式'
        },
        {
            prop: 'username',
            label: '与老人关系'
        },
        {
            prop: 'userpass',
            label: '登记人'
        },
        {
            prop: 'userpass',
            label: '计划回访日期'
        },
        {
            prop: 'userpass',
            label: '回访状态'
        },


    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = AffiliatedView
    }, 1000)
}
// 新增资讯
const dialogVisible = ref(false)
const addRelation = () => {
    dialogVisible.value = true
}

const Holedclose = (val: any) => {
    dialogVisible.value = val
}

//资讯详情
const dialogVisibles = ref(false)

const particulars = ()=>{
    dialogVisibles.value = true
}
const Holedcloses = (val: any) => {

    dialogVisibles.value = val
}
const del = async () => {
    let res = await getMessageBox('是否确认删除该咨询', '删除后将不可恢复')
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
}
onMounted(() => {
    getlist()
})

</script>
<style lang="less" scoped>
.section {
    width: 100%;
    background-color: #fff;
}

.body {
    display: flex;
    .body-title{
        div{
            margin-top: 10px;
        }
    }
    .body-title-size{
        margin-left: 400px;
        div{
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
}

.title-text {
    margin: 40px;

    span {
        color: #409EFF;
    }
}

.form-size {
    margin: 40px;
}

.title {
    display: flex;
    justify-content: space-between;
    height: 57px;
}

.form-size-box {
    margin-bottom: 120px;
}

.title-btn {
    margin: 40px 720px;

    .el-button {
        width: 100px;
        height: 40px;
    }
}




.button {
    width: 92px;
    height: 40px;
}
</style>