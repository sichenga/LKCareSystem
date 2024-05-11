<template>
    <div>
        <div class="size">
            <span>▋</span> 病史介绍
        </div>
        <div>
            <div class="titles">
                现病史
            </div>
            <div class="checkbox">
                <el-checkbox v-for="item in states.Date" :key="item.id" :label="item.label" />
            </div>
            <div class="titles">
                既往病史
            </div>
            <div class="checkbox">
                <el-checkbox v-for="item in states.Date" :key="item.id" :label="item.label" />
            </div>
        </div>
        <div>
            <div class="titles">
                其他疾病
            </div>
            <el-input v-model="textarea2"   type="textarea" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
const textarea2 = ref('')
const states: any = reactive({
    Date: [
        { label: '高血压', id: 1 },
        { label: '脑血管意外', id: 2 },
        { label: '心肌梗死', id: 3 },
        { label: '帕金森氏症', id: 4 },
        { label: '抑郁倾向', id: 5 },
        { label: '老年性痴呆', id: 6 },
        { label: '癫痫', id: 7 },
        { label: '肺气肿', id: 8 },
        { label: '慢性消化系统疾病', id: 9 },
        { label: '泌尿系统', id: 10 },
        { label: '糖尿病', id: 11 },
        { label: '皮肤病', id: 12 },
        { label: '肿瘤', id: 13 },
        { label: '肢体骨折', id: 14 },
        { label: '骨质疏松', id: 15 },
        { label: '白内障', id: 16 },
        { label: '青光眼', id: 17 },
        { label: '弱视', id: 18 },
        { label: '失视', id: 19 },
        { label: '听力受损（中）', id: 20 },
        { label: '听力受损（重）', id: 21 },
        { label: '失聪', id: 22 },
    ]
})



</script>
<style lang="less" scoped>
.size {
    color: #666666;
    font-size: 14px;

    span {
        color: #409EFF;
    }

}

.titles {
    margin-top: 20px;
}

.checkbox {
    width: 680px;
    margin: 10px 0 20px 0;

    :deep(.el-checkbox) {
        margin-bottom: 10px;
    }
}
:deep(.el-textarea__inner){
    margin-top: 10px;
    width: 750px;
    height: 160px;
}
</style>
