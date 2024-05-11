<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon label-position="top">
        <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限配置" prop="menuIds">
            <el-tree ref="treeRef" style="max-width: 600px" :data="data" show-checkbox :default-expand-all="false"
                node-key="id" highlight-current :props="defaultProps" />
        </el-form-item>
    </el-form>
    <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addlist"> 确定 </el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules,ElTree } from 'element-plus'
import { convertToTree } from '@/utils/treeUtils'
import { getList,Addroles } from '@/service/role/RoleApi'
const treeRef = ref<InstanceType<typeof ElTree>>()
interface RuleForm {
    name: string
    menuIds: string[]
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    menuIds: []
})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
    ],
    menuIds: [
        {
            type: 'array',
            required: true,
            message: '请选择权限',
            trigger: 'change',
        },
    ],
})

const defaultProps = {
    children: 'children',
    label: 'name',
}

const data: any = ref([])
const getlist = async () => {
    let res: any = await getList().catch(() => { })
    console.log(res);
    if (res.code == 10000) {
        data.value = convertToTree(res.data.list)

    }
}


const addlist =async ()=>{
//    let res =await Addroles(ruleForm)
    console.log(treeRef);
    console.log(treeRef.value?.getCheckedKeys());

}

onMounted(() => {
    getlist()
})
</script>
<style lang="less" scoped>
.el-input {
    width: 300px;
}

.el-select {
    width: 300px;
}
</style>