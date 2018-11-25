<template>
    <div class="personalIndex">
        <div class="title">{{tips}}</div>
        <div class="admission">
            <div v-if="tip ==1||tip ==3" class="admissionBox supply">
                <span :style="styleSupply" @click="goApplay(0)" class="title">申请成为供应商
                    <span class="tipCont">{{tipSupplay}}</span>
                </span>
                <div class="info">
                    在eccs发布产品，需要入驻平台，申请成为供应商，来获取相应权限。
                </div>
            </div>
            <div v-if="tip ==0||tip ==3" class="admissionBox Purchase">
                <span :style="stylePurchase" @click="goApplay(1)" class="title">申请成为采购商
                    <span class="tipCont">{{tipPurchase}}</span>
                </span>
                <div class="info">
                    在eccs获取产品，需要入驻平台，申请成为采购商，来获取相应权限。
                </div>
            </div>
            <!--<div v-if="tip" class="admissionBox Purchase">
                <span @click="goApplay(2)" class="title">申请成为采购商/供应商</span>
                <div class="info">
                    在eccs获取产品，需要入驻平台，申请成为采购商，来获取相应权限。
                </div>
            </div>-->
        </div>
    </div>
</template>
<style lang="less" scoped>
    #app{
        height:100%;}
    .personalIndex{
        width: 870px;/*940*/
        .title{
            font-size:16px;
        }
        .admission{
            width:100%;
            display:flex;
            justify-content: space-between;
            margin-top:20px;
            .admissionBox{
                width:340px;/*450*/
                padding:40px;
                border:1px solid #ebebeb;
                display:flex;
                flex-flow: column;
                .title{
                    padding:10px;
                    border-radius: 4px;
                    background-color: #17A6B5;
                    margin-bottom: 20px;
                    color:#fff;
                    cursor: pointer;
                    width:132px;
                    position:relative;
                    .tipCont{
                        position:absolute;
                        left:142px;
                        top:10px;
                        color:red;
                        width:100%;
                    }
                }
            }
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name:'personalIndex',
        data(){
            return{
                enterJudge:'/open/api/acc/enterJudge',
                tips:'',
                tip:'',/*入驻状态*/
                status:'',/*审核状态*/
                tipSupplay:'',/*供应商入驻提示信息*/
                tipPurchase:'',/*采购商入驻提示信息*/
                styleSupply:{},/*供应商按钮状态*/
                stylePurchase:{},/*采购商按钮状态*/
            }
        },
        methods:{
            /*申请入驻*/
            goApplay(e){
                /*this.$router.push({
                    name:'formApply',
                });*/
                if(this.status!==0){
                    let routeData = this.$router.resolve({ name:'formApply',query:{id:e}});
                    window.open(routeData.href, '_blank');
                }

            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            let url=this.enterJudge,
             pa={
                accountId:getCookie('userId'),
                token:getCookie('userToken')
            };
            this.server(url,pa).then(res=>{
                if(res.code==2){
                    this.$message({
                        message: res.msg+"请重新登录",
                        type: 'error'
                    });
                    setTimeout(()=> {
                        this.$router.push({
                            name:'login',
                        });
                    },500)
                }
                if(res.data){
                    this.tip=res.data.storeType;
                    this.status=res.data.checkStatus;
                }

                this.$store.dispatch("changeAdmission", res.data.storeType);/*控制左边显示*/
                switch (res.data.storeType){
                    case 0:
                        this.$router.push({
                            path:'/personalCenter/personal',
                            /*query:{
                                type:res.data.storeType,
                                status:res.data.checkStatus,
                            }*/
                        });
                        this.$store.dispatch("changeAdmission", res.data.storeType);
                        this.$store.dispatch("changeStatus", res.data.checkStatus);
                        break;
                    case 1:
                        this.$router.push({
                            path:'/personalCenter/personal',
                            /*query:{
                                type:res.data.storeType,
                                status:res.data.checkStatus,
                            }*/
                        });
                        this.$store.dispatch("changeAdmission", res.data.storeType);
                        this.$store.dispatch("changeStatus", res.data.checkStatus);
                        break;
                    case 2:
                        this.$router.push({
                            path:'/personalCenter/personal',
                            /*query:{
                                type:res.data.storeType,
                                status:res.data.checkStatus,
                            }*/
                        });
                        this.$store.dispatch("changeAdmission", res.data.storeType);
                        this.$store.dispatch("changeStatus", res.data.checkStatus);
                        break;
                    default:
                        this.tips="欢迎入驻成为供应商或者采购商，请填写相关信息！";
                        if(res.data.checkStatusType!==undefined){
                           switch (res.data.checkStatusType){
                               case 0:
                                   switch (res.data.checkStatus){
                                       case 0:
                                           this.tips="您申请的供应商待审核！";
                                           this.tipSupplay="待审核";
                                           this.styleSupply={
                                               backgroundColor:'#eee',
                                               cursor:'not-allowed',
                                               color:'#999'
                                           };
                                           this.stylePurchase={
                                               backgroundColor:'#eee',
                                               cursor:'not-allowed',
                                               color:'#999'
                                           };
                                           break;
                                       /*case 1:
                                           this.tips="您已成为供应商！";
                                           this.$router.push({
                                               path:'/personalCenter/personal',
                                               query:{
                                                   type:res.data.storeType
                                               }
                                           });
                                           this.tipSupplay="";
                                           this.styleSupply={};
                                           break;*/
                                       case 2:
                                           this.tips="您申请的供应商审核未通过！";
                                           this.tipSupplay="审核未通过";
                                           this.styleSupply={};
                                           break;
                                   }
                                   break;
                               case 1:
                                   switch (res.data.checkStatus){
                                       case 0:
                                           this.tips="您申请的采购商待审核！";
                                           this.tipPurchase="待审核";
                                           this.stylePurchase={
                                               backgroundColor:'#eee',
                                               cursor:'not-allowed',
                                               color:'#999'
                                           };
                                           this.styleSupply={
                                               backgroundColor:'#eee',
                                               cursor:'not-allowed',
                                               color:'#999'
                                           };
                                           break;
                                       /*case 1:
                                           this.tips="您已成为采购商！";
                                           this.$router.push({
                                               path:'/personalCenter/personal',
                                               query:{
                                                   type:res.data.storeType
                                               }
                                           });
                                           this.tipPurchase="";
                                           this.stylePurchase={};
                                           break;*/
                                       case 2:
                                           this.tips="您申请的采购商审核未通过！";
                                           this.tipPurchase="审核未通过";
                                           this.stylePurchase={};
                                           break;
                                   }
                                   break;
                           }
                        }
                }
            })
        }
    }
</script>
