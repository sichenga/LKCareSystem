//房间列表
export interface HouseViewType {
    page: number,
    pageSize: number,
    name: string
}
//添加房间
export interface houseaddType {
    id: number;
    type: number | null;
    name: string;
    beds: number | string;
    picture: string;
    buildingId:string
}
//获取房间类型
export interface getHouseType {
    page: number,
    pageSize: number,
}