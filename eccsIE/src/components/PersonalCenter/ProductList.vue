<template>
    <div class="BusinessOpportunityList">
        <div class="tabs">
            <span @click="tabsClick(1)">已发布（{{count1}}）</span>
            <span @click="tabsClick(0)">待审核（{{count0}}）</span>
            <span @click="tabsClick(2)">未通过（{{count2}}）</span>
            <span @click="tabsClick(3)">已下架（{{count3}}）</span>
        </div>
        <!--@row-click="handleClick"-->
        <el-table
                :data="tableData"
                :header-cell-style="{background:' #fafafa',height:'30px',textAlign:'center'}"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="商品名称"
                    width="200px">
                <template slot-scope="scope">
                    <div @click.stop="handleClick(scope.row.goodsId)" style="cursor: pointer" v-if="scope.row.goodsImage" class="picBox">
                        <img class="proPicture" :src="imgUrl+scope.row.goodsImage.imgList" alt="">
                        <span>{{scope.row.goodsName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="goodsType"
                    label="商品类型"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <span>{{scope.row.goodsType}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="goodsClass"
                    label="商品分类"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <span>{{scope.row.goodsClass}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="currentPrice"
                    label="价格"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <span>{{scope.row.salePrice}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="time"
                    width="150px"
                    align="center"
                    label="发布时间">
                <template slot-scope="scope">
                    <span>{{scope.row.saleTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="type==2"
                    prop="tip"
                    align="center"
                    label="审核意见">
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="hover">
                        <el-table :data="scope.row.checkReason">
                            <el-table-column width="" property="checkTime" label="审核日期"></el-table-column>
                            <el-table-column width="" property="checkLog" label="审核结果"></el-table-column>
                        </el-table>
                        <el-button size="mini" slot="reference">查看原因</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    v-if="type==1||type==3"
                    prop="operation"
                    label="操作">
                <template slot-scope="scope">
                    <a v-if="type==1" @click.stop="lowerFrame(scope.row.goodsId)" style="cursor:pointer;color: rgb(23, 166, 181);white-space: nowrap">下架</a>
                    <a v-if="type==3" @click.stop="setBO(scope.row.goodsId)" style="cursor:pointer;color: rgb(23, 166, 181);white-space: nowrap">设置</a>
                </template>
            </el-table-column>
        </el-table>
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
    .BusinessOpportunityList {
        width: 870px;/*940*/
        position: relative;
        .tabs {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-around;
            color: #fff;
            background-color: #17A6B5;
            align-items: flex-end;
            border-bottom: 2px solid #fff;
            span {
                cursor: pointer;
                height: 80%;
                padding: 0 10px;
            }
        }
        .el-icon-delete {
            cursor: pointer
        }
        .picBox {
          /*display:flex;*/
          align-items: center;
          display: -webkit-box;
          -webkit-box-align: center;
            .proPicture {
                width: 100px;
                height: 100px;
                margin-right: 10px;
              vertical-align: middle;
            }
          span{
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
            position: absolute;
            right:0;
        }
        /*width: 940px;
        display: flex;
        flex-flow: column;
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
        .tabs {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-around;
            color: #fff;
            background-color: #17A6B5;
            align-items: flex-end;
            border-bottom: 2px solid #fff;
            span {
                cursor: pointer;
                height: 80%;
                padding: 0 10px;
            }
        }

        table {
            width: 100%;
            font-size: 12px;
            !*margin-top: 20px;*!
            border-collapse: separate;
            border-spacing: 0;
        }
        table .procureBoolean td {
            height: 100px;
            text-align: center;
            font-size: 20px;
            color: #b1b1b1;
            border-bottom: 1px solid #EBEEF5;
        }
        table tr {
            width: 100%;
        }
        table .table-header {
            height: 30px;
            background-color: #fafafa;
        }
        table .table-header th:nth-child(1) {
            border-radius: 5px 0px 0px 0px;
            width: 90px;
        }
        table .table-header th:nth-child(2) {
            width: 100px;
        }
        table .table-header th:nth-child(3) {
            width: 100px;
        }
        table .table-header th:nth-child(4) {
            width: 170px;
        }
        table .table-header th:nth-child(5) {
            width: 100px;
        }
        table .table-header th:nth-child(6) {
            width: 110px;
        }
        table .table-header th:nth-child(7) {
            width:100px;
        }
        table .table-body {
            height: 85px;
            color: #666666;
        }
        table .table-body td {
            text-align: center;
        }
        table .table-body td:nth-child(3) img {
            line-height: 85px;
        }
        table .table-body td:nth-child(1) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 85px;
        }
        table .table-body td:nth-child(4){
            text-align: left;
        }
        table .table-body td:nth-child(2) span {
            margin-left: 10px;
        }
        table .table-body td:nth-child(3) div {
            display: inline-block;
        }
        table .table-body td:nth-child(3) div span {
            display: block;
            text-align: left;
            padding-left: 20px;

        }
        table .table-body td:nth-child(3) div .span1 {
            margin-bottom: 10px;
        }*/
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js';
    export default{
        name: 'productList',
        data(){
            return {
                appId: '',
                url: '/open/api/acc/goodsList', /*个人中心商品列表*/
                tableData: [],
                imgUrl: '',
                currentPage: 1, /*当前页数*/
                pageSize: 5, /*每页显示条数*/
                pageCount: 1, /*总页数*/
                pagerCount: 5, /*页码按钮的数量，当总页数超过该值时会折叠*/
                type: 1, /*默认页面*/
                count0: '', /*待审核*/
                count1: '', /*已发布*/
                count2: '', /*未通过*/
                count3: '', /*已下架*/
                offGoods: '/open/api/acc/offGoods', /*产品下架*/
            }
        },
        methods: {
            handleClick(row){
                /*console.log(row)*/
                this.$router.push({
                    name: 'goodsDetail',
                    query: {
                        id: row
                    }
                })
            },
            /*下架*/
            lowerFrame(id){
                let pa = {
                        goodsId: id
                    },
                    url = this.offGoods;
                this.server(url, pa).then(res => {
                    /*console.log(res)*/
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        let url = this.url,
                            pa = {
                                appId: this.appId,
                                type: this.type,
                                pageNumber: 1,
                                pageSize: 5
                            };
                        this.server(url, pa).then(res => {
                            if (res.code) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            } else {
                                this.tableData = res.data.resultList;
                                this.pageCount = res.data.pageCount;
                                this.count0 = res.data.count0;
                                this.count1 = res.data.count1;
                                this.count2 = res.data.count2;
                                this.count3 = res.data.count3;
                            }
                        });
                    }
                })
            },
            /*点击设置*/
            setBO(id){
                this.$router.push({
                    path: '/personalCenter/ProductListSetting',
                    query: {
                        id: id
                    }
                })
            },
            /*报名查询*/
            /*setRI(id){
             /!*BusinessOpportunitySetting*!/
             this.$router.push({
             path: '/personalCenter/RegistrationInquiry',
             query: {
             id: id
             }
             })
             },*/
            /*点击tab*/
            tabsClick(index){
                this.currentPage = 1;
                /*当前页数*/
                this.pageSize = 5;
                /*每页显示条数*/
                this.pageCount = 1;
                /*总页数*/
                this.pagerCount = 5;
                this.tableData=[];
                this.pageCount=1;
                this.count0='';
                this.count1='';
                this.count2='';
                this.count3='';
                /*页码按钮的数量，当总页数超过该值时会折叠*/
                /*console.log(index)*/
                this.type = index;
                let {url,appId} = this,
                    pa = {
                        appId:appId,
                        type: index,
                        pageNumber: 1,
                        pageSize: 5
                    };
                this.server(url, pa).then(res => {
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.tableData = res.data.resultList;
                        this.pageCount = res.data.pageCount;
                        this.count0 = res.data.count0;
                        this.count1 = res.data.count1;
                        this.count2 = res.data.count2;
                        this.count3 = res.data.count3;
                    }
                })
            },
            /******************************分页**************************/
            handleSizeChange(val) {
                /*每页显示条数*/
                /*console.log("1每页"+val+'条')*/
              this.currentPage=1;
                this.pageSize = val;
                /*修改显示每页条数*/
                let pa = {
                        appId: this.appId,
                        type: this.type,
                        pageNumber: 1,/*this.currentPage*/
                        pageSize: val,
                    },
                    url = this.url;
                this.server(url, pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData = res.data.resultList;
                        this.pageCount = res.data.pageCount;
                    }
                });
            },
            handleCurrentChange(val) {
                /*当前页*/
                /*console.log('2当前'+val+'页')*/
                this.currentPage = val;
                /*修改当前页数*/
                let pa = {
                        accountId: this.accountId,
                        appId: this.appId,
                        type: this.type,
                        token: this.token,
                        pageNumber: val,
                        pageSize: this.pageSize,
                    },
                    url = this.url;
                this.server(url, pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData = res.data.resultList;
                        this.pageCount = res.data.pageCount;
                    }
                });
            },
            /*******************************服务接口**********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.collection + url, param)
            },
        },
        mounted(){
            if(this.$route.query.type==0){
              this.type=0
            }else{
              this.type=1
            }
            this.appId = getCookie('userId');
            this.imgUrl = api.imgUrl;
            let url = this.url,
                pa = {
                    appId: this.appId,
                    type: this.type,
                    pageNumber: 1,
                    pageSize: 5
                };
            this.server(url, pa).then(res => {
                if (res.code) {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                } else {
                    this.tableData = res.data.resultList;
                    this.pageCount = res.data.pageCount;
                    this.count0 = res.data.count0;
                    this.count1 = res.data.count1;
                    this.count2 = res.data.count2;
                    this.count3 = res.data.count3;
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
            /*$('.tabs>span:nth-child(2)').css({
                backgroundColor: '#fff',
                color: '#17A6B5'
            });*/
            $('.tabs>span').click(function () {
                $(this).css({backgroundColor: '#fff', color: '#17A6B5'});
                $(this).siblings().css({backgroundColor: '', color: '#fff'});
            });
//            $("#ProductList").css({backgroundColor: '#17A6B5'});
            $("#ProductList>a").css({color: '#17A6B5'});
        },
        beforeDestroy: function () {
            $("#ProductList").css({backgroundColor: '#fff'});
            $("#ProductList>a").css({color: '#333'});
        },
    }
</script>
