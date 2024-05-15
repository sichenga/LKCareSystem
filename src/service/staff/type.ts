export interface StaffType {
    page: number;
    pageSize: number;
}

interface FormData {
    id:string
}
export interface RuleForm {
    photo: string,
    name: string,
    mobile: string,
    isCarer: number|null,
    departmentId: number|null,
    adminUserName: string,
    adminPwd:string,
    enable: number|null,
    idCard:string,
    roles: Array<FormData>
}