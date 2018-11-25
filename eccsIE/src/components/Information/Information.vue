 /* eslint-disable */ 
<template>
    <div class="center">
        <!-- <InformationNav></InformationNav> -->
        <div class="Information_banner">
            <el-carousel height="286px" class="container" arrow="hover">
                <el-carousel-item v-for="(banner,index) in banners" :key="index" >
                   <div v-if="banner.cmsBanner.type===1">
                        <div class="banner_imgBox" :style="{ float: 'left !important',	width: '270px !important', margin: '42px 0px 45px 50px !important'}">
                            <img :style="{ display:'inline-block !important',position: 'relative !important',height: '200px !important', width: '270px !important',cursor: 'pointer !important'}"  v-bind:src='imgUrl+banner.cmsBanner.picurl' alt="" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">
                        </div>
                        <div class="banner_ifo" :style="{ float:'left !important','text-align': 'left !important',color: '#ffffff !important', margin: '70px 0px 0px 30px !important','word-wrap': 'break-word !important','word-break': 'normal !important',width: '738px !important'}">
                            <p class="banner_tittle" :style="{'font-size': '32px !important',cursor: 'pointer !important'}" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">{{ banner.cmsBanner.title }}</p>
                            <p class="banner_text" :style="{'font-size': '14px !important','margin-top':'20px !important','line-height': '20px !important'}">{{ banner.cmsBanner.info}}</p>
                        </div>
                   </div>                  
                    <div v-else-if="banner.cmsBanner.type===2">
                        <div class="banner_imgBox" :style="{width:'100% !important',height:'286px !important'}">
                            <img :style="{width:'100% !important',height:'100% !important'}"  v-bind:src="imgUrl+banner.cmsBanner.picurl" alt=""  @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">
                        </div>
                   </div>
                    <div  v-else>                
                        <div class="banner_ifo" :style="{ float:'left !important','text-align': 'left !important',color: '#fff !important', margin: '70px 0px 0px 110px !important','word-wrap': 'break-word !important','word-break': 'normal !important',width: '1000px !important','padding-right':'80px !important'}">
                            <p class="banner_tittle" :style="{'font-size': '32px !important',cursor: 'pointer !important'}" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">{{ banner.cmsBanner.title }}</p>
                            <p class="banner_text" :style="{'font-size': '14px !important','margin-top':'20px !important','line-height': '20px !important'}">{{ banner.cmsBanner.info}}</p>
                        </div>
                   </div>
                   
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="contain">
            <div class="contain_left">
                <div class="hot_news">
                    <div class="hot_news_tittle">
                        <span class="hot_news_block" >热门新闻 TOP 10</span>
                        <img src="../../assets/images/hot.png" alt="">
                    </div>           
                    <el-row >
                        <el-col  v-for="(hotnew,index) in hotnews" :key="index" backgroundcolor="#f8f8f9" >
                            <el-card  class="hot_news_content">
                                <div v-if="hotnew.article.picurl" class="hot_news_img">
                                    <router-link :to="{path:'/intl',query:{articleId:hotnew.article.id,channelId:hotnew.article.channelId,accountId:accountId,token:token}}">
                                        <img v-bind:src="imgUrl+hotnew.article.picurl" class="image">
                                    </router-link>
                                </div>
                                <div  class="hot_news_right">
                                   <router-link :to="{path:'/intl',query:{articleId:hotnew.article.id,channelId:hotnew.article.channelId,accountId:accountId,token:token}}">
                                        <span class="news_tittle">{{hotnew.article.title}}</span>
                                    </router-link>
                                    <span class="news_info">{{hotnew.date}} | {{hotnew.countryName}}</span>
                                    <span class="news_text">{{hotnew.article.info}}</span>
                                   
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <div class="hot_news_more">
                        <!-- <router-link to="/Information/Informationdetails">
                            <img src="../../assets/images/more.png" alt=""><span @click="hotToDetails(activeHId,hotsign)">显示所有新闻</span>
                        </router-link> -->
                    </div>
                </div>
                <div class="internal_info">
                    <div class="internal_info_logo">
                        <span>国际信息</span>
                        <img src="../../assets/images/internal.png" alt="">    
                    </div> 
                    <el-tabs v-if="internationals.length" type="border-card"  v-model="activeIId"> 
                        <el-tab-pane  :label="international.channel.name"  :name="international.mList[0].article.channelId"  v-for="(international,index) in internationals" :key="index">
                            <el-row >
                                <el-col  v-for="(item,idx) in international.mList" :key="idx" >
                                    <el-card class="internal_info_content">
                                        <div  class="internal_info_right">
                                             <router-link :to="{path:'/intl',query:{articleId:item.article.id,channelId:item.article.channelId,accountId:accountId,token:token}}">
                                                 <span class="internal_info_tittle">{{item.article.title}}</span>  
                                             </router-link>
                                            <span class="internal_info_info">{{item.date}} | {{item.countryName}}</span>                      
                                            <span class="internal_info_text">{{item.article.info}}</span>
                                            <div class="bottom clearfix">
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                    <div class="internal_info_more" >
                          <!-- <router-link to="/Information/Informationdetails"> -->
                            <img src="../../assets/images/more.png" alt=""><span @click="interToDetails(activeIId,intersign)">更多资讯</span>
                        <!-- </router-link>              -->
                    </div>
                </div>
                <div class="china_info">
                     <div class="china_info_logo">
                        <span>中国信息</span>
                        <img src="../../assets/images/china_info.png" alt="">    
                    </div> 
                    <el-tabs  v-if="chinas.length" type="border-card" v-model="activeCId">  
                        <el-tab-pane v-if="china.mList" :label="china.channel.name" :name="china.mList[0].article.channelId"  v-for="(china,index) in chinas" :key="index"  >
                            <el-row >
                                <el-col  v-for="(item,idx) in china.mList" :key="idx"  >
                                    <el-card  class="internal_info_content">
                                        <div  class="china_info_right">
                                            <router-link :to="{path:'/intl',query:{articleId:item.article.id,channelId:item.article.channelId,accountId:accountId,token:token}}">
                                                <span class="china_info_tittle">{{item.article.title}}</span>  
                                            </router-link>                 
                                            <span class="china_info_info">{{item.date}} | {{item.countryName}}</span>                     
                                            <span class="china_info_text">{{item.article.info}}</span>                        
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-tab-pane>    
                    </el-tabs>
                    <div class="china_info_more" >
                        <!-- <router-link to="/Information/Informationdetails"> -->
                             <img src="../../assets/images/more.png" alt=""><span @click="chinaToDetails(activeCId,chinasign)">更多资讯</span>
                        <!-- </router-link>          -->
                    </div>
                </div>
                <div class="report">
                    <div class="report_tittle">
                        <span class="report_block" >ECCS报告</span>
                        <img src="../../assets/images/report.png" alt="">
                    </div>   
                    <el-row >
                        <el-col  v-for="(report,index) in reports" :key="index" >
                            <el-card  class="report_content" v-for='(item,idx) in report.articleList' :key="idx">
                                <div  class="report_right" >
                                   <router-link :to="{path:'/ReportIntl',query:{articleId:item.id,channelId:item.channelId,accountId:accountId,token:token}}">
                                        <span class="report_letittle">{{item.title}}</span>           
                                    </router-link> 
                                    <span v-html="item.content" class="report_text"></span>
                                    <!-- <div class="bottom clearfix">
                                    </div> -->
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <div class="report_more" >
                        <!-- <router-link to="/Information/Informationdetails"> -->
                            <img src="../../assets/images/more.png" alt=""> <span @click="reToDetails(activeRId,reportsign)">更多报告</span>
                        <!-- </router-link> -->
                    </div>
                </div>
            </div>
            <div class="contain_right">
                <div class="zan">
                    <div class="zan_tittle">
                        <span class="zan_block" >为您推荐</span>
                        <img src="../../assets/images/zan.png" alt="">
                    </div>    
                    <el-row >
                        <el-col  v-for="(recommend,idx) in recommends" :key="idx" >
                        <el-card  class="zan_content">
                            <div  class="zan_right">
                                 <router-link :to="{path:'/intl',query:{articleId:recommend.article.id,channelId:recommend.article.channelId,accountId:accountId,token:token}}">
                                    <span class="zan_letittle">{{recommend.article.title}}</span>
                                </router-link> 
                                <span class="zan_info">{{recommend.date}} | {{recommend.countryName}}</span>
                                <span class="zan_text">{{recommend.article.info}}</span>
                                <div class="bottom clearfix">
                                </div>
                            </div>
                        </el-card>
                        </el-col>
                    </el-row>
                    <!-- <div class="zan_more">
                        <router-link to="/Information/Informationdetails">
                             <img src="../../assets/images/more.png" alt="">显示所有新闻
                        </router-link>   
                    </div>        -->
                </div>
                <div class="textswiper">
                    <el-carousel  arrow="hover">
                        <el-carousel-item v-for="(sysLink,idx) in sysLinks" :key="idx">
                            <div class="textswiper_img"><img v-bind:src="imgUrl+sysLink.picurl" alt="广告"></div>
                            <!-- <p class="textswiper_tittle">{{ textswipertittle }}</p>
                            <p class="textswiper_info">{{ textswiperinfo }}</p>
                            <p class="textswiper_text">{{ textswipertext }}</p> -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="calendar">
                    <div class="calendar_tittle">
                          <span class="calendar_block" >展会 </span>
                          <img src="../../assets/images/calendar.png" alt="">
                    </div>
                    <el-table :data="exhibitions" >
                        <el-table-column prop="date" width="120px;"  class="calendar_date"> 
                        </el-table-column>
                        <el-table-column prop="countryName" width="87px;"  class="calendar_place">
                        </el-table-column>
                        <el-table-column prop="exhibition.title"  class="calendar_text">
                        </el-table-column>
                    </el-table>
                    <div class="calendar_more" >
                        <!-- <router-link to="/Information/InformationCalendar"> -->
                            <img src="../../assets/images/more.png" alt=""><span @click="exhToDetails(activeEId)">更多展会</span>
                        <!-- </router-link> -->
                        
                    </div>
                </div>
                <div class="subject">
                    <div class="subject_tittle">
                        <span class="subject_block" >专题</span>
                        <img src="../../assets/images/subject.png" alt="">
                    </div>    
                    <el-row >
                        <el-col  v-for="(subject,idx) in subjects" :key="idx" >
                            <el-card  class="subject_content">
                                <div  class="subject_right">
                                   <router-link :to="{path:'/intl',query:{articleId:subject.article.id,channelId:subject.article.channelId,accountId:accountId,token:token}}">
                                        <span class="subject_letittle">{{subject.article.title}}</span>
                                    </router-link> 
                                    <span class="subject_info">{{subject.date}}</span>
                                    <span class="subject_text">{{subject.article.info}}</span>
                                    <div class="bottom clearfix">
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <div class="subject_more" >
                        <!-- <router-link to="/Information/Informationdetails"> -->
                            <img src="../../assets/images/more.png" alt=""><span @click="subToDetails(activeSId,subsign)">更多专题</span>
                        <!-- </router-link> -->
                    </div>
                </div>
            </div>
           
        </div>
         <swiper></swiper>
    </div> 
</template>
<script>
import InformationNav from "./InformationNav";
import "../../assets/css/Information.css";
import api from "../../api.js";
import { getCookie } from "../../assets/js/cookie.js";
// import $ from "jquery";
import swiper from "../../components/swiper";

export default {
  name: "Information",
  data() {
    return {
      banners: [],
      internationals: [],
      chinas: [],
      subjects: [],
      hotnews: [],
      reports: [],
      recommends: [],
      sysLinks: [],
      exhibitions: [],
      activeH: "",
      activeHId: "",
      hotsign: "",
      activeI: "",
      activeIId: "",
      intersign: "",
      activeC: "",
      activeCId: "",
      chinasign: "",
      activeR: "",
      activeRId: "",
      reportsign: "",
      activeS: "",
      activeSId: "",
      subsign: "",
      Id: "",
      Url: "",
      activeE: "",
      activeEId: "",
      accountId: "",
      token: "",
      imgUrl: ""
    };
  },
  components: {
    InformationNav,
    swiper
  },

  watch: {
    activeH() {
      //热门新闻
      /*console.log(v, "0");*/
      this.activeHId = this.hotnews[0].article.channelId;
      this.hotsign = this.hotnews[0].newsSign;
    },
    activeI() {
      //国际新闻
      /*console.log(v, "1");*/
      this.activeIId = this.internationals[0].mList[0].article.channelId;
      this.intersign = this.internationals[0].newsSign;

      // for(let i=0;i<this.internationals.length;i++){
      //     const {channel:{id},mList:[{article:{channelId}}]} = this.internationals[i]
      //   if(channelId === v){
      //       return  this.activeIId = id;
      //   }
      //   }
    },
    activeC() {
      //中国新闻
      /*console.log(v, "2");*/
      this.activeCId = this.chinas[0].mList[0].article.channelId;
      this.chinasign = this.chinas[0].newsSign;
      //   for(let i=0;i<this.chinas.length;i++){
      //     //   console.log(this.chinas[i].channel,"5555")

      //     }
    },
    activeR() {
      //报告
      /*console.log(v, "3");*/
      this.activeRId = this.reports[0].articleList[0].channelId;
      this.reportsign = this.reports[0].newsSign;
    },
    activeS() {
      //专题
      /*console.log(v, "4");*/
      this.activeSId = this.subjects[0].article.channelId;
      this.reportsign = this.subjects[0].newsSign;
    },
    activeE() {
      this.activeEId = this.exhibitions[0].exhibition.id;
    }
    //  tittlenews(Id, Url) {
    //    console.log(this.Id,"id");
    //    console.log(this.Url,"Url");
    // },
  },
  methods: {
    /*banner 点击事件*/
    openNews(a, b, c, d, e) {
      /*console.log(a,"id");
       console.log(b,"Url");*/
      if (a == "") {
        window.location.href = b;
      } else {
        this.$router.push({
          name: "intl",
          query: {
            articleId: a,
            channelId: c,
            accountId: d,
            token: e
          }
        });
      }
    },

    /*点击更多进入二级页 */

    hotToDetails(e, s) {
      //热门新闻
      /*console.log(e, "aaa");*/
      this.$router.push({
        name: "Informationdetails",
        query: {
          id: e,
          flag: s
        }
      });
    },
    interToDetails(e, s) {
      //国际信息
      /*console.log(e, "aaa");*/
      this.$router.push({
        name: "Informationdetails",
        query: {
          id: e,
          flag: s
        }
      });
    },
    chinaToDetails(e, s) {
      //中国信息
      /*console.log(e, "bbb");*/
      this.$router.push({
        name: "Informationdetails",
        query: {
          id: e,
          flag: s
        }
      });
    },
    reToDetails(e, s) {
      //报告
      /*console.log(e, "ccc");*/
      this.$router.push({
        name: "InformationReportDetail",
        query: {
          id: e,
          flag: s
        }
      });
    },
    subToDetails(e, s) {
      //专题
      /*console.log(e, "ddd");*/
      this.$router.push({
        name: "Informationdetails",
        query: {
          id: e,
          flag: s
        }
      });
    },
    exhToDetails(e) {
      //专题
      /*console.log(e, "ddd");*/
      this.$router.push({
        name: "InformationCalendar",
        query: {
          id: e
        }
      });
    }
  },
  mounted() {
    this.accountId = getCookie("userId");
    this.token = getCookie("userToken");
    this.imgUrl = api.imgUrl;
    /*console.log(api.servers, "serves");*/
    // const servers = "http://116.196.89.209:9001/";
    api
      .$http(api.servers + "/open/api/cms/banner") //banner图
      .then(res => {
        this.banners = res.data;
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/specialTopic") //专题
      .then(res => {
        this.subjects = res.data;
        this.activeS = this.subjects[0].article.channelId;
        this.subsign = this.subjects[0].newsSign;
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/hotNews") //热门新闻
      .then(res => {
        this.hotnews = res.data;
        this.activeH = this.hotnews[0].article.channelId;
        this.hotsign = this.hotnews[0].newsSign;
        /*console.log(res, "hotnews");*/
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/international") //国际资讯
      .then(res => {
        this.internationals = res.data;
        this.activeI = this.internationals[0].mList[0].article.channelId;
        this.intersign = this.internationals[0].newsSign;
        /*console.log(this.internationals, "internationals");*/
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/china") //中国资讯
      .then(res => {
        this.chinas = res.data;
        this.activeC = this.chinas[0].mList[0].article.channelId;
        this.chinasign = this.chinas[0].newsSign;
        // console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/infoReport") //资讯报告
      .then(res => {
        this.reports = res.data;
        this.activeR = this.reports[0].articleList[0].channelId;
        this.reportsign = this.reports[0].newsSign;
        // console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/recommended") //为您推荐
      .then(res => {
        this.recommends = res.data;
        //console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/sysLink") //广告
      .then(res => {
        this.sysLinks = res.data;
        //console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/exhibition") //展会
      .then(res => {
        this.exhibitions = res.data;
        // console.log(res)
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>



