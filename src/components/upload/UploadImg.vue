<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :action="action"
    :headers="headers"
    :limit="3"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :show-file-list="props.showlist"
    
  >
    <template #trigger>
      <el-button type="primary">{{ props.title }}</el-button>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
const action = import.meta.env.VITE_BASE_UPLOAD_ADD || ''

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { useUserStore } from '@/stores'
const emits = defineEmits(['upload'])
const userStore = useUserStore()
const headers = {
  Authorization: userStore.token || ''
}
const props = defineProps({
  showlist: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '上传图片'
  },

})
const upload = ref<UploadInstance>()
// 替换文件
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  // emits('upload', files)
  upload.value?.submit()
}
// 传递数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  console.log(response)
  if (response?.code === 10000) {
    emits('upload', response.data?.url)
  }
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
// const
</script>
<style lang="less" scoped>
  .avatar{
    width: 100px;
    height: 100px;
    margin-top: 60px;
  }
</style>
