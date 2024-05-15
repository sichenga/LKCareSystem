<template>
    <!-- //回访记录 -->
    <el-card style="margin-top: 15px" class="section">
        <div class='body'>
            <div class="body-title">
                <div>咨询类型：线下咨询</div>
                <div>咨询渠道：来访登记</div>
                <div>咨询人：黄虎</div>
                <div>联系方式： 1776809092</div>
                <div>与老人关系： 父子</div>
            </div>
            <div class="body-title-size">
                <div>登记日期： 2002-02-02 15：00</div>
                <div>登记人：张三</div>
                <div>计划回访日期：2020-02-02</div>
                <div>回访状态：待回访</div>
            </div>
        </div>
    </el-card>
    <el-card style="margin-top: 15px" class="section">
        <div class="title">
            <div>
                <span>▋</span> 回访记录 
            </div>
            <div>
                <el-button type="primary">新增回访</el-button>
            </div>
        </div>
        <el-timeline style="width: 500px;margin-top: 50px;" >
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" >
                <template #dot>
                    <el-avatar :icon="UserFilled" />
                </template>
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>

    </el-card>
    <div class="title-btn">
        <el-button>返回</el-button>
    </div>

</template>
<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'

const activities = [
  {
    content:'2020-02-02 15：00', 
    timestamp: '回访记录：老人需要有更好的居住环境，但是目前的条件无法满足其需求！计划回访日期：2020-02-02 16：00',
  },
  {
    content: '2020-02-01 15：00',
    timestamp:'回访记录：老人需要有更好的居住环境，但是目前的条件无法满足其需求！计划回访日期：2020-02-02 16：00',
  },
  {
    content: '2020-02-01 15：00',
    timestamp:'回访记录：老人需要有更好的居住环境，但是目前的条件无法满足其需求！计划回访日期：2020-02-02 16：00',
  },
  {
    content:'2020-02-01 15：00',
    timestamp:'回访记录：老人需要有更好的居住环境，但是目前的条件无法满足其需求！计划回访日期：2020-02-02 16：00',
  },
]


</script>
<style lang="less" scoped>
.section {
    width: 100%;
    background-color: #fff;
}

.body {
    display: flex;

    .body-title {
        div {
            margin-top: 10px;
        }
    }

    .body-title-size {
        margin-left: 120px;

        div {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
}
:deep(.el-timeline-item__dot){

        margin: -15px !important;
}
:deep(.el-timeline-item__wrapper){
    top: -20px;
    left: 30px
}
.title {
    margin: 30px;
    display: flex;
    justify-content: space-between;

    span {
        color: #409EFF;
    }
}



.el-timeline{
    margin-top: 20px;
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