<template>
  <el-container>
    <el-aside :class="{ shrink: apperStore.statechange, unfold: !apperStore.statechange }">
      <el-scrollbar height="100%">
        <LeftMenu></LeftMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <TopMenu></TopMenu>
      </el-header>
      <el-main>
        <el-scrollbar height="100%">
          <RouterView></RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useApperStore } from '@/stores'
const apperStore = useApperStore()
import LeftMenu from '@/components/menu/LeftMenu.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #333333;
  will-change: transform;
  backface-visibility: hidden;
  transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -moz-transition: width 0.5s;
  -o-transition: width 0.5s;
  animation: 0.5s linear !important;
}

.el-header {
  width: 100%;
  display: flex;
  align-items: center;
}

.el-main {
  width: 100%;
  height: 100%;
  background-color: #eef2fa;
  overflow: hidden;
}

// 收缩
.shrink {
  width: 90px;
  animation: hide 0.5s linear !important;
}

// 展开
.unfold {
  width: 230px;
  animation: show 0.5s linear !important;
}

@keyframes hide {
  from {
    filter: blur(3px);
  }

  to {
    filter: blur(5px);
  }
}

@keyframes show {
  from {
    filter: blur(3px);
  }

  to {
    filter: blur(5px);
  }
}
:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
