<template>
    <el-dialog v-model="dialogVisible" title="新增账号" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon label-position="top">
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="ruleForm.rolename" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="权限配置" prop="limits">
                <el-checkbox-group v-model="ruleForm.limits">
                    <el-tree style="max-width: 600px" :data="data" show-checkbox node-key="id" default-expand-all
                        :expand-on-click-node="false" :props="{ class: customNodeClass }" />
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)"> 确定 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
interface RuleForm {
    rolename: string
    limits: string[]
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    rolename: '',
    limits: []
})



const rules = reactive<FormRules<RuleForm>>({
    rolename: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
    ],
    limits: [
        {
            type: 'array',
            required: true,
            message: '请选择权限',
            trigger: 'change',
        },
    ],
})
//树状图
interface Tree {
    id: number
    label: string
    isPenultimate?: boolean
    children?: Tree[]
}

const customNodeClass = (data: Tree, node: Node) => {
    if (data.isPenultimate) {
        return 'is-penultimate'
    }
    return null
}

const data: Tree[] = [
    {
        id: 1,
        label: '首页',
    },
    {
        id: 2,
        label: '机构管理',
    },

    {
        id: 3,
        label: '账号设置',
        isPenultimate: true,
        children: [
            {
                id: 7,
                label: '账号管理',
            },
            {
                id: 8,
                label: '角色管理',
            },
            {
                id: 9,
                label: '账号设置',
            },
        ],
    },
]
//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}
</script>
<style lang="less" scoped>
.el-input {
    width: 300px;
}

.el-select {
    width: 300px;
}
</style>