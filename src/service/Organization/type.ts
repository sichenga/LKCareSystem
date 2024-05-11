// 用户登录 /api/auth/login
export interface companyaddParams {
    id: number | null
    name: string,
    address: string,
    telephone: string,
    adminName: string,
    adminMobile: string
    adminUserName: string,
    adminPwd: string,
    startTime: string
    legalPerson: string,//法人
    mobile: string,//法人联系号码
    creditCode: string,//统一社会信用代码
    license: number | null//卫生许可证
    medicalPoint: number | null //医疗点
    house: number | null //房屋性质
}
