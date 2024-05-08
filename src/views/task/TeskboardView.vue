<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="负责人">
        <el-input v-model="formInline.user" placeholder="请输入执行人姓名" clearable />
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select v-model="formInline.region" placeholder="请选择" style="width: 240px">
          <el-option
            v-for="item in statelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <!-- 选项 -->
    <div class="taskoption">
      <div
        :class="{ item: true, select: istask === index }"
        v-for="(item, index) in tasklist"
        :key="index"
        @click="change(index)"
      >
        <span
          >{{ item.name }} <span style="margin-left: 5px">({{ item.num }})</span></span
        >
      </div>
      <!-- 展示 -->
      <div class="tasklist">
        
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})
const istask = ref(0)
const statelist = ref([
  { label: '未开始', value: '0' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' }
])
const tasklist = [
  {
    name: '全部',
    num: 100
  },
  {
    name: '进行中',
    num: 80
  },
  {
    name: '已完成',
    num: 10
  },
  {
    name: '逾期未完成',
    num: 10
  }
]

// 选择标签
const change = (index: number) => {
  istask.value = index
}
</script>
<style lang="less" scoped>
.taskoption {
  width: 100%;
  height: 50px;
  display: flex;
  .item {
    width: 125px;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    // background-color: aqua;
    border-radius: 0 10px 0 0;
    border: 1px solid #ccc;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    // 变小手
    cursor: pointer;
  }
}
.tasklist{
  width: 100%;

}
// 选择
.select {
  color: #70c3ff;
}
</style>
