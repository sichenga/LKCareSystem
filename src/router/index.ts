import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashBoard.vue'),
      children: [
        {
          path: 'food',
          name: 'food',
          component: () => import('@/views/food/FoodView.vue')
        },
        {
          path: 'Analysis',
          name: 'Analysis',
          component: () => import('@/views/food/AnalysisView.vue')
        },
        {
          path: 'supplier',
          name: 'Supplier',
          component: () => import('@/views/food/SupplierView.vue')
        },
        {
          path: 'purchasing',
          name: 'Purchasing',
          component: () => import('@/views/food/PurchasingView.vue')
        },
        {
          path: 'receiving',
          name: 'receiving',
          component: () => import('@/views/food/ReceivingView.vue')
        },
        {
          path: 'received',
          name: 'received',
          component: () => import('@/views/food/ReceivedView.vue')
        },
        {
          path: 'home',
          name: 'HomeView',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'Management',
          name: 'Management',
          component: () => import('@/views/account/ManagementView.vue')
        },
        {
          path: 'RoleView',
          name: 'RoleView',
          component: () => import('@/views/account/RoleView.vue')
        },
        {
          path: 'Settings',
          name: 'Settings',
          component: () => import('@/views/account/SettingsView.vue')
        },
        {
          path: 'Bed',
          name: 'Bed',
          component: () => import('@/views/examine/BedView.vue')
        },
        {
          path: 'Goout',
          name: 'Goout',
          component: () => import('@/views/examine/GooutView.vue')
        },
        {
          path: 'Grade',
          name: 'Grade',
          component: () => import('@/views/examine/GradeView.vue')
        },
        {
          path: 'Details',
          name: 'Details',
          component: () => import('@/views/examine/DetailsView.vue')
        },
        {
          path: 'Workers',
          name: 'Workers',
          component: () => import('@/views/basic/nurse/WorkersView.vue')
        },
        {
          path: 'Serve',
          name: 'Serve',
          component: () => import('@/views/basic/nurse/ServeView.vue')
        },
        {
          path: 'Addedlevel',
          name: 'Addedlevel',
          component: () => import('@/views/basic/nurse/AddedlevelView.vue')
        },
        {
          path: 'Project',
          name: 'Project',
          component: () => import('@/views/basic/nurse/ProjectView.vue')
        },
        {
          path: 'Configuration',
          name: 'Configuration',
          component: () => import('@/views/basic/nurse/ConfigurationView.vue')
        },
        {

          path: 'Industry',
          name: 'Industry',
          component: () => import('@/views/basic/nurse/IndustryView.vue')
        },
        {
          path: 'Floor',
          name: 'Floor',
          component: () => import('@/views/basic/FloorView.vue')
        },
        {
          path: 'Room',
          name: 'Room',
          component: () => import('@/views/basic/RoomView.vue')
        },
        {
          path: 'Berth',
          name: 'Berth',
          component: () => import('@/views/basic/BerthView.vue')
        },
        {
          path: 'Approve',
          name: 'Approve',
          component: () => import('@/views/basic/ApproveView.vue')
        },
        {
          path: 'Deploy',
          name: 'Deploy',
          component: () => import('@/views/basic/DeployView.vue')
        },
        {
          path: 'Manage',
          name: 'Manage',
          component: () => import('@/views/basic/ManageView.vue')
        },
        
        {
          path: 'Security',
          name: 'Security',
          component: () => import('@/views/basic/SecurityView.vue')
        },
        {
          path:'affiliated',
          name:'affiliated',
          component:()=>import('@/views/affiliated/AffiliatedView.vue')
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('@/views/account/AccountViews.vue')
        },
        {
          path: 'role',
          name: 'Role',
          component: () => import('@/views/role/RoleViews.vue')
        },
        {
          path: 'organization',
          name: 'Organization',
          component: () => import('@/views/organization/OrganizationViews.vue')
        },
        {
          path: 'organizationAdd',
          name: 'OrganizationAdd',
          component: () => import('@/views/organization/OrganizationAdd.vue')
        },
        {
          path: 'purchase',
          name: 'Purchase',
          component: () => import('@/views/purchase/PurchaseViews.vue')
        },
        {
          path: 'teskboard',
          name: 'Teskboard',
          component: () => import('@/views/task/TeskboardView.vue')
        },
        {
          path: 'taskinfo',
          name: 'Taskinfo',
          component: () => import('@/views/task/TaskInfo.vue')
        },
        {
          path: 'apply',
          name: 'Apply',
          component: () => import('@/views/purchase/ApplyViews.vue')
        },
        {
          path: 'examine',
          name: 'Examine',
          component: () => import('@/views/purchase/ExamineViews.vue')
        },
        {
          path: 'potential',
          name: 'Potential',
          component: () => import('@/views/bazaar/PotentialViews.vue')
        },
        {
          path: 'newly',
          name: 'Newly',
          component: () => import('@/views/bazaar/NewlyViews.vue')
        },
        {
          path: 'consult',
          name: 'Consult',
          component: () => import('@/views/bazaar/ConsultViews.vue')
        },
        {
          path: 'returnLeg',
          name: 'ReturnLeg',
          component: () => import('@/views/bazaar/ReturnLegViews.vue')
        },
        {
          path: 'particulars',
          name: 'Particulars',
          component: () => import('@/views/bazaar/ParticularsVIews.vue')
        },
        {
          path: 'administration',
          name: 'Administration',
          component: () => import('@/views/bazaar/outjoin/old/AdministrationViews.vue')
        },
        {
          path: 'addold',
          name: 'Addold',
          component: () => import('@/views/bazaar/outjoin/old/AddoldViews.vue')
        },

        {
          path: 'collection',
          name: 'CollectionView',
          component: () => import('@/views/financial/business/CollectionView.vue')
        },
        {
          path: 'paid',
          name: 'paid',
          component: () => import('@/views/financial/business/PaidView.vue')
        },
        {
          path: 'fees',
          name: 'FeesView',
          component: () => import('@/views/financial/business/FeesView.vue')
        },
        {
          path: 'admission',
          name: 'AdmissionView',
          component: () => import('@/views/financial/business/AdmissionView.vue')
        },
        {
          path: 'hospital',
          name: 'hospital',
          component: () => import('@/views/financial/business/HospitalView.vue')
        },
        {
          path: 'welfare',
          name: 'WelfareView',
          component: () => import('@/views/financial/operation/WelfareView.vue')
        },
        {
          path: 'detail',
          name: 'DetailView',
          component: () => import('@/views/financial/operation/DetailView.vue')
        },
        {
          path: 'section',
          name: 'SectionView',
          component: () => import('@/views/personnel/management/SectionView.vue')
        },
        {
          path: 'particulars',
          name: 'Particulars',
          component: () => import('@/views/purchase/ParticularsViews.vue')
        },
        {
          path: 'teskonnect',
          name: 'Teskonnect',
          component: () => import('@/views/task/TeskconnectView.vue')
        },
        {
          path: 'connectInfo',
          name: 'ConnectInfo',
          component: () => import('@/views/task/ConnectInfo.vue')
        },
        {
          path: 'nightmanage',
          name: 'NightmanageView',
          component: () => import('@/views/elderlycare/nursemanage/NightmanageView.vue')
        },
        {
          path: 'locationManage',
          name: 'LocationManage',
          component: () => import('@/views/elderlycare/nursemanage/LocationManage.vue')
        },
        {
          path: 'bedreplace',
          name: 'Bedreplace',
          component: () => import('@/views/elderlycare/nursemanage/BedreplaceView.vue')
        },
        {
          path: 'nurexamine',
          name: 'NurExamine',
          component: () => import('@/views/elderlycare/nursemanage/ExamineView.vue')
        },
        {
          path: 'gooutapply',
          name: 'Gooutapply',
          component: () => import('@/views/elderlycare/gooutmanage/GooutapplyView.vue')
        },
        {
          path: 'nursing',
          name: 'NursingView',
          component: () => import('@/views/personnel/pay/NursingView.vue')
        },
        {
          path: 'task',
          name: 'TaskView',
          component: () => import('@/views/personnel/pay/TaskView.vue')
        },
        {
          path: 'section',
          name: 'SectionView',
          component: () => import('@/views/personnel/management/SectionView.vue')
        },
        {
          path: 'post',
          name: 'PostVive',
          component: () => import('@/views/personnel/management/PostVive.vue')
        },
        {
          path: 'addpost',
          name: 'AddPostVive',
          component: () => import('@/views/personnel/management/AddPostVive.vue')
        },
        {
          path: 'staff',
          name: 'StaffView',
          component: () => import('@/views/personnel/management/StaffView.vue')
        },
        {
          path: 'compilestaff',
          name: 'CompilestaffView',
          component: () => import('@/views/personnel/management/CompilestaffView.vue')
        },
        {
          path: 'addgoout',
          name: 'Addgoout',
          component: () => import('@/views/elderlycare/gooutmanage/AddGoout.vue')
        },
        {
          path: 'goexamine',
          name: 'GoNurExamine',
          component: () => import('@/views/elderlycare/gooutmanage/ExamineView.vue')
        },
        {
          path: 'gooutregister',
          name: 'Gooutregister',
          component: () => import('@/views/elderlycare/gooutmanage/GooutregisterView.vue')
        },
        {
          path: 'activity',
          name: 'Activity',
          component: () => import('@/views/elderlycare/activity/ActivityView.vue')
        },
        {
          path: 'washclothes',
          name: 'Washclothes',
          component: () => import('@/views/elderlycare/washclothes/WashclothesView.vue')
        },
        {
          path: 'register',
          name: 'RegisterView',
          component: () => import('@/views/medicalcare/RegisterView.vue')
        },
        {
          path: 'registerinfo',
          name: 'RegisterInfo',
          component: () => import('@/views/medicalcare/RegisterInfo.vue')
        },
        {
          path: 'AddRegisterInfo',
          name: 'AddRegisterInfo',
          component: () => import('@/views/medicalcare/AddRegisterInfo.vue')
        }
      ]
    }
  ]
})

export default router
