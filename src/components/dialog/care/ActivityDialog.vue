<template>
    <el-dialog v-model="dialogVisible" :title="porpos.id?'修改院内活动':'增加院内活动'" width="500" @close="close">
        <OldSelectDialog v-if="diaVisible" @close="closes" :isMultiple="isMultiple" :isoperate="isoperate"
            @serveList="serveList"></OldSelectDialog>
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
                <!-- <el-input v-model="ruleForm.elderly" /> -->
                <span v-if="OldName.length" >
                    {{ OldName }}
                </span>
                <el-button v-else type="primary" @click="oldAdd">选择老人</el-button>

            </el-form-item>
            <el-form-item label="精神慰藉内容：">
                <el-input v-model="ruleForm.content" />
            </el-form-item>
            <el-form-item label="上传图片：">
                <UploadPictures @upload="upload" :files="files"></UploadPictures>
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
import { ref, reactive, defineEmits, onMounted,defineProps } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getPlayTypeList, AddPlayAdd,PlayList,AddPlayUpdate } from '@/service/care/gooutApi'
import UploadPictures from '@/components/upload/UploadImg.vue'
import type { AddplayList } from '@/service/care/gooutType'
import OldSelectDialog from '@/components/dialog/OldSelect/OldSelectDialog.vue'
const Image = import.meta.env.VITE_BASE_URL+'/'
const porpos = defineProps({
    id:{
        type:Number,
        default:0
    }
})
console.log(porpos.id);

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


//活动分类列表
const TypeList = ref<any>([])
const getPlayType = async () => {
    let res: any = await getPlayTypeList().catch(() => { })
    if (res?.code == 10000) {
        TypeList.value = res.data.list
    }
}
//选择老人
const diaVisible = ref(false)
const isMultiple = ref(false)
const isoperate = ref(true)
const oldAdd = () => {
    diaVisible.value = true
    isMultiple.value = true
    isoperate.value = false
}
const closes = (val: any) => {
    diaVisible.value = val
}

//图片
const upImage = ref<any>([])
const upload = (val: any) => {
    upImage.value.push(val)
    ruleForm.pictures = upImage.value.map((item: any) => ({ picture: item }))
}
// 勾选老人的值
const OldName = ref([])
const serveList = (val: any) => {
    OldName.value = val.map((item: any) => (item.name))
    ruleForm.elderly = val.map((item: any) => ({
        elderlyId: item.id
    }))
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    const valid = await formEl.validate()
    if (valid) {
        let res:any;
        if(porpos.id){
            res = await AddPlayUpdate(ruleForm)
        }else{  
            res = await AddPlayAdd(ruleForm)
        }
        if(res?.code==10000){
            emit('close', true)
            ElMessage.success(porpos.id?'修改成功':'添加成功')
        }

    }
}
//获取单挑院内活动
const files = ref([])
const getList=async( )=>{
    if(porpos.id){
        let id=Number(porpos.id)
        let res:any=await PlayList(id)
        if(res?.code==10000){
            OldName.value=res.data.elderly.map((item:any)=>(item.elderlyName))
            files.value = res.data.pictures.map((item:any)=>({
                name:item.picture,
                url:Image+item.picture
            }))
            Object.assign(ruleForm,res.data) 
        }
    }
    
}

onMounted(async() => {
  await  getPlayType()  //活动分类列表
  await  getList()//获取单挑院内活动
})
</script>
<style lang="less" scoped>
.el-input {
    width: 300px;
}
</style>