<template>
    <div class="section">
        <div class="title">
            <div class="title-text">
                <span>▋</span>
                基础信息
            </div>
            <div class="title-btn">
                <el-button>取消</el-button>
                <el-button type="primary">保存</el-button>
            </div>
        </div>
        <div class="form-size">
            <el-form :inline="true" :rules="rules" label-position="top" :model="formInline" class="demo-form-inline">
                <el-form-item label="机构名称:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="地址:" prop="region">
                    <el-select v-model="formInline.region" placeholder="请选择" clearable>

                    </el-select>
                </el-form-item>
                <el-form-item label="对外服务电话:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="管理员姓名：" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="联系方式：" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="账号:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="密码:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="开业时间:" prop="region">
                    <el-select v-model="formInline.region" placeholder="请选择" clearable>

                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="title-text">
            <span>▋</span>
            经营信息
        </div>
        <div class="form-size">
            <el-form :inline="true" :rules="rules" label-position="top" :model="formInline" class="demo-form-inline">
                <el-form-item label="法人代表：">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="法人代表联系号码:">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="统一社会信用代码">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>

            </el-form>
            <el-form :inline="true" :rules="rules" label-position="right" :model="formInline" class="demo-form-inline">
                <el-form-item label="卫生许可证：">
                    <el-radio-group v-model="formInline.resource">
                        <el-radio value="1">是</el-radio>
                        <el-radio value="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否具备医疗定点资格：">
                    <el-radio-group v-model="formInline.resource">
                        <el-radio value="1">是</el-radio>
                        <el-radio value="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房屋性质：">
                    <el-radio-group v-model="formInline.resource">
                        <el-radio value="0">自有产权</el-radio>
                        <el-radio value="1">租赁</el-radio>
                        <el-radio value="2">合作使用</el-radio>
                        <el-radio value="3">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :rules="rules" label-position="top" :model="formInline" class="demo-form-inline">
                <el-form-item label="营业执照：">
                    <el-button type="primary" class='button'>
                        添加图片
                    </el-button>
                </el-form-item>
                <el-form-item label="机构图片:">
                    <el-button type="primary" class='button'>
                        添加图片
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import type { FormRules } from 'element-plus'
const formInline = reactive({
    user: '',
    region: '',
    date: '',
    resource: ''
})

const rules = reactive<FormRules<any>>({
    user: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
    ],
    region: [
        { required: true, message: 'Please select Activity zone', trigger: 'change' },
    ],
})
</script>
<style lang="less" scoped>
.section {
    width: 100%;
    height: 819px;
    background-color: #fff;
}

.title-text {
    margin: 40px;

    span {
        color: #409EFF;
    }
}

.title {
    display: flex;
    justify-content: space-between;
    height: 57px;



    .title-btn {
        margin: 40px;

        .el-button {
            width: 100px;
            height: 40px;
        }
    }

}

.el-form-item {
    width: 479px;
    margin-top: 40px;
    margin-left: 40px;

}

.el-form-item:nth-child(n+4) {
    margin-top: 20px;
}
.button{
    width: 92px;
    height: 40px;
}
</style>