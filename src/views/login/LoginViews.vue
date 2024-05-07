<template>
  <el-container>
    <el-header>
      <el-image style="width: 300px; height: 70px" :src="logo" />
    </el-header>
    <el-main>
      <el-card class="card">
        <el-image style="width: 70%; height: 100%" :src="loginback" />
        <div class="right">
          <div class="title">
            <span>账号登录</span>
            <el-image style="width: 100px; height: 100px" :src="code" class="code" />
          </div>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="btn">
              <span>忘记密码?</span>
            </el-form-item>
            <el-form-item>
              <el-button type="success" style="width: 100%; height: 45px">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
    <el-footer>
      <span>Copyright @ 乐康养老 京ICP备15048223号-1</span>
    </el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { logo, loginback, code } from '@/utils/images'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({
  name: ''
})
const rules = reactive<FormRules<any>>({})
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  height: 100px;
  display: flex;
  align-items: center;
}

.el-main {
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  .card {
    width: 80%;
    height: 550px;
    :deep(.el-card__body) {
      width: 100%;
      height: 100%;
      padding: 0 !important;
      display: flex;
      align-items: center;
    }
    .right {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form {
        width: 80%;
        .el-input {
          height: 45px;
        }
      }
      .title {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        position: relative;
        margin-bottom: 20px;
        .code {
          position: absolute;
          right: 5px;
          top: 5px;
        }
        span {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}

.el-footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.btn {
  :deep(.el-form-item__content) {
    width: 100%;
    flex-direction: row-reverse;
    span {
      // 变小手
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
