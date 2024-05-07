<template>
  <el-container>
    <el-aside width="200px">
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
}
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
}
.el-main {
  background-color: #eef2fa;
}
</style>
