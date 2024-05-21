<!-- 预定详情 -->
<template>
    <el-card>
        <div class="user_content">
            <!-- 头像 -->
            <div class="form">
                <el-image style="margin-top: 5px; width: 50px; height: 50px" :src="url" />
                <el-form label-width="120px" label-position="left" style="max-width: 600px; margin-left: 30px">
                    <div class="box">
                        <div>
                            <el-form-item label="老人姓名：">张三 </el-form-item>
                            <el-form-item label="身份证/护照号：">32062371887128122 </el-form-item>
                            <el-form-item label="床位号：">301-02</el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
            <div>
                <h2>预定待提交</h2>
            </div>
        </div>
    </el-card>
    <el-card style="margin-top: 15px">
        <div class="title">
            <div><i>▋</i> 预定信息</div>
        </div>
        <el-form label-position="left" label-width="auto" style="max-width: 600px; margin-left: 40px; ">
            <el-form-item label="预定人姓名：">
                张三丰
            </el-form-item>
            <el-form-item label="预定人电话：">
                1776808982
            </el-form-item>
            <el-form-item label="与老人关系：">
                父子
            </el-form-item>
            <el-form-item label="预定床位：">
                501-2
            </el-form-item>
            <el-form-item label="开始日期：">
                2020-02-09
            </el-form-item>
            <el-form-item label="预定时长（月）：">
                4
            </el-form-item>
            <el-form-item label="定金应收：">
                4000.00
            </el-form-item>
        </el-form>
        <div class="title">
            <div><i>▋</i> 预定协议</div>
        </div>
        <el-image style="width: 160px; height: 230px;margin-left: 40px; " :src="url" fit="fill" />
        <div style="margin-top: 20px ;text-align: center">
            <el-button @click="back">返回</el-button>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')


// 返回
const back = () => {
    router.push('/market/reserve')
}

</script>
<style lang="less" scoped>
.user_content {
    display: flex;
    justify-content: space-between;

    .form {
        display: flex;

        form {
            margin-left: 30px;
        }
    }

    h2 {
        margin-top: 50px;
        margin-right: 30px;
    }
}

.title {
    margin-left: 40px;
    margin-bottom: 30px;

    i {
        font-style: normal;
        color: #409eff;
    }
}
</style>