import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
// 封装element-plus的messagebox
export const getMessageBox = async (text: string, texttwo: string, title: string = '删除') => {
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

// 递归生成树形结构数据
export function TreeData(data: Array<RouterItem>, pid: number = 0) {
  const tree: Array<RouterItem> = []
  data.forEach((node) => {
    if (node.pid === pid) {
      const children = TreeData(data, node.id)
      if (children.length) {
        node.children = children
      }
      tree.push(node)
    }
  })
  return tree
}
