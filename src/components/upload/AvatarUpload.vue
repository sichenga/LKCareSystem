<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :headers="headers"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :style="style"
  >
    <img v-if="imageUrl" :src="ImageUrls + imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const props = defineProps({
  style: {
    type: Object,
    default: () => {
      return {
        width: '65px',
        height: '65px'
      }
    }
  },
  editdata: {
    type: String,
    default: ''
  }
})
console.log(props.style)
// 数据回显
watch(
  () => props.editdata,
  (newval) => {
    if (newval) {
      imageUrl.value = newval
    }
  },
  { immediate: true }
)
const action = import.meta.env.VITE_BASE_UPLOAD_ADD || ''
const ImageUrls = import.meta.env.VITE_BASE_URL + '/' || ''
const emit = defineEmits(['upload', 'uploadrem'])

const headers = {
  Authorization: sessionStorage.getItem('token') || ''
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log('头像', response, uploadFile)
  if (response.code == 10000) {
    imageUrl.value = response.data.url
    emit('upload', response.data.url)
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
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
  /* width: 65px;
  height: 65px; */
  width: 100%;
  height: 100%;
  text-align: center;
}
.el-upload {
  width: 100%;
  height: 100%;
}
</style>
