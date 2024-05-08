<template>
  <div class="title">
    <span v-if="!apperStore.statechange">机构中心端</span>
    <el-image v-else style="width: 80px; height: 50px" :src="url" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useApperStore } from '@/stores'
const apperStore = useApperStore()
const url = 'https://s21.ax1x.com/2024/05/07/pkEqS4P.png'
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
</style>
