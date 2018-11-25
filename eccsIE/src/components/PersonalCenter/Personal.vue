<template>
    <div class="pcRight">
        <div class="pcBox">
            <div class="top">
                <div class="title">{{data.storeName}}
                  <span style="position: relative;background-color: #17A6B5"><i style="font-size: 16px;color:#fff;" class="iconfont icon-vip2"></i></span>
                </div>
                <ul class="right Admission">
                    <li @click="goPersonalData" >企业会员</li>
                    <li :style="color" @click="goApplay(1)" v-if="type==0">入驻采购商{{status}}</li>
                    <li :style="color" @click="goApplay(0)" v-if="type==1">入驻供应商{{status}}</li>
                </ul>
            </div>
            <div class="bottom">
                <div class="li">
                    <div class="icon">
                        <i class="iconfont icon-quality"></i>
                        <i class="iconfont icon-xin1"></i>
                        <i class="iconfont icon-v"></i>
                    </div>
                </div>
                <div v-if="type==1||type==2" class="li">
                    <span>我的采购</span>
                    <span>已上线 <b class="skyBlue">{{data.chanceCounts[1]}}</b></span>
                    <span>审核中 <b>{{data.chanceCounts[0]}}</b></span>
                    <span>审核拒绝 <b class="red">{{data.chanceCounts[2]}}</b></span>
                    <span>已下线 <b>{{data.chanceCounts[3]}}</b></span>
                </div>
                <div v-if="type==0||type==2" class="li">
                    <span>我的供应</span>
                    <span>已上线 <b class="skyBlue">{{data.goodsCounts[1]}}</b></span>
                    <span>审核中 <b>{{data.goodsCounts[0]}}</b></span>
                    <span>审核拒绝 <b class="red">{{data.goodsCounts[2]}}</b></span>
                    <span>已下线 <b>{{data.goodsCounts[3]}}</b></span>
                </div>
            </div>
        </div>
        <div v-if="type==1||type==2" class="pcBox">
            <div class="top">
                <div class="title">我的采购 <i class="iconfont icon-caigou"></i></div>
            </div>
            <ul class="bottom">
                <li :key="item.id" v-for="item in data.chanceList">
                    <span>{{item.chanceName}}</span>
                    <span>{{item.buyArea}}</span>
                    <span class="skyBlue">{{item.buyGoods}}</span>
                    <span>{{item.releaseTime}}</span>
                </li>
            </ul>
        </div>
        <div v-if="type == 0 || type == 2" class="pcBox">
            <div class="top">
                <div class="title">我的供应 <i class="iconfont icon-gongying"></i></div>
            </div>
            <ul class="bottom">
                <li :key="item.goodsId" v-for="item in data.goodsList">
                    <span>{{item.goodsName}}</span>
                    <span>{{item.goodsType}}</span>
                    <span>{{item.goodsClass}}</span>
                    <span>￥{{item.salePrice}}</span>
                    <span>{{item.saleTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="less">
    .Admission{
        li{
            cursor: pointer;
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name:'personal',
        data(){
            return{
                /*type:'',*//*已入驻类型*/
                status:'',/*审核状态*/
                /*statusCode:'',*/
                url:'/open/api/acc/personalCenter',/*入驻成功首页*/
                data:{},
                color:{}
            }
        },
        methods:{
            /*企业会员*/
            goPersonalData(){
                this.$router.push({
                    path:'/personalCenter/PersonalData'
                });
            },
            /*申请入驻*/
            goApplay(e){
                /*console.log(this.statusCode)*/
                if(this.statusCode===0){

                }else{
                    let routeData = this.$router.resolve({ name:'formApply',query:{id:e,S:3}});
                    window.open(routeData.href, '_blank');
                }

            },

            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
      computed:{
        type(){
            return this.$store.state.personal.Admission;
        },
        statusCode(){
            return this.$store.state.personal.Status;
        }
      },
        mounted(){
            switch(this.$store.state.personal.Status){
                case 0:
                    this.status="待审核";
                    this.color={
                        cursor:'not-allowed',
                        color:'#999'
                    };
                    break;
                case 2:
                    this.status="审核未通过";
                    this.color={};
                    break;
                default:
                    this.status='';
                    this.color={};
            }
            let url=this.url,pa={
                appId:getCookie('userId')
            };
            this.server(url,pa).then(res=>{
                if(res.code){
                    if(res.code===2){
                        this.$message({
                            message: res.msg+"请重新登录",
                            type: 'error'
                        });
                        setTimeout(()=> {
                            this.$router.push({
                                name:'login',
                            });
                        },500)
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                }else{
                    this.data=res.data;
                }
            })
            $("#personalCenter>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#personalCenter").css({backgroundColor:'#fff'});
            $("#personalCenter>a").css({color:'#333'});
        },
    }
</script>
<style lang="less">
    .pcRight{
        width:870px;/*940*/
        .pcBox{
            width:100%;
            padding:20px;
            box-sizing: border-box;
            border:1px solid #ebebeb;
            margin-bottom:20px;
            .top{
                width:100%;
                font-size:18px;
                display:flex;
                justify-content: space-between;
                align-items: center;
                .title{
                    sub{
                        i{
                            width:9px;height:9px;
                            background-color: #17A6B5;
                            color:#fff;
                        }
                    }
                    i{
                        color:#17A6B5;
                    }
                }
                .right{
                    color:#17A6B5;
                    display:flex;
                    width:auto;
                    li{
                        width:auto;
                        padding:0 30px;
                        font-size:16px;
                    }
                }
            }
            .bottom{
                width:100%;
                .li{
                    width:100%;
                    height:50px;
                    border-bottom: 1px solid #ebebeb;
                    display:flex;
                    align-items: center;
                    justify-content: space-around;
                    .skyBlue{
                        color:#17a6b5;
                    }
                    .red{
                        color:#d71919;
                    }
                    b{margin-left:10px;}
                    i{
                        width:20px;height:20px;
                        font-size:20px;
                        color:#17a6b5;
                    }
                    &:first-child{
                        justify-content: space-between;
                        padding-left:50px;
                      box-sizing: border-box;
                    }
                }
            }
            ul{
                width:100%;
                li{
                    width:100%;
                    height:50px;
                    box-sizing: border-box;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                    .skyBlue{
                        color:#17a6b5;
                    }
                    span{
                        width:100%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        word-break: keep-all;
                    }
                }
            }
        }
    }
</style>
