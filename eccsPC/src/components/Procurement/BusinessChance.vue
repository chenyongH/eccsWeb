/* eslint-disable ceshi */
<template>
    <div class="business_content">
        <div class="content">
            <div class="content_top">
                 <!--搜索筛选-->
                <ul id="filters" class="detail">
                    <!--规格-->
                        <li>
                            <div class="left">  
                                <p>地区:</p>
                                <a @click="filter('area','')">不限</a>
                                <a   @click="filter('area',area.code)" v-for="(area,idxArea) in areas.slice(0,6)" :key="idxArea">{{area.name}}</a>                      
                            </div>
                            <div class="right" v-if="areas.length>=6">
                                更多
                                    <el-dropdown>
                                        <el-button  size="mini">
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item  @click.native="filter('area',areaMore.id)" v-if="idx>=6" v-for="(areaMore,idx)  in areas.slice(6,areas.length)" :key="idx">{{areaMore.name}}</el-dropdown-item>                                    
                                        </el-dropdown-menu>
                                    </el-dropdown>
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                <p>类型:</p>
                                <a @click="filter('typeId','')">不限</a>
                                <a @click="filter('typeId',type.id)" v-for="(type,idxType) in types.slice(0,6)" :key="idxType">{{type.name}}</a>                              
                            </div>
                             <div class="right" v-if="types.length>=6">
                                更多
                                    <el-dropdown>
                                        <el-button  size="mini">
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="filter('typeId',typeMore.id)" v-if="idx>=6" v-for="(typeMore,idx)  in types.slice(6,types.length)" :key="idx">{{typeMore.name}}</el-dropdown-item>                             
                                        </el-dropdown-menu>
                                    </el-dropdown>
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                <p>等级:</p>
                                <a @click="filter('levelId','')">不限</a>
                                <a @click="filter('levelId',level.id)" v-for="(level,idxLevel) in levels.slice(0,6)" :key="idxLevel">{{level.name}}</a>
                               
                            </div>
                            <div class="right" v-if="levels.length>=6">
                                更多
                                <el-dropdown>
                                    <el-button  size="mini">
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="filter('leveId',levelMore.id)" v-if="idx>=6" v-for="(levelMore,idx)  in levels.slice(6,levels.length)" :key="idx"> {{levelMore.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                <p>勋章:</p>
                                <a @click="filter('medalId','')">不限</a>
                                <a @click="filter('medalId',medal.id)" v-for="(medal,idxMedal) in medals.slice(0,6)" :key="idxMedal">{{medal.medalName}}</a>                         
                            </div>
                            <div class="right" v-if="medals.length>=6">
                                更多
                                <el-dropdown>
                                    <el-button  size="mini">
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="filter('medalId',medalMore.id)" v-if="idx>=6" v-for="(medalMore,idx)  in medals.slice(6,medals.length)" :key="idx"> {{medalMore.medalName}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </li>
                      
                </ul>
            </div>
            <div class="content_bottom">
                <div class="left">
                    <div class="filter">
                        <!--更新时间-->
                        <el-dropdown trigger="click" @command="upDateData">
                            <el-button>
                                综合排序<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="0">从新到旧(默认)</el-dropdown-item>
                                <el-dropdown-item command="1">从旧到新</el-dropdown-item> 
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--显示顺序-->     
                        <el-dropdown trigger="click" @command="companySize">
                            <el-button>
                                公司规模<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="size.code" v-for="size in companySizes" :key="size.id">{{size.name}}</el-dropdown-item>                 
                            </el-dropdown-menu>
                        </el-dropdown>
                        <label style="display:flex; align-items: center">
                            <span style="white-space: nowrap;margin-right:10px;">注册资本</span>
                            <el-input size="mini"  v-model="state1"></el-input>
                            <!-- <el-autocomplete
                                class="inline-input"
                                v-model="state1"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                size="small"
                                @blur="blur"
                            ></el-autocomplete> -->
                            &nbsp;&nbsp;万-&nbsp;&nbsp;
                            <!-- <el-autocomplete
                                class="inline-input"
                                v-model="state2"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                size="small"
                            />
                        万</label> -->
                            <el-input size="mini"  v-model="state2"></el-input>
                            &nbsp;&nbsp;万&nbsp;&nbsp;
                        </label>
                        <el-button type="primary"  @click.native="blur" size="mini">确定</el-button>
                    </div>
                    <div class="proBox">
                        <div class="nothing" v-if="purchasers.length<=0">暂无数据</div> 
                        <div  class="purchaser" v-if="purchaser" v-for="(purchaser,idx) in purchasers" :key="idx">
                            <div class="left" >
								<router-link :to="{path:'/companyHomePage',query:{id:purchaser.storeMain.id}}">
									<div class="tittle">
										{{purchaser.storeMain.storeName}}
									</div>
								</router-link>
								<router-link :to="{path:'/companyHomePage',query:{id:purchaser.storeMain.id}}">
									<div class="picture">
										<img :src="imgUrl+purchaser.storeMain.logo" alt="">
									</div>
								</router-link>							
                            </div>
                            <div class="middle">
                                <span class="tittle">{{purchaser.chanceName}}</span>
                                <span class="type">项目类型：{{purchaser.chanceTypeName}}</span>
                                <span class="goods">采购商品：{{purchaser.buyGoods}}</span>
                                <span class="area">采购区域：{{purchaser.buyArea}}</span>
                            </div>
                            <div class="right" v-if="purchaser.state===0">
                                <span class="purchasedate">发布时间：{{purchaser.releaseTime}}</span>
                                <span class="purchasetimeleft">
                                    报名活动还未开始
                                </span>
                             	<router-link :to="{path:'/BusinessChancelogin',query:{chanceId:purchaser.id,appid:appid,token:token}}">	
                                    <el-button type="primary" plain>
                                        查看详情
                                    </el-button>
                             	</router-link>
                                <span class="alreadyoffer">
                                    已有报价<span>{{purchaser.chanceNum}}</span>条
                                </span>
                            </div>
                            <div class="right" v-else-if="purchaser.state===1">
                                <span class="purchasedate">发布时间：{{purchaser.releaseTime}}</span>
                                <span class="purchasetimeleft">
                                    距离报价结束还有<span>{{purchaser.day}}</span>天
                                </span>
                             	<router-link :to="{path:'/BusinessChancelogin',query:{chanceId:purchaser.id,appid:appid,token:token}}">	
                                    <el-button type="primary" plain>
                                        查看详情
                                    </el-button>
                                </router-link>
                                <span class="alreadyoffer">
                                    已有报价<span>{{purchaser.chanceNum}}</span>条
                                </span>
                            </div>
                            <div class="right" v-else>
                                <span class="purchasedate">发布时间：{{purchaser.releaseTime}}</span>
                                <span class="purchasetimeleft">
                                   活动已结束
                                </span>
                             	<router-link :to="{path:'/BusinessChancelogin',query:{chanceId:purchaser.id,appid:appid,token:token}}">	
                                    <el-button type="primary" plain>
                                        查看详情
                                    </el-button>
                             	</router-link>
                                <span class="alreadyoffer">
                                    已有报价<span class="confirm">{{purchaser.chanceNum}}</span>条
                                </span>
                            </div>
                        </div> 
                        
                    </div>
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
                <div class="right">
                    <div class="side">
                        <div class="title">本月排行</div>
                        <ul>               
                            <li v-for="(monthHot,idx) in monthHots" :key="idx">
                                <span>
                                    <i>{{idx+1}}</i>
                                    <router-link :to="{path:'/BusinessChancelogin',query:{chanceId:monthHot.contentId,appid:appid,token:token}}">    
                                        {{monthHot.name}}
                                    </router-link> 
                                </span>
                            </li>                     
                        </ul>
                    </div>
                    <div class="side">
                        <div class="title">商机排行</div>
                        <ul>
                            <li v-for="(chancehot,idx) in chancehots" :key="idx">
                                <span>
                                    <i>{{idx+1}}</i>
                                    <router-link :to="{path:'/BusinessChancelogin',query:{chanceId:chancehot.contentId,appid:appid,token:token}}">    
                                        {{chancehot.name}}
                                    </router-link> 
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="side">
                        <div class="title">公司排行</div>
                        <ul>
                            <li v-for="(storeHot,idx) in storeHots" :key="idx">
                                <span>
                                    <i>{{idx+1}}</i>
                                    <router-link :to="{path:'/companyHomePage',query:{id:storeHot.contentId}}">    
                                        {{storeHot.name}}
                                    </router-link> 
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <swiper></swiper>    
    </div>
</template>

<script>
import swiper from "../swiper";
import $ from "jquery";
import "../../assets/css/BusinessChance.less";
import api from "../../api.js";
import { getCookie } from "../../assets/js/cookie.js";
export default {
  name: "businessChance",
  components: {
    swiper
  },
  data() {
    return {
      purchasers: "",
      purchaserinfo: "",
      imgUrl: "",
      currentPage: 1 /*当前页数*/,
      pageSize: 5 /*每页显示条数*/,
      pageCount: 1 /*总页数*/,
      pagerCount: 5 /*页码按钮的数量，当总页数超过该值时会折叠*/,
      /*排序*/
      restaurants: [],
      state1: "",
      state2: "",
      options: [
        {
          value: "0",
          label: "最新发布"
        },
        {
          value: "1",
          label: "以前发布"
        }
      ],
      types: [], //类型
      areas: [], //地区
      levels: [], //等级
      medals: [], //勋章
      companySizes: [], //规模
      query: {
        typeId: "",
        levelId: "",
        medalId: "",
        area: ""
      },
      appid: "",
      token: "",
      keyWord: "",
      chanceId: "",
      ranks: "",
      monthHots: "",
      chancehots: "",
      storeHots: "",
      inputvalue: "",

      /**排序**/
      sortlist: {
        sort: "0" /*更新时间*/,
        scaleCode: ""
      },
      companySizes: [] /*公司规模*/
    };
  },
  watch: {
    //采购商输入搜索
    businessInputText() {
      this.imgUrl = api.imgUrl;
      this.inputvalue = this.businessInputText;
      this.appid = getCookie("userId");
      this.token = getCookie("userToken");
      //   this.restaurants = this.loadAll(); /*排序注册资金*/
      this.state1 = ""; //最小值
      this.state2 = ""; //最大值
      this.levels = ""; //等级
      this.medals = ""; //勋章
      this.types = ""; //类型
      this.areas = ""; //地区
      this.companySizes = ""; //规模
      $(
        ".business_content .content .detail li .left a:hover, .business_content .content .detail li .left a:first-of-type"
      ).css({ color: "#fff", backgroundColor: "#17A6B5" });
      // console.log(this.businessKeyword,"this.businessKeyword")
      // console.log(this.businessInputText,"this.businessInputText")

      let id = this.$route.query.id;
      let params = {
        pageNumber: 1,
        pageSize: 5,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      /**排行**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/chanceHot",
          params
        )
        .then(res => {
          this.ranks = res.data;
          this.monthHots = res.data.monthHots;
          this.chancehots = res.data.hots;
          this.storeHots = res.data.storeHots;
        })
        .catch(err => {
          console.log(err);
        });

      /**筛选**/
      api
        .$http(api.serverSupply + api.portBuyer + "/open/api/chance/buyCnd")
        .then(res => {
          this.levels = res.data.levels; //等级
          this.medals = res.data.storeMedals; //勋章
          this.types = res.data.storeTypes; //类型
          this.areas = res.data.areas; //地区
          this.companySizes = res.data.sysDictList; //规模
          //console.log(res.data, "filter");
        })
        .then(() => {
          $("#filters>li>.left>a").click(function() {
            $(this).css({ color: "#fff", backgroundColor: "#17A6B5" });
            $(this)
              .siblings()
              .css({ color: "#666", backgroundColor: "#fff" });
          });
        })
        .catch(err => {
          console.log(err);
        });

      /**商机列表**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });

      //   console.log(this.businessInputText);
    },
    businessKeyword() {
      this.imgUrl = api.imgUrl;
      this.inputvalue = this.businessKeyword;
      this.appid = getCookie("userId");
      this.token = getCookie("userToken");
      this.state1 = "";
      this.state2 = "";
      let id = this.$route.query.id;

      this.levels = ""; //等级
      this.medals = ""; //勋章
      this.types = ""; //类型
      this.areas = ""; //地区
      this.companySizes = ""; //规模
      $(
        ".business_content .content .detail li .left a:hover, .business_content .content .detail li .left a:first-of-type"
      ).css({ color: "#fff", backgroundColor: "#17A6B5" });

      let params = {
        pageNumber: 1,
        pageSize: 5,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      /**排行**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/chanceHot",
          params
        )
        .then(res => {
          this.ranks = res.data;
          this.monthHots = res.data.monthHots;
          this.chancehots = res.data.hots;
          this.storeHots = res.data.storeHots;
        })
        .catch(err => {
          console.log(err);
        });

      /**列表**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
      /**筛选**/
      api
        .$http(api.serverSupply + api.portBuyer + "/open/api/chance/buyCnd")
        .then(res => {
          this.levels = res.data.levels; //等级
          this.medals = res.data.storeMedals; //勋章
          this.types = res.data.storeTypes; //类型
          this.areas = res.data.areas; //地区
          this.companySizes = res.data.sysDictList; //规模
          //console.log(res.data, "filter");
        })
        .then(() => {
          $("#filters>li>.left>a").click(function() {
            $(this).css({ color: "#fff", backgroundColor: "#17A6B5" });
            $(this)
              .siblings()
              .css({ color: "#666", backgroundColor: "#fff" });
          });
        })
        .catch(err => {
          console.log(err);
        });

      //   console.log(this.businessKeyword)
    },
    TopProcurementSearch() {
      this.sortlist.sort = "0"; /*更新时间*/
      this.sortlist.scaleCode = ""; /*公司规模*/
      this.state1 = "";
      this.state2 = "";
      this.levels = ""; //等级
      this.medals = ""; //勋章
      this.types = ""; //类型
      this.areas = ""; //地区
      this.companySizes = ""; //规模
      this.imgUrl = api.imgUrl;
      this.query.typeId = "";
      this.query.area = "";
      this.query.leveId = "";
      this.query.medalId = "";
      this.appid = getCookie("userId");
      this.token = getCookie("userToken");
      this.restaurants = this.loadAll(); /*排序注册资金*/
      let id = this.$route.query.id;
      $(
        ".business_content .content .detail li .left a:hover, .business_content .content .detail li .left a:first-of-type"
      ).css({ color: "#fff", backgroundColor: "#17A6B5" });
      let params = {
        pageNumber: 1,
        pageSize: 5,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      /**排行**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/chanceHot",
          params
        )
        .then(res => {
          this.ranks = res.data;
          this.monthHots = res.data.monthHots;
          this.chancehots = res.data.hots;
          this.storeHots = res.data.storeHots;
        })
        .catch(err => {
          console.log(err);
        });

      /**列表**/
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
      /**筛选**/
      api
        .$http(api.serverSupply + api.portBuyer + "/open/api/chance/buyCnd")
        .then(res => {
          this.levels = res.data.levels; //等级
          this.medals = res.data.storeMedals; //勋章
          this.types = res.data.storeTypes; //类型
          this.areas = res.data.areas; //地区
          this.companySizes = res.data.sysDictList; //规模
          //console.log(res.data, "filter");
        })
        .then(() => {
          $("#filters>li>.left>a").click(function() {
            $(this).css({ color: "#fff", backgroundColor: "#17A6B5" });
            $(this)
              .siblings()
              .css({ color: "#666", backgroundColor: "#fff" });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    blur() {
      this.purchaserinfo = ""; /**清空数据**/
      /**输入排序**/
      let params = {
        ...this.query,
        ...this.sortlist,
        minCapital: this.state1,
        maxCapital: this.state2,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    businessInputText() {
      return this.$store.state.businessText;
    },
    businessKeyword() {
      return this.$store.state.businessKeyword;
    },
    TopProcurementSearch() {
      return this.$store.state.TopProcurementSearch;
    }
  },
  methods: {
    /*筛选*/
    filter(key, value, index, d) {
      /*清空排序*/
      this.sortlist.sort = "0"; /*更新时间*/
      this.sortlist.scaleCode = ""; /*公司规模*/
      this.state1 = "";
      this.state2 = "";
      this.query[key] = value;

      /*筛选条件*/
      let params = {
        ...this.query,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    blur() {
      this.purchaserinfo = ""; /**清空数据**/
      /**输入排序**/
      let params = {
        ...this.query,
        ...this.sortlist,
        minCapital: this.state1,
        maxCapital: this.state2,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      //   console.log(params, "params");
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // querySearch(queryString, cb) {
    //   /*输入项*/
    //   var restaurants = this.restaurants;
    //   var results = queryString
    //     ? restaurants.filter(this.createFilter(queryString))
    //     : restaurants;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    //   /*输入排序*/
    //   let params = {
    //     ...this.query,
    //     ...this.sortlist,
    //     minCapital: this.state1,
    //     maxCapital: this.state2,
    //     pageNumber: this.currentPage,
    //     appid: this.appid,
    //     token: this.token,
    //     pageSize: this.pageSize
    //   };
    //   this.blur();
    //   api
    //     .$http(
    //       api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
    //       params
    //     )
    //     .then(res => {
    //       this.purchaserinfo = res.data;
    //       this.purchasers = res.data.chanceList;
    //       this.pageCount = res.data.pageCount;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "500" }, { value: "1000" }];
    },
    handleSelect() {
      /**点选**/
    },
    /**公司规模**/
    companySize(e) {
      this.sortlist.scaleCode = e;
      let params = {
        ...this.query,
        ...this.sortlist,
        appid: this.appid,
        token: this.token,
        minCapital: this.state1,
        maxCapital: this.state2,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        keyWord: this.inputvalue
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**更新时间**/
    upDateData(e) {
      this.sortlist.sort = e;
      let params = {
        ...this.query,
        ...this.sortlist,
        minCapital: this.state1,
        maxCapital: this.state2,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**分页**/
    handleSizeChange(val) {
      /*每页显示条数*/
      this.pageSize = val; /*修改显示每页条数*/
      let id = this.$route.query.id;
      let params = {
        ...this.query,
        ...this.sortlist,
        minCapital: this.state1,
        maxCapital: this.state2,
        // pageNumber: this.currentPage,
        // pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue,
        pageNumber: 1,
        pageSize: val
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val; /*修改当前页数*/
      let params = {
        ...this.query,
        ...this.sortlist,
        minCapital: this.state1,
        maxCapital: this.state2,
        // pageNumber: this.currentPage,
        // pageSize: this.pageSize,
        appid: this.appid,
        token: this.token,
        keyWord: this.inputvalue,
        pageNumber: val,
        pageSize: this.pageSize
      };
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
          params
        )
        .then(res => {
          this.purchaserinfo = res.data;
          this.purchasers = res.data.chanceList;
          this.pageCount = res.data.pageCount;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.imgUrl = api.imgUrl;
    this.appid = getCookie("userId");
    this.token = getCookie("userToken");
    this.restaurants = this.loadAll(); /*排序注册资金*/
    let id = this.$route.query.id;
    let params = {
      pageNumber: 1,
      pageSize: 5,
      appid: this.appid,
      token: this.token,
      keyWord: this.inputvalue
    };
    /**排行**/
    api
      .$http(
        api.serverSupply + api.portBuyer + "/open/api/chance/chanceHot",
        params
      )
      .then(res => {
        this.ranks = res.data;
        this.monthHots = res.data.monthHots;
        this.chancehots = res.data.hots;
        this.storeHots = res.data.storeHots;
      })
      .catch(err => {
        console.log(err);
      });

    /**列表**/
    api
      .$http(
        api.serverSupply + api.portBuyer + "/open/api/chance/buyListInfo",
        params
      )
      .then(res => {
        this.purchaserinfo = res.data;
        this.purchasers = res.data.chanceList;
        this.pageCount = res.data.pageCount;
      })
      .catch(err => {
        console.log(err);
      });
    /**筛选**/
    api
      .$http(api.serverSupply + api.portBuyer + "/open/api/chance/buyCnd")
      .then(res => {
        this.levels = res.data.levels; //等级
        this.medals = res.data.storeMedals; //勋章
        this.types = res.data.storeTypes; //类型
        this.areas = res.data.areas; //地区
        this.companySizes = res.data.sysDictList; //规模
        //console.log(res.data, "filter");
      })
      .then(() => {
        $("#filters>li>.left>a").click(function() {
          $(this).css({ color: "#fff", backgroundColor: "#17A6B5" });
          $(this)
            .siblings()
            .css({ color: "#666", backgroundColor: "#fff" });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeRouteEnter(to, from, next) {
    $("#top-nav .top-input").css("display", "none");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(1)
      .children()
      .css("color", "#0d545c");
    next();
  } /*筛选*/
};
</script>

