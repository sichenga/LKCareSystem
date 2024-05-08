<template>
  <div>
    <div class="top-body">
      <el-card style="width: 377px;height: 188px;margin: 20px;">
        <div class="visit">访问量</div>
        <div class="picon">9999,555</div>
        <div class="picon1">
          <div class="piconsize">总计访问量</div>
          <div>
            88万
            <i class="iconfont icon-xiaoqi1"></i>
          </div>
        </div>
      </el-card>

      <el-card style="width: 377px;height: 188px;margin: 20px;">
        <div class="visit">下载</div>
        <div class="picon">33,555</div>
        <div class="picon1">
          <div class="piconsize">新下载</div>
          <div>
            10%
            <i class="iconfont icon-shuzihuobi"></i>
          </div>
        </div>
      </el-card>
      <el-card style="width: 377px;height: 188px;margin: 20px;">
        <div class="visit">收入</div>
        <div class="picon">999,666</div>
        <div class="picon1">
          <div class="piconsize">总收入</div>
          <div>
            10000
            <i class="iconfont icon-xiaolian"></i>
          </div>
        </div>
      </el-card>
      <el-card style="width: 377px;height: 188px;margin: 20px;">
        <div class="visit">活跃用户</div>
        <div class="picon">66,666</div>
        <div class="picon1">
          <div class="piconsize">最近一个月</div>
          <div>
            1000
            <i class="iconfont icon-chengyuan "></i>
          </div>
        </div>
      </el-card>

    </div>
    <div class="body">
      <el-card style="width: 1000px;height:460px;margin:0 20px;">
        <div id="main" style="width: 890px;height:350px">

        </div>

      </el-card>

      <el-card style="width: 590px;height:460px;margin:0 20px;">
        <div class="title">月访问数</div>
        <div class="add">同上期增长</div>
        <div class="progress">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="30" status="success" />
        </div>
        <div class="title">月访问数</div>
        <div class="add">同上期增长</div>
        <div class="progress">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="80" status="success" />
        </div>
        <div class="title">月访问数</div>
        <div class="add">同上期增长</div>
        <div class="progress">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="20" status="success" />
        </div>
      </el-card>
    </div>


  </div>
</template>
<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts';
const getEcharts = () => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: '访问量'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['访问量', '下载量', '平均下载量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '下载量',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },

      {
        name: '平均下载量',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  option && myChart.setOption(option)
}

onMounted(() => {
  getEcharts()
})
</script>
<style lang="less" scoped>
@import url('@/assets/font_iocn/iconfont.css');

ul li {
  list-style: none;
}

.top-body {
  display: flex;

  .visit {
    margin: 6px;
    font-size: 14px;
  }

  .picon {
    margin-top: 30px;
    font-size: 25px;
  }

  .picon1 {
    display: flex;
    font-size: 14px;
    margin-top: 25px;
    justify-content: space-between;
  }

  .box-size {
    margin: 20px;
    width: 277px;
    height: 158px;
    background-color: red;
  }
}

.body {
  display: flex;
  .title{
    margin-bottom: 10px ;
    font-size: 13px;
  }
  .add{
    font-size: 13px;
  }
  .progress{
    margin: 20px 0;
  }
}
</style>
