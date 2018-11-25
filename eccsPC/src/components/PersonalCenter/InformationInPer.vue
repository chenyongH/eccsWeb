<template>
    <div>
        <div class="infoBox">
            <el-table
                    header-click="headClick"
                    :data="tableData"
                    :header-cell-style="{background:' #17a6b5',color:'#fff'}"
                    style="width: 100%">
                <!--<el-table-column
                        prop="img"
                        label="资讯"
                        width="120">
                    <template slot-scope="scope">
                        <div class="picBox">
                            <img class="proPicture" src="../../assets/images/gb1.png" alt="">
                        </div>
                    </template>
                </el-table-column>-->
                <el-table-column
                        prop="info"
                        label="内容"
                        width="">
                    <template v-if="scope.row.cmsArticle" slot-scope="scope">
                        <router-link tag="a" target="_blank" :to="{name:'intl',query:{articleId:scope.row.cmsArticle.id,channelId:scope.row.cmsArticle.channelId}}">
                        <div class="infoList">
                            <div class="title">{{scope.row.cmsArticle.title}}</div>
                            <div class="info">{{scope.row.collectionDate}}</div>
                            <div class="text">{{scope.row.cmsArticle.info}}</div>
                        </div>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="operation"
                        label="操作">
                    <template slot-scope="scope">
                        <i @click="handleDelete(scope.$index, scope.row.collection.id)" style="font-style: normal;cursor: pointer;color:#17A6B5;">取消收藏</i>
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
    </div>
</template>
<style>
    .el-table__empty-block{
        font-size: 20px !important;
        height: 100px !important;
        background-color: #fafafa !important;
    }
</style>
<style lang="less" scoped>

    .infoBox {
        width: 940px;
        display: flex;
        flex-flow: column;
        .pagination{
            margin-top:20px;
            align-self: flex-end;
        }
        .picBox {
            display: flex;
            align-items: center;
            .proPicture {
                width: 100px;
                height: 100px;
                margin-right: 10px;
            }
        }
        .el-icon-delete {
            /*font-size: 25px;*/
            cursor: pointer
        }
        .imgBox {
            height: 90px;
            width: 105px;
            margin-right: 15px;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .infoList {
            width: 100%;
            .title {
                font-size: 18px;
                color: #17a6b5;
                font-weight: bold;
                cursor: pointer;
            }
            .info {
                font-size: 14px;
                line-height: 24px;
                color: #666666;
            }
            .text {
                font-size: 12px;
                color: #17a6b5;
            }
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name: 'informationInPer',
        data(){
            return {
                currentPage: 1,/*当前页数*/
                pageSize:5,/*每页显示条数*/
                pageCount:1,/*总页数*/
                pagerCount:5,/*页码按钮的数量，当总页数超过该值时会折叠*/
                myCollection:'/open/api/acc/myCollection',
                delCollection:'/open/api/acc/delCollection',
                tableData: [],
            }
        },
        methods: {
            headClick(a,b){
              console.log(a,b)
            },
            handleDelete(idx,id){
                let url=this.delCollection,
                pa={
                    accountId:this.accountId,
                    token:this.token,
                    id:id
                };
                this.server(url,pa).then((res)=>{
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData.splice(idx,1);
                        let url=this.myCollection,
                            pa={
                                accountId:this.accountId,
                                type:1,
                                token:this.token,
                                pageNumber:this.currentPage,
                                pageSize:this.pageSize
                            };
                        this.server(url,pa).then((res)=>{
                            if(res.code){

                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }else{
                                this.tableData=res.data.mapList;
                                this.pageCount=res.data.totalPage;
                            }
                        });
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
                        accountId:this.accountId,
                        type:1,
                        token:this.token,
                        pageNumber:1,/*this.currentPage*/
                        pageSize:val,
                    },
                    url=this.myCollection;
                this.server(url,pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData=res.data.mapList;
                        this.pageCount=res.data.totalPage;
                    }
                });
            },
            handleCurrentChange(val) {
                /*当前页*/
                /*console.log('2当前'+val+'页')*/
                this.currentPage=val;/*修改当前页数*/
                let pa={
                        accountId:this.accountId,
                        type:1,
                        token:this.token,
                        pageNumber:val,
                        pageSize:this.pageSize,
                    },
                    url=this.myCollection;
                this.server(url,pa).then(res => {
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.tableData=res.data.mapList;
                        this.pageCount=res.data.totalPage;
                    }
                });
            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            this.accountId=getCookie('userId');
            this.token=getCookie('userToken');
            let url=this.myCollection,
            pa={
                accountId:this.accountId,
                type:1,
                token:this.token,
                pageNumber:1,
                pageSize:5
            };
            this.server(url,pa).then((res)=>{
                if(res.code){

                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }else{
                    this.tableData=res.data.mapList;
                    this.pageCount=res.data.totalPage;
                }
            });
//            $("#informationInPer").css({backgroundColor:'#17A6B5'});
            $("#informationInPer>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#informationInPer").css({backgroundColor:'#fff'});
            $("#informationInPer>a").css({color:'#333'});
        },
    }
</script>