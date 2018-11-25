<template>
    <div>
        <div class="infoBox">
          <table>
            <div class="shade"></div>
            <tr class="table-header">
              <th>内容</th>
              <th style="white-space: nowrap">操作</th>
            </tr>
            <tr v-if="item.cmsArticle" class="table-body" :key="idx" v-for='(item,idx) in tableData'>
              <td style="cursor: pointer" @click="goIntl(item.cmsArticle.id,item.cmsArticle.channelId)" class="tdTwo">
                <div style="font-size: 18px;font-weight: 700;" v-if="item.cmsArticle.title" class="title">{{item.cmsArticle.title}}</div>
                <div style="font-size: 14px;line-height: 24px;color: #666;" v-if="item.collectionDate" class="info">{{item.collectionDate}}</div>
                <div v-if="item.cmsArticle.info" class="text">{{item.cmsArticle.info}}</div>
              </td>
              <td><a style="white-space: nowrap;cursor:pointer;color: rgb(23, 166, 181);" @click="handleDelete(idx, item.collection.id)">取消收藏</a></td>
            </tr>
            <tr v-if='tableData.length==0' class="procureBoolean">
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
        width: 870px;/*940*/
        position: relative;
        .pagination{
            margin-top:20px;
            align-self: flex-end;
          position:absolute;
          right:0;
        }
      /*********/
      table{
        width: 870px;
        font-size: 12px;
        /*margin-top: 20px;*/
        border-collapse: separate;
        border-spacing: 0;
      }
      table .procureBoolean td{
        text-align: center;
        color:#909399;
        font-size: 20px !important;
        height: 100px !important;
        background-color: #fafafa !important;
        border-bottom:1px solid #EBEEF5;
      }
      table .table-header{
        /*width:870px;*/
        height: 30px;
        background-color: #17a6b5;
        color: #ffffff;
      }
      table .table-header th:nth-child(1){
        width:90%;
        text-align: left;
        padding-left:10px;
        box-sizing: border-box;
      }
      table .table-header th:nth-child(2){
        width: 10%;
      }
      table .table-body{
        color: #666666;
        padding:10px 0;
        box-sizing: border-box;
        border-bottom:1px solid #EBEEF5;
        display:table;
        width:111%;
      }
      table .table-body td{
        text-align: left;
        color:#17A6B5;
      }
      table .table-body td:nth-child(1){
        width:90%;
      }
      table .table-body td:nth-child(2){
        width:10%;
        text-align: center;
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
          goIntl(articleId,channelId){
            let routeData = this.$router.resolve({ name:'intl',query:{articleId:articleId,channelId:channelId}});
            window.open(routeData.href, '_blank');
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
                this.pageCount=1;
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
            server(url,param){
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            this.tableData=[];
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
                    /*if(res.data.mapList){
                        this.$nextTick(()=>{
                          this.tableData=res.data.mapList;
                          this.pageCount=res.data.totalPage;
                        })
                    }else{
                      this.tableData=[]
                    }*/
                }
            });
            $("#informationInPer>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#informationInPer").css({backgroundColor:'#fff'});
            $("#informationInPer>a").css({color:'#333'});
        },
    }
</script>
