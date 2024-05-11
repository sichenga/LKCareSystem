<template>
  <div class="title">
    <span v-if="!apperStore.statechange">机构中心端</span>
    <el-image v-else style="width: 80px; height: 50px" :src="url" />
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="apperStore.statechange"
    :collapse-transition="false"
    background-color="#333333"
    text-color="#ccc"
    active-text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Menu as IconMenu, Location, House } from '@element-plus/icons-vue'
import { useApperStore, useUserStore } from '@/stores'
const userStore = useUserStore()
const apperStore = useApperStore()
const url = 'https://s21.ax1x.com/2024/05/07/pkEqS4P.png'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 60px;
  background-color: #1b2a3f;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  span {
    font-weight: bold;
  }
}
.el-menu--collapse {
  width: 93px;
  animation: hide 0.2s linear !important;
  :deep(.el-sub-menu__title) {
    justify-content: center;
  }
}
@keyframes hide {
  from {
    width: 180px;
    filter: blur(3px);
  }

  to {
    // width: 2.5vw;
    width: 93px;
    filter: blur(5px);
  }
}
.el-menu {
  width: 180px;
  border-right: none;
}

:deep(.el-menu-item-group__title) {
  padding: 0 !important;
}
</style>
