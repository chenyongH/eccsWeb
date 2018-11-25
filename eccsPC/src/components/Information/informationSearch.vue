/* eslint-disable */
<template>
    <div class="Informationdetails">
        <div class="Informationdetails_banner">
             <el-carousel height="286px" class="container" arrow="hover">
                <el-carousel-item v-for="(banner,idx) in banners" :key="idx">
                  <div v-if="banner.cmsBanner.type===1">
                      <div class="banner_imgBox" :style="{ float: 'left !important',  width: '270px !important', margin: '42px 0px 45px 50px !important'}">
                          <img :style="{ display:'inline-block !important',position: 'relative !important',height: '200px !important', width: '270px !important',cursor: 'pointer !important'}"  v-bind:src='imgUrl+banner.cmsBanner.picurl' alt="" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">
                      </div>
                      <div class="banner_ifo" :style="{ float:'left !important','text-align': 'left !important',color: '#ffffff !important', margin: '70px 0px 0px 30px !important','word-wrap': 'break-word !important','word-break': 'normal !important',width: '738px !important'}">
                          <p class="banner_tittle" :style="{'font-size': '32px !important',cursor: 'pointer !important'}" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">{{ banner.cmsBanner.title }}</p>
                          <p class="banner_text" :style="{'font-size': '14px !important','margin-top':'20px !important','line-height': '20px !important'}">{{ banner.cmsBanner.info}}</p>
                      </div>
                  </div>                  
                  <div v-else-if="banner.cmsBanner.type===2">
                      <div class="banner_imgBox" :style="{width:'100% !important',height:'100% !important'}">
                          <img :style="{width:'100% !important',height:'100% !important'}"  v-bind:src="imgUrl+banner.cmsBanner.picurl" alt="" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">
                      </div>
                   </div>
                  <div  v-else>                
                    <div class="banner_ifo" :style="{ float:'left !important','text-align': 'left !important',color: '#ffffff !important', margin: '70px 0px 0px 30px !important','word-wrap': 'break-word !important','word-break': 'normal !important',width: '100% !important','padding-right':'80px !important'}">
                        <p class="banner_tittle" :style="{'font-size': '32px !important',cursor: 'pointer !important'}" @click="openNews(banner.cmsArticle.id,banner.cmsBanner.url,banner.cmsArticle.channelId,accountId,token)">{{ banner.cmsBanner.title }}</p>
                        <p class="banner_text" :style="{'font-size': '14px !important','margin-top':'20px !important','line-height': '20px !important'}">{{ banner.cmsBanner.info}}</p>
                    </div>
                  </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="details_content">
            <div class="content_left">
                <div class="details_news">
                    <div class="details_news_tittle">
                        <span class="details_news_block" >{{channelname}}</span>
                       
                          <img src="../../assets/images/internal.png" alt="">
                        
                    </div>           
                    <el-row >
                        <el-col  v-for="(detail,idx) in details" :key="idx"  backgroundcolor="#f8f8f9" >
                            <el-card  class="details_news_content">
                                <div class="details_news_img" v-if="detail.article.picurl"><img v-bind:src="imgUrl+detail.article.picurl"></div>
                                <div  class="details_news_right">
                                    <router-link :to="{path:'/intl',query:{articleId:detail.article.id,channelId:detail.article.channelId}}">
                                        <span class="details_right_tittle">{{detail.article.title}}</span>
                                    </router-link>
                                    <span class="details_right_info">{{detail.date}} | {{detail.countryName}}</span>
                                    <span class="details_right_text" v-if="detail.article.info">{{detail.article.info}}</span>
                                    <div class="bottom clearfix">
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                     <div class="detail_Pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                             :page-sizes="[5, 10, 15, 20]"
                            :page-size="pageSize"
                            layout=" sizes, prev, pager, next, jumper"
                            :page-count="pageCount"
                            :pager-count="pagerCount"                          
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <Rankings></Rankings>    
            </div>
        </div>
    </div>
</template>
<script>
import InformationNav from "./InformationNav";
import Rankings from "./rankings.vue";
import api from "../../api.js";
export default {
  name: "Informationdetails",
  methods: {
    openNews(a, b, c, d, e) {
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
          },
          searchText:'',
        });
      }
    },

    /**分页**/
    handleSizeChange(val) {
      this.pageSize = val; //修改显示每页条数
      let id = this.$route.query.id;
      let flag = this.$route.query.flag;
      let tagid = this.$route.query.tagid;
      let keyWord = this.inputSearch;
      let allpa = {
        pageNumber: this.currentPage,
        pageSize: val,
        keyWord:keyWord
      };
   
     
        api
          .$http(api.servers + "/open/api/cms/allNews", allpa)
          .then(res => {
            this.details = res.data.mapList;
            this.pageCount = res.data.totalPage;
            this.channelname = res.data.channelName;
          })
          .catch(err => {
            alert(err);
          });
  
    },
    handleCurrentChange(val) {
      /*当前页*/
      this.currentPage = val; //修改当前页数
      let id = this.$route.query.id;
      let flag = this.$route.query.flag;
      let tagid = this.$route.query.tagid;
      let keyWord = this.inputSearch;
    
      let allpa = {
        pageNumber: val,
        pageSize: this.pageSize,
        keyWord:keyWord
      };
   
       
        api
          .$http(api.servers + "/open/api/cms/allNews", allpa)
          .then(res => {
            this.details = res.data.mapList;
            this.pageCount = res.data.totalPage;
            this.channelname = res.data.channelName;
          })
          .catch(err => {
            alert(err);
          });
      
    },
    getData() {
      // const server = "http://116.196.89.209:9001/";
      let id = this.$route.query.id;
      let flag = this.$route.query.flag;
      let tagid = this.$route.query.tagid;
      let allpa = {
        pageNumber: 1,
        pageSize: 5
      };
      {
        api
          .$http(api.servers + "/open/api/cms/allNews", allpa)
          .then(res => {
            this.details = res.data.mapList;
            this.pageCount = res.data.totalPage;
            this.channelname = res.data.channelName;
          })
          .catch(err => {
            alert(err);
          });
      } 
      api
        .$http(api.servers + "/open/api/cms/banner") //banner图
        .then(res => {
          this.banners = res.data;
          // console.log(res)
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  data() {
    return {
      banners: [],
      channelname: "",
      currentPage: 1 /*当前页数*/,
      pageSize: 5 /*每页显示条数*/,
      pageCount: 1 /*总页数*/,
      pagerCount: 5 /*页码按钮的数量，当总页数超过该值时会折叠*/,
      details: [],
      id: 0,
      tagid: 0,
      imgUrl:""
    };
  },
  components: {
    InformationNav,
    Rankings
  },
  computed:{
    inputSearch(){
      return this.$store.state.informationTextSearch;
    },
    flicker(){
      return this.$store.state.flicker
    }
  },
  watch: {
    $route(to, from) {
      /*console.log("updated");*/
      // this.reload();
      //此处先清空数据再调用接口达到闪的效果
      this.banners = [];
      this.details = [];
      this.pageCount = 1;
      this.channelname = "";
      this.getData();
    },
    // 监听动作搜索闪烁
    flicker(){
      // 顶部搜索内容改变
      let id = this.$route.query.id;
      let flag = this.$route.query.flag;
      let tagid = this.$route.query.tagid;
      let keyWord = this.inputSearch;
      let allpa = {
        pageNumber: 1,
        pageSize: 5,
        keyWord:keyWord
      };
      //此处先清空数据再调用接口达到闪的效果
      this.banners = [];
      this.details = [];
      this.pageCount = 1;
      this.channelname = "";
      // 数据调用
        api
          .$http(api.servers + "/open/api/cms/allNews", allpa)
          .then(res => {
            this.details = res.data.mapList;
            this.pageCount = res.data.totalPage;
            this.channelname = res.data.channelName;
          })
          .catch(err => {
            alert(err);
          });

      api
        .$http(api.servers + "/open/api/cms/banner") //banner图
        .then(res => {
          this.banners = res.data;
          // console.log(res)
        })
        .catch(err => {
          alert(err);
        });
    
    },
    inputSearch(){
      // 顶部搜索内容改变
      let id = this.$route.query.id;
      let flag = this.$route.query.flag;
      let tagid = this.$route.query.tagid;
      let keyWord = this.inputSearch;
      let allpa = {
        pageNumber: 1,
        pageSize: 5,
        keyWord:keyWord
      };
      //此处先清空数据再调用接口达到闪的效果
      this.banners = [];
      this.details = [];
      this.pageCount = 1;
      this.channelname = "";
      // 数据调用
        api
          .$http(api.servers + "/open/api/cms/allNews", allpa)
          .then(res => {
            this.details = res.data.mapList;
            this.pageCount = res.data.totalPage;
            this.channelname = res.data.channelName;
          })
          .catch(err => {
            alert(err);
          });

      api
        .$http(api.servers + "/open/api/cms/banner") //banner图
        .then(res => {
          this.banners = res.data;
          // console.log(res)
        })
        .catch(err => {
          alert(err);
        });
    }
  },

  mounted() {
    // 获取顶部搜索的内容
    // const server = "http://116.196.89.209:9001/";
    let id = this.$route.query.id;
    let flag = this.$route.query.flag;
    let tagid = this.$route.query.tagid;
    let keyWord = this.inputSearch;
    this.imgUrl=api.imgUrl;
    let allpa = {
      pageNumber: 1,
      pageSize: 5,
      keyWord:keyWord
    };
      api
        .$http(api.servers + "/open/api/cms/allNews", allpa)
        .then(res => {
          this.details = res.data.mapList;
          this.pageCount = res.data.totalPage;
          this.channelname = res.data.channelName;
        })
        .catch(err => {
          alert(err);
        });

    api
      .$http(api.servers + "/open/api/cms/banner") //banner图
      .then(res => {
        this.banners = res.data;
        // console.log(res)
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>

<style>
/**banner start**/
.Informationdetails {
  width: 1300px;
  margin: 0 auto;
}
.Informationdetails_banner {
  width: 1300px;
  height: 286px;
  margin: 0 auto;
}
.container .el-carousel__item:nth-child(2n) {
  background-color: #17a6b5 !important;
}

.container .el-carousel__item:nth-child(2n + 1) {
  background-color: #17a6b5 !important;
}
.details_banner_ifo {
  float: left;
  text-align: left;
  color: #ffffff;
  margin: 80px 0px 0px 30px;
  word-wrap: break-word;
  word-break: normal;
  width: 738px;
  font-family: "Microsoft YaHei";
}
.details_banner_tittle {
  font-size: 32px;
  cursor: pointer;
}
.details_banner_msg {
  font-size: 16px;
  margin-top: 18px;
}
.details_banner_text {
  font-size: 14px;
  margin-top: 20px;
  line-height: 20px;
}
.details_banner_imgBox {
  float: left;

  margin: 42px 0px 45px 50px !important;
}
.details_banner_imgBox img {
  display: inline-block !important;
  position: relative !important;
  height: 200px !important;
  width: 270px !important;
}
.container .el-carousel__button {
  background-color: #ffffff !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
/**banner end**/

/**details_news  start**/
.details_content {
  width: 1300px;
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #ffffff;
}
.content_left {
  width: 900px;
}
.content_right {
  width:200px;
  padding-top: 40px;
}

.details_news_content {
  height: 120px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
}
.details_news_content .el-card__body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 12px 0;
}
.details_news_tittle {
  border-bottom: 8px solid #eaeaed;
  padding: 12px 0 0 0;
}
.el-card.is-always-shadow {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  border-radius: 0;
  border-top: none;
  border-bottom: 2px solid #eaeaed;
  border-left: none;
  border-right: none;
}
.details_news_right {
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 10px;
}
.details_right_tittle {
  font-size: 18px;
  color: #17a6b5;
  font-weight: bold;
}
.details_right_info {
  font-size: 12px;
  line-height: 24px;
  position: absolute;
  right: 10px;
  color: #666666;
}
.details_right_text {
  font-size: 12px;
  color: #17a6b5;
}
.details_news_block {
  font-size: 20px;
  color: #333333;
  font-weight: bolder;
  font-family: "Microsoft YaHei";
  text-align: left;
  display: inline-block;
  margin-bottom: 10px;
}
.details_news_tittle > img {
  margin: 0 0 -5px 10px;
}
.details_news_img {
  /* max-width: 150px;
  max-height: 88px;
  height: 100%; */
  margin-right: 14px;
}
.details_news_img img {
  width: 130px;
  height:90px;
}
.details_news_more {
  text-align: right;
  color: #17a6b5;
  font-size: 14px;
  font-weight: bold;
  padding: 13px 18px;
}
.details_news_more > img {
  margin-right: 10px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}

.detail_Pagination {
  padding: 36px 0;
}
/**hot_news  end**/
</style>


