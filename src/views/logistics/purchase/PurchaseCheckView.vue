<template>
    <!-- 收货验收 -->
    <el-card style="margin-top: 15px">
        <div class="body-top">
            <div class="body-size">
            <div>
                <div>创建时间：</div>
                <div>2020-02-02 15：00</div>
            </div>
            <div>
                <div>申请人：</div>
                <div>张三</div>
            </div>
            <div>
                <div>品种数：</div>
                <div>10</div>
            </div>
            <div>
                <div>实际采购成本：</div>
                <div>10000.00</div>
            </div>
        </div>
            <div class="size-ok">
                已提交
            </div>
        </div>
       
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem"  :isoperate="isshou">
    

        </MayTable>

        <div class="title-image">
            <div>
                到货凭证

            </div>
          <div class="image">
            <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover" />

          </div>
        </div>
    </el-card>
    <div class="button-body">
        <el-button class="btn-body" @click="router.push('/dashboard/apply')">返回</el-button>
    </div>
    
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import {useRouter} from 'vue-router'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const router = useRouter()

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
        {
            prop: 'creator',
            label: '采购数量'
        },
        {
            prop: 'creator',
            label: '采购实际数量'
        },
    ]
})
const isshou = ref(false)
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
.body-top{
    display: flex;
    justify-content: space-between;
    .size-ok{
        margin: 20px;
        font-size: 32px;
    }
}
.body-size{
    font-size: 14px;
    margin: 20px 0 20px 10px;
    div{
        width: 240px;
        display: flex;
  
        justify-content:space-between;
    }
}
.title-image{
    margin-top: 40px;
    .image{
        margin-top: 20px;
    }
    .el-image{
        width: 55px !important;
        height: 55px !important; 
    }
}
.button-body{
    margin: 70px  760px;
    .btn-body{
        width: 160px;
        height: 40px;
    }
}
</style>