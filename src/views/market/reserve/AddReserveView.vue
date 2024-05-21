<template>
    <!-- 新增预定 -->
    <el-card>
        <div class="title">
            <div><i>▋</i> 预定信息</div>
        </div>
        <el-form :inline="true" label-position="top" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="预定人姓名：" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="预定人电话:" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="与老人关系:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="预定床位:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="开始日期:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="预定时长（天）:" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="定金应收:" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
        </el-form>
        <div class="title" style="margin-top: 20px;">
            <div><i>▋</i> 预定协议</div>
        </div>
        <div class="box">
            <UploadPictures :limit="3" :istip="false" :text="'上传协议'" class="uploadpic" @upload="pictureupload"
                @uploadrem="picturerem" :showlist="getUploadPictures"></UploadPictures>
            <el-button class="download">下载预定协议</el-button>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <el-button type="primary">保存暂不提交</el-button>
            <el-button type="primary">保存并提交</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import type { UploadUserFile } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const getUploadPictures = ref<UploadUserFile[]>([])
const UploadPictures = defineAsyncComponent(() => import('@/components/upload/UploadPictures.vue'))
interface RuleForm {
    name: string
    region: string
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    region: '',
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
})

// 增加机构图片
const pictureupload = (val: any) => {
    console.log(val)
    // params.picture = (params.picture ? params.picture + ',' : '') + val?.url
    // console.log(params.picture)
}

// 移除机构图片
const picturerem = (val: any) => {
    console.log(val)
    // console.log()
    // params.picture = params.picture
    //     .split(',')
    //     .filter((item: any) => item !== val)
    //     .join(',')
    // console.log(1111, params.picture)
}
// 取消
const cancel = () => {
    router.push('/market/reserve')
}
</script>
<style lang="less" scoped>
.title {
    margin-left: 40px;
    margin-bottom: 30px;

    i {
        font-style: normal;
        color: #409eff;
    }
}

.el-form-item {
    margin-left: 40px;
    width: 479px;
}

.box {
    margin-left: 40px;
    width: 400px;
    position: relative;

    .download {
        position: absolute;
        top: -0.1px;
        left: 120px;
    }
}

.btn {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>
