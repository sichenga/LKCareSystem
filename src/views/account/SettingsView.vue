<template>
    <el-card style="max-width: 100%">
        <div class="headbox">
            <!-- <span>头像</span><el-avatar :size="45" :src="circleUrl" /> -->
            <div class="head">
                头像
            </div>
            <div class="header">
                <el-avatar :size="45" :src="circleUrl" />
            </div>
            <div class="replece">
                更换头像
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    sizeList: ['small', '', 'large'] as const,
})

const { circleUrl } = toRefs(state)
</script>

<style lang="less" scoped>
.headbox {
    width: 300px;
    height: 50px;
    background-color: aqua;
    display: flex;
    .head {
        line-height: 50px;
        font-size: 12px;
    }
    .el-avatar {
        margin-left: 30px;
    }
    .replece {
        color:#75a5ea ;
        line-height: 50px;
        font-size: 12px;
        padding-left: 30px;
    }
}

</style>