<template>
  <div class="top">
    <div class="left">
      <el-icon><Fold /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <div class="profile">
        <el-avatar :size="40" :src="circleUrl" />
        <div class="text">
          <span>张敏</span>
          <span>机构管理员</span>
        </div>
      </div>
      <!-- 退出 -->
      <el-icon><SwitchButton /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Fold, SwitchButton } from '@element-plus/icons-vue'
// 头像
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 24px;
    }
    .el-breadcrumb {
      height: 40px;
      line-height: 40px;
      margin-left: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: space-between;
    margin-right: 20px;
    .profile {
      display: flex;
      align-items: center;

      .el-avatar {
        margin-right: 10px;
      }
      .text {
        display: flex;
        flex-direction: column;
        span {
          font-size: 14px;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.el-icon {
  font-size: 20px;
}
</style>
