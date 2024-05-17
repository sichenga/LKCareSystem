<template>
    <el-dialog v-model="dialogVisible" title="新增房间" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="房间号" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入房间号" />
            </el-form-item>
            <el-form-item label="房间类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option  v-for="(item,index) in state.getHouseTypelist" :key="index" :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="所属楼层" prop="buildingId">
                <el-cascader v-model="ruleForm.buildingId" :options="options" @change="handleChange" />
            </el-form-item>
            <el-form-item label="床位数" prop="beds">
                <el-input v-model="ruleForm.beds" placeholder="请输入床位数" />
            </el-form-item>
            <el-form-item label="房间图片">
                <MassUpload @upload="uploadimg" @uploadrem="uploadrem" :showlist="getMassUpload"></MassUpload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineAsyncComponent, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const MassUpload = defineAsyncComponent(() => import('@/components/upload/MassUpload.vue'))
import { addHouse,getHouseTypeList } from '@/service/config/HouseView'
import type { houseaddType,getHouseType } from '@/service/config/HouseViewType'


const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<houseaddType>({
    id:0,
    buildingId:null,
    type:null,
    name:'',
    beds:'',
    picture:''
})


const handleChange = (value: any) => {
    console.log(value)
}
const options = [
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                    {
                        value: 'efficiency',
                        label: 'Efficiency',
                    },
                    {
                        value: 'controllability',
                        label: 'Controllability',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
]

const rules = reactive<FormRules<houseaddType>>({
    name: [
        { required: true, message: '请输入房间号', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择房间类型', trigger: 'blur' },
    ],
    buildingId: [
        { required: true, message: '请选择楼栋', trigger: 'blur' },
    ],
    beds: [
        { required: true, message: '请输入床位数', trigger: 'blur' },
    ],

})
//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}
//图片
import type { UploadUserFile } from 'element-plus'
const getMassUpload = ref<UploadUserFile[]>([])
const uploadimg = (val: any) => {
    console.log('5555', val)
    ruleForm.picture = val?.url
}

// 移除营业执照
const uploadrem = () => {
    ruleForm.picture = ''
}
//获取房间类型
const paramsroom = reactive<getHouseType>({
    page:1,
    pageSize:5
})
const state = reactive({
    getHouseTypelist:[] as any
})
const getHouseTypelist =async()=>{
    const res:any = await getHouseTypeList(paramsroom)
    console.log('房间类型',res); 
    if(res.code===10000){
        state.getHouseTypelist = res.data.list
    } 
}
onMounted(() => {
    getHouseTypelist()
})
</script>

<style lang="less" scoped>
:deep.el-upload {
    width: 50px;
    height: 50px;
}

:deep .el-upload--picture-card {
    width: 100px;
    height: 100px;
}

:deep.el-cascader-panel {
    width: 100px;
}
</style>