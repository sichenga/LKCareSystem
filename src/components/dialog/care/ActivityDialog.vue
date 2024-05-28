<template>
    <el-dialog v-model="dialogVisible" title="增加院内活动" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" size status-icon>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="ruleForm.title" />
            </el-form-item>
            <el-form-item label="分类" prop="type" style="width: 250px;">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option v-for="item in TypeList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="老人：" prop="elderly">
                <el-input v-model="ruleForm.elderly" />

            </el-form-item>
            <el-form-item label="精神慰藉内容：">
                <el-input v-model="ruleForm.content" />
            </el-form-item>
            <el-form-item label="上传图片：">
                <UploadPictures></UploadPictures>
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close(false)">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getPlayTypeList } from '@/service/care/gooutApi'
import UploadPictures from '@/components/upload/UploadImg.vue'
import type { AddplayList } from '@/service/care/gooutType'
import OldSelectDialog  from '@/components/dialog/OldSelect/OldSelectDialog.vue'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<AddplayList>({  
    title: '',
    type: null,
    content: '',
    elderly: [],
    pictures: [],
})
const rules = reactive<FormRules<AddplayList>>({ 
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
        }
    ],
    type: [
        {
            required: true,
            message: '请选择类型',
            trigger: 'change',
        },
    ],
    elderly: [
        {
            required: true,
            message: '请选择老人',
            trigger: 'change',
        },
    ],
})
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
// 关闭弹窗
const close = (close: boolean = false) => {
    emit('close', close)
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    const valid = await formEl.validate()
    if (valid) {
        console.log('提交成功');

    }
}

//活动分类列表
const TypeList = ref<any>([])
const getPlayType = async () => {
    let res: any = await getPlayTypeList().catch(() => { })
    if (res?.code == 10000) {
        console.log(res);
        TypeList.value = res.data.list
    }
}
onMounted(() => {
    getPlayType()  //活动分类列表
})
</script>
<style lang="less" scoped>
.el-input {
    width: 300px;
}
</style>