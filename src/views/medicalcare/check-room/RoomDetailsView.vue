<!-- dialog写在medicalcare文件夹下 -->
<!-- 医生查房记录详情 -->
<template>
    <el-card>
        <div class="user_content">
            <!-- 头像 -->
            <el-image style="width: 80px; height: 80px" :src="url" />
            <el-form label-width="120px" label-position="left" style="max-width: 600px; margin-left: 30px">
                <div class="box">
                    <div>
                        <el-form-item label="老人：">张三 </el-form-item>
                        <el-form-item label="身份证号：">32062371887128122 </el-form-item>
                        <el-form-item label="床位">301-02</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="记录人">张三</el-form-item>
                        <el-form-item label="记录时间">2020-03-03</el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </el-card>
    <el-card style="margin-top: 15px">
        <el-form label-position="left" label-width="auto" style="max-width: 600px">
            <el-form-item label="查房记录内容">
            </el-form-item>
            <el-form-item label="| 基本情况">
            </el-form-item>
            <el-form-item label="精神">
                正常
            </el-form-item>
            <el-form-item label="饮食">
                正常
            </el-form-item>
            <el-form-item label="睡眠">
                正常
            </el-form-item>
            <el-form-item label="大便">
                正常
            </el-form-item>
            <el-form-item label="小便">
                正常
            </el-form-item>
            <el-form-item label="交流">
                正常
            </el-form-item>
            <el-form-item label="记忆">
                正常
            </el-form-item>
            <el-form-item label="| 生命特征">
            </el-form-item>
            <el-form-item label="体温">
                正常
            </el-form-item>
            <el-form-item label="脉搏">
                正常
            </el-form-item>
            <el-form-item label="呼吸">
                正常
            </el-form-item>
            <el-form-item label="血压">
                正常
            </el-form-item>
            <el-form-item label="| 医生建议">
            </el-form-item>
            <el-form-item label="身体状态不错！">
            </el-form-item>
        </el-form>
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
    router.push({
        path: '/medicalcare/check-room'
    })
}

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

.box {
    display: flex;

    div:nth-child(1) {
        margin-right: 100px;
    }
}
</style>