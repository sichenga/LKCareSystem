<template>
  <el-container>
    <el-aside :class="{ shrink: apperStore.statechange, unfold: !apperStore.statechange }">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-container>
      <el-header><TopMenu></TopMenu></el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
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
  background-color: #333333;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
}
.el-main {
  background-color: #eef2fa;
}

// 收缩
.shrink {
  width: 80px;
  animation: hide 0.2s linear !important;
}

// 展开
.unfold {
  width: 160px;
  animation: show 0.2s linear !important;
}

@keyframes hide {
  from {
    width: 160px;

    filter: blur(3px);
  }

  to {
    // width: 2.5vw;
    width: 60px;
    filter: blur(5px);
  }
}

@keyframes show {
  from {
    width: 60px;
    filter: blur(3px);
    // width: 2.5vw;
  }

  to {
    width: 160px;
    filter: blur(5px);
    // width: 6.7vw;
  }
}
</style>
