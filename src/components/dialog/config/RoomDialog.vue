<template>
    <el-dialog v-model="dialogVisible" :title="ruleForm.id == 0 ? '新增房间' : '编辑房间'" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="房间号" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入房间号" />
            </el-form-item>
            {{ props.datail }}
            <el-form-item label="房间类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择" size="large" style="width: 240px">
                    <el-option v-for="item in state.getHouseTypelist" :key="item.value" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属楼层" prop="buildingId">
                <el-cascader v-model="floorArr" :options="options" @change="handleChange" :props="defaultProps" />
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
                <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineAsyncComponent, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const MassUpload = defineAsyncComponent(() => import('@/components/upload/MassUpload.vue'))
import { convertToTree } from '@/utils/treeUtils'
import { addHouse, HouseTypeList, buildingList, houseupdate } from '@/service/config/ConfigApi'
import type { houseaddType, getHouseType, } from '@/service/config/ConfigType'
const upload = import.meta.env.VITE_BASE_URL
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<houseaddType>({
    id: 0,
    buildingId: 0,
    type: null,
    name: '',
    beds: '',
    picture: null
})
const defaultProps = {
    children: 'children',
    value: 'id',
    label: 'name',
}
const floorArr = ref([])
const handleChange = () => {
    console.log(floorArr.value[floorArr.value.length-1]);
    
    ruleForm.buildingId = floorArr.value[floorArr.value.length-1]

}
const options = ref<any>([])

const rules = reactive<FormRules<houseaddType>>({
    name: [
        { required: true, message: '请输入房间号', trigger: 'blur' },
    ],
    buildingId: [
        { required: true, message: '请选择楼层', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择房间类型', trigger: 'blur' },
    ],

    beds: [
        { required: true, message: '请输入床位数', trigger: 'blur' },
    ],

})
// 获取楼栋列表
const getbuildingList = async () => {
    let res: any = await buildingList().catch(() => { })
    console.log(33, res);
    if (res?.code === 10000) {
        options.value = convertToTree(res.data.list)
    }
}
//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}

//获取房间类型
const paramsroom = reactive<getHouseType>({
    page: 1,
    pageSize: 5
})
const state = reactive({
    getHouseTypelist: [] as any
})
//获取房间类型
const getHouseTypelist = async () => {
    const res: any = await HouseTypeList(paramsroom)
    console.log('房间类型', res);
    if (res.code === 10000) {
        state.getHouseTypelist = res.data.list
    }
}
//添加
import { ElMessage } from 'element-plus'
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let res: any
            if (!ruleForm.id) {
                res = await addHouse(ruleForm)

            } else {
                //修改
                res = await houseupdate(ruleForm)
            }
            if (res.code == 10000) {
                ElMessage.success(res.msg)
                close(true)
            } else {
                ElMessage.error(res.msg)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}


//图片
import type { UploadUserFile } from 'element-plus'
const getMassUpload = ref<UploadUserFile[]>([])
// 添加营业执照
const uploadimg = (val: any) => {
    console.log('5555', val)
    ruleForm.picture = val?.url
}

// 移除营业执照
const uploadrem = () => {
    ruleForm.picture = ''
}
//修改
const props = defineProps(['datail'])
if (props.datail) {
    Object.assign(ruleForm, props.datail)
    if (props.datail.picture) {
        getMassUpload.value = [
            {
                url: upload + '/' + props.datail.picture,
                name: props.datail.picture,
            }
        ]
        console.log('图片回显', getMassUpload.value);
    }
}

onMounted(() => {

    getHouseTypelist()
    getbuildingList()
})
</script>

<style lang="less" scoped>
.el-input {
    width: 230px;
}
</style>