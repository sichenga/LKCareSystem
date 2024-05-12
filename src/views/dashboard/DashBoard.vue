<template>
  <el-container>
    <el-aside :class="{ shrink: apperStore.statechange, unfold: !apperStore.statechange }">
      <el-scrollbar height="100%">
        <LeftMenu></LeftMenu>
      </el-scrollbar>
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
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
  width: 90px;
  animation: hide 0.2s linear !important;
}

// 展开
.unfold {
  width: 230px;
  animation: show 0.2s linear !important;
}

@keyframes hide {
  from {
    width: 230px;

    filter: blur(3px);
  }

  to {
    // width: 2.5vw;
    width: 90px;
    filter: blur(5px);
  }
}

@keyframes show {
  from {
    width: 90px;
    filter: blur(3px);
    // width: 2.5vw;
  }

  to {
    width: 230px;
    filter: blur(5px);
    // width: 6.7vw;
  }
}
</style>
