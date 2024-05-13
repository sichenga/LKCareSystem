<template>
  <!-- 价格分析 -->
  <!-- 详情 -->
  <div class="details">
    <div class="left">
      <div class="l">
        <div>食材名称：</div>
        <div>供应商：</div>
        <div>当前批发价：</div>
        <div>当前零售价：</div>
        <div>当前采购价：</div>
      </div>
      <div class="r">
        <div>蔬菜</div>
        <div>新民桥菜场</div>
        <div>100.00</div>
        <div>100.00</div>
        <div>105.00</div>
      </div>
    </div>
    <div class="right">
      <span>价格更新于：2020-02-02 15：00</span>
    </div>
  </div>
  <!-- 图表 -->
  <div class="chart">
    <div>价格趋势</div>
    <ECharts></ECharts>
  </div>
  <div class="table">
    <!-- 查询 -->
    <div class="demand">
      <div class="l">价格更新记录</div>
      <div class="r">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :isoperate="false"></MayTable>
  </div>
  <!-- 返回 -->
  <div class="back">
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import ECharts from '@/components/food/ECharts.vue'
import AnalysisView from '@/database/Analysas.json'
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const formInline = reactive({
  region: ''
})
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'Price',
      label: '价格更新日期'
    },
    {
      prop: 'trade',
      label: '批发价'
    },
    {
      prop: 'retail',
      label: '零售价'
    },
    {
      prop: 'purchase',
      label: '采购价'
    },
    {
      prop: 'regenerator',
      label: '更新人'
    }
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AnalysisView
  }, 1000)
}
onMounted(() => {
  getlist()
})
const back = () => {
  router.go(-1)
}
</script>

<style scoped lang="less">
.details {
  height: 200px;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 20px;

  .left {
    display: flex;

    .l {
      margin-right: 30px;
      line-height: 30px;
    }

    .r {
      line-height: 30px;
    }
  }
}

.chart {
  height: 505px;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.table {
  padding: 20px;
  background-color: #fff;

  .demand {
    height: 100px;
    display: flex;
    justify-content: space-between;

    .l {
      line-height: 100px;
    }

    .r {
      line-height: 115px;
    }
  }
}
.back {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>

<style>
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
