import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { ConfigBuildingList, getHouseList, getBedsList } from '@/service/config/ConfigApi'

export const useBuildStroe = defineStore(
  'build',
  () => {
    const buildList = ref([])
    const houselist = ref([])
    const bedlist = ref([])
    // 楼栋信息
    const getBuildList = async () => {
      const res: any = await ConfigBuildingList()
      if (res?.code === 10000) {
        return res.data.list
      }
    }
    // 房间信息
    const getHouseData = async () => {
      const res: any = await getHouseList()
      if (res?.code === 10000) {
        return res.data.list
      }
    }
    // 床位信息
    const getBedsData = async () => {
      const res: any = await getBedsList()
      if (res?.code === 10000) {
        return res.data.list
      }
    }
    //  树形结构数据
    const getBuildListData = async () => {
      buildList.value = await getBuildList()
      houselist.value = await getHouseData()
      bedlist.value = await getBedsData()
      console.log(houselist.value)
      return await convertToTree(buildList.value)
    }

    const convertToTree = (flatData: any, pid: number = 0) => {
      const children = flatData.filter((node: any) => node.pid === pid)
      if (!children.length) {
        return houselist.value
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            pid: item.buildingId,
            children: bedlist.value
              .map((chitem: any) => ({
                id: chitem.id,
                name: chitem.name,
                pid: chitem.houseId
              }))
              .filter((chitem: any) => chitem.pid === item.id)
          }))
          .filter((item: any) => item.pid === pid)
      }
      return children.map((node: any) => ({
        ...node, 
        children: convertToTree(flatData, node.id)
      }))
    }

    return {
      getBuildList,
      getHouseData,
      getBedsData,
      getBuildListData
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
