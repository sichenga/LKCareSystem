<template>
    <!-- 账号设置 -->
    <el-card style="max-width: 100%">
        <div class="headbox">
            <el-form-item label="头像">
                <div class="header">
                    <img src="../../assets/image/1000.jpg" alt="">
                </div>
                <div class="replece">
                    更换头像
                </div>
            </el-form-item>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="auto" class="demo-ruleForm" :size="formSize"
            style="width: 300px;" status-icon>
            <el-form-item label="姓名">
                <el-input class="custom-input" v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input class="custom-inputtel" v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="账号">
                <el-input class="custom-input" v-model="ruleForm.account" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input class="custom-pass" v-model="ruleForm.pass" /> <span
                    style="color:#75a5ea ; font-size: 12px; padding-left: 20px;" @click="isdialog = true">修改密码</span>
                <PassDialog @close="close" v-if="isdialog"></PassDialog>
            </el-form-item>
            <el-form-item label="所属角色">
                <el-input class="custom-inputrole" v-model="ruleForm.role" />
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { ComponentSize, FormInstance, } from 'element-plus'
import PassDialog from '@/components/dialog/PassDialog.vue';
interface RuleForm {
    name: string,
    tel: string,
    account: string,
    pass: string,
    role: string

}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '张三',
    tel: '17768089870',
    account: 'zhangsan',
    pass: '123456',
    role: '机构管理员'
})

//弹出框
const isdialog = ref(false)
const close = () => {
    isdialog.value = false
}


</script>

<style lang="less" scoped>
.headbox {
    width: 300px;
    height: 50px;
    display: flex;
    margin-top: 30px;
    // .head {
    //     line-height: 50px;
    //     font-size: 12px;
    // }

    .header {
        width: 50px;
        height: 50px;
        margin-left: 20px;
        border-radius: 50%;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    .replece {
        color: #75a5ea;
        line-height: 50px;
        font-size: 12px;
        padding-left: 30px;

    }
}

.el-form {
    margin-top: 20px !important;
    margin-bottom: 20px !important;
}



:deep .custom-input .el-input__inner {
    color: #c3c3c3;
}

:deep .custom-inputtel .el-input__inner {
    color: #c3c3c3;
}

:deep .custom-inputrole .el-input__inner {
    color: #c3c3c3;
}

:deep .asterisk-left .el-form-item__label-wrap {
    margin-left: 0 !important;
}

:deep .custom-pass .el-input__inner {
    color: #c3c3c3;
}

.custom-inputtel {
    margin-left: 10px;
}

.custom-input {
    margin-left: 25px;
}

.custom-pass {
    width: 100px !important;
    margin-left: 25px;
}

.is-error {
    margin-bottom: 20px;
}
</style>