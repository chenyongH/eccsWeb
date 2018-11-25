<template>
    <div class="product">
        <el-table
                :data="tableData"
                :header-cell-style="{background:' #17a6b5',color:'#fff'}"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="商品名称"
                    width="">
                <template slot-scope="scope">
                    <router-link target="_blank" :to="{name:'goodsDetail',query:{id:scope.row.goodsMain.goodsId}}">
                        <div style="cursor: pointer" v-if="scope.row.goodsMain.imgUrlList[0]" class="picBox">
                            <img class="proPicture" :src="imgUrl+scope.row.goodsMain.imgUrlList[0].imgList" alt="">
                            <span>{{scope.row.goodsMain.goodsName}}</span>
                        </div>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                    prop="currentPrice"
                    label="价格"
                    width="">
                <template slot-scope="scope">
                    <span>{{scope.row.goodsMain.salePrice}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column
                    prop="wholesalePrice"
                    label="批发价格">
                <template slot-scope="scope">
                    <span>{{scope.row.wholesalePrice}}</span>
                </template>
            </el-table-column>-->
            <el-table-column
                    prop="time"
                    label="发布时间">
                <template slot-scope="scope">
                    <span>{{scope.row.goodsMain.saleTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operation"
                    label="操作">
                <template slot-scope="scope">
                    <i @click.stop="handleDelete(scope.$index, scope.row.collection.id)" style="font-style: normal;cursor: pointer;color:#17A6B5;">取消收藏</i>
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
    .product{
        width:940px;
        display: flex;
        flex-flow: column;
        .el-icon-delete{cursor: pointer}
        .picBox{
            display:flex;
            align-items: center;
            .proPicture{
                width:100px;
                height:100px;
                margin-right:10px;
            }
        }
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name:'product',
        data(){
            return{
                currentPage: 1,/*当前页数*/
                pageSize:5,/*每页显示条数*/
                pageCount:1,/*总页数*/
                pagerCount:5,/*页码按钮的数量，当总页数超过该值时会折叠*/
                myCollection:'/open/api/acc/myCollection',
                delCollection:'/open/api/acc/delCollection',
                tableData: [],
                imgUrl:''
            }
        },
        methods:{
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
                                type:3,
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
                this.currentPage=1
                this.pageSize=val;/*修改显示每页条数*/
                let pa={
                        accountId:this.accountId,
                        type:3,
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
                        type:3,
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
            this.imgUrl=api.imgUrl;
            let url=this.myCollection,
                pa={
                    accountId:this.accountId,
                    type:3,
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
//            $("#product").css({backgroundColor:'#17A6B5'});
            $("#product>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#product").css({backgroundColor:'#fff'});
            $("#product>a").css({color:'#333'});
        },
    }
</script>
