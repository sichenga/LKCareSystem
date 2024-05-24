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
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入账号">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="ruleForm.pwd" show-password placeholder="请输入密码">
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="btn">
              <span>忘记密码?</span>
            </el-form-item>
            <el-form-item>
              <el-button type="success" style="width: 100%; height: 45px" @click="debounceLogin"
                >登录</el-button
              >
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
import type { Login } from '@/service/admin/AdminType'
import { useUserStore } from '@/stores'
import { debounce } from 'fastool'
const userStore = useUserStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Login>({
  username: '',
  pwd: ''
})
const rules = reactive<FormRules<Login>>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录
const submitForm = async () => {
  if (!ruleFormRef.value) return
  let valid = await ruleFormRef.value.validate()
  if (valid) {
    // 登录接口
    await userStore.Login(ruleForm)
  }
}
const debounceLogin = debounce(submitForm, 500)
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
