import Vue from 'vue'
import Router from 'vue-router'
import Supply from '../components/Supply/Supply' //供应信息页
import Supplier from '../components/Supply/Supplier' //供应商列表页
import CompanyHomePage from '../components/Supply/CompanyHomePage' //公司主页
import GoodsDetail from '../components/Supply/GoodsDetail' //商品详情页
import PersonalCenter from '../components/PersonalCenter/index.vue' //个人中心
import InformationNav from '../components/Information/InformationNav'
import Information from "../components/Information/Information.vue"
import InformationCalendar from "../components/Information/InformationCalendar.vue"
import Informationdetails from "../components/Information/Informationdetails.vue"
import Intl from '../components/Information/intl' //国际资讯内容组件
import Platform from '../components/Platform/platform' //平台服务
import Procurement from '../components/Procurement/procurement' //采购页主组件
import ProcurementSection from '../components/Procurement/procurementSection' //商机
import BusinessChance from "../components/Procurement/BusinessChance.vue" //采购商列表页
import BusinessChancelogin from "../components/Procurement/BusinessChancelogin.vue" //商机详情登陆页
import Login from '../components/Register/Login.vue' //登陆
import personal from '../components/PersonalCenter/Personal.vue' //个人中心默认子页
import Messages from '../components/PersonalCenter/messages.vue'//站内信
import ReleaseBusinessOpportunity from '../components/PersonalCenter/ReleaseBusinessOpportunity.vue' //发布商机
import informationInPer from '../components/PersonalCenter/InformationInPer.vue' //个人中心--资讯
import opportunityForBusiness from '../components/PersonalCenter/OpportunityForBusiness.vue' //个人中心--商机
import BusinessOpportunityList from '../components/PersonalCenter/BusinessOpportunityList.vue' //个人中心--商机列表
import BusinessOpportunitySetting from '../components/PersonalCenter/BusinessOpportunitySetting.vue' //个人中心--商机设置
import registrationInquiry from '../components/PersonalCenter/RegistrationInquiry.vue' //个人中心--报名查询
import product from '../components/PersonalCenter/Product.vue' //个人中心--产品
import personalIndex from '../components/PersonalCenter/PersonalIndex.vue' //个人中心--主页
import PersonalData from '../components/PersonalCenter/PersonalData.vue' //个人中心--修改资料
import formApply from '../components/PersonalCenter/FormApply.vue' //个人中心--申请入驻
import ReleaseProducts from '../components/PersonalCenter/ReleaseProducts.vue' //个人中心--发布产品
import ProductList from '../components/PersonalCenter/ProductList.vue' //个人中心--产品列表
import ProductListSetting from '../components/PersonalCenter/ProductListSetting.vue' //个人中心--产品设置上架
import MyParticipationInBusinessOpportunities from '../components/PersonalCenter/MyParticipationInBusinessOpportunities.vue' //个人中心--我参与的商机
import MyWinningBusinessOpportunities from '../components/PersonalCenter/MyWinningBusinessOpportunities.vue' //个人中心--我中标的商机
import FormApplySetting from '../components/PersonalCenter/FormApplySetting.vue' //个人中心--修改企业信息
import Register from '../components/Register/Register.vue' //注册1
import RegisterInfo from '../components/Register/RegisterInfo.vue' //注册2
import InterestTags from '../components/Register/InterestTags.vue' //注册3
import Registed from '../components/Register/Registed.vue' //注册4
import forgot1 from '../components/Register/forgot1.vue' //忘记密码1
import resetPassword from '../components/Register/forgot2.vue' //忘记密码2
import ResettingSuccess from '../components/Register/forgot3.vue' //忘记密码3
import ReportIntl from '../components/Information/ReportIntl.vue' //报告详情
import InformationReportDetail from '../components/Information/InformationReportDetail.vue'
import InformationSearch from '../components/Information/informationSearch.vue'//头部搜索组件
import messageDetails from '../components/PersonalCenter/messageDetails.vue' //消息详情
import messageInform from '../components/PersonalCenter/messageInform.vue' //通知详情
import sendInform from '../components/PersonalCenter/sendInform.vue' //通知详情
Vue.use(Router)
export default new Router({
    routes: [

        //登录
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                keepAlive: true
            }
        },

        //注册--邮箱验证
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                keepAlive: true
            }
        },

        //注册--填写信息
        {
            path: '/RegisterInfo',
            name: 'RegisterInfo',
            component: RegisterInfo,
            meta: {
                keepAlive: true
            }
        },
        /*注册--兴趣标签*/
        {
            path: '/InterestTags',
            name: 'InterestTags',
            component: InterestTags,
            meta: {
                keepAlive: true
            }
        },

        //注册--完成
        {
            path: '/Registed',
            name: 'Registed',
            component: Registed,
            meta: {
                keepAlive: true
            }
        },
        /*忘记密码--邮箱验证*/
        {
            path: '/forgot1',
            name: 'forgot1',
            component: forgot1,
            meta: {
                keepAlive: true
            }
        },
        /*忘记密码--设置密码*/
        {
            path: '/resetPassword',
            name: 'resetPassword',
            component: resetPassword,
            meta: {
                keepAlive: true
            }
        },
        /*重置成功*/
        {
            path: '/ResettingSuccess',
            name: 'ResettingSuccess',
            component: ResettingSuccess,
            meta: {
                keepAlive: true
            }
        },
        { //首页
            path: '/',
            name: 'InformationNav',
            component: InformationNav,
            children: [{
                    path: '/Information',
                    component: Information
                },
                {
                    name: 'Informationdetails',
                    path: '/Information/Informationdetails',
                    component: Informationdetails
                },
                {
                    name: 'InformationReportDetail',
                    path: '/Information/InformationReportDetail',
                    component: InformationReportDetail
                },
                {
                    name: 'InformationCalendar',
                    path: '/Information/InformationCalendar',
                    component: InformationCalendar
                },
                {
                    name:'InformationSearch',
                    path:'/Information/InformationSearch',
                    component:InformationSearch
                }
            ],
            redirect: "/Information" //默认显示资讯页首页
        },
        {
            path: '/procurement',
            name: 'procurement',
            component: Procurement,
            children: [{
                    path: '/procurement/',
                    component: ProcurementSection,
                },
                {   
                    name:"BusinessChance",
                    path: '/procurement/BusinessChance',
                    component: BusinessChance
                },
            ],
            redirect: '/procurement/',
        },
        {   
            name:"BusinessChancelogin",
            path:'/BusinessChancelogin',
            component: BusinessChancelogin
        },
        // {
        //     path:"/BusinessChancelogin",
        //     name:"BusinessChancelogin",
        //     component: BusinessChancelogin
        // },
        /*供应信息页*/
        {
            path: '/supply',
            name: 'supply',
            component: Supply //组件名字
        },
        /*商家入驻*/
        {
            path:'/formApply',
            name:'formApply',
            component:formApply,
            meta: {
                keepAlive: true
            }
        },
        /*修改企业信息*/
        {
            path:'/FormApplySetting',
            name:'FormApplySetting',
            component:FormApplySetting,
            meta: {
                keepAlive: true
            }
        },
        //供应商列表页
        {
            path: '/supplier',
            name: 'supplier',
            component: Supplier //组件名字
        },

        //公司主页
        {
            path: '/companyHomePage',
            name: 'companyHomePage',
            component: CompanyHomePage //组件名字
        },
        //商品详情页
        {
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: GoodsDetail //组件名字
        },
        { //个人中心
            path: '/personalCenter',
            name: 'personalCenter',
            component: PersonalCenter,
            children: [
                /*站内信*/
                {
                    path: '/personalCenter/Messages',
                    name:'Messages',
                    component: Messages
                },
                // 信息查看详情
                {
                    name: 'messageDetails',
                    path: '/personalCenter/messageDetails',
                    component: messageDetails,
                },
                {
                    name: 'messageInform',
                    path: '/personalCenter/messageInform',
                    component: messageInform,
                },
                {
                    name: 'sendInform',
                    path: '/personalCenter/sendInform',
                    component: sendInform,
                },
                 /*企业信息*/
                {
                    path:'/personalCenter/PersonalData',
                    component:PersonalData
                },
                /*发布商机*/
                {
                    path: '/personalCenter/ReleaseBusinessOpportunity',
                    component: ReleaseBusinessOpportunity
                },
                /*收藏资讯*/
                {
                    path:'/personalCenter/InformationInPer',
                    component:informationInPer
                },
                /*收藏商机*/
                {
                    path:'/personalCenter/OpportunityForBusiness',
                    component:opportunityForBusiness
                },
                /*收藏产品*/
                {
                    path:'/personalCenter/Product',
                    component:product
                },
                /*主页*/
                {
                    path:'/personalCenter/personalIndex',
                    component:personalIndex
                },
                /*商机列表*/
                {
                    path:'/personalCenter/BusinessOpportunityList',
                    component:BusinessOpportunityList
                },
                /*商机设置*/
                {
                    path:'/personalCenter/BusinessOpportunitySetting',
                    component:BusinessOpportunitySetting
                },
                /*报名查询*/
                {
                    path:'/personalCenter/RegistrationInquiry',
                    component:registrationInquiry
                },
                /*修改资料*/
                {
                    path:'/personalCenter/PersonalData',
                    component:PersonalData
                },
                /*发布产品*/
                {
                    path:'/personalCenter/ReleaseProducts',
                    component:ReleaseProducts
                },
                /*产品列表*/
                {
                    path:'/personalCenter/ProductList',
                    component:ProductList
                },
                /*个人中心入驻成功首页*/
                {
                    path:'/personalCenter/personal',
                    component:personal
                },
                /*产品列表--设置*/
                {
                    path:'/personalCenter/ProductListSetting',
                    component:ProductListSetting
                },
                /*参与的商机列表*/
                {
                    path:'/personalCenter/MyParticipationInBusinessOpportunities',
                    component:MyParticipationInBusinessOpportunities
                },
                /*中标的商机列表*/
                {
                    path:'/personalCenter/MyWinningBusinessOpportunities',
                    component:MyWinningBusinessOpportunities
                },

                ],
            redirect: '/personalCenter/personalIndex',/*personal*/
            /*默认路由*/
        },
        { //平台服务
            path: '/platform',
            name: 'platform',
            component: Platform,
        },

        {
            path: '/intl',
            name: 'intl',
            component: Intl,
        },
        {
            name: 'ReportIntl',
            path: '/ReportIntl',
            component: ReportIntl,
        },
       
    ],
    mode: 'hash',
})