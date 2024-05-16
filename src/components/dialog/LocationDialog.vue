<template>
  <el-dialog v-model="dialogVisible" title="新增/编辑地址" width="500" @close="close">
    <el-form :model="form" label-width="100px" label-position="left" style="max-width: 600px">
      <el-form-item label="地址名称：">
        <el-input v-model="form.name" @input="createQRCode" />
      </el-form-item>
      <el-form-item label="地址二维码：">
        <!-- <el-input v-model="form.name" /> -->
        <el-image style="width: 80px; height: 80px" :src="form.qrcode" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import { addressadd } from '@/service/address/AddressApi'
import type { AddressAdd } from '@/service/address/AddressType'
import qrcode from 'qrcode'
const emit = defineEmits(['close'])
const dialogVisible = ref(true)
const codedata = ref('')
const form = reactive<AddressAdd>({
  id: 0,
  name: '',
  qrcode: ''
})
// 新增地址
const add = async () => {
  let res: any = await addressadd(form)
  console.log('增加', res)
}
// 关闭弹窗
const close = (close: boolean = false) => {
  emit('close', close)
}
// 生成二维码
const createQRCode = () => {
  qrcode.toDataURL(form.name, function (err, url) {
    if (err) throw err
    console.log(url)
    form.qrcode = url
  })
}
</script>
<style lang="less" scoped></style>
