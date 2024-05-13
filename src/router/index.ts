import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginViews.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      meta: {
        isHide: true
      },
      component: () => import('@/views/error/Error-404.vue')
    },

    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashBoard.vue'),
      children: [
        {
          path: 'Food', //食材管理
          name: 'FoodViwe',
          component: () => import('@/views/diet/FoodViwe.vue')
        },
        {
          path: 'Price', //价格分析
          name: 'PriceView',
          component: () => import('@/views/diet/PriceView.vue')
        },
        {
          path: 'Supplier', //供应商管理
          name: 'SupplierView',
          component: () => import('@/views/diet/SupplierView.vue')
        },
        {
          path: 'Purchase', //采购申请
          name: 'PurchaseView',
          component: () => import('@/views/diet/PurchaseView.vue')
        },
        {
          path: 'PurchaseDetail', //采购详情
          name: 'PurchaseDetailView',
          component: () => import('@/views/diet/PurchaseDetailView.vue')
        },
        {
          path: 'home',
          name: 'HomeView',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'account-set', //账号设置
          name: 'account-setView',
          component: () => import('@/views/system/account-setView.vue')
        },
        {
          path: 'account', //账号管理
          name: 'accountView',
          component: () => import('@/views/system/AccountView.vue')
        },
        {
          path: 'Role44', //角色管理
          name: 'Role',
          component: () => import('@/views/system/RoleView.vue')
        },
        {
          path: 'CareWorker', //护工设置
          name: 'CareWorkerView',
          component: () => import('@/views/basic/CareWorkerView.vue')
        },
        {
          path: 'NursingWorker', //护理服务
          name: 'NursingWorkerView',
          component: () => import('@/views/basic/NursingWorkerView.vue')
        },
        {
          path: 'NursingGrade', //护理等级
          name: 'NursingGradeView',
          component: () => import('@/views/basic/NursingGradeView.vue')
        },
        {
          path: 'NursingItem', //护理项目
          name: 'NursingItemView',
          component: () => import('@/views/basic/NursingItemView.vue')
        },
        {
          path: 'NursingGradeScheme', //配置护理方案
          name: 'NursingGradeSchemeView',
          component: () => import('@/views/basic/NursingGradeSchemeView.vue')
        },
        {
          path: 'NursingItemScheme', //配置护理项目
          name: 'NursingItemSchemeView',
          component: () => import('@/views/basic/NursingItemSchemeView.vue')
        },
        {
          path: 'Floor', //楼层管理
          name: 'FloorView',
          component: () => import('@/views/basic/FloorView.vue')
        },
        {
          path: 'Room', //房间管理
          name: 'RoomView',
          component: () => import('@/views/basic/RoomView.vue')
        },
        {
          path: 'Bed', // 床位管理
          name: 'BedView',
          component: () => import('@/views/basic/BedView.vue')
        },
        {
          path: 'Accraditation', //审批设置
          name: 'AccraditationView',
          component: () => import('@/views/basic/AccraditationView.vue')
        },
        {
          path: 'ConfigAccraditation', //配置审批流
          name: 'ConfigAccraditationView',
          component: () => import('@/views/basic/ConfigAccraditationView.vue')
        },
        {
          path: 'HouseType', //房型管理
          name: 'HouseTypeView',
          component: () => import('@/views/basic/HouseTypeView.vue')
        },
        {
          path: 'Form', //表单组件
          name: 'FormView',
          component: () => import('@/views/basic/FormView.vue')
        },
        {
          path: 'AddForm', //增加表单
          name: 'AddFormView',
          component: () => import('@/views/basic/AddFormView.vue')
        },
        {
          path: 'affiliated',
          name: 'affiliated',
          component: () => import('@/views/affiliated/AffiliatedView.vue')
        },
        {
          path: 'Role', //角色管理
          name: 'RoleView',
          component: () => import('@/views/role/RoleView.vue')
        },
        {
          path: 'roledialog', //新增角色
          name: 'AddRoleView',
          component: () => import('@/views/role/AddRoleView.vue')
        },
        {
          path: 'list', //机构列表
          name: 'listView',
          component: () => import('@/views/company/listView.vue')
        },
        {
          path: 'list', //分机构列表
          name: 'listView',
          component: () => import('@/views/company/listView.vue')
        },
        {
          path: 'adds', //新增分机构
          name: 'adds',
          component: () => import('@/views/company/addView.vue')
        },
        {
          path: 'Client', //潜在客户
          name: 'ClientView',
          component: () => import('@/views/bazaar/ClientView.vue')
        },
        {
          path: 'AddClient', //新增潜在客户
          name: 'AddClientView',
          component: () => import('@/views/bazaar/AddClientView.vue')
        },
        {
          path: 'NewsRegister', //资讯登记
          name: 'NewsRegisterView',
          component: () => import('@/views/bazaar/NewsRegisterView.vue')
        },
        {
          path: 'Callback', //回访记录
          name: 'CallbackView',
          component: () => import('@/views/bazaar/CallbackView.vue')
        },
        {
          path: 'ClientInfoView', //潜在客户详情
          name: 'ClientInfoView',
          component: () => import('@/views/bazaar/ClientInfoView.vue')
        },
        {
          path: 'particulars',//任务详情
          name: 'Particulars',
          component: () => import('@/views/bazaar/ParticularsVIews.vue')
        },
        {
          path: 'Oldy', //老人管理
          name: 'OldyView',
          component: () => import('@/views/bazaar/OldyView.vue')
        },
        {
          path: 'AddOldy', //新增老人
          name: 'AddOldyView',
          component: () => import('@/views/bazaar/AddOldyView.vue')
        },
        {
          path: 'Archive', //档案管理
          name: 'ArchiveView',
          component: () => import('@/views/bazaar/ArchiveView.vue')
        },
        {
          path: 'Workforce', //排班管理
          name: 'WorkforceView',
          component: () => import('@/views/bazaar/WorkforceView.vue')
        },
        {
          path: 'Plan', //排班管理
          name: 'PlanView',
          component: () => import('@/views/bazaar/PlanView.vue')
        },
        {
          path: 'Reserve', //预定登记
          name: 'ReserveView',
          component: () => import('@/views/bazaar/ReserveView.vue')
        },
        {
          path: 'AddReserve', //新增预定
          name: 'AddReserveView',
          component: () => import('@/views/bazaar/AddReserveView.vue')
        },
        {
          path: 'ReserveInfo', //预定详情
          name: 'ReserveInfoView',
          component: () => import('@/views/bazaar/ReserveInfoView.vue')
        },
        {
          path: 'Hospitalized', //入院管理
          name: 'HospitalizedView',
          component: () => import('@/views/bazaar/HospitalizedView.vue')
        },
        {
          path: 'Orders', //下单
          name: 'OrdersView',
          component: () => import('@/views/bazaar/OrdersView.vue')
        },
        {
          path: 'HospitalizedInfo', //入院详情
          name: 'HospitalizedInfoView',
          component: () => import('@/views/bazaar/HospitalizedInfoView.vue')
        },
        {
          path: 'ToHospital', //出院管理
          name: 'ToHospitalView',
          component: () => import('@/views/bazaar/ToHospitalView.vue')
        },
        {
          path: 'Pflegestufe', //护理等级变更
          name: 'PflegestufeView',
          component: () => import('@/views/bazaar/PflegestufeView.vue')
        },
        {
          path: 'PflegestufeInfo', //护理等级变更详情
          name: 'PflegestufeInfoView',
          component: () => import('@/views/bazaar/PflegestufeInfoView.vue')
        },
        {
          path: 'Referrer', //推荐人管理
          name: 'ReferrerView',
          component: () => import('@/views/bazaar/ReferrerView.vue')
        },
        {
          path: 'Cooperative', //合作组织管理
          name: 'CooperativeView',
          component: () => import('@/views/bazaar/CooperativeView.vue')
        },
        {
          path: 'WardRound', //行政查房
          name: 'WardRoundView',
          component: () => import('@/views/bazaar/WardRoundView.vue')
        },
        {
          path: 'WardRoundInfo', //行政查房详情
          name: 'WardRoundInfoView',
          component: () => import('@/views/bazaar/WardRoundInfoView.vue')
        },
        {
          path: 'Complaint', //投诉建议
          name: 'ComplaintView',
          component: () => import('@/views/bazaar/ComplaintView.vue')
        },
        {
          path: 'ComplaintInfo', //投诉建议详情
          name: 'ComplaintInfoView',
          component: () => import('@/views/bazaar/ComplaintInfoView.vue')
        },
        {
          path: 'BedApproval', //床位更换申请审批
          name: 'BedApprovalView',
          component: () => import('@/views/examine/BedApprovalView.vue')
        },
        {
          path: 'PflApproval', //护理等级变更审批
          name: 'PflApprovalView',
          component: () => import('@/views/examine/PflApprovalView.vue')
        },
        {
          path: 'ToApproval', //外出申请审批
          name: 'ToApprovalView',
          component: () => import('@/views/examine/ToApprovalView.vue')
        },
        {
          path: 'Details', //床位更换申请审批  /   详情
          name: 'Details',
          component: () => import('@/views/examine/DetailsView.vue')
        },
        {
          path: 'Collection', //催收管理
          name: 'CollectionView',
          component: () => import('@/views/financial/CollectionView.vue')
        },
        {
          path: 'CollectionInfo', //结算单明细
          name: 'CollectionInfoView',
          component: () => import('@/views/financial/CollectionInfoView.vue')
        },
        {
          path: 'HospitalExpense', //入院费用核对管理
          name: 'HospitalExpenseView',
          component: () => import('@/views/financial/HospitalExpenseView.vue')
        },
        {
          path: 'SettleAccounts', //出院结算
          name: 'SettleAccountsView',
          component: () => import('@/views/financial/SettleAccountsView.vue')
        },
        {
          path: 'Salary', //薪资福利结算
          name: 'SalaryView',
          component: () => import('@/views/financial/SalaryView.vue')
        },
        {
          path: 'Salaryinfo', //薪资明细
          name: 'SalaryinfoView',
          component: () => import('@/views/financial/SalaryinfoView.vue')
        },
        {
          path: 'particulars1', //采购申请 / 收货验收
          name: 'Particulars',
          component: () => import('@/views/Logistics/ParticularsViews.vue')
        },
        {
          path: 'AddPurchase', //编辑采购申请
          name: 'AddPurchaseView',
          component: () => import('@/views/Logistics/AddPurchaseView.vue')
        },
        {
          path: 'Logistics', //采购申请
          name: 'LogisticsView',
          component: () => import('@/views/Logistics/LogisticsView.vue')
        },
        {
          path: 'examine', // 采购申请 / 收货验收
          name: 'Examine',
          component: () => import('@/views/Logistics/ExamineViews.vue')
        },
        {
          path: 'Record', //交接记录
          name: 'RecordView',
          component: () => import('@/views/task/RecordView.vue')
        },
        {
          path: 'record-details', //交接明细
          name: 'record-detailsView',
          component: () => import('@/views/task/record-detailsView.vue')
        },
        {
          path: 'Spectaculars', //任务看板
          name: 'Spectaculars',
          component: () => import('@/views/task/SpectacularsView.vue')
        },
        {
          path: 'details', //任务详情
          name: 'detailsView',
          component: () => import('@/views/task/detailsView.vue')
        },
        {
          path: 'add', //新增外出
          name: 'addView',
          component: () => import('@/views/care/addView.vue')
        },
        {
          path: 'goexamine', // 外出申请/详情
          name: 'GoNurExamine',
          component: () => import('@/views/care/ExamineView.vue')
        },
        {
          path: 'ApplyFor', //外出登记
          name: 'ApplyForView',
          component: () => import('@/views/care/ApplyForView.vue')
        },
        {
          path: 'Activity', //精神慰籍老人文娱老人晨练
          name: 'ActivityView',
          component: () => import('@/views/care/ActivityView.vue')
        },
        {
          path: 'Laundry', //洗衣错衣
          name: 'LaundryView',
          component: () => import('@/views/care/LaundryView.vue')
        },
        {
          path: 'night', //夜巡管理
          name: 'nightViwe',
          component: () => import('@/views/care/nightViwe.vue')
        },
        {
          path: 'Address', //地址管理
          name: 'AddressView',
          component: () => import('@/views/care/AddressView.vue')
        },
        {
          path: 'begchange', //床位更换
          name: 'begchangeView',
          component: () => import('@/views/care/begchangeView.vue')
        },
        {
          path: 'nurexamine', //外出申请/详情
          name: 'NurExamine',
          component: () => import('@/views/care/ExamineView.vue')
        },
        {
          path: 'goout', //外出申请
          name: 'GooutView',
          component: () => import('@/views/care/GooutView.vue')
        },
        {
          path: 'Department', //部门管理
          name: 'DepartmentView',
          component: () => import('@/views/personnel/DepartmentView.vue')
        },
        {
          path: 'Department', //部门管理
          name: 'DepartmentView',
          component: () => import('@/views/personnel/DepartmentView.vue')
        },
        {
          path: 'Post', //岗位管理
          name: 'PostView',
          component: () => import('@/views/personnel/PostView.vue')
        },
        {
          path: 'AddPostView', //新增岗位
          name: 'AddPostView',
          component: () => import('@/views/personnel/AddPostView.vue')
        },
        {
          path: 'Staff', //员工管理
          name: 'StaffView',
          component: () => import('@/views/personnel/StaffView.vue')
        },
        {
          path: 'AddStaff', //新增员工
          name: 'AddStaffView',
          component: () => import('@/views/personnel/AddStaffView.vue')
        },
        {
          path: 'SalaryWorker', //护工薪资管理
          name: 'SalaryWorkerView',
          component: () => import('@/views/personnel/SalaryWorkerView.vue')
        },
        {
          path: 'TaskReward', //任务奖励设置
          name: 'TaskRewardView',
          component: () => import('@/views/personnel/TaskRewardView.vue')
        },
        {
          path: 'Register', //用药登记
          name: 'RegisterView',
          component: () => import('@/views/medicalcare/RegisterView.vue')
        },
        {
          path: 'Registerinfo', //用药登记详情
          name: 'RegisterinfoView',
          component: () => import('@/views/medicalcare/RegisterinfoView.vue')
        },
        {
          path: 'AddRegisterinfo', //新增用药登记
          name: 'AddRegisterinfoView',
          component: () => import('@/views/medicalcare/AddRegisterinfoView.vue')
        },
        {
          path: 'Project', //用药计划
          name: 'ProjectView',
          component: () => import('@/views/medicalcare/ProjectView.vue')
        },
        {
          path: 'getregisterinfo', /// 用药登记详情 / 新增用药登记
          name: 'GetRegisterInfo',
          component: () => import('@/views/medicalcare/GetRegisterInfo.vue')
        },
        {
          path: 'Emit', //用药计划设置
          name: 'EmitView',
          component: () => import('@/views/medicalcare/EmitView.vue')
        },
        {
          path: 'Records', //健康档案
          name: 'RecordViews',
          component: () => import('@/views/medicalcare/RecordView.vue')
        },
        {
          path: 'RecordAdmin', //健康档案管理
          name: 'RecordAdminView',
          component: () => import('@/views/medicalcare/RecordAdminView.vue')
        },
        {
          path: 'MedicalInfo', //查看体检报告详情
          name: 'MedicalInfoView',
          component: () => import('@/views/medicalcare/MedicalInfoView.vue')
        },
        {
          path: 'Doctor', // 医生查房记录
          name: 'DoctorView',
          component: () => import('@/views/medicalcare/DoctorView.vue')
        },
        {
          path: 'doctorinfo', //医生查房记录详情
          name: 'Doctorinfo',
          component: () => import('@/views/medicalcare/DoctorinfoViews.vue')
        },
        {
          path: 'Nurse', //护士测量记录
          name: 'NurseView',
          component: () => import('@/views/medicalcare/NurseView.vue')
        }
      ]
    }
  ]
})

export default router
