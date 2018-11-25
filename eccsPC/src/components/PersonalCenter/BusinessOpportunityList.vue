<template>
    <div class="BusinessOpportunityList">
        <div class="tabs">
            <span :style="activeTab" @click="tabsClick(1)">已发布（{{count1}}）</span>
            <span :style="activeTab" @click="tabsClick(0)">待审核（{{count0}}）</span>
            <span :style="activeTab" @click="tabsClick(2)">未通过（{{count2}}）</span>
            <span :style="activeTab" @click="tabsClick(3)">已下架（{{count3}}）</span>
        </div>
        <table>
            <div class="shade"></div>
            <tr class="table-header">
                <th>区域</th>
                <th>商机类型</th>
                <th>内容摘要</th>
                <th>提交日期</th>
                <!--<th>结束时间</th>-->
                <th>阶段</th>
                <th v-if="type==2">审核意见</th>
                <th style="white-space: nowrap" v-if="type==1||type==3">操作</th>
            </tr>
            <tr class="table-body" v-for='item in tableData'>
                <td>{{item.buyArea}}</td>
                <td @click.stop="handleClick(item.id)" style="cursor: pointer" class="tdTwo">
                    <img :src="imgUrl+item.chanceTypeUrl" alt="">
                    <span class="span1">{{item.chanceTypeName}}</span>
                </td>
                <td>
                    <div>
                        <span class="span1">{{item.chanceName}}</span>
                        <span class="span2">{{item.chanceInfo}}</span>
                    </div>
                </td>
                <td>{{item.releaseTime}}</td>
                <!--<td>{{item.endDate}}</td>-->
                <td>{{item.stage}}</td>
                <td v-if="type==2">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="hover">
                        <el-table :data="item.checkReason">
                            <el-table-column width="" property="checkTime" label="审核日期"></el-table-column>
                            <el-table-column width="" property="checkLog" label="审核结果"></el-table-column>
                        </el-table>
                        <el-button size="mini" slot="reference">审核意见</el-button>
                    </el-popover>
                </td>
                <td v-if="type==1||type==3">
                    <a v-if="type==1" @click.stop="lowerFrame(item.id)" style="white-space: nowrap" >下架</a>
                    <a v-if="type==3" @click.stop="setBO(item.id)" style="white-space: nowrap" >设置</a>
                    <a v-if="type==1" @click.stop="setRI(item.id,item.chanceName)" style="white-space: nowrap;margin-left: 10px;" >报名查询</a>
                </td>
            </tr>
            <tr v-if='tableData.length<=0' class="procureBoolean">
                <td colspan="7">暂无数据</td>
            </tr>

        </table>
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
    .BusinessOpportunityList{
        width:940px;
        display: flex;
        flex-flow: column;
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
        .tabs{
            width:100%;
            height:30px;
            display:flex;
            justify-content: space-around;
            color:#fff;
            background-color: #17A6B5;
            align-items: flex-end;
            border-bottom: 2px solid #fff;
            span{
                cursor: pointer;
                height:80%;
                padding:0 10px;
                /*&:first-child{
                    background-color: #fff;
                    color:#333;
                }*/
            }
        }
        /*table{
            width:100%;
            thead{
                width:100%;
                height:30px;
                display:flex;
                align-items:center;
                background-color: #fafafa;
                tr{
                    width:100%;
                }
            }
            tr{
                width:100%;
                display:flex;
                justify-content: space-around;
            }
        }*/
        table{
            width: 100%;
            font-size: 12px;
            /*margin-top: 20px;*/
            border-collapse: separate;
            border-spacing: 0;
        }
        table .procureBoolean td{
            height: 100px;
            text-align: center;
            font-size: 20px;
            color: #b1b1b1;
            border-bottom:1px solid #EBEEF5;
        }
        table tr{
            width: 1200px;
        }
        table .table-header{
            height: 30px;
            background-color: #fafafa;
        }
        table .table-header th:nth-child(1){
            border-radius: 5px 0px 0px 0px ;
            width: 90px;
        }
        table .table-header th:nth-child(2){
            width: 170px;
        }
        table .table-header th:nth-child(3){
            width: 380px;
        }
        table .table-header th:nth-child(4){
            width: 170px;
        }
        table .table-header th:nth-child(5){
            width: 170px;
        }
        table .table-header th:nth-child(6){
            width: 110px;
        }
        table .table-header th:nth-child(7){
            border-radius: 0px 5px 0px 0px ;
        }
        table .table-body{
            height: 85px;
            color: #666666;
        }
        table .table-body td{
            text-align: center;
        }
        table .table-body td:nth-child(3) img{
            line-height: 85px;
        }
        table .table-body td:nth-child(2){
            display: flex;
            justify-content: center;
            align-items: center;
            height: 85px;
        }
        table .table-body td:nth-child(2) span{
            margin-left: 10px;
        }
        table .table-body td:nth-child(3){
            text-align: left;
            width:25%;
        }
        table .table-body td:nth-child(3) div{
            display: inline-block;
        }
        table .table-body td:nth-child(3) div span{
            display: block;
            text-align: left;
            padding-left: 20px;

        }
        table .table-body td:nth-child(3) div .span1{
            margin-bottom: 10px;
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js';
    export default{
        name:'businessOpportunityList',
        data(){
            return{
                appId:'',
                url:'/open/api/acc/chanceStateList',/*个人中心商机列表*/
                tableData:[],
                imgUrl:'',
                currentPage: 1,/*当前页数*/
                pageSize:5,/*每页显示条数*/
                pageCount:1,/*总页数*/
                pagerCount:5,/*页码按钮的数量，当总页数超过该值时会折叠*/
                type:1,/*默认页面*/
                count0:'',/*待审核*/
                count1:'',/*已发布*/
                count2:'',/*未通过*/
                count3:'',/*已下架*/
                offChance:'/open/api/acc/offChance',
                activeTab:{}
            }
        },
        methods:{
            handleClick(e){
                this.$router.push({
                    name:'BusinessChancelogin',
                    query:{
                        chanceId:e
                    }
                })
            },
            /*下架*/
            lowerFrame(id){
                let pa={
                    chanceId:id
                },
                url=this.offChance;
                this.server(url,pa).then(res=>{
                    console.log(res)
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                        let url=this.url,
                            pa={
                                appId:this.appId,
                                type:this.type,
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
                                this.tableData=res.data.resultList;
                                this.pageCount=res.data.pageCount;
                                this.count0=res.data.count0;
                                this.count1=res.data.count1;
                                this.count2=res.data.count2;
                                this.count3=res.data.count3;
                            }
                        });
                    }
                })
            },
            /*点击设置*/
            setBO(id){
                /*BusinessOpportunitySetting*/
                this.$router.push({
                    path:'/personalCenter/BusinessOpportunitySetting',
                    query:{
                        id:id
                    }
                })
            },
            /*报名查询*/
            setRI(id,name){
                /*BusinessOpportunitySetting*/
                this.$router.push({
                    path:'/personalCenter/RegistrationInquiry',
                    query:{
                        id:id,
                        chanceName:name
                    }
                })
            },
            /*点击tab*/
            tabsClick(index){
                this.currentPage = 1;
                /*当前页数*/
                this.pageSize = 5;
                /*每页显示条数*/
                this.pageCount = 1;
                /*总页数*/
                this.pagerCount = 5;
                /*页码按钮的数量，当总页数超过该值时会折叠*/
                this.type=index;
                let url=this.url,
                    pa={
                        appId:this.appId,
                        type:index,
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
                        this.tableData=res.data.resultList;
                        this.pageCount=res.data.pageCount;
                        this.count0=res.data.count0;
                        this.count1=res.data.count1;
                        this.count2=res.data.count2;
                        this.count3=res.data.count3;
                    }
                })
            },
            /******************************分页**************************/
            handleSizeChange(val) {
                /*每页显示条数*/
                /*console.log("1每页"+val+'条')*/
                this.currentPage=1;
                this.pageSize=val;/*修改显示每页条数*/
                let pa={
                        appId:this.appId,
                        type:this.type,
                        pageNumber:1,/*this.currentPage*/
                        pageSize:val,
                    },
                    url=this.url;
                this.server(url,pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData=res.data.resultList;
                        this.pageCount=res.data.pageCount;
                    }
                });
            },
            handleCurrentChange(val) {
                /*当前页*/
                /*console.log('2当前'+val+'页')*/
                this.currentPage=val;/*修改当前页数*/
                let pa={
                        accountId:this.accountId,
                        appId:this.appId,
                        type:this.type,
                        token:this.token,
                        pageNumber:val,
                        pageSize:this.pageSize,
                    },
                    url=this.url;
                this.server(url,pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData=res.data.resultList;
                        this.pageCount=res.data.pageCount;
                    }
                });
            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            if(this.$route.query.type==0){
                this.type=this.$route.query.type
            }else{
                this.type=1
            }
            this.appId=getCookie('userId');
            this.imgUrl=api.imgUrl;
            let {type}=this;
            let url=this.url,
                pa={
                    appId:this.appId,
                    type:type,
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
                    this.tableData=res.data.resultList;
                    this.pageCount=res.data.pageCount;
                    this.count0=res.data.count0;
                    this.count1=res.data.count1;
                    this.count2=res.data.count2;
                    this.count3=res.data.count3;
                }
            });
            switch (parseInt(this.type)){
                case 0:
                    $(".tabs>span:nth-child(2)").css({
                        backgroundColor:'#fff',
                        color:'#17A6B5'
                    });
                    break;
                case 1:
                    $(".tabs>span:nth-child(1)").css({
                        backgroundColor:'#fff',
                        color:'#17A6B5'
                    });
                    break;
                case 2:
                    $(".tabs>span:nth-child(2)").css({
                        backgroundColor:'#fff',
                        color:'#17A6B5'
                    });
                    break;
                case 3:
                    $(".tabs>span:nth-child(1)").css({
                        backgroundColor:'#fff',
                        color:'#17A6B5'
                    });
                    break;
            }
            /*$(".tabs>span:nth-child(1)").css({
                backgroundColor:'#fff',
                color:'#17A6B5'
            });*/
            $('.tabs>span').click(function () {
                $(this).css({backgroundColor:'#fff',color:'#17A6B5'});
                $(this).siblings().css({backgroundColor:'',color:'#fff'});
            });
//            $("#BusinessOpportunityList").css({backgroundColor:'#17A6B5'});
            $("#BusinessOpportunityList>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#BusinessOpportunityList").css({backgroundColor:'#fff'});
            $("#BusinessOpportunityList>a").css({color:'#333'});
        },
    }
</script>