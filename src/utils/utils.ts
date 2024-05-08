import { h } from 'vue'
import { ElMessageBox } from 'element-plus'

export const getMessageBox = async (text: string, texttwo: string, title: string = '删除确认') => {
  try {
    return await ElMessageBox({
      title,
      message: h('p', null, [
        h('div', { style: 'font-size:16px;font-weight:bold;' }, text),
        h('div', { style: 'color: #ccc' }, texttwo)
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
  } catch {
    return false
  }
}
