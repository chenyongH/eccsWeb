<template>
    <div class="inquiry">
        <div class="chanceName">
            <span>{{chanceName}}</span>
            <a @click="goBack">《返回上一页</a>
        </div>
        <div v-if="inquiryInfo.length<=0" class="nothing">
            暂无数据
        </div>
        <div v-if="information.store"
             :key="idxInfo"
             v-for="(information,idxInfo) in inquiryInfo" class="enterprise">
            <div class="left">
                <div @click="navToCompany(information.store.id)" class="title">
                    {{information.store.storeName}}
                </div>
                <div class="address">
                    公司地址：{{information.store.storeCity}}
                </div>
                <div class="product">
                    主营产品：{{information.store.storeGoods}}
                </div>
                <div class="relationship">
                    <div class="vip">
                        <div class="arrow-right"></div>
                        <i class="iconfont icon-vip5" ></i>
                        <span>{{information.store.levelName}}</span>
                    </div>
                    <i class=""><img :src="imgUrl+information.store.medalImg
" alt=""></i>
                    <i class=""><img :src="imgUrl+information.store.medalImg
" alt=""></i>
                </div>
                <ul class="enterpriseGo">
                    <li @click="navToCompany(information.store.id,information.store.chanceCooperation,idxInfo)">
                        <i class="iconfont icon-cuohe"></i>
                        <span v-if="!information.store.chanceCooperation">选择合作</span>
                        <span v-if="information.store.chanceCooperation">已合作</span>
                    </li>
                    <li v-if="information.store.chanceRecommend" @click="connect">平台推荐<i class="iconfont icon-tuijian"></i></li>
                    <!--<li><i class="iconfont icon-xinfengtianchong"></i>给我留言</li>-->
                </ul>
            </div>
            <ul class="right">
                <li @click="goGoodsDetail(good.id)" v-if="good.imageList" :key="good.id" v-for="good in information.goods">
                    <img :src="imgUrl+good.imageList[0].imgList" alt="">
                    <span>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="sizes, prev, pager, next, jumper"
                    :page-count="pageCount"
                    :pager-count="pagerCount"
            >
            </el-pagination>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .inquiry{
        width:940px;
        display: flex;
        flex-flow: column;
        .chanceName{
            font-size: 24px;
            color: #17a6b5;
            margin-bottom: 26px;
            display:flex;
            justify-content: space-between;
            align-items: center;
            a{
                font-size:12px;
            }
        }
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
        .nothing{
            width:100%;
            height:100px;
            display:flex;
            align-items: center;
            justify-content: center;
            background-color: #FAFAFA;
        }
        .enterprise{
            width:100%;
            height:240px;
            border:1px solid #f1f1f1;
            padding:15px 20px;
            margin-bottom:20px;
            box-sizing: border-box;
            display:flex;
            justify-content: space-between;
            .left{
                display:flex;
                flex-flow: column;
                height:100%;
                width:100%;
                justify-content: space-around;
                .title{
                    cursor: pointer;
                    font-size:16px;
                    font-weight: 600;color:#333;
                }
                .address,.product{
                    font-size:14px;
                }
                .relationship{
                    display:flex;
                    align-items: center;
                    .vip{
                        height:20px;
                        background-color:#666 ;
                        color:#fff;
                        margin-right:5px;
                        display:flex;
                        justify-content: space-between;
                        padding-right:8px;
                        box-sizing: border-box;
                        align-items: center;
                        .arrow-right{
                            width:0;
                            height:0;
                            border:10px solid #ffffff;
                            border-right:2px solid transparent;
                            border-top:10px solid transparent;
                            border-bottom:10px solid transparent;
                        }
                    }
                    i{
                        width:20px;
                        height:20px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .icon-cheng{
                        font-size:20px;
                        margin:0 10px;
                    }
                    .icon-xin:before{
                        font-size:20px;
                        background-color: #666;
                        color:#fff;
                    }
                }
                .enterpriseGo{
                    display:flex;
                    li{
                        cursor: pointer;
                        height:30px;
                        border:1px solid #ebebeb;
                        padding:5px 7px;
                        display:flex;
                        align-items: center;
                        margin-right:18px;
                        i{
                            color:#cd2322;
                        }
                        &:last-child{margin:0;}
                    }
                }
            }
            .right{
                display:flex;
                height:100%;
                width:100%;
                li{
                    cursor: pointer;
                    width:180px;
                    height:100%;
                    border:1px solid #eeeeee;
                    display:flex;
                    flex-flow:column;
                    justify-content: space-between;
                    align-items: center;
                    padding:10px;box-sizing: border-box;
                    img{width:100%;}
                }
            }
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js';
    export default{
        name:'registrationInquiry',
        data(){
            return{
                currentPage: 1,/*当前页数*/
                pageSize:5,/*每页显示条数*/
                pageCount:1,/*总页数*/
                pagerCount:5,/*页码按钮的数量，当总页数超过该值时会折叠*/
                url:'/open/api/acc/chanceEnroll',
                appId:'',
                id:'',
                inquiryInfo:[],
                chanceName:'',
                chanceCooperation:'',
                Cooperation:'/open/api/acc/chanceCooperation'

            }
        },
        methods:{
            goBack(){this.$router.go(-1)},
            /*联系方式*/
            connect(){

            },
            /*撮合*/
            navToCompany(e,b,index){
                if(b){
                    return false;
                }else{
                    let url=this.Cooperation,
                    pa={
                        chanceId:this.id,
                        storeId:e,
                    };
                    this.server(url,pa).then(res=>{
                        if(res.code){
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }else{
                            this.inquiryInfo[index].store.chanceCooperation=true;
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }
                    })

                }
            },
            /*点击进入产品详情*/
            goGoodsDetail(e){
                this.$router.push({
                    name:'goodsDetail',
                    query:{
                        id:e
                    }
                })
            },
            /******************************分页**************************/
            handleSizeChange(val) {
                /*每页显示条数*/
                /*console.log("1每页"+val+'条')*/
                this.pageSize=val;/*修改显示每页条数*/
                let pa={
                        chanceId:this.id,
                        pageNumber:this.currentPage,
                        pageSize:val,
                    },
                    url=this.url;
                this.server(url,pa).then(res => {
                    this.inquiryInfo=res.data.storeList;
                    this.pageCount=res.data.pageCount;
                }).catch(err => {
                    alert(err)
                })
            },
            handleCurrentChange(val) {
                /*当前页*/
                /*console.log('2当前'+val+'页')*/
                this.currentPage=val;/*修改当前页数*/
                let pa={
                        chanceId:this.id,
                        pageNumber:val,
                        pageSize:this.pageSize,
                    },
                    url=this.url;
                this.server(url,pa).then(res => {
                    this.inquiryInfo=res.data.storeList;
                    this.pageCount=res.data.pageCount;
                }).catch(err => {
                    alert(err)
                })
            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            this.appId=getCookie('userId');
            this.imgUrl=api.imgUrl;
            this.id=this.$route.query.id;
            this.chanceName=this.$route.query.chanceName;
            let url=this.url,
            pa={
                chanceId:this.id,
                pageNumber:1,
                pageSize:5
            };
            this.server(url,pa).then(res=>{
                if(res.code){
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }else{
                    this.inquiryInfo=res.data.storeList;
                    this.pageCount=res.data.pageCount;
                }
            })
        }
    }
</script>