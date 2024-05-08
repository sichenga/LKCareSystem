<template>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chartContainer" style="width: 90%; height: 460px ;"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import * as echarts from 'echarts';
let chartContainer = ref(null);
let myChart: echarts.ECharts | null = null;
const initChart = () => {
    if (chartContainer.value) {
        myChart = echarts.init(chartContainer.value);
        const option: echarts.EChartsOption = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                },
            ],
        };
        myChart?.setOption(option);
    }
};

onMounted(() => {
    initChart(); // 在组件挂载后初始化图表
});

</script>

<style scoped></style>