<template>
  <!-- dialog写在market文件夹下 -->
  <!-- 预定登记 -->
  <el-card style="max-width: 100%">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="老人姓名">
        <el-input v-model="formInline.name" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="formInline.idCard" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="预定床位">
        <el-cascader :options="options" :props="props" @change="handleChange" />
      </el-form-item>
      <el-form-item label="预定状态">
        <el-select v-model="formInline.mobile" placeholder="请选择" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="max-width: 100%;margin-top: 20px;">
    <el-button type="primary" style="margin-bottom: 20px;" @click="isdialog = true">新增</el-button>
    <ReserveDialog @close="close" v-if="isdialog"></ReserveDialog>

    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
      <template #operate="{ data }">
        <el-button type="primary" text @click="edit(data.id)">编辑</el-button>
        <el-button type="primary" text>提交预定</el-button>
        <el-button type="primary" text>取消预定</el-button>
        <el-button type="primary" text @click="del(data.id)">删除</el-button>
        <el-button type="primary" text @click="details(data.id)">详情</el-button>
        <el-button type="primary" text>转入院</el-button>
      </template>
    </MayTable>
    <Pagination :total="data.token" @page="page" @psize="psize" :page="formInline.page" :pszie="formInline.page">
    </Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { reservationList, reservationDelete } from "@/service/market/ReserveApi"
import { ConfigBuildingList, getHouseList, getBedsList } from "@/service/config/ConfigApi"
import type { ReservationParams } from "@/service/market/Reservetype"
import ReserveDialog from '@/components/dialog/market/ReserveDialog.vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const formInline = reactive<ReservationParams>({
  page: 1,
  pageSize: 10,
  name: '',
  idCard: '',
  mobile: '',
  begId: null,
})

const identifier = 'administration'
const data = reactive({
  token: undefined,
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'elderlyPhoto',
      label: '头像'
    },
    {
      prop: 'elderlyName',
      label: '老人姓名'
    },
    {
      prop: 'elderlyGender',
      label: '性别'
    },
    {
      prop: 'elderlyIdCard',
      label: '身份证号'
    },
    {
      prop: 'name',
      label: '预定人姓名'
    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
    {
      prop: 'relation',
      label: '与老人关系'
    },
    {
      prop: 'begName',
      label: '预定床位'
    },
    {
      prop: 'startDate',
      label: '开始日期'
    },
    {
      prop: 'addTime',
      label: '预定时长（月）'
    },
    {
      prop: 'amount',
      label: '已缴定金'
    },
    {
      prop: 'day',
      label: '剩余天数'
    },
    {
      prop: 'startDate',
      label: '登记日期'
    },
    {
      prop: 'stateName',
      label: '状态'
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

// 编辑
const edit = (id: any) => {
  console.log(id);
  router.push(`/market/reserve/edit/${id}`)
}

// 删除
const del = async (id: number) => {
  let res = await getMessageBox('是否确认删除该预定登记', '删除后将不可恢复')
  if (res) {
    const res: any = await reservationDelete(id)
    if (res.code == 10000) {
      ElMessage.success('删除成功')
      getList()
    }
  } else {
    ElMessage.info('取消删除')
  }
}

// 预定列表
const getList = async () => {
  const res: any = await reservationList(formInline)
  console.log('预定列表', res);
  if (res.code == 10000) {
    data.tableData = res.data.list
    data.token = res.data.counts
  }
}

// 详情
const details = (id: number) => {
  router.push(`/market/reserve/details/${id}`)
}
// 查询
const search = () => {
  formInline.page = 1
  getList()
}

// 分页
const page = (val: number) => {
  formInline.page = val
  getList()
}
const psize = (val: number) => {
  formInline.pageSize = val
  getList()
}
onMounted(() => {
  getList()
  // 预定
  reserve()
})

// 预定床位
// 级联选择器

const props = {
  children: 'children',
  value: 'id',
  label: 'name',
}

const handleChange = (value: any) => {
  console.log(value);
  if (value.length == 4) {
    formInline.begId = value[value.length - 1];
    console.log(formInline.begId);
  } else {
    formInline.begId = null;
  }
}

const options = ref([])

// 预定床位
const reserve = async () => {
  // 楼栋列表
  let building = await buildingList()
  // 房间列表
  let house = await houseList()
  // 床位列表
  let bed = await bedList()

  function convertToTree(flatData: any, pid: number = 0) {
    const children = flatData.filter((node: any) => node.pid == pid);
    if (!children.length) {
      return house.filter((item: any) => item.buildingId == pid).map((item: any) => ({
        id: item.id,
        name: item.name,
        pid: item.buildingId,
        children: bed.filter((bitem: any) => bitem.houseId == item.id).map((sitem: any) => ({
          id: sitem.id, name: sitem.name
        }))
      }))
    }
    return children.map((node: any) => ({
      ...node,
      children: convertToTree(flatData, node.id)
    }));
  }
  let tree = convertToTree(building, 0)
  console.log('数据', tree);
  options.value = tree
}

// 楼栋列表
const buildingList = async () => {
  const res: any = await ConfigBuildingList()
  console.log('楼栋列表', res);
  if (res.code == 10000) {
    return res.data.list
  }
}
// 房间列表
const houseList = async () => {
  const res: any = await getHouseList()
  console.log('房间列表', res);
  if (res.code === 10000) {
    return res.data.list
  }
}
// 床位列表
const bedList = async () => {
  const res: any = await getBedsList()
  console.log('床位列表', res);
  if (res.code === 10000) {
    return res.data.list
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
