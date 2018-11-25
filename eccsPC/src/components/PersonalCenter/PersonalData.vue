<template>
    <div class="personalData">
        <div class="tips">
            <span>企业信息展示：</span>
            <el-button @click="goSet" size="mini">修改</el-button>
        </div>
        <div class="cont">
            <!--企业类别-->
            <label>
                <span>*企业类别：</span>
                <span v-if="category==0">供应商</span>
                <span v-if="category==1">采购商</span>
                <span v-if="category==2">采购商或供应商</span>
            </label>
            <!--主营产品-->
            <label v-if="products">
                <span>*主营产品：</span>
                <span v-html="products"></span>
            </label>
            <!--主要市场-->
            <label v-if="market">
                <span>*主营区域：</span>
                <span>{{market}}</span>
            </label>
            <!--企业分类-->
            <label v-if="EnterpriseClassification">
                <span>*企业分类：</span>
                <span>{{EnterpriseClassification}}</span>
            </label>
            <!--企业类型-->
            <label v-if="TypesOfEnterprises">
                <span>*企业类型：</span>
                <span>{{TypesOfEnterprises}}</span>
            </label>
            <!--所在国家-->
            <label v-if="Country">
                <span>*所在国家：</span>
                <span>{{Country}}</span>
            </label>
            <!--企业地址-->
            <!--<label>
                <span>*企业地址：</span>
                <textarea v-model="EnterpriseAddress" cols="30" rows="5"></textarea>
            </label>-->
            <!--详细地址-->
            <label v-if="province">
                <span>*详细地址：</span>
                <span>{{province}}</span>
            </label>
            <!--企业描述-->
            <label v-if="companyInfo">
                <span>*企业描述：</span>
                <el-input disabled style="width:100%;" v-model="companyInfo" type="textarea"></el-input>
            </label>
            <!--联系电话-->
            <label v-if="tell">
                <span>*联系电话：</span>
                <span>{{tell}}</span>
            </label>
            <!--联系人-->
            <label v-if="name">
                <span>*联系人：</span>
                <span>{{name}}</span>
            </label>
            <!--联系人号码-->
            <label v-if="Contacts">
                <span>*联系人号码：</span>
                <span>{{Contacts}}</span>
            </label>
            <!--电子邮箱-->
            <label v-if="email">
                <span>*电子邮箱：</span>
                <span>{{email}}</span>
            </label>
            <!--员工总数-->
            <label v-if="companyEmployeeCount">
                <span>*员工总数：</span>
                <span>{{companyEmployeeCount}}</span>
            </label>
            <!--注册资金-->
            <label v-if="RegisteredCapital">
                <span>*注册资金：</span>
                <span>{{RegisteredCapital}}</span>
            </label>
            <!--成立时间-->
            <label v-if="establishment">
                <span>*成立时间：</span>
                <span>{{establishment}}</span>
            </label>
            <!--年总收入-->
            <label v-if="yearIncome">
                <span>*年总收入：</span>
                <span>{{yearIncome}}</span>
            </label>
            <!--主营区域-->
            <!--<label>
                <span>*主营区域：</span>
                <el-select v-model="mainArea"
                           size="mini"
                           style="margin-left:15px;"
                           clearable placeholder="请选择">
                    <el-option
                            v-for="item in mainAreaOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </label>-->
            <!--营业执照号-->
            <label v-if="licenseNumber">
                <span>营业执照号：</span>
                <span>{{licenseNumber}}</span>
            </label>
            <!--营业执照有效期-->
            <label v-if="times.length>0" style="white-space: nowrap">
                <span>营业执照有效期:</span>
                <span style="margin-left:30px;">{{times[0]}}~{{times[1]}}</span>
            </label>
            <!--法定经营范围-->
            <label v-if="operationScope">
                <span>法定经营范围：</span>
                <span>{{operationScope}}</span>
            </label>
            <!--组织机构代码-->
            <label v-if="OrganizationCode">
                <span>组织机构代码：</span>
                <span>{{OrganizationCode}}</span>
            </label>
            <!--税务登记证号-->
            <label v-if="Tax">
                <span>税务登记证号：</span>
                <span>{{Tax}}</span>
            </label>
            <!--纳税人识别号-->
            <label v-if="Taxpayer">
                <span>纳税人识别号：</span>
                <span>{{Taxpayer}}</span>
            </label>
            <!--企业logo-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <label v-if="logo">
                <span>*企业logo：</span>
                <div style="margin-left: 15px">
                    <input disabled v-show="false" type="file" id="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                    <div v-if="!logo" class="logo">+</div>
                    <div v-if="logo" class="logo"><img :src="imgUrl+logo" alt=""></div>
                </div>
            </label>
            <!--营业执照电子版-->
            <label v-if="license">
                <span>营业执照电子版：</span>
                <div style="margin-left: 25px">
                    <input disabled v-show="false" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                    <div v-if="!license" class="logo">+</div>
                    <div v-if="license" class="logo"><img :src="imgUrl+license" alt=""></div>
                </div>
            </label>
            <!--组织机构代码证电子版-->
            <label v-if="Organization">
                <span>组织机构代码证电子版：</span>
                <div style="margin-left: 65px">
                    <input disabled v-show="false" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                    <div v-if="!Organization" class="logo">+</div>
                    <div v-if="Organization" class="logo"><img :src="imgUrl+Organization" alt=""></div>
                </div>
            </label>
            <!--一般纳税人证明-->
            <label v-if="taxpayer">
                <span>一般纳税人证明：</span>
                <div style="margin-left: 25px">
                    <input disabled v-show="false" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                    <div v-if="!taxpayer" class="logo">+</div>
                    <div v-if="taxpayer" class="logo"><img :src="imgUrl+taxpayer" alt=""></div>
                </div>
            </label>
            <!--税务登记证号电子版-->
            <label v-if="TaxE">
                <span>税务登记证号电子版：</span>
                <div style="margin-left: 55px">
                    <input disabled v-show="false" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                    <div v-if="!TaxE" class="logo">+</div>
                    <div v-if="TaxE" class="logo"><img :src="imgUrl+TaxE" alt=""></div>
                </div>
            </label>
        </div>
        <el-button v-if="false" @click="submit" class="submit" type="primary">提交审核</el-button>
    </div>
</template>
<style lang="less" scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }

    input[type="number"] {
        -moz-appearance: textfield !important;
    }
    .personalData{
        width:940px;
        display:flex;
        flex-flow: column;
        align-items: center;
        .tips{
            width:100%;
            font-size:16px;
            align-self: flex-start;
            margin-bottom: 30px;
            display:flex;
            justify-content: space-between;
        }
        .cont{
            width:100%;display:flex;
            justify-content: space-between;
            flex-wrap: wrap;
            label{
                width: 50%;
                margin-bottom: 26px;
                font-size: 14px;
                display: flex;
                #email_prompt{
                    font-size:12px;
                    color:red;
                    width: 24%;
                    margin-left: 20px;
                }
                span{width: 90px;white-space: nowrap}
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    margin-left: 15px;
                }
                .el-radio-group{display:flex;}
                .el-input {
                    width: 194px;
                    height:28px;
                    margin-left: 15px;
                }
                input{
                    margin-left: 15px;
                }
                .el-textarea{
                    margin-left: 15px;
                    width:50%;
                }
            }
            .logo{
                height:100px;
                width:100px;
                border:1px dashed #eee;
                border-radius: 5px;
                display:flex;
                justify-content: center;
                align-items: center;
                img{width:100%;height:100%;}
            }
        }
        .submit {
            width: 200px;
            height: 40px;
            margin: 40px auto;
        }
    }
</style>
<script>
    import {getCookie,delCookie} from '../../assets/js/cookie.js'
    import $ from "jquery"
    import api from '../../api.js';
    export default{
        name:'personalData',
        data(){
            return{
                storeDetail:'/open/api/acc/storeDetail',
                TaxE:'',/*税务登记证号电子版*/
                Taxpayer:'',/*纳税人识别号*/
                Tax:'',/*税务登记证号*/
                taxpayer:'',/*一般纳税人证明 */
                Organization:'',/*组织机构代码电子版*/
                OrganizationCode:'',/*组织机构代码*/
                operationScope:'',/*法定经营范围*/
                licenseNumber:'',/*营业执照号*/
                times:[],/*营业执照有效期*/
                imageUrl: '',/*企业logo*/
                mainArea:'',/*主营区域*/
                mainAreaOptions:[],
                yearIncome:'',/*年总收入*/
                companyInfo:'',/*企业描述*/
                establishment:'',/*成立时间*/
                RegisteredCapital:'',/*注册资金*/
                companyEmployeeCount:'',/*员工总数量*/
                email:'',/*电子邮箱*/
                name:'',/*联系人*/
                Contacts:'',/*联系人号码*/
                tell:'',/*联系电话*/
                province:'',/*详细地址*/
                Country:'',/*所在国家*/
                /*EnterpriseAddress:'',/!*企业地址*!/*/
                TypesOfEnterprises:'',/*企业类型*/
                EnterpriseClassification:"",/*企业分类*/
                products:'',/*主营产品*/
                market:'',/*主要市场*/
                category:'',/*企业类别*/
                uploadImg:'/open/api/acc/upload/image',
                logo:'',/*企业logo*/
                license:'',/*营业执照电子版*/
            }
        },
        methods:{
            goSet(){
                let routeData = this.$router.resolve({ name:'FormApplySetting'});
                window.open(routeData.href, '_blank');
            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },

        },
        mounted(){
 			this.imgUrl=api.imgUrl;
            let pa={
                appId:getCookie('userId')
            },url=this.storeDetail;
            this.server(url,pa).then(res=>{
                if(res.code){
                    this.$message({
                        message: "登录超时或未登录，请重新登录！",
                        type: 'warning'
                    });
                }else{
                    /*所在国家*/
                    this.Country=res.data.storeCountryName;
                    /*员工总数--企业规模*/
                    this.companyEmployeeCount=res.data.storeCompany.companyEmployeeCount;
                    /*企业分类*/
                    this.EnterpriseClassification=res.data.storeClass.name;
                    /*企业类型*/
                    this.TypesOfEnterprises=res.data.storeType.name;
                    /*企业类别*/
                    this.category=res.data.type;
                    /*主营产品*/
                    this.products=res.data.storeGoods;
                    /*主要市场*/
                    this.market=res.data.storeSalePlace;
                    /*详细地址*/
                    this.province=res.data.storeAddress;
                    /*企业描述*/
                    this.companyInfo=res.data.storeCompany.companyInfo;
                    /*企业logo*/
                    this.logo=res.data.logo;
                    /*联系电话*/
                    this.tell=res.data.storeCompany.companyPhone;
                    /*联系人*/
                    this.name=res.data.storeCompany.contactsName;
                    /*联系人号码*/
                    this.Contacts=res.data.storeCompany.contactsPhone;
                    /*电子邮箱*/
                    this.email=res.data.storeCompany.contactsEmail;
                    /*注册资金*/
                    this.RegisteredCapital=res.data.storeCompany.companyRegisteredCapital;
                    /*成立时间*/
                    this.establishment=res.data.storeCompany.createTimeDate;
                    /*年总收入*/
                    this.yearIncome=res.data.storeCompany.yearIncome;
                    /*营业执照号*/
                    this.licenseNumber=res.data.storeCompany.businessLicenceNumber;
                    /*营业执照有效期*/
                    let time=[];
                    time.push(res.data.storeCompany.businessLicenceStart);
                    time.push(res.data.storeCompany.businessLicenceEnd);
                    this.times=time;
                    /*法定经营范围*/
                    this.operationScope=res.data.storeCompany.businessSphere;
                    /*营业执照电子版*/
                    this.license=res.data.storeCompany.businessLicenceupImage;
                    /*组织机构代码*/
                    this.OrganizationCode=res.data.storeCompany.organizationCode;
                    /*组织机构代码证电子版*/
                    this.Organization=res.data.storeCompany.organizationCodeImage;
                    /*一般纳税人证明*/
                    this.taxpayer=res.data.storeCompany.generalTaxpayerImage;
                    /*税务登记证号*/
                    this.Tax=res.data.storeCompany.taxRegistrationCertificate;
                    /*纳税人识别号*/
                    this.Taxpayer=res.data.storeCompany.taxpayerId;
                    /*税务登记证号电子版*/
                    this.TaxE=res.data.storeCompany.taxRegistrationCertificateImage;
                    /**/
                }
            });


//            $("#personalData").css({backgroundColor:'#'});
            $("#personalCenter>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#personalCenter").css({backgroundColor:'#fff'});
            $("#personalCenter>a").css({color:'#333'});
        },
    }
</script>