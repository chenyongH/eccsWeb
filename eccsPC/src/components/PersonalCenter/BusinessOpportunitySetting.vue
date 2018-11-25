<template>
    <div class="pcRight">
        <h2 :style="styles"><span>修改商机</span></h2>
        <!--<div class="head">
            &lt;!&ndash;<span>发布产品</span>&ndash;&gt;
            <span>已发布（2）</span>
            <span>审核中（2）</span>
            <span>未通过（2）</span>
            <span>已过期（2）</span>
            &lt;!&ndash;<span>供应分类（2）</span>&ndash;&gt;
        </div>-->
        <form action="">
            <div class="formBox">
                <!--商机名称 businessName-->
                <div class="label" style="width:100%;">
                    <span class="labels">商机名称</span>
                    <el-input size="mini" style="width:82%;" v-model="businessName" class="input"
                              type="text"></el-input>
                </div>
                <!--商机别名@blur="blurs('noLoginChanceName')"-->
                <label style="width:100%;" class="label">
                    <span class="labels">*商机别名</span>
                    <el-input size="mini"
                              style="width:82%;"
                              v-model="noLoginChanceName"
                              class="input"
                              type="text"></el-input>
                    <!--<b v-if="tip_noLoginChanceName">请选择商机别名</b>-->
                </label>
                <!--商机描述 businessDescription-->
                <!--<label v-html="msg" for=""></label>-->
                <label style="width:100%;" class="label forEditor"><span class="labels">商机描述</span>
                    <span class="editor">
                    <el-input type="textarea"
                              style="width:90.2%;"
                              v-model="businessDescription" name="BusinessDescription"
                    ></el-input>
                </span>
                </label>
                <!--商机类别 category-->
                <label class="label">
                    <span class="labels">商机类别</span>
                    <el-radio-group style="margin-left:15px;" v-model="category">
                        <el-radio :label="0">商机</el-radio>
                        <el-radio :label="1">招标</el-radio>
                    </el-radio-group>
                </label>

                <!--商机类型 businessType-->
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
                <!--v-model="times"
                :default-value="times"
                -->
                <div class="label">
                    <span class="labels">商机周期</span>
                    <el-date-picker
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
                </div>
                <!--采购商品 purchaseGoods-->
                <div class="label">
                    <span class="labels">采购商品</span>
                    <el-input size="mini"
                              v-model="purchaseGoods"
                              class="input"
                              type="text">
                    </el-input>
                </div>

                <!--areaList 区域 region -->
                <div class="label">
                    <span class="labels">区域</span>
                    <el-select v-model="region"
                               size="mini"
                               @change="areaChange"
                               style="margin-left:15px;"
                               clearable placeholder="请选择">
                        <el-option
                                v-for="item in regionOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <!--国家 Country-->
                <div class="label">
                    <span class="labels">国家</span>
                    <el-select v-model="Country"
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
                    <span class="labels">客户类型</span>
                    <el-select v-model="customerType"
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
                </div>
                <!-- typeList 项目类型 projectType-->
                <div class="label">
                    <span class="labels">项目类型</span>
                    <el-select v-model="projectType"
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
                </div>
                <!-- scale 项目规模 projectScale-->
                <div class="label">
                    <span class="labels">项目规模</span>
                    <el-select v-model="projectScale"
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
                </div>
                <!-- capital 资金来源 sourceFunds-->
                <div class="label">
                    <span class="labels">资金来源</span>
                    <el-select v-model="sourceFunds"
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
                </div>
                <!-- stageList 阶段 stage-->
                <div class="label">
                    <span class="labels">阶段</span>
                    <el-select v-model="stage"
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
                </div>
                <!-- tendering 招标方式 biddingMethod-->
                <div class="label">
                    <span class="labels">招标方式</span>
                    <el-select v-model="biddingMethod"
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
                </div>
                <!-- currency 支付币种 currency-->
                <div class="label">
                    <span class="labels">支付币种</span>
                    <el-select v-model="currency"
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
                </div>
                <!-- guarantee 资金担保 guarantee-->
                <div class="label">
                    <span class="labels">资金担保</span>
                    <el-select v-model="guarantee"
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
                </div>
                <!-- period 账期 accountPeriod-->
                <div class="label">
                    <span class="labels">账期</span>
                    <el-select v-model="accountPeriod"
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
                </div>
                <!--联系人-->
                <div class="label">
                    <span class="labels">联系人：</span>
                    <el-input v-model="name"
                              class="input"
                              size="mini"
                              @blur="blurs('name')"></el-input>
                    <b style="" v-if="tip_name">请选择联系人</b>
                </div>
                <!--联系方式-->
                <div class="label">
                    <span class="labels">联系方式：</span>
                    <el-input v-model="links"
                              class="input"
                              size="mini"
                              @blur="blurs('links')"></el-input>
                    <b style="" v-if="tip_links">请选择联系方式</b>
                </div>
            </div>
            <!--其他备注 others-->
            <label class="label forEditor"><span class="labels">其他备注</span>
                <span class="editor">
                    <textarea v-model="others" name="Others" id="Others" cols="119.8" rows="10"></textarea>
                </span>
            </label>

            <el-button @click="submit" class="submit" type="primary">提交发布</el-button>
        </form>
    </div>
</template>
<script>
    import {FormatDate} from '../../assets/js/plugs'
    import {getCookie} from '../../assets/js/cookie.js'
    import api from '../../api.js';
    import VueUeditorWrap from 'vue-ueditor-wrap'
    import "../../assets/css/ReleaseBusinessOpportunity.less"
    export default{
        name: 'businessOpportunitySetting',
        components: {
            VueUeditorWrap
        },
        data(){
            return {
                links: '', /*联系方式*/
                tip_links: '',
                name: '', /*联系人*/
                tip_name: 0,
                styles: {
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
                accountPeriod: '', /*账期*/
                accountPeriodOptions: [],
                guarantee: '', /*资金担保*/
                guaranteeOptions: [],
                customerType: '', /*客户类型*/
                customerTypeOptions: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                currency: '', /*支付币种*/
                currencyOptions: [],
                biddingMethod: '', /*招标方式*/
                biddingMethodOptions: [],
                stage: '', /*阶段*/
                stageOptions: [],
                sourceFunds: '', /*资金来源*/
                sourceFundsOptions: [],
                projectScale: '', /*项目规模*/
                projectScaleOptions: [],
                projectType: '', /*项目类型*/
                projectTypeOptions: [],
                Country: '', /*国家*/
                CountryOptions: [],
                region: '', /*区域*/
                regionOptions: [],
                others: '', /*其他备注*/
                businessDescription: '', /*商机描述*/
                purchaseGoods: '', /*采购商品*/
                times: [], /*商机周期 new Date('2022-10-23'),new Date('2022-10-24') */
                businessName: '', /*商机名称*/
                noLoginChanceName:'',/*商机未登录名称*/
                category: 0, /*商机类别*/

                url: '/open/api/acc/updateChanceCnd',
                area: '/open/api/acc/countryCnd',
                save: '/open/api/acc/updateChance',
                userId: '',
                id: ''
            }
        },
        methods: {
            /*区域选择*/
            areaChange(){
                this.Country = '';
                let url = this.area,
                    pa = {
                        areaCode: this.region
                    };
                this.server(url, pa).then(res => {
                    this.CountryOptions = res.data
                })
            },
            /*采购详情*/
            addMateriel(){
                const td = {
                    num: '2016-05-02',
                    name: '王小虎',
                    industry: '重工',
                    brand: 'Audi',
                    model: 'ak-47',
                    describe: '武器',
                    volume: 20,
                    metering: '件/吨'
                };
                this.tableData.push(td)
            },

            /*提交发布*/
            submit(){
                let url = this.save,
                    pa = {
                        chanceId: this.id,
                        appId: this.userId, /*用户id*/
                        type: this.category, /*商机类别*/
                        chanceName: this.businessName, /*商机名称*/
                        noLoginChanceName:this.noLoginChanceName,/*商机别名*/
                        chanceType: this.projectType, /*项目类型*/
                        beginAt: this.times[0], /*开始时间*/
                        endAt: this.times[1], /*结束时间*/
                        buyGoods: this.purchaseGoods, /*购买商品*/
                        buyArea: this.region, /*区域*/
                        stage: this.stage, /*阶段*/
                        country: this.Country, /*国家*/
                        scale: this.projectScale, /*项目规模*/
                        capital: this.sourceFunds, /*资金来源*/
                        tendering: this.biddingMethod, /*招标方式*/
                        currency: this.currency, /*支付币种*/
                        customerType: this.customerType, /*客户类型*/
                        guarantee: this.guarantee, /*资金担保*/
                        period: this.accountPeriod, /*账期*/
                        chanceInfo: this.businessDescription, /*商机描述*/
                        remark: this.others, /*其他备注*/
                        linkMobile: this.links, /*联系方式*/
                        linkman: this.name, /*联系人*/
                    };
                this.server(url, pa).then(res => {
                    /*console.log(res)*/
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.$router.push({
                            path: '/personalCenter/BusinessOpportunityList',
                        })
                    }
                })
            },
            /*******************************服务接口**********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.collection + url, param)
            },
        },
        mounted(){
            this.userId = getCookie('userId');
            this.id = this.$route.query.id;
            let url = this.url,
                pa = {
                    chanceId: this.id
                };
            this.server(url, pa).then(res => {
                let time = [];
                this.Country = res.data.chance.country;
                this.CountryOptions = res.data.countryList;
                time.push(res.data.chance.beginAt * 1000);
                time.push(res.data.chance.endAt * 1000);
                this.times = time;
                this.projectTypeOptions = res.data.typeList;
                this.projectType = res.data.chance.chanceType;
                /*1项目类型*/
                this.regionOptions = res.data.areaList;
                this.region = res.data.chance.buyArea;
                /*2区域*/
                this.customerTypeOptions = res.data.customerType;
                this.customerType = res.data.chance.customerType;
                /*3客户类型*/
                this.projectScaleOptions = res.data.scale;
                this.projectScale = res.data.chance.scale;
                /*4项目规模*/
                this.sourceFundsOptions = res.data.capital;
                this.sourceFunds = res.data.chance.capital;
                /*5资金来源*/
                this.stageOptions = res.data.stageList;
                this.stage = res.data.chance.stage;
                /*6阶段*/
                this.biddingMethodOptions = res.data.tendering;
                this.biddingMethod = res.data.chance.tendering;
                /*7招标方式*/
                this.currencyOptions = res.data.currency;
                this.currency = res.data.chance.currency;
                /*8支付币种*/
                this.guaranteeOptions = res.data.guarantee;
                this.guarantee = res.data.chance.guarantee;
                /*9资金担保*/
                this.accountPeriodOptions = res.data.period;
                this.accountPeriod = res.data.chance.period;
                /*10资金担保*/
                this.businessName = res.data.chance.chanceName;
                /*商机名称*/
                /*商机别名*/
                this.noLoginChanceName= res.data.chance.noLoginChanceName;
                this.purchaseGoods = res.data.chance.buyGoods;
                /*采购商品*/
                this.type = res.data.chance.type;
                /*商机类别*/
                this.businessDescription = res.data.chance.chanceInfo;
                /*商机描述*/
                this.others = res.data.chance.remark;
                /*其他备注*/
                this.links = res.data.chance.linkMobile;
                /*联系方式*/
                this.name = res.data.chance.linkman;
                /*联系人*/
            })
        }


    }
</script>