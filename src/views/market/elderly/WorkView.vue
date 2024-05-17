<template>
    排班管理
    <el-card>
        <div class="body-top">
            <div>
                <el-image style="width: 50px; height: 50px;margin-top: 11px;"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover" />
            </div>
            <div class="size-I-right">
                <div class="size-right">
                    <div>老人姓名:</div>
                    <div>张三</div>
                </div>
                <div class="size-right">
                    <div>身份证/护照号:</div>
                    <div>3293819982929212</div>
                </div>
                <div class="size-right">
                    <div>床位号:</div>
                    <div>504/01</div>
                </div>
            </div>
        </div>

    </el-card>
    <el-card style="margin-top: 15px">

    </el-card>

</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'


</script>
<style lang="less" scoped>
.el-input {
    height: 40px;
}

.el-button {
    height: 40px;
    line-height: 40px;
}

.el-form--inline .el-form-item {
    width: 270px;
}

.body-top {
    display: flex;

    .size-I-right {
        margin-left: 55px;

        .size-right {
            display: flex;

            div {
                margin: 7px 0;
            }

            div:nth-child(1) {
                width: 160px;
            }
        }
    }

}
</style>