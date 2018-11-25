<template>
 <!--formApply 的原版-->
 <div class="applyForm">
  <div class="head">
   <div class="header">
    <div class="left">
     <img style="cursor: pointer" @click="goInfomation" src="../../assets/images/Login.png" alt="">
     企业信息修改
    </div>
    <div class="right"><span @click="goLogin" class="skyBlue"></span></div>
   </div>
  </div>
  <el-steps class="steps" :active="steps" align-center>
   <el-step style="cursor: pointer" @click.native="nextStep(0,1)" title="基本信息" description=""></el-step>
   <el-step style="cursor: pointer" @click.native="nextStep(1,1)" title="详细信息" description=""></el-step>
   <el-step style="cursor: pointer" @click.native="nextStep(2,1)" :title="business" description="选填信息可以跳过！"></el-step>
   <!--<el-step style="cursor: pointer" @click.native="nextStep(3)" title="注册成功" description=""></el-step>-->
  </el-steps>
  <!--<div class="title">企业入驻审核表单（分供应商、采购商）</div>-->
  <div v-if="steps==0" class="form">
   <ul>
    <!--企业名称-->
    <li>
     <span>*企业名称：</span>
     <el-input @blur="blurs('companyName')" size="mini" placeholder="请输入企业名称" v-model="companyName" type="text"></el-input>
     <b v-if="tip_companyName">请输入用户名</b>
    </li>
    <!--企业类别-->
    <li>
        <span>*归属：</span>
        <el-radio-group class="ascription" v-model="checkList">
            <el-radio :label="0">供应商</el-radio>
            <el-radio :label="1">采购商</el-radio>
            <el-radio :label="2">采购商和供应商</el-radio>
        </el-radio-group>
    </li>
    <!--企业类型-->
    <li>
     <span>*企业类型：</span>
     <el-select @blur="blurs('TypesOfEnterprises')"
                @change="blurs('TypesOfEnterprises')"
                v-model="TypesOfEnterprises"
                size="mini"
                style="width:100%;"
                clearable placeholder="请选择">
      <el-option
              v-for="item in TypesOfEnterprisesOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
     </el-select>
     <b v-if="tip_TypesOfEnterprises">请选择企业类型</b>
    </li>
    <!--企业分类-->
    <li>
     <span>*企业分类：</span>
     <el-cascader
             clearable
             style="width: 100%;margin-right:0;"
             @blur="blurs('EnterpriseClassification')"
             size="mini"
             v-model="EnterpriseClassification"
             :options="EnterpriseClassificationOptions"
     ></el-cascader>
     <!--<el-select @blur="blurs('EnterpriseClassification')"
                v-model="EnterpriseClassification"
                size="mini"
                style="width:100%;"
                clearable placeholder="请选择">
         <el-option
                 v-for="item in EnterpriseClassificationOptions"
                 :key="item.id"
                 :label="item.name"
                 :value="item.code">
         </el-option>
     </el-select>-->
     <b v-if="tip_EnterpriseClassification">请选择企业分类</b>
    </li>
    <!--所在国家-->
    <li>
     <span>*所在国家：</span>
     <el-select @change="blurs('Country')"
                @blur="blurs('Country')"
                v-model="Country"
                size="mini"
                style="width:100%;"
                clearable placeholder="请选择">
      <el-option
              v-for="item in CountryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.code">
      </el-option>
     </el-select>
     <b v-if="tip_Country">请选择所在国家</b>
    </li>
    <!--企业所在地-->
    <li>
     <span style="align-self: flex-start">*企业地址：</span>
     <el-input @blur="blurs('companyAddress')" size="mini" type="textarea" placeholder="请输入企业详细地址" v-model="companyAddress"></el-input>
     <b v-if="tip_companyAddress">请输入详细地址</b>
    </li>
    <!--联系人-->
    <li>
     <span>*联系人：</span>
     <el-input @blur="blurs('Contacts')" size="mini" placeholder="请输入联系人姓名" v-model="Contacts" type="text"></el-input>
     <b v-if="tip_Contacts">请输入联系人</b>
    </li>
    <!--联系方式-->
    <li>
     <span>*联系电话：</span>
     <el-input @blur="blurs('links')" size="mini" placeholder="请输入联系人号码" v-model="links" type="text"></el-input>
     <b v-if="tip_links">请输入联系方式</b>
    </li>
    <!--公司电话-->
    <li>
     <span>*公司电话：</span>
     <el-input @blur="blurs('companyPhone')" size="mini" placeholder="请输入公司电话" v-model="companyPhone" type="text"></el-input>
     <b v-if="tip_companyPhone">请输入公司电话</b>
    </li>
   </ul>
   <el-button @click="nextStep(0)" class="submit" type="primary">保存</el-button>
  </div>
  <div v-if="steps==1" class="form">
   <ul>
    <!--主营产品-->
    <li>
     <span>*主营产品：</span>
     <el-input @blur="blurs('products')" size="mini" v-model="products" type="text"></el-input>
     <b v-if="tip_products">请输入主营产品</b>
    </li>
    <!--主营区域-->
    <li v-if="false">
     <span>*主营区域：</span>
     <el-select v-model="mainArea"
                size="mini"
                clearable placeholder="请选择">
      <el-option
              v-for="item in mainAreaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.code">
      </el-option>
     </el-select>
    </li>
    <!--主要市场-->
    <li>
     <span>*主营区域：</span>
     <el-input @blur="blurs('market')" size="mini" v-model="market" type="text"></el-input>
     <b v-if="tip_market">请输入主营区域</b>
    </li>
    <!--企业描述-->
    <li>
     <span>*企业描述：</span>
     <el-input @blur="blurs('companyInfo')" type="textarea" v-model="companyInfo"></el-input>
     <b v-if="tip_companyInfo">请输入企业描述</b>
    </li>
    <!--企业邮箱-->
    <li>
     <span>*企业邮箱：</span>
     <el-input size="mini" @blur="blurs('email')" v-model="email" type="text"></el-input>
     <b id="email_prompt"></b>
     <b v-if="tip_email">请输入企业邮箱</b>
    </li>
    <!--成立时间-->
    <li>
     <span>*成立时间：</span>
     <el-date-picker
             @blur="blurs('establishment')"
             style="width:100%;"
             v-model="establishment"
             type="date"
             size="mini"
             format="yyyy 年 MM 月 dd 日"
             value-format="timestamp"
             placeholder="选择日期">
     </el-date-picker>
     <b v-if="tip_establishment">请选择成立时间</b>
    </li>
    <!--注册资金-->
    <li>
     <span>*注册资金：</span>
     <el-input @blur="blurs('RegisteredCapital')" size="mini" v-model="RegisteredCapital" type="text"></el-input>万
     <b v-if="tip_RegisteredCapital">请输入注册资金</b>
    </li>
    <!--年总收入-->
    <li>
     <span style="align-self: flex-start">*年总收入：</span>
     <el-input @blur="blurs('yearIncome')" size="mini" v-model="yearIncome" type="text"></el-input>
     <b v-if="tip_yearIncome">请输入年总收入</b>
    </li>
    <!--员工总数-->
    <li>
     <span>*员工总数：</span>
     <el-select @change="blurs('companyEmployeeCount')"
                @blur="blurs('companyEmployeeCount')"
                v-model="companyEmployeeCount"
                size="mini"
                clearable placeholder="请选择">
      <el-option
              v-for="item in companyEmployeeCountOptions"
              :key="item.id"
              :label="item.name"
              :value="item.code">
      </el-option>
     </el-select>
     <b v-if="tip_companyEmployeeCount">请选择员工总数</b>
    </li>
    <!--营业执照号-->
    <li>
     <span>*营业执照号：</span>
     <el-input size="mini"
               @blur="blurs('licenseNumber')"
               v-model="licenseNumber" type="text"></el-input>
     <b v-if="tip_licenseNumber">请选择营业执照号</b>
    </li>
    <!--营业执照有效期 value-format="timestamp"-->
    <li>
     <span style="white-space: nowrap">*营业执照有效期：</span>
     <el-date-picker
             @blur="blurs('times')"
             style="width:100%;"
             format="yyyy 年 MM 月 dd 日"
             size="mini"
             class="pickerTime"
             value-format="timestamp"
             v-model="times"
             type="daterange"
             range-separator="-"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
     </el-date-picker>
     <b v-if="tip_times">请选择营业执照号</b>
    </li>
    <!--营业执照电子版-->
    <li>
     <span style="width: 114px;white-space: nowrap">*营业执照电子版：</span>
     <label>
      <div style="cursor: pointer">
       <input v-show="false" @change="show_license" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
       <div v-if="!license" class="logo">+</div>
       <div v-if="license" class="logo"><img :src="imgUrl+license" alt=""></div>
      </div>
     </label>
    </li>
    <!--企业logo-->
    <li>
     <span style="width:100px;">*企业logo：</span>
     <label>
      <div style="margin-left: 15px;cursor: pointer">
       <input v-show="false" @change="show_pic" type="file" id="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
       <div v-if="!logo" class="logo">+</div>
       <div v-if="logo" class="logo"><img :src="imgUrl+logo" alt=""></div>
      </div>
     </label>
    </li>
   </ul>
   <el-button @click="nextStep(1)" class="submit" type="primary">保存</el-button>
  </div>
  <!--<div v-if="steps==2" class="form">
   <ul>
    &lt;!&ndash;法定经营范围&ndash;&gt;
    <li>
     <span>法定经营范围：</span>
     <el-input size="mini" v-model="operationScope" type="text"></el-input>
    </li>
    &lt;!&ndash;税务登记证号&ndash;&gt;
    <li>
     <span style="align-self: flex-start">税务登记证号：</span>
     <el-input size="mini" v-model="Tax" type="text"></el-input>
    </li>
    &lt;!&ndash;纳税人识别号&ndash;&gt;
    <li>
     <span>纳税人识别号：</span>
     <el-input size="mini" v-model="Taxpayer" type="text"></el-input>
    </li>
    &lt;!&ndash;组织机构代码&ndash;&gt;
    <li>
     <span>组织机构代码：</span>
     <el-input size="mini" v-model="OrganizationCode" type="text"></el-input>
    </li>
    &lt;!&ndash;组织机构代码证电子版&ndash;&gt;
    <li>
     <span style="width: 114px;">组织机构代码证：</span>
     <label>
      <div style="cursor: pointer">
       <input v-show="false" @change="show_Organization" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
       <div v-if="!Organization" class="logo">+</div>
       <div v-if="Organization" class="logo"><img :src="imgUrl+Organization" alt=""></div>
      </div>
     </label>
    </li>
    &lt;!&ndash;一般纳税人证明&ndash;&gt;
    <li>
     <span style="width: 114px;">一般纳税人证明：</span>
     <label>
      <div style="cursor: pointer">
       <input v-show="false" @change="show_taxpayer " type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
       <div v-if="!taxpayer" class="logo">+</div>
       <div v-if="taxpayer" class="logo"><img :src="imgUrl+taxpayer" alt=""></div>
      </div>
     </label>
    </li>
    &lt;!&ndash;税务登记证号电子版&ndash;&gt;
    <li>
     <span style="width:114px;">税务登记证：</span>
     <label>
      <div style="cursor: pointer">
       <input v-show="false" @change="show_TaxE " type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
       <div v-if="!TaxE" class="logo">+</div>
       <div v-if="TaxE" class="logo"><img :src="imgUrl+TaxE" alt=""></div>
      </div>
     </label>
    </li>
   </ul>
   <el-button @click="nextStep(2)" class="submit" type="primary">保存</el-button>
  </div>-->
  <!--供应商-->
  <div v-if="steps==2&&(checkList==0||checkList==2)" class="form">
   <!--<ul>
       &lt;!&ndash;法定经营范围&ndash;&gt;
       <li>
           <span>法定经营范围：</span>
           <el-input size="mini" v-model="operationScope" type="text"></el-input>
       </li>
       &lt;!&ndash;税务登记证号&ndash;&gt;
       <li>
           <span style="align-self: flex-start">税务登记证号：</span>
           <el-input size="mini" v-model="Tax" type="text"></el-input>
       </li>
       &lt;!&ndash;纳税人识别号&ndash;&gt;
       <li>
           <span>纳税人识别号：</span>
           <el-input size="mini" v-model="Taxpayer" type="text"></el-input>
       </li>
       &lt;!&ndash;组织机构代码&ndash;&gt;
       <li>
           <span>组织机构代码：</span>
           <el-input size="mini" v-model="OrganizationCode" type="text"></el-input>
       </li>
       &lt;!&ndash;组织机构代码证电子版&ndash;&gt;
       <li>
           <span style="width: 114px;">组织机构代码证：</span>
           <label>
               <div style="cursor: pointer">
                   <input v-show="false" @change="show_Organization" type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                   <div v-if="!Organization" class="logo">+</div>
                   <div v-if="Organization" class="logo"><img :src="imgUrl+Organization" alt=""></div>
               </div>
           </label>
       </li>
       &lt;!&ndash;一般纳税人证明&ndash;&gt;
       <li>
           <span style="width: 114px;">一般纳税人证明：</span>
           <label>
               <div style="cursor: pointer">
                   <input v-show="false" @change="show_taxpayer " type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                   <div v-if="!taxpayer" class="logo">+</div>
                   <div v-if="taxpayer" class="logo"><img :src="imgUrl+taxpayer" alt=""></div>
               </div>
           </label>
       </li>
       &lt;!&ndash;税务登记证号电子版&ndash;&gt;
       <li>
           <span style="width:114px;">税务登记证：</span>
           <label>
               <div style="cursor: pointer">
                   <input v-show="false" @change="show_TaxE " type="file" class="inputfile" accept="image/png, image/jpeg, image/jpg" />
                   <div v-if="!TaxE" class="logo">+</div>
                   <div v-if="TaxE" class="logo"><img :src="imgUrl+TaxE" alt=""></div>
               </div>
           </label>
       </li>
   </ul>-->
   <ul>
    <!--公司图片-->
    <li>
     <span style="width:114px;">公司图片：</span>
     <el-upload
             style="width:65%;"
             :beforeUpload="beforeProductsUpload"
             ref='upload'
             name="fileData"
             :fileList="fileList"
             :action="upLoadUrl+uploadImgs"
             list-type="picture-card"
             :on-success="success"
             :on-preview="handlePictureCardPreview"
             :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
     </el-upload>
     <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
     </el-dialog>
    </li>
    <!--研发部门人数-->
    <li>
     <span>研发部门人数：</span>
     <el-input size="mini" v-model="NRDD" type="text"></el-input>
    </li>
    <!--品牌名称-->
    <li>
     <span>品牌名称：</span>
     <el-input size="mini" v-model="BrandName" type="text"></el-input>
    </li>
    <!--月产量-->
    <li>
     <span>月产量：</span>
     <el-input size="mini" v-model="monthlyProduction" type="text"></el-input>
    </li>
    <!--年营业额-->
    <li>
     <span>年营业额：</span>
     <el-input size="mini" v-model="AnnualTurnover" type="text"></el-input>
    </li>
    <!--年进口额-->
    <li>
     <span>年进口额：</span>
     <el-input size="mini" v-model="AnnualImportVolume" type="text"></el-input>
    </li>
    <!--年出口额-->
    <li>
     <span>年出口额：</span>
     <el-input size="mini" v-model="AnnualExportVolume" type="text"></el-input>
    </li>
   </ul>
   <el-button v-if="checkList!==2" @click="nextStep(2)" class="submit" type="primary">保存</el-button>
  </div>
  <!--采购商-->
  <div v-if="steps==2&&(checkList==1||checkList==2)" class="form">
   <ul>
    <!--主营行业-->
    <li>
     <span>主营行业：</span>
     <el-input size="mini" v-model="MainBusiness" type="text"></el-input>
    </li>
    <!--经营模式-->
    <li>
     <span style="align-self: flex-start">经营模式：</span>
     <el-input size="mini" v-model="managementModel" type="text"></el-input>
    </li>
    <!--采购周期-->
    <li>
     <span>采购周期：</span>
     <el-input size="mini" v-model="ProcurementCycle" type="text"></el-input>
    </li>
    <!--一般采购规模-->
    <li>
     <span>一般采购规模：</span>
     <el-input size="mini" v-model="ProcurementScale" type="text"></el-input>
    </li>
    <!--支付方式-->
    <li>
     <span>支付方式：</span>
     <el-input size="mini" v-model="PaymentMethod" type="text"></el-input>
    </li>
    <!--账期-->
    <li>
     <span>帐期：</span>
     <el-input size="mini" v-model="AccountPeriod" type="text"></el-input>
    </li>
   </ul>
   <el-button @click="nextStep(2)" class="submit" type="primary">保存</el-button>
  </div>
  <div v-if="false" class="form">
   <div class="success">
    <i class="iconfont icon-right1"></i>
    <span>修改成功</span>
    <div class="dd">企业信息修改，系统将在{{time}}s之后跳转至登录页!</div>
   </div>
   <el-button @click="goInfomation" class="submit" type="primary">完成</el-button>
  </div>
 </div>
</template>
<style>
 .el-step__head.is-finish,.el-step__title.is-finish,.el-step__description.is-finish{
  color: #c0c4cc !important;
  border-color: #c0c4cc !important;
 }
 .el-step__head.is-process,.el-step__title.is-process,.el-step__description.is-process{
  color: #409EFF !important;
  border-color: #409EFF !important;
 }
</style>
<style lang="less" scoped>
 .applyForm{
  width:100%;
  height:100%;
  background-color: #fff;
  font-size:14px;
  color:#666;
  .head{
   width:100%;
   border-bottom:1px solid #eeeeee;
   box-shadow:0 5px 5px #f1f1f1;
   .header{
    width:57%;
    height:110px;
    margin:0 auto;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .left{
     display:flex;
     align-items: center;
     font-size:28px;
     color: #333;
     img{margin-right:50px;}
    }
    .right{
     .skyBlue{color:#17a6b5;cursor: pointer}
     font-size:14px;
     align-self:flex-end;
     margin-bottom:20px;
    }
   }

  }
  .steps{
   width:60%;
   margin:4% auto;
  }
  .title{
   font-size:16px;
   text-align: center;
  }
  .form{
   width:520px;
   margin:0 auto;
   ul{
    width:100%;
    li{
     display:flex;
     margin:20px;
     align-items: center;
     position:relative;
     span{
      width:158px;
      text-align: right;
      margin-right:20px;
     }
     textarea{
      width:300px;
      height:100px;
      padding-left:10px;
     }
     input{
      width:200px;
      height:30px;
      padding-left: 10px;
     }
     .ascription{width:100%;}
     #email_prompt{
      font-size:12px;
      color:red;
      /*width: 24%;
      margin-left: 20px;*/
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
     .el-select{
      width:100%;
     }
     b{
      font-weight: 300;
      color:red;
      font-size:12px;
      position: absolute;
      left:500px;
      text-align: left;
      white-space: nowrap;
     }
    }
   }
   .success{
    width:100%;
    display:flex;
    flex-flow: column;
    align-items: center;
    i{
     width:80px;
     height:80px;
     font-size:80px;
     color:#17a6b5;
    }
    span{
     font-size:28px;
     color:#333;
     margin:25px 0;
    }
    .dd{
     color:#999;
     font-size:16px;
    }
   }
  }
  .submit{
   display:block;
   margin:20px auto;
  }
 }
</style>
<script>
    import api from '../../api.js'
    import {getCookie} from '../../assets/js/cookie.js'

    export default{
        data(){
            return{
             /*采购商选填*/
                AccountPeriod:'',/*帐期*/
                PaymentMethod:'',/*支付方式*/
                ProcurementScale:'',/*一般采购规模*/
                ProcurementCycle:'',/*采购周期*/
                managementModel:'',/*经营模式*/
                MainBusiness:'',/*主营行业*/
                uploadImgs: '/open/api/file/upload/image', /*上传图片接口*/
             /*供应商选填*/
                AnnualExportVolume:'',/*年出口额*/
                AnnualImportVolume:'',/*年进口额*/
                AnnualTurnover:'',/*年营业额*/
                monthlyProduction:'',/*月产量*/
                BrandName:'',/*品牌名称*/
                NRDD:'',/*研发部门人数*/
                CompanyPictures:'',/*公司图片*/
                fileList:[],
                upLoadUrl: '', /*上传图片路径*/
                dialogVisible: false, /*多图上传*/
                dialogImageUrl: '',/*图片预览*/
             /************************/
                updateStoreCnd:'/open/api/acc/updateStoreCnd',/*获取企业信息*/
                storeEnter:'/open/api/acc/updateStoreEnter',/*保存*/
                titles:'',
                business:'资质信息',
                /*perfectStoreCnd:'/open/api/acc/perfectStoreCnd',*/
                time:10,
                steps:0,
                url:'/open/api/store/apply/entering',
                companyName:'',/*企业名称*/
                tip_companyName:0,
                companyAddress:'',/*企业所在地*/
                tip_companyAddress:0,
                Contacts:'',/*联系人*/
                tip_Contacts:0,
                links:'',/*联系方式*/
                tip_links:0,
                checkList:'',/*企业类别*/
                Country:'',/*所在国家*/
                CountryOptions:[],
                tip_Country:0,
                TypesOfEnterprises:'',/*企业类型*/
                TypesOfEnterprisesOptions:[],
                tip_TypesOfEnterprises:0,
                EnterpriseClassification:[],/*企业分类*/
                EnterpriseClassificationOptions:[],
                tip_EnterpriseClassification:0,
                products:'',/*主营产品*/
                tip_products:0,
                mainArea:'',/*主营区域*/
                mainAreaOptions:[],
                market:'',/*主要市场*/
                tip_market:0,
                companyInfo:'',/*企业描述*/
                tip_companyInfo:0,
                email:'',/*企业邮箱*/
                tip_email:0,
                establishment:'',/*成立时间*/
                tip_establishment:0,
                RegisteredCapital:'',/*注册资金*/
                tip_RegisteredCapital:0,
                yearIncome:'',/*年总收入*/
                tip_yearIncome:0,
                companyEmployeeCount:'',/*员工总数*/
                companyEmployeeCountOptions:[],
                tip_companyEmployeeCount:0,
                imageUrl: '',/*企业logo*/
                logo:'',/*企业logo*/
                licenseNumber:'',/*营业执照号*/
                tip_licenseNumber:0,
                times:[],/*营业执照有效期*/
                tip_times:0,
                operationScope:'',/*法定经营范围*/
                license:'',/*营业执照电子版*/
                OrganizationCode:'',/*组织机构代码*/
                Organization:'',/*组织机构代码电子版*/
                taxpayer:'',/*一般纳税人证明 */
                Tax:'',/*税务登记证号*/
                Taxpayer:'',/*纳税人识别号*/
                TaxE:'',/*税务登记证号电子版*/
                accountId:'',/*账号id*/
                companyPhone:'',/*公司电话*/
                tip_companyPhone:0,
                uploadImg:'/open/api/file/upload/oneImage',
                Interval:''
            }
        },
        methods:{
         /*验证提示*/
            blurs(name){
                /*console.log(this[name])*/
                if(this[name]&&this[name].length!==0){
                    this[`tip_${name}`]=0;
                }else{
                    this[`tip_${name}`]=1;
                }
                if(name=='email'&&this.email){
                    /*console.log(111)*/
                    this.checkEmail()
                }else{
                    document.getElementById("email_prompt").innerHTML="";
                }
            },
         /*下一步*/
            nextStep(step,unSave){
                this.steps=step;
                let {license,times,licenseNumber,logo,companyEmployeeCount,yearIncome,RegisteredCapital,establishment,email,companyInfo,market,products,companyPhone,links,Contacts,companyName,TypesOfEnterprises,EnterpriseClassification,Country,companyAddress,
                    AccountPeriod,PaymentMethod,ProcurementScale,ProcurementCycle,managementModel,MainBusiness,AnnualExportVolume,AnnualImportVolume,AnnualTurnover,monthlyProduction,BrandName,NRDD,fileList
                }=this,
                    list=[];
                fileList.map(item=>{
                    list.push(item.response.data.file_url)
                });
                if(!unSave){
                    if(step==0){
                        if(!companyPhone||!links||!Contacts||!companyName||!TypesOfEnterprises||!EnterpriseClassification||!Country||!companyAddress){
                            this.$message({
                                message: "请完善基本信息",
                                type: 'error'
                            });
                        }else{
                            let url=this.storeEnter,
                                storeData={
                                    accountId:this.accountId,/*账号id*/
                                    type:this.checkList,/*归属 type*/
                                    storeName:this.companyName,/*企业名称*/
                                    typeId:this.TypesOfEnterprises,/*企业类型*/
                                    classId:this.EnterpriseClassification[this.EnterpriseClassification.length-1],/*企业分类*/
                                    storeCountry:this.Country,/*国家*/
                                    storeGoods:this.products,/*主营产品*/
                                    storeSalePlace:this.market,/*主营区域*/
                                    logo:this.logo,/*企业logo*/
                                    storeAddress:this.companyAddress,/*企业所在地*/
                                    contactsName:this.Contacts,/*联系人*/
                                    contactsPhone:this.links,/*联系方式*/
                                    companyInfo:this.companyInfo,/*企业描述*/
                                    companyPhone:this.companyPhone,/*公司电话*/
                                    contactsEmail:this.email,/*企业邮箱*/
                                    createTime:this.establishment,/*成立时间*/
                                    companyRegisteredCapital:this.RegisteredCapital,/*注册资金*/
                                    yearIncome:this.yearIncome,/*年总收入*/
                                    companyEmployeeCount:this.companyEmployeeCount,/*员工总数*/
                                    businessLicenceNumber:this.licenseNumber,/*营业执照号*/
                                    businessLicenceStart:this.times[0],/*营业执照有效期--起*/
                                    businessLicenceEnd:this.times[1],/*营业执照有效期--至*/
                                    businessSphere:this.operationScope,/*法定经营范围*/
                                    taxRegistrationCertificate:this.Tax,/*税务登记证号*/
                                    taxpayerId:this.Taxpayer,/*纳税人识别号*/
                                    organizationCode:this.OrganizationCode,/*组织机构代码*/
                                    businessLicenceupImage:this.license,/*营业执照电子版*/
                                    organizationCodeImage:this.Organization,/*组织机构代码证电子版*/
                                    generalTaxpayerImage:this.taxpayer,/*一般纳税人证明*/
                                    taxRegistrationCertificateImage:this.TaxE,/*税务登记证号电子版*/
                                },
                                pa={
                                    storeData:JSON.stringify(storeData)
                                };
                            this.server(url,api.collection,pa).then(res=>{
                                if(res.code){
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }else{
                                    this.$message({
                                        message: "修改成功",
                                        type: 'success'
                                    });
                                    setTimeout(()=>{
                                        this.$router.push({
                                            name:'InformationNav',
                                        });
                                    },500)
                                }
                            })
                        }
                    }
                    if(step==1){
                        if(!license||!times||!licenseNumber||!logo||!companyEmployeeCount||!yearIncome||!products||!market||!companyInfo||!email||!establishment||!RegisteredCapital){
                            this.$message({
                                message: "请完善详细信息",
                                type: 'error'
                            });
                        }else{
                            let url=this.storeEnter,
                                storeData={
                                    accountId:this.accountId,/*账号id*/
                                    type:this.checkList,/*归属 type*/
                                    storeName:this.companyName,/*企业名称*/
                                    typeId:this.TypesOfEnterprises,/*企业类型*/
                                    classId:this.EnterpriseClassification[this.EnterpriseClassification.length-1],/*企业分类*/
                                    storeCountry:this.Country,/*国家*/
                                    storeGoods:this.products,/*主营产品*/
                                    storeSalePlace:this.market,/*主营区域*/
                                    logo:this.logo,/*企业logo*/
                                    storeAddress:this.companyAddress,/*企业所在地*/
                                    contactsName:this.Contacts,/*联系人*/
                                    contactsPhone:this.links,/*联系方式*/
                                    companyInfo:this.companyInfo,/*企业描述*/
                                    companyPhone:this.companyPhone,/*公司电话*/
                                    contactsEmail:this.email,/*企业邮箱*/
                                    createTime:this.establishment,/*成立时间*/
                                    companyRegisteredCapital:this.RegisteredCapital,/*注册资金*/
                                    yearIncome:this.yearIncome,/*年总收入*/
                                    companyEmployeeCount:this.companyEmployeeCount,/*员工总数*/
                                    businessLicenceNumber:this.licenseNumber,/*营业执照号*/
                                    businessLicenceStart:this.times[0],/*营业执照有效期--起*/
                                    businessLicenceEnd:this.times[1],/*营业执照有效期--至*/
                                    businessSphere:this.operationScope,/*法定经营范围*/
                                    taxRegistrationCertificate:this.Tax,/*税务登记证号*/
                                    taxpayerId:this.Taxpayer,/*纳税人识别号*/
                                    organizationCode:this.OrganizationCode,/*组织机构代码*/
                                    businessLicenceupImage:this.license,/*营业执照电子版*/
                                    organizationCodeImage:this.Organization,/*组织机构代码证电子版*/
                                    generalTaxpayerImage:this.taxpayer,/*一般纳税人证明*/
                                    taxRegistrationCertificateImage:this.TaxE,/*税务登记证号电子版*/
                                },
                                pa={
                                    storeData:JSON.stringify(storeData)
                                };
                            this.server(url,api.collection,pa).then(res=>{
                                if(res.code){
                                    this.$message({
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }else{
                                    this.$message({
                                        message: "修改成功",
                                        type: 'success'
                                    });
                                    setTimeout(()=>{
                                        this.$router.push({
                                            name:'InformationNav',
                                        });
                                    },500)
                                }
                            })
                        }
                    }
                    if(step==2&&this.time){
                        let url=this.storeEnter,
                            storeData={
                             /*采购商选填*/
                                AccountPeriod:AccountPeriod,
                                PaymentMethod:PaymentMethod,
                                ProcurementScale:ProcurementScale,
                                ProcurementCycle:ProcurementCycle,
                                managementModel:managementModel,
                                MainBusiness:MainBusiness,
                             /*供应商选填*/
                                AnnualExportVolume:AnnualExportVolume,
                                AnnualImportVolume:AnnualImportVolume,
                                AnnualTurnover:AnnualTurnover,
                                monthlyProduction:monthlyProduction,
                                BrandName:BrandName,
                                NRDD:NRDD,
                                CompanyPictures:list,
                             /********************/
                                accountId:this.accountId,/*账号id*/
                                type:this.checkList,/*归属 type*/
                                storeName:this.companyName,/*企业名称*/
                                typeId:this.TypesOfEnterprises,/*企业类型*/
                                classId:this.EnterpriseClassification[this.EnterpriseClassification.length-1],/*企业分类*/
                                storeCountry:this.Country,/*国家*/
                                storeGoods:this.products,/*主营产品*/
                                storeSalePlace:this.market,/*主营区域*/
                                logo:this.logo,/*企业logo*/
                                storeAddress:this.companyAddress,/*企业所在地*/
                                contactsName:this.Contacts,/*联系人*/
                                contactsPhone:this.links,/*联系方式*/
                                companyInfo:this.companyInfo,/*企业描述*/
                                companyPhone:this.companyPhone,/*公司电话*/
                                contactsEmail:this.email,/*企业邮箱*/
                                createTime:this.establishment,/*成立时间*/
                                companyRegisteredCapital:this.RegisteredCapital,/*注册资金*/
                                yearIncome:this.yearIncome,/*年总收入*/
                                companyEmployeeCount:this.companyEmployeeCount,/*员工总数*/
                                businessLicenceNumber:this.licenseNumber,/*营业执照号*/
                                businessLicenceStart:this.times[0],/*营业执照有效期--起*/
                                businessLicenceEnd:this.times[1],/*营业执照有效期--至*/
                                businessSphere:this.operationScope,/*法定经营范围*/
                                taxRegistrationCertificate:this.Tax,/*税务登记证号*/
                                taxpayerId:this.Taxpayer,/*纳税人识别号*/
                                organizationCode:this.OrganizationCode,/*组织机构代码*/
                                businessLicenceupImage:this.license,/*营业执照电子版*/
                                organizationCodeImage:this.Organization,/*组织机构代码证电子版*/
                                generalTaxpayerImage:this.taxpayer,/*一般纳税人证明*/
                                taxRegistrationCertificateImage:this.TaxE,/*税务登记证号电子版*/
                            },
                            pa={
                                storeData:JSON.stringify(storeData)
                            };
                        this.server(url,api.collection,pa).then(res=>{
                            if(res.code){
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }else{
                                this.$message({
                                    message: "修改成功",
                                    type: 'success'
                                });
                                setTimeout(()=>{
                                    this.$router.push({
                                        name:'InformationNav',
                                    });
                                },500)
                            }
                        })
                    }
                }

            },
         /*公司图片*/
            //*图片上传前*
            beforeProductsUpload(file){
             /*console.log(file)*/
                let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = file.size / 1024 / 1024 < 1;
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 1MB!',
                        type: 'warning'
                    });
                }  return extension || extension2 && isLt2M
            },
            //*多图上传成功*
            success(res,file,fileList){
             /*console.log(res,file,fileList);*/
                this.fileList=fileList;

            },
            //*多图上传--删除*
            handleRemove(file, fileList) {
             /*console.log(file, fileList);*/
                this.fileList=fileList;
            },
            //*多图上传--预览*
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
         /*税务登记证号电子版*/
            show_TaxE(e) {
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
                            that.TaxE=res.data
                        }
                    });
                };
            },
         /*一般纳税人证明*/
            show_taxpayer(e) {
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
                            that.taxpayer=res.data
                        }
                    });
                };
            },
         /*组织机构代码证电子版*/
            show_Organization(e) {
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
                            that.Organization=res.data
                        }
                    });
                };
            },
         /*营业执照电子版*/
            show_license(e) {
                console.log(e)
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
                            that.license=res.data
                        }
                    });
                };
            },
         /*企业logo*/
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
                            that.logo=res.data
                        }
                    });
                };
            },
         /*验证邮箱*/
            checkEmail(){
                let email_prompt=document.getElementById("email_prompt");
                email_prompt.innerHTML="";
                let reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
                if(reg.test(this.email)==false){
                    email_prompt.innerHTML="Email格式不正确，例如web@sohu.com";
                    return false;
                }
                return true;
            },
         /*点击logo进入主页*/
            goInfomation(){
             /*clearInterval(times);*/
                clearInterval(this.Interval)
                this.$router.push({
                    name:'InformationNav',
                });
            },
         /*登录*/
            goLogin(){
                this.$router.push({
                    name:'login',
                });
            },
            submit(){
                let url=this.url,
                    pa={
                        token:getCookie('userToken'),
                        accountId:getCookie('userId'),
                        companyName:this.companyName,
                        type:this.checkList,
                        contactsName:this.Contacts,
                        contactsPhone:this.links,
                        companyAddress:this.companyAddress
                    };
                this.server(url, api.portLogin,pa).then(res=>{
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: res.msg+"请耐心等待审核",
                            type: 'success'
                        });
                    }
                })
            },
            /*******************************服务接口**********************/
            server: (url,port, param) => {
                return api.$http(api.serverSupply +port + url, param)
            },
        },
        mounted(){
            this.upLoadUrl = api.serverSupply + api.portLogin;
            this.accountId=getCookie('userId');
            this.imgUrl=api.imgUrl;
            /*this.checkList=this.$route.query.id;
            if(this.$route.query.S){
                console.log(this.$route.query.S)
                this.steps=2
            }
            if(this.$route.query.id==0){
                this.titles="供应";
                this.business="供应信息";
            }else{
                this.titles="采购";
                this.business="采购信息";
            }*/
            let pa={
                appId:getCookie('userId')
            },url=this.updateStoreCnd;

            this.server(url,api.collection,pa).then(res=>{
                if(res.code){
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }else{
                 /*所在国家*/
                    this.Country=res.data.storeMain.storeCountry;
                    this.CountryOptions=res.data.countryList;
                 /*员工总数--企业规模*/
                    this.companyEmployeeCount=res.data.storeMain.storeCompany.companyEmployeeCount;
                    this.companyEmployeeCountOptions=res.data.scaleList;
                 /*企业分类*/
                    this.EnterpriseClassification=res.data.storeClassIds;
                    this.EnterpriseClassificationOptions=res.data.storeClass;
                 /*企业类型*/
                    this.TypesOfEnterprises=res.data.storeMain.storeType.name;
                    this.TypesOfEnterprisesOptions=res.data.storeTypes;

                 /*企业类别*/
                    this.checkList=res.data.storeMain.type;
                 /*主营产品*/
                    this.products=res.data.storeMain.storeGoods;
                 /*主要市场*/
                    this.market=res.data.storeMain.storeSalePlace;
                 /*详细地址*/
                    this.province=res.data.storeMain.storeAddress;
                 /*企业描述*/
                    this.companyInfo=res.data.storeMain.storeCompany.companyInfo;
                 /*企业logo*/
                    this.logo=res.data.storeMain.logo;
                 /*联系电话*/
                    this.tell=res.data.storeMain.storeCompany.companyPhone;
                 /*联系人*/
                    this.Contacts=res.data.storeMain.storeCompany.contactsName;
                 /*联系人号码*/
                    this.links=res.data.storeMain.storeCompany.contactsPhone;
                 /*电子邮箱*/
                    this.email=res.data.storeMain.storeCompany.contactsEmail;
                 /*注册资金*/
                    this.RegisteredCapital=res.data.storeMain.storeCompany.companyRegisteredCapital;
                 /*成立时间*/
                    this.establishment=res.data.storeMain.storeCompany.createTime*1000;
                    /*企业名称*/
                    this.companyName=res.data.storeMain.storeCompany.companyName;
                    /*企业地址*/
                    this.companyAddress=res.data.storeMain.storeCompany.bankAddress;
                    /*公司电话*/
                    this.companyPhone=res.data.storeMain.storeCompany.companyPhone;
                    /*年总收入*/
                    this.yearIncome=res.data.storeMain.storeCompany.yearIncome;
                    /*营业执照号*/
                    this.licenseNumber=res.data.storeMain.storeCompany.businessLicenceNumber;
                    /*营业执照有效期*/
                    let time=[];
                    time.push(res.data.storeMain.storeCompany.businessLicenceStart)
                    time.push(res.data.storeMain.storeCompany.businessLicenceEnd)
                    this.times=time;
                    /*营业执照电子版*/
                    this.license=res.data.storeMain.storeCompany.businessLicenceupImage;
                    /*法定经营范围*/
                    this.operationScope=res.data.storeMain.storeCompany.businessSphere;
                    /*税务登记证号*/
                    this.Tax=res.data.storeMain.storeCompany.taxRegistrationCertificate;
                    /*纳税人识别号*/
                    this.Taxpayer=res.data.storeMain.storeCompany.taxpayerId;
                    /*组织机构代码*/
                    this.OrganizationCode=res.data.storeMain.storeCompany.organizationCode;
                    /*组织机构代码证*/
                    this.Organization=res.data.storeMain.storeCompany.organizationCodeImage;
                    /*一般纳税人证明*/
                    this.taxpayer=res.data.storeMain.storeCompany.generalTaxpayerImage;
                    /*税务登记证*/
                    this.TaxE=res.data.storeMain.storeCompany.taxRegistrationCertificateImage;


                }
            })
        }
    }
</script>