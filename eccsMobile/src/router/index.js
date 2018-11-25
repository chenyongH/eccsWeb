import Vue from 'vue'
import Router from 'vue-router'
import Information from '@/components/information/information'
import InformationDetails from '@/components/information/informationDetails'
import InformationSeartch from '@/components/information/informationSeartch'
import Procurement from '@/components/procurement/procurement'
import ProcurementContent from '@/components/procurement/procurementContent'
import ProcurementTwo from '@/components/procurement/procurementTwo'
import ProcurementThree from '@/components/procurement/procurementThree'
import Login from '@/components/register/Login'
import LogOut from '@/components/register/LogOut'
import ProcurementDetails from '@/components/procurement/procurementDetail'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'Information',
    component: Information,
    meta: {
        title: '新闻资讯'
    }
  }, {
    path: '/InformationDetails',
    name: 'InformationDetails',
    component: InformationDetails,
    meta: {
      keepAlive: true,
      title: '新闻资讯'      
    }
  }, 
  {
    path: '/InformationSeartch',
    name: 'InformationSeartch',
    component: InformationSeartch,
    meta: {
      keepAlive: true,
      title: '新闻资讯'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      Alive: true,
      keepAlive:true,
      title: '登录'
    }
  },
  {
    path: '/LogOut',
    name: 'LogOut',
    component: LogOut, 
    meta: {
        title: '个人中心'
    }
  },
  {
    path:'/procurement',
    name:'procurement',
    component:Procurement,
    children: [{
      path: '/procurementContent',
      component: ProcurementContent,
      name: 'ProcurementContent',
      meta: {
        title: '采购信息'
      }
    },{
      path:'/procurement/procurementTwo',
      component:ProcurementTwo,
      name:'ProcurementTwo',
      meta: {
        title: '采购信息'
      }
    },{
      path:'/procurement/procurementThree',
      component:ProcurementThree,
      name:'ProcurementThree',
      meta: {
        title: '采购信息'
      }
    }],
    redirect: '/procurementContent'
  },{
      path:'/ProcurementDetails',
      component:ProcurementDetails,
      name:'ProcurementDetails',
      meta: {
        keepAlive: true,
        meta: {
            title: '采购信息'
          }
      }
    }
  
],
  redirect:'/Information',
  mode: 'hash'
  
})

