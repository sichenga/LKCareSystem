<template>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </template>
<script lang="ts" setup>
import { ref ,defineProps,defineEmits} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')


const action = import.meta.env.VITE_BASE_UPLOAD_ADD || ''

const emit = defineEmits(['upload', 'uploadrem'])

const headers = {
  Authorization: sessionStorage.getItem('token') || ''
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('头像',response,
  uploadFile);
  if(response.code==10000){
    console.log(123);
    uploadFile.name=imageUrl.value
  }
}


</script>

<style scoped>
.avatar-uploader .avatar {
  width: 65px;
  height: 65px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 65px;
  height: 65px;
  text-align: center;
}
</style>  