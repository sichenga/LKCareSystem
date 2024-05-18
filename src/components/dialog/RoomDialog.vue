<template>
    <el-dialog v-model="dialogVisible" title="新增房间" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="房间号" prop="buildingId">
                <el-input v-model="ruleForm.buildingId" placeholder="请输入房间号" />
            </el-form-item>
            {{ props.datail }}
            <el-form-item label="房间类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择" size="large" style="width: 240px">
                    <el-option v-for="item in state.getHouseTypelist" :key="item.value" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属楼层" prop="name">
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


import { TreeData } from '@/utils/utils'

import { addHouse, HouseTypeList, buildingList } from '@/service/config/ConfigApi'
import type { houseaddType, getHouseType,houseupdateType } from '@/service/config/ConfigType'
const upload = import.meta.env.VITE_BASE_URL
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<houseaddType>({
    id: 0,
    buildingId: '',
    type: null,
    name: '',
    beds: '',
    picture: ''
})
const defaultProps = {
    children: 'children',
    value: 'id',
    label: 'name',
}
const floorArr = ref([])
const handleChange = () => {
    ruleForm.name = floorArr.value.join(',')
    console.log(ruleForm.name);
}
const options = ref<any>([])

const rules = reactive<FormRules<houseaddType>>({
    buildingId: [
        { required: true, message: '请输入房间号', trigger: 'blur' },
    ],
    name: [
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
        // options.value=res.data.list
        // console.log(44444,options.value);
        options.value = TreeData(res.data.list)
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
        const res: any = await addHouse(ruleForm)
        console.log(res);

        if (valid) {
            if (res.code === 10000) {
                ElMessage({
                    type: 'success',
                    message: '添加成功'
                })
                close(true)
                getHouseTypelist()
            }
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

//图片
import type { UploadUserFile } from 'element-plus'
const getMassUpload = ref<UploadUserFile[]>([])
const uploadimg = (val: any) => {
    console.log('5555', val)
    ruleForm.picture = val?.url
}
//修改
const props = defineProps(['datail'])
if (props.datail) {
    Object.assign(ruleForm, props.datail)
    if (ruleForm.picture) {
        console.log(333, props.datail.picture);
        getMassUpload.value = ruleForm.picture.split(',').map((item: any) => ({
            url: upload + '/' + item,
            name: item
        }))
    }
    console.log(66, getMassUpload);
}
// 移除营业执照
const uploadrem = () => {
    ruleForm.picture = ''
}
onMounted(() => {
    getHouseTypelist()
    getbuildingList()
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