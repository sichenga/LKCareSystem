<template>
    <!-- 档案管理 -->
    <el-card>
          <!-- dialog写在market文件夹下 -->
        <div class="body-top">
            <div>
                <el-image style="width: 50px; height: 50px;margin-top: 11px;"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover" />
            </div>
            <div class="size-I-right">
                <div class="size-right">
                    <div>老人姓名:</div>
                    <div>张三</div>
                </div>
                <div class="size-right">
                    <div>身份证/护照号:</div>
                    <div>3293819982929212</div>
                </div>
                <div class="size-right">
                    <div>床位号:</div>
                    <div>504/01</div>
                </div>
            </div>
        </div>

    </el-card>
    <el-card style="margin-top: 15px">
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text>上传文件</el-button>
                <el-button type="primary" text>下载</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'

const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号',

        },
        {
            prop: 'name',
            label: '文件名'
        },
        {
            prop: 'address',
            label: '文件'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = AffiliatedView
    }, 1000)
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

.el-form--inline .el-form-item {
    width: 270px;
}
.body-top{
    display: flex;
    .size-I-right{
        margin-left: 55px;
        .size-right{
            display: flex;
            div{
                margin: 7px 0;
            }
            div:nth-child(1){
                width: 160px;
            }
        }
    }

}
</style>