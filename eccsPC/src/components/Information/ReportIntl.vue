<template>
	<div id="intl">
		<div class="intltitle">
			<h3>{{articlenews.channelName}}</h3>
			<img src="../../assets/message/intl.png" alt="">
		</div>
		<div class="content">
			<div class="left">
				<div class="text">
					<h3 class="text_tittle">{{title}}</h3>
          <span class="text_tag">{{articlenews.date}} | {{articlenews.week}} | {{articlenews.countryName}}</span>
            <!-- <p class="text_info" v-html='content'></p>       -->
           <div class="login" >
                <div class="top">
                  <img src="../../assets/images/footer-logo.png" alt="">
                  <h3>感谢您访问ECCS</h3>
                  <span>若需要阅读完整报告，请联系平台付费获取完整内容。</span>
                </div>       
            </div>
				</div>
			</div>
			<div class="right">
				<div class="right-padding" v-if='relates.length'>				
						<div class="right_title">
							{{relatetitle}}
						</div>
						<div class="right-content" v-for='(relate,idx) in relates' :key="idx">
							 <router-link :to="{path:'/ReportIntl',query:{articleId:relate.article.id,channelId:relate.article.channelId}}">
								<h3>{{relate.article.title}}</h3>
							</router-link>
							<span>{{relate.date}} | {{relate.week}} | {{relate.countryName}}</span>
						</div>				
				</div>	
				<div class="textswiper">
            <el-carousel  arrow="hover">
                <el-carousel-item v-for="(sysLink,idx) in sysLinks" :key="idx">         
                    <div class="textswiper_img"><img v-bind:src="imgUrl+sysLink.picurl" alt="广告"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>        
  </div>    
</div>
</template>
<script>

import api from "../../api.js";
import $ from "jquery";
export default {
  name: "ReportIntl",
  inject: ["reload"],
  data() {
    return {
      relatetitle: "相关信息",
      articlenews: {},
      title: "",
      content: "",
      relates: [],
      articleId: 0,
      channelId: 0,
      sysLinks: [],
      typeId: 0,
      praiseNum: 0,
      accountId: "",
      token: "",
      name: "",
      password: "",
      loginState: "",
      imgUrl: "",
      state: {
        state1: "icon-star1",
        state2: "icon-aixin"
      }
    };
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      this.relates = "";
      this.sysLinks = "";
      this.articlenews = "";
      this.getData();
      // this.reload();
    }
  },
  methods: {
    getData() {
      this.articleId = this.$route.query.articleId;
      this.channelId = this.$route.query.channelId;
      // let accountId = this.$route.query.accountId;
    
      // let token = this.$route.query.token;
      let pa = {
        articleId: this.articleId,
        accountId: this.accountId,
        token: this.token
      };
      let par = {
        channelId: this.channelId
      };
      api
        .$http(api.servers + "/open/api/cms/newsDetial", pa) //新闻详情
        .then(res => {
          this.articlenews = res.data;
          this.title = res.data.article.title;
          this.content = res.data.article.content;
          this.typeId = res.data.article.id;
          this.loginState = res.data.loginState;
          // this.$store.commit('loginStateChange',1)
        })
        .catch(err => {
          alert(err);
        });
      api
        .$http(api.servers + "/open/api/cms/relatedNews", par) //相关信息
        .then(res => {
          this.relates = res.data;
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
          alert(err, "8");
        });
    }
  },

  mounted() {
       this.imgUrl=api.imgUrl;
    this.getData();
  },

  beforeRouteLeave(to, from, next) {
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(0)
      .children()
      .css("color", "#fff");
    next();
  },

  beforeRouteEnter(to, from, next) {
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(0)
      .children()
      .css("color", "#0d545c");
    next();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}
#intl {
  width: 1300px;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 40px;
}
#intl .intltitle {
  width: 1200px;
  margin-left: 50px;
  height: 40px;
  line-height: 20px;
  border-bottom: 8px solid #ccc;
  position: relative;
}
#intl .intltitle h3 {
  font-weight: bold;
  font-size: 20px;
  /* font-weight: normal; */
  display: inline-block;
  position: absolute;
  bottom: 10px;
}
#intl .intltitle img {
  height: 20px;
  width: 20px;
  display: inline-block;
  position: absolute;
  left: 90px;
  bottom: 8px;
}
#intl .content {
  width: 118px;
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  margin-left: 50px;
  position: relative;
  padding: 0px;
}
/*左边内容*/
#intl .content .left {
  width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#intl .content .left .text {
  width: 640px;
  color: #17a6b5;
}

#intl .content .left .text .text_tittle {
  margin-top: 22px;
  font-size: 30px;
  font-weight: normal;

  line-height: 45px;
  height: 100%;
}

#intl .content .left .text .text_tag {
  margin-top: 14px;
  display: block;

  font-size: 12px;
  color: #b39494;
}

#intl .content .left .text .textswiper_info {
  margin-top: 30px;
  font-size: 14px;
  text-indent: 2em;
}

#intl .content .left .comment .comment_title {
  display: block;
  font-size: 14px;
  line-height: 14px;
  height: 14px;
  color: #17a6b5;
  margin-top: 15px;
  margin-bottom: 15px;
}
#intl .content .left .comment textarea {
  height: 60px;
  width: 640px;
  border: 1px solid #999999;
  border-radius: 3px;
  resize: none;
}
#intl .content .left .comment p {
  margin-top: 60px;
  padding-bottom: 30px;
  font-size: 10px;
  color: #999999;
}
.text_info {
  margin-top: 30px;
}
/*右边内容*/
#intl .content .right {
  width: 458px;
  margin-top: 20px;
}
#intl .content .right .right-padding {
  padding: 15px 20px;
  border: 1px solid #eeeeee;
}
#intl .content .right .right_title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  height: 20px;
  line-height: 20px;
  padding-bottom: 35px;
  border-bottom: 8px solid #eee;
}
#intl .content .right .right-content {
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}
#intl .content .right .right-content:nth-child(7) {
  border-bottom: none;
}
#intl .content .right .right-content h3 {
  font-size: 16px;

  line-height: 25px;
  height: 100%;
  font-weight: border;
  color: #17a6b5;
  margin-bottom: 10px;
}
#intl .content .right .right-content span {
  font-size: 14px;
  color: #999;
  display: block;
  height: 14px;
  line-height: 14px;
}
/**资讯登陆**/

.login {
  background-color: #f9f9fb;
  padding: 26px 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 40px;
  width: 640px;
}
.login > .top > h3 {
  font-size: 24px;
  color: #17a6b5;
  margin-top: 30px;
  text-align: left;
  padding-left: 10px;
}
.login > .top > span {
  font-size: 16px;
  padding-left: 10px;
  margin: 20px 0;
  height: inherit;
  text-align: left;
  color: #727272;
  display: inline-block;
}

.right-bottom .el-input {
  margin-top: 15px !important;
}
.right-bottom .el-input__inner {
  background-color: #e1e1e1 !important;
  border-radius: 10px !important;
}
.right-bottom .el-button {
  height: 20px !important;
  width: 60px !important;
  margin-top: 15px !important;
  border-radius: 10px !important;
}
.right-bottom .el-checkbox {
  margin-top: 15px !important;
}

/*轮播广告*/
#intl .content .right .textswiper {
  margin: 46px 0 20px 0;
}
#intl .content .right .calendar_date {
  color: #ffffff !important;
  background-color: #71bbc3 !important;
}
#intl .content .right .calendar_place {
  color: #71bbc3 !important;
}
#intl .content .right .textswiper_tittle {
  text-align: center;
  font-size: 56px;
  color: #f8b334;
  margin: 40px 0 18px 0;
}
#intl .content .right .textswiper_info {
  text-align: center;
  font-size: 28px;
  color: #17a6b5;
  margin: 18px 22px 10px 22px;
  font-weight: bold;
  word-wrap: break-word;
  line-height: 40px;
}
#intl .content .right .textswiper_text {
  text-align: center;
  font-size: 16px;
  color: #7d7d84;
  margin: 10px 22px 10px 22px;
  word-wrap: break-word;
}
#intl .content .right .textswiper .el-carousel__indicator {
  color: red !important;
  padding: 30px 4px !important;
}
#intl .content .right .textswiper .el-carousel__button {
  background-color: #71c7d0 !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
</style>
