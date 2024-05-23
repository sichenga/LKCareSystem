<template>
  <!-- dialog写在market文件夹下 -->

  <el-card>
    <div>计划任务</div>
    <el-radio-group v-model="form.type">
      <el-radio v-for="item in typedata" :key="item" :value="item" @change="selectdata">{{
        item
      }}</el-radio>
    </el-radio-group>
    <div style="margin-top: 30px">
      <MayTable
        :tableData="data.tableData"
        :tableItem="data.tableItem"
        :isoperate="false"
        :isShowHeader="form.type !== '日循环' ? true : false"
        :identifier="'schedule'"
      ></MayTable>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { elderlyTaskgetTask } from '@/service/old/elderlytask/ElderlyTaskApi'
import MayTable from '@/components/table/MayTable.vue'
import times from '@/database/date/time.json'
import month from '@/database/date/month.json'
import week from '@/database/date/week.json'
const route = useRoute()
let schid = route.query?.id
const typedata = ['日循环', '周循环', '月循环']
const time = ref<Array<string>>(times)
const date: any = reactive({
  week,
  month
})

const form: any = reactive({
  elderlyId: 0,
  serviceId: 0,
  startTime: '',
  endTime: '',
  week: '',
  day: '',
  type: '日循环'
})
const data = reactive({
  tableData: [] as any,
  tableItem: [
    { label: '', prop: 'time', width: '100px' },
    { label: '', prop: 'task' }
  ] as any
})
// 处理小时
// const gettime = () => {
//   for (let i = 0; i < 24; i++) {
//     time.value[i] = i > 12 ? `下午${i}时` : `上午${i}时`
//   }
//   console.log(time)
// }
// 处理月
// const getmonth = () => {
//   for (let i = 0; i < 30; i++) {
//     date.month[i] = i + 1 + '号'
//   }
//   console.log(date.month)
// }
// 任务数据
const getlist = async (typedata: any = '') => {
  let res: any = await elderlyTaskgetTask(Number(schid))
  console.log('任务列表', res)
  if (res?.code == 10000) {
    // data.tableData = time.value.map((item: any, index: number) => ({
    //   time: item,
    //   task: res.data.list.find(
    //     (item1: any) =>
    //       item1.type == form.type && item1.startTime.split(':')[0] == disposetime(String(index))
    //   )
    // }))
    let arr: any = []
    console.log(4444, form[typedata])
    console.log(time.value)
    time.value.forEach((item: any, index: number) => {
      let obj: any = {
        time: item
      }
      if (typedata !== '') {
        console.log('typedata', typedata)
        date[typedata].forEach((item1: any) => {
          obj[item1] = res.data.list.find(
            (item2: any) =>
              item2.type == form.type &&
              item2.startTime.split(':')[0] == disposetime(String(index)) &&
              item2.week == item1
          )
        })
      } else {
        obj.task = res.data.list.find(
          (item1: any) =>
            item1.type == form.type && item1.startTime.split(':')[0] == disposetime(String(index))
        )
      }
      arr.push(obj)
    })
    data.tableData = arr
    console.log(data.tableData)
  }
}
// 选择类型
const selectdata = (val: string) => {
  console.log(val)
  let str = ''
  let obj = { label: '', prop: 'time', width: '100px' }
  if (val == '日循环' ) {
    data.tableItem = [obj, { label: '', prop: 'task' }]
    str = ''
  } else if (val == '周循环') {
    data.tableItem = [obj, ...date.week.map((item: any) => ({ label: item, prop: item }))]
    str = 'week'
  } else {
    data.tableItem = [obj, ...date.month.map((item: any) => ({ label: item, prop: item }))]
    str = 'month'
  }
  getlist(str)
}

// 处理时间
const disposetime = (time: string) => {
  return time.length < 2 ? time.padStart(2, '0') : time
}
// 管理
const Api = () => {
  getlist()
}
onMounted(() => {
  Api()
})
</script>

<style scoped></style>
