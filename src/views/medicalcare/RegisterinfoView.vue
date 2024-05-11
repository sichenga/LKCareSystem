<!-- 用药登记详情 -->
<template>
  <el-card>
    <div class="user_content">
      <!-- 头像 -->
      <el-image style="width: 80px; height: 80px" :src="url" />
      <el-form
        label-width="120px"
        label-position="left"
        style="max-width: 600px; margin-left: 30px"
      >
        <el-form-item label="老人：">张三 </el-form-item>
        <el-form-item label="身份证号：">32062371887128122 </el-form-item>
        <el-form-item label="床位">301-02</el-form-item>
      </el-form>
    </div>
  </el-card>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text @click="edit">编辑</el-button>
        <el-button type="primary" text @click="del">删除</el-button>
        <el-button type="primary" text @click="getinfo">查看详情</el-button>
      </template>
    </MayTable>
    <Pagination :total="50"></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
const isdialog = ref(false)
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '登记日期'
    },
    {
      prop: 'address',
      label: '登记药品品种数'
    },
    {
      prop: 'manager',
      label: '经办人'
    },
    {
      prop: 'phone',
      label: '家属'
    }
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}

// 新增
const add = () => {
  router.push({
    path: '/dashboard/AddRegisterInfo'
  })
}

// 编辑
const edit = () => {
  router.push({
    path: '/dashboard/AddRegisterInfo'
  })
}

// 查看详情
const getinfo = () => {
  router.push({
    path: '/dashboard/getregisterinfo'
  })
}

// 删除
const del = async () => {
  let res = await getMessageBox('是否确认删除该角色', '删除后将不可恢复')
  console.log(11112, res)
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
.el-input {
  height: 40px;
}
.el-button {
  height: 40px;
  line-height: 40px;
}
.user_content {
  width: 100%;
  display: flex;
}
</style>
