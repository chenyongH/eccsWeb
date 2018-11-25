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
                <td>
                    <a v-if="item.isVoucher" style="cursor:pointer;white-space: nowrap;color: rgb(23, 166, 181);" @click='ViewTransaction(item.id)'>查看交易凭证</a>
                    <a v-if="!item.isVoucher" style="cursor:pointer;white-space: nowrap;color: rgb(23, 166, 181);"
                       @click='UploadVoucher(item.id)'>上传交易凭证</a>
                </td>
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
        <!--模态-->
        <el-dialog
                :title="VoucherState?'上传交易凭证':'查看交易凭证'"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div class="dialogCont">
                <label class="VoucherUpLoad">
                    <div style="display:inline-block;margin-left:0;cursor: pointer">
                        <input v-show="false" @change="show_pic" type="file" id="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                        <div v-if="!Voucher" class="logo">
                            <span style="position:absolute;top:50%;left:50%;transform: translate(-50%,-50%)">+</span>
                        </div>
                        <div v-if="Voucher" class="logo"><img :src="imgUrl+Voucher" alt=""></div>
                    </div>
                </label>
                <div style="margin:15px 0;">备注：</div>
                <el-input v-model="VoucherInfo" type="textarea"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="VoucherState" type="primary" @click="handleOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
    .opportunityForBusiness {
        width: 870px;/*940*/
        display: flex;
        flex-flow: column;
        .dialogCont{
            display: flex;
            flex-flow: column;
            .VoucherUpLoad{
                display:inline-block;
                .logo{
                    height:100px;
                    width:100px;
                    border:1px dashed #eee;
                    border-radius: 5px;
                    position: relative;
                    /*display:flex;
                    justify-content: center;
                    align-items: center;*/
                    img{/*width:100%;height:100%;*/max-width: 385px}
                }
            }
        }
        .pagination {
            margin-top: 20px;
            -ms-flex-item-align: end;
            align-self: flex-end;
        }
        table {
            width: 100%;
            font-size: 12px;
            /*margin-top: 20px;*/
            border-collapse: separate;
            border-spacing: 0;
        }
        table .procureBoolean td {
            text-align: center;
            color: #909399;
            font-size: 20px !important;
            height: 100px !important;
            background-color: #fafafa !important;
            border-bottom: 1px solid #EBEEF5;
        }
        table tr {
            width: 1200px;
        }
        table .table-header {
            height: 30px;
            background-color: #17a6b5;
            color: #ffffff;
        }
        table .table-header th:nth-child(1) {
            /* border-radius: 5px 0px 0px 0px ;*/
            width: 70px;
        }
        table .table-header th:nth-child(2) {
            width: 120px;
        }
        table .table-header th:nth-child(3) {
            width: 156px;
        }
        table .table-header th:nth-child(4) {
            width: 210px;/*270*/
        }
        table .table-header th:nth-child(5) {
            width: 90px;
        }
        table .table-header th:nth-child(6) {
            width: 90px;
        }
        table .table-header th:nth-child(7) {
            /*border-radius: 0px 5px 0px 0px ;*/
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
        table .table-body td:nth-child(3) {
            text-align: left;
            padding: 0 15px;
        }
        table .table-body td:nth-child(2) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 85px;
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
        }
    }
</style>
<script>
    import $ from "jquery"
    import api from '../../api.js';
    import {getCookie} from '../../assets/js/cookie.js'
    export default{
        name: 'MyWinningBusinessOpportunities',
        data(){
            return {
                dialogVisible: false,/*模态控制*/
                currentPage: 1, /*当前页数*/
                pageSize: 5, /*每页显示条数*/
                pageCount: 1, /*总页数*/
                pagerCount: 5, /*页码按钮的数量，当总页数超过该值时会折叠*/
                bidChanceList: '/open/api/acc/bidChanceList', /*我的中标*/
                offChance: '/open/api/acc/offChanceEnroll',
                tableData: [],
                imgUrl: '',
                chanceIdIndex:'',/*当前商机id*/
                Voucher:'',/*交易凭证*/
                uploadImg:'/open/api/file/upload/oneImage',/*上传地址*/
                VoucherInfo:'',/*交易凭证备注*/
                upVoucher:'/open/api/acc/upVoucher',/*上传交易凭证接口*/
                getVoucher:'/open/api/acc/getVoucher',/*查看交易凭证接口*/
                VoucherState:1,/*是否确认上传交易凭证*/
            }
        },
        methods: {
          handleClick(e){
            this.$router.push({
              name:'BusinessChancelogin',
              query:{
                chanceId:e
              }
            })
          },
            /*查看交易凭证*/
            ViewTransaction(id){
                let pa={
                    appId:this.appId,
                    chanceId:id,
                },url=this.getVoucher;
                this.server(url,api.collection,pa).then(res=>{
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.dialogVisible = true;
                        this.Voucher=res.data.voucher;
                        this.VoucherInfo=res.data.voucherNote;
                        this.VoucherState=0;
                    }
                })
            },
            /*模态控制*/
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            /*上传交易凭证*/
            UploadVoucher(id){
                this.dialogVisible = true;
                this.chanceIdIndex=id;
                this.Voucher='';
                this.VoucherInfo='';
                this.VoucherState=1;
            },
            show_pic(e) {
                let f = e.target.files[0];
                /*验证*/
                let testmsg=f.name.substring(f.name.lastIndexOf('.')+1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = f.size / 1024 / 1024 < 1;
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                    return false;
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 1MB!',
                        type: 'warning'
                    });
                    return false
                }  /*return extension || extension2 && isLt2M*/
                /*格式处理*/
                let reads= new FileReader();
                reads.readAsDataURL(f);
                let that = this;
                reads.onload=function (e) {
                    // 将图片赋值给 vue data 里的 logo 用以渲染到页面上
                    let url=that.uploadImg,
                        pa={
                            fileData:this.result
                        };
                    that.server(url,api.portLogin,pa).then(res=>{
                        if(res.code){
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }else{
                            that.Voucher=res.data
                        }
                    });
                };
            },
            handleOk(){
                let pa={
                    appId:this.appId,
                    chanceId:this.chanceIdIndex,
                    voucherNote:this.VoucherInfo,
                    voucher:this.Voucher
                },url=this.upVoucher;
                this.server(url,api.collection,pa).then(res=>{
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.dialogVisible = false;
                        let url = this.bidChanceList,
                            pa = {
                                appId: this.appId,
                                pageNumber: 1,
                                pageSize: 5
                            };
                        this.server(url,api.collection, pa).then((res) => {
                            /*this.pageCount=res.data.totalPage;*/
                            if (res.code) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            } else {
                                this.tableData = res.data.chanceList;
                                this.pageCount = res.data.pageCount;
                            }
                        });
                    }
                })
            },
            /*goPath 详细信息*/
            CancelRegistration(id){
                let url = this.offChance, pa = {
                    appId: this.appId,
                    chanceId: id
                };
                this.server(url,api.collection, pa).then(res => {
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
                        setTimeout(() => {
                            location.reload();
                        }, 500)
                    }
                })
            },
            /******************************分页**************************/
            handleSizeChange(val) {
                /*每页显示条数*/
                /*console.log("1每页"+val+'条')*/
                this.pageSize = val;
                /*修改显示每页条数*/
                let pa = {
                        appId: this.appId,
                        pageNumber: this.currentPage,
                        pageSize: val,
                    },
                    url = this.url;
                this.server(url,api.collection, pa).then(res => {
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.tableData = res.data.chanceList;
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
                        appId: this.appId,
                        pageNumber: val,
                        pageSize: this.pageSize,
                    },
                    url = this.url;
                this.server(url,api.collection, pa).then(res => {
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.tableData = res.data.chanceList;
                        this.pageCount = res.data.pageCount;
                    }
                });
            },
            /*******************************服务接口**********************/
            server: (url,port, param) => {
                return api.$http(api.serverSupply + port + url, param)
            },
        },
        mounted(){
            this.appId = getCookie('userId');
            this.imgUrl = api.imgUrl;
            let url = this.bidChanceList,
                pa = {
                    appId: this.appId,
                    pageNumber: 1,
                    pageSize: 5
                };
            this.server(url,api.collection, pa).then((res) => {
                /*this.pageCount=res.data.totalPage;*/
                if (res.code) {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                } else {
                    this.tableData = res.data.chanceList;
                    this.pageCount = res.data.pageCount;
                }
            });
//            $("#opportunityForBusiness").css({backgroundColor:'#17A6B5'});
            $("#MyWinningBusinessOpportunities>a").css({color: '#17A6B5'});
        },
        beforeDestroy: function () {
            $("#MyWinningBusinessOpportunities").css({backgroundColor: '#fff'});
            $("#MyWinningBusinessOpportunities>a").css({color: '#333'});
        },
    }
</script>
