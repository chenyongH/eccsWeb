<template>
    <div class="pcRight">
        <h2 :style="styles"><span>发布商机</span></h2>
        <!--<div class="head">
            &lt;!&ndash;<span>发布产品</span>&ndash;&gt;
            <span>已发布（2）</span>
            <span>审核中（2）</span>
            <span>未通过（2）</span>
            <span>已过期（2）</span>
            &lt;!&ndash;<span>供应分类（2）</span>&ndash;&gt;
        </div>-->
        <form action="">
            <!--商机名称 businessName-->
            <label style="width:100%;" class="label">
                <span class="labels">*商机名称</span>
                <el-input size="mini"
                          @blur="blurs('businessName')"
                          style="width:82%;"
                          v-model="businessName"
                          class="input"
                          type="text"></el-input>
                <b v-if="tip_businessName">请选择商机名称</b>
            </label>
          <!--商机别名-->
          <label style="width:100%;" class="label">
            <span class="labels">*商机别名</span>
            <el-input size="mini"
                      @blur="blurs('noLoginChanceName')"
                      style="width:82%;"
                      v-model="noLoginChanceName"
                      class="input"
                      type="text"></el-input>
            <b v-if="tip_noLoginChanceName">请选择商机别名</b>
          </label>

            <!--商机描述 businessDescription-->
            <!--<label v-html="msg" for=""></label>-->
            <label style="width:100%;" class="label forEditor"><span class="labels">*商机描述</span>
                <span class="editor">
                    <!--<vue-ueditor-wrap v-show="false" ref="ueditor" v-model="msg" :destroy="false" :config="config"></vue-ueditor-wrap>-->
                    <el-input style="width:90.9%;"
                              @blur="blurs('businessDescription')"
                              type="textarea"
                              v-model="businessDescription"></el-input>
                </span>
                <b style="top:56px;" v-if="tip_businessDescription">请填写商机描述</b>
            </label>
            <div class="formBox">

                <!--商机类别 category-->
                <label class="label">
                    <span class="labels">*商机类别</span>
                    <el-radio-group style="margin-left:15px;" v-model="category">
                        <el-radio :label="0">商机</el-radio>
                        <el-radio :label="1">招标</el-radio>
                    </el-radio-group>
                    <!--<b v-if="">请选择商机名称</b>-->
                </label><!--商机类型 businessType-->
                <!--<label class="label">
                    <span class="labels">商机类型</span>
                    <el-select style="margin-left:15px;" size="mini" v-model="businessType" clearable placeholder="请选择">
                        <el-option
                                v-for="item in businessTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </label>-->
                <!--商机周期 times-->
                <div class="label">
                    <span class="labels">*商机周期</span>
                    <el-date-picker
                            @blur="blurs('times')"
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                            size="mini"
                            class="pickerTime"
                            v-model="times"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <b style="" v-if="tip_times">请选择商机周期</b>
                </div>
                <!--采购商品 purchaseGoods-->
                <div class="label">
                    <span class="labels">*采购商品</span>
                    <el-input size="mini"
                              @blur="blurs('purchaseGoods')"
                              v-model="purchaseGoods"
                              class="input"
                              type="text"></el-input>
                    <b style="" v-if="tip_purchaseGoods">请选择采购商品</b>
                </div>

                <!--areaList 区域 region -->
                <div class="label">
                    <span class="labels">*区域</span>
                    <el-select v-model="region"
                               size="mini"
                               @change="areaChange('region')"
                               @blur="blurs('region')"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in regionOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_region">请选择区域</b>
                </div>
                <!--国家 Country-->
                <div class="label">
                    <span class="labels">国家</span>
                    <el-select v-model="Country"
                               @change="blurs('Country')"
                               @blur="blurs('Country')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in CountryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_Country">请选择国家</b>
                </div>
                <!--采购区域 procurementArea-->
                <!--<label class="label">
                    <span class="labels">采购区域</span>
                    <el-select v-model="procurementArea"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in procurementAreaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </label>-->
                <!-- customerType 客户类型 customerType -->
                <div class="label">
                    <span class="labels">*客户类型</span>
                    <el-select v-model="customerType"
                               @change="blurs('customerType')"
                               @blur="blurs('customerType')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in customerTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_customerType">请选择客户类型</b>
                </div>
                <!-- typeList 项目类型 projectType-->
                <div class="label">
                    <span class="labels">*项目类型</span>
                    <el-select v-model="projectType"
                               @change="blurs('projectType')"
                               @blur="blurs('projectType')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in projectTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_projectType">请选择项目类型</b>
                </div>
                <!-- scale 项目规模 projectScale-->
                <div class="label">
                    <span class="labels">*项目规模</span>
                    <el-select v-model="projectScale"
                               @change="blurs('projectScale')"
                               @blur="blurs('projectScale')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in projectScaleOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_projectScale">请选择项目规模</b>
                </div>
                <!-- capital 资金来源 sourceFunds-->
                <div class="label">
                    <span class="labels">*资金来源</span>
                    <el-select v-model="sourceFunds"
                               @change="blurs('sourceFunds')"
                               @blur="blurs('sourceFunds')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in sourceFundsOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_sourceFunds">请选择资金来源</b>
                </div>
                <!-- stageList 阶段 stage-->
                <div class="label">
                    <span class="labels">*阶段</span>
                    <el-select v-model="stage"
                               @change="blurs('stage')"
                               @blur="blurs('stage')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in stageOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_stage">请选择阶段</b>
                </div>
                <!-- tendering 招标方式 biddingMethod-->
                <div class="label">
                    <span class="labels">*招标方式</span>
                    <el-select v-model="biddingMethod"
                               @change="blurs('biddingMethod')"
                               @blur="blurs('biddingMethod')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in biddingMethodOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_biddingMethod">请选择招标方式</b>
                </div>
                <!-- currency 支付币种 currency-->
                <div class="label">
                    <span class="labels">*支付币种</span>
                    <el-select v-model="currency"
                               @change="blurs('currency')"
                               @blur="blurs('currency')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in currencyOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_currency">请选择支付币种</b>
                </div>
                <!-- guarantee 资金担保 guarantee-->
                <div class="label">
                    <span class="labels">*资金担保</span>
                    <el-select v-model="guarantee"
                               @change="blurs('guarantee')"
                               @blur="blurs('guarantee')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in guaranteeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_guarantee">请选择支付币种</b>
                </div>
                <!-- period 账期 accountPeriod-->
                <div class="label">
                    <span class="labels">*账期</span>
                    <el-select v-model="accountPeriod"
                               @change="blurs('accountPeriod')"
                               @blur="blurs('accountPeriod')"
                               size="mini"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in accountPeriodOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <b style="" v-if="tip_accountPeriod">请选择账期</b>
                </div>
                <!--联系人-->
                <div class="label">
                    <span class="labels">联系人：</span>
                    <el-input v-model="name"
                              class="input"
                              size="mini"
                              ></el-input>
                    <b style="" v-if="tip_name">请选择联系人</b>
                </div>
                <!--联系方式-->
                <div class="label">
                    <span class="labels">联系方式：</span>
                    <el-input v-model="links"
                              class="input"
                              size="mini"
                              ></el-input>
                    <b style="" v-if="tip_links">请选择联系方式</b>
                </div>
            </div>
            <!--其他备注 others-->
            <label style="width: 100%;" class="label forEditor"><span class="labels">其他备注</span>
                <span class="editor">
                    <!--<vue-ueditor-wrap v-show="false" ref="ueditor" v-model="msg" :destroy="false" :config="config"></vue-ueditor-wrap>-->
                    <el-input type="textarea" style="width:90.9%;height:200px;" v-model="others"></el-input>
                </span>
            </label>
            <!--采购详情-->
            <label v-if="false" class="label"><span class="labels">采购详情</span>
                <div class="cgDetial">
                    <div class="tops">
                        <i>*</i><span class="MR10">询价类型</span>
                        <el-radio-group v-model="radio1">
                            <el-radio :label="1">现货/标准品</el-radio>
                            <el-radio :label="2">加工/定制品</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="bots">
                        <el-table
                                :data="tableData"
                                height="250"
                                style="width: 100%">
                            <el-table-column
                                    prop="num"
                                    label="物料编码"
                                    width="">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.num"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="*物料名称"
                                    width="">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="industry"
                                    label="*所属行业">
                                <template slot-scope="scope">
                                    <el-select size="mini"
                                               v-model="scope.row.industry"
                                               clearable placeholder="请选择">
                                        <el-option
                                                v-for="item in industrys"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="brand"
                                    label="品牌">
                                <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.brand" clearable placeholder="请选择">
                                    <el-option
                                            v-for="item in brand"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="model"
                                    label="型号">
                                <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.model" clearable placeholder="请选择">
                                    <el-option
                                            v-for="item in model"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="describe"
                                    label="物料描述">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.describe"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="volume"
                                    label="*采购量">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.volume"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="metering"
                                    label="*单位">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="scope.row.metering" clearable placeholder="请选择">
                                        <el-option
                                                v-for="item in metering"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div @click="addMateriel" class="foo">
                        <span>添加物料 +</span>
                    </div>
                </div>
            </label>
            <!--采购要求-->
            <label v-if="false" class="label"><span class="labels">采购要求</span>
                <div class="cgRequirement">
                    <div class="left">
                        <div class="cgr">
                            <div class="title"><span>*</span>报价截止日期</div>
                            <div class="cont">
                                <input type="text">
                            </div>
                        </div>
                        <div class="cgr">
                            <div class="title"><span>*</span>采购类型</div>
                            <div class="cont">
                                <el-radio-group class="radio2" v-model="radio2">
                                    <el-radio :label="3">标准订单（单次采购）</el-radio>
                                    <el-radio :label="4">价格协议（长期采购）</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="cgr">
                            <div class="title">期望收货日期</div>
                            <div class="cont">
                                <div class="date">起始日期：
                                    <el-date-picker
                                            class="dateStart"
                                            size="mini"
                                            v-model="dateS"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <div class="date">结束日期：
                                    <el-date-picker
                                            size="mini"
                                            v-model="dateE"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="cgr">
                            <div class="title">交货日期</div>
                            <div class="cont">
                                <div class="closing">
                                    自下单后
                                    <input type="number">
                                    天之内交货至指定地点
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ctr"></div>
                    <div class="right">
                        <div class="cgr">
                            <div class="title"><span class="red">*</span>收货地址
                                <el-radio class="radio3" v-model="radio3" :label="5">使用临时地址</el-radio>

                            </div>
                        </div>
                        <div class="cgr">
                            <textarea placeholder="输入具体地址" class="textArea"></textarea>
                        </div>
                    </div>
                </div>
            </label>
            <label v-if="false" class="label"><span class="labels">供应商资格</span><input class="input" type="text"></label>
            <label v-if="false" class="label"><span class="labels">采购设置</span><input class="input" type="text"></label>
            <el-button @click="submit" class="submit" type="primary">提交发布</el-button>
        </form>
    </div>
</template>
<style scoped lang="less">
    .label,label{
        position:relative;
        b{
            font-weight: 300;
            color:red;
            font-size:12px;
            position: absolute;
            left:100px;
            top:30px;
            text-align: left;
            white-space: nowrap;
        }
    }
</style>
<script>
    import $ from "jquery"
    import {getCookie} from '../../assets/js/cookie.js'
    import api from '../../api.js';
    // import VueUeditorWrap from 'vue-ueditor-wrap'
    import "../../assets/css/ReleaseBusinessOpportunity.less"
    export default{
        name:'ReleaseBusinessOpportunity',
        components: {
            // VueUeditorWrap
        },
        data(){
            return{
                links:'',/*联系方式*/
                tip_links:'',
                name:'',/*联系人*/
                tip_name:0,
                styles:{
                    height: '35px',
                    backgroundColor: '#17a6b5',
                    lineHeight: '35px',
                    textIndent: '1em',
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'normal',
                    alingSelf: 'flex-start',
                    marginBottom: '20px',
                    width: '100%'
                },
                accountPeriod:'',/*账期*/
                tip_accountPeriod:0,/*账期*/
                accountPeriodOptions:[],
                guarantee:'',/*资金担保*/
                tip_guarantee:0,/*资金担保*/
                guaranteeOptions:[],
                customerType:'',/*客户类型*/
                tip_customerType:0,/*客户类型*/
                customerTypeOptions:[{
                    value: '选项1',
                    label: '黄金糕'
                }],
                currency:'',/*支付币种*/
                tip_currency:0,/*支付币种*/
                currencyOptions:[],
                biddingMethod:'',/*招标方式*/
                tip_biddingMethod:0,/*招标方式*/
                biddingMethodOptions:[],
                stage:'',/*阶段*/
                tip_stage:'',/*阶段*/
                stageOptions:[],
                sourceFunds:'',/*资金来源*/
                tip_sourceFunds:'',/*资金来源*/
                sourceFundsOptions:[],
                projectScale:'',/*项目规模*/
                tip_projectScale:'',/*项目规模*/
                projectScaleOptions:[],
                projectType:'',/*项目类型*/
                tip_projectType:'',/*项目类型*/
                projectTypeOptions:[],
                Country:'',/*国家*/
                tip_Country:0,/*国家*/
                CountryOptions:[],
                region:'',/*区域*/
                tip_region:0,/*区域*/
                regionOptions:[],
                others:'',/*其他备注*/
                businessDescription:'',/*商机描述*/
                tip_businessDescription:0,/*商机描述-提示*/
                /*procurementArea:'',/!*采购区域*!/
                procurementAreaOptions:[{
                    value: '选项1',
                    label: '黄金糕'
                }],*/
                purchaseGoods:'',/*采购商品*/
                tip_purchaseGoods:0,/*采购商品*/
                times:'',/*商机周期*/
                tip_times:0,/*商机周期-提示*/
                /*businessType:'',/!*商机类型*!/
                businessTypeOptions:[{
                    value: '选项1',
                    label: '黄金糕'
                }],*/
                businessName:'',/*商机名称*/
                tip_businessName:0,/*商机名称-提示*/
              noLoginChanceName:'',/*商机未登录名称*/
              tip_noLoginChanceName:0,
                category:0,/*商机类别*/
                /*商机周期*/
                pickerOptions:{disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }},
                /*富文本编辑器*/
                msg: '<h2>Hello World!</h2>',
                config: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://api.demo.com/ueditor/upload',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: './UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false
                },
                /*单选按钮*/
                radio1: 1,
                radio2: 3,
                radio3: 5,
                /*采购详情*/
                tableData: [{
                    num: '2016-05-02',
                    name: '王小虎',
                    industry: '重工',
                    brand:'Audi',
                    model:'ak-47',
                    describe:'武器',
                    volume:20,
                    metering:'件/吨'
                },],
                industrys: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                brand: [{
                    value: '黄金糕',
                    label: '黄金糕'
                }, {
                    value: '双皮奶',
                    label: '双皮奶'
                }],
                model: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                metering: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                /*采购要求*/
                dateS:'',
                dateE:'',
                url:'/open/api/acc/chanceCnd',
                area:'/open/api/acc/countryCnd',
                save:'/open/api/acc/saveChance',
                userId:''
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
            },
            /*区域选择*/
            areaChange(name){
                this.Country='';
                let url=this.area,
                pa={
                    areaCode:this.region
                };
                this.server(url,pa).then(res=>{
                    this.CountryOptions=res.data
                });
                if(this[name]&&this[name].length!==0){
                    this[`tip_${name}`]=0;
                }else{
                    this[`tip_${name}`]=1;
                }
            },
            /*采购详情*/
            addMateriel(){
                const td={
                        num: '2016-05-02',
                        name: '王小虎',
                        industry: '重工',
                        brand:'Audi',
                        model:'ak-47',
                        describe:'武器',
                        volume:20,
                        metering:'件/吨'
                    };
                this.tableData.push(td)
            },

            /*提交发布*/
            submit(){
                let url=this.save,
                    {noLoginChanceName,businessDescription,accountPeriod,guarantee,customerType,currency,biddingMethod,sourceFunds,projectScale,userId,category,businessName,projectType,times,purchaseGoods,region,stage,Country,}=this,
                pa={
                    appId:this.userId,/*用户id*/
                    type:this.category,/*商机类别*/
                    chanceName:this.businessName,/*商机名称*/
                  noLoginChanceName:noLoginChanceName,
                    chanceType:this.projectType,/*项目类型*/
                    beginAt:this.times[0],/*开始时间*/
                    endAt:this.times[1],/*结束时间*/
                    buyGoods:this.purchaseGoods,/*购买商品*/
                    buyArea:this.region,/*区域*/
                    stage:this.stage,/*阶段*/
                    country:this.Country,/*国家*/
                    scale:this.projectScale,/*项目规模*/
                    capital:this.sourceFunds,/*资金来源*/
                    tendering:this.biddingMethod,/*招标方式*/
                    currency:this.currency,/*支付币种*/
                    customerType:this.customerType,/*客户类型*/
                    guarantee:this.guarantee,/*资金担保*/
                    period:this.accountPeriod,/*账期*/
                    chanceInfo:this.businessDescription,/*商机描述*/
                    remark:this.others,/*其他备注*/
                    linkMobile:this.links,/*联系方式*/
                    linkman:this.name,/*联系人*/
                };
                if(!businessDescription||!accountPeriod||!guarantee||!customerType||!currency||!biddingMethod||!sourceFunds||!projectScale||!businessName||!projectType||times.length<=0||!purchaseGoods||!region||!stage){
                    this.$message({
                        message: "请完善商机基本信息",
                        type: 'error'
                    });
                }else{
                    this.server(url,pa).then(res=>{
                        console.log(res)
                        if(res.code){
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }else{
                            this.$router.push({
                                path:'/personalCenter/BusinessOpportunityList',
                              query:{
                                type:0
                              }
                            })
                        }
                    })
                }

            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.collection+url,param)
            },
        },
        mounted(){
            this.userId = getCookie('userId');
            let url=this.url;
            this.server(url).then(res=>{
                this.projectTypeOptions=res.data.typeList;/*1项目类型*/
                this.regionOptions=res.data.areaList;/*2区域*/
                this.customerTypeOptions=res.data.customerType;/*3客户类型*/
                this.projectScaleOptions=res.data.scale;/*4项目规模*/
                this.sourceFundsOptions=res.data.capital;/*5资金来源*/
                this.stageOptions=res.data.stageList;/*6阶段*/
                this.biddingMethodOptions=res.data.tendering;/*7招标方式*/
                this.currencyOptions=res.data.currency;/*8支付币种*/
                this.guaranteeOptions=res.data.guarantee;/*9资金担保*/
                this.accountPeriodOptions=res.data.period;/*10资金担保*/
            });
//            $("#ReleaseBusinessOpportunity").css({backgroundColor:'#17A6B5'});
            $("#ReleaseBusinessOpportunity>a").css({color:'#17A6B5'});
        },
        beforeDestroy:function(){
            $("#ReleaseBusinessOpportunity").css({backgroundColor:'#fff'});
            $("#ReleaseBusinessOpportunity>a").css({color:'#333'});
        },


    }
</script>
