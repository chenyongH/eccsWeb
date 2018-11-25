<template>
    <div class="opportunityForBusiness">
        <table>
            <div class="shade"></div>
            <tr class="table-header">
                <th>区域</th>
                <th>商机类型</th>
                <th>企业名称</th>
                <th>内容摘要</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>阶段</th>
                <th>操作</th>
            </tr>
            <tr class="table-body" :key="idx" v-for='(item,idx) in tableData'>
                <td>{{item.buyArea}}</td>
                <td @click.stop="handleClick(item.id)" style="cursor: pointer" class="tdTwo">
                    <img :src="imgUrl+item.chanceTypeUrl" alt="">
                    <span class="span1">{{item.chanceTypeName}}</span>
                </td>
                <td>{{item.storeMain.storeName}}</td>
                <td>
                    <div>
                        <span class="span1">{{item.chanceName}}</span>
                        <span class="span2">{{item.chanceInfo}}</span>
                    </div>
                </td>
                <td>{{item.beginDate}}</td>
                <td>{{item.endDate}}</td>
                <td>{{item.stage}}</td>
                <td><a style="cursor:pointer;white-space: nowrap;color: rgb(23, 166, 181);" @click='CancelRegistration(idx,item.id)'>取消报名</a></td>
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
</template>
<style lang="less" scoped>
    .opportunityForBusiness{
        width:870px;/*940*/
        display: flex;
        flex-flow: column;
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
        table{
            width: 100%;
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
        table tr{
            width: 1200px;
        }
        table .table-header{
            height: 30px;
            background-color: #17a6b5;
            color: #ffffff;
        }
        table .table-header th:nth-child(1){
            /* border-radius: 5px 0px 0px 0px ;*/
            width: 70px;
        }
        table .table-header th:nth-child(2){
            width: 120px;
        }
        table .table-header th:nth-child(3){
            width: 156px;
        }
        table .table-header th:nth-child(4){
            width: 210px;/*270*/
        }
        table .table-header th:nth-child(5){
            width: 90px;
        }
        table .table-header th:nth-child(6){
            width: 90px;
        }
        table .table-header th:nth-child(7){
            /*border-radius: 0px 5px 0px 0px ;*/
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
        table .table-body td:nth-child(4){
            text-align:left ;
            padding:0 15px;
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
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name:'MyParticipationInBusinessOpportunities',
        data(){
            return{
                currentPage: 1,/*当前页数*/
                pageSize:5,/*每页显示条数*/
                pageCount:1,/*总页数*/
                pagerCount:5,/*页码按钮的数量，当总页数超过该值时会折叠*/
                url:'/open/api/acc/joinChanceLog',
                offChance:'/open/api/acc/offChanceEnroll',
                tableData: [],
                imgUrl:''
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
            /*goPath 详细信息*/
            CancelRegistration(idx,id){
               let url=this.offChance,pa={
                   appId:this.appId,
                   chanceId:id
                   };
               this.server(url,pa).then(res=>{
                   if(res.code){
                       this.$message({
                           message: res.msg,
                           type: 'warning'
                       });
                   }else{
                     this.tableData.splice(idx,1);
                     let url=this.url,
                       pa={
                         appId:this.appId,
                         pageNumber:this.currentPage,
                         pageSize:this.pageSize
                       };
                     this.server(url,pa).then((res)=>{
                       /*this.pageCount=res.data.totalPage;*/
                       if(res.code){
                         this.$message({
                           message: res.msg,
                           type: 'warning'
                         });
                       }else{
                         this.tableData=res.data.chanceList;
                         this.pageCount=res.data.pageCount;
                       }
                     });
                   }
               })
            },
            /******************************分页**************************/
            handleSizeChange(val) {
                /*每页显示条数*/
                /*console.log("1每页"+val+'条')*/
                this.pageSize=val;/*修改显示每页条数*/
                let pa={
                        appId:this.appId,
                        pageNumber:this.currentPage,
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
                        this.tableData=res.data.chanceList;
                        this.pageCount=res.data.pageCount;
                    }
                });
            },
            handleCurrentChange(val) {
                /*当前页*/
                /*console.log('2当前'+val+'页')*/
                this.currentPage=val;/*修改当前页数*/
                let pa={
                        appId:this.appId,
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
                        this.tableData=res.data.chanceList;
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
            this.appId=getCookie('userId');
            this.imgUrl=api.imgUrl;
            let url=this.url,
                pa={
                    appId:this.appId,
                    pageNumber:1,
                    pageSize:5
                };
            this.server(url,pa).then((res)=>{
                /*this.pageCount=res.data.totalPage;*/
                if(res.code){
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }else{
                    this.tableData=res.data.chanceList;
                    this.pageCount=res.data.pageCount;
                }
            });
//            $("#opportunityForBusiness").css({backgroundColor:'#17A6B5'});
            $("#MyParticipationInBusinessOpportunities>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#MyParticipationInBusinessOpportunities").css({backgroundColor:'#fff'});
            $("#MyParticipationInBusinessOpportunities>a").css({color:'#333'});
        },
    }
</script>
