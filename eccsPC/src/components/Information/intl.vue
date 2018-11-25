<template>
	<div id="intl">
    <!-- <div class="modal">点赞成功</div> -->
    <el-button :plain="true" class='modalBox'></el-button>
		<div class="intltitle">
			<h3>{{articlenews.channelName}}</h3>
			<img src="../../assets/message/intl.png" alt="">
		</div>
		<div class="content">
			<div class="left">
				<div class="text">
					<h3 class="text_tittle">{{title}}</h3>
          <div class="left_content">
            <span class="text_tag">{{articlenews.date}} | {{articlenews.week}} | {{articlenews.countryName}}</span>
            <p class="text_info" v-html='content'></p>
            <p class="newssource"><strong>新闻来源：</strong>{{articlenews.article.originName}}</p>
            <p class="Disclaimer"><strong>免责声明:</strong>凡注明来源本网的所有作品，均为本网合法拥有版权或有权使用的作品，欢迎转载，注明出处。非本网作品均来自互联网，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。</p>
            <div class="like">
              <i class="iconfont" :class='state.state1' @click ='collection($event)'></i>
              <i class="iconfont" :class='state.state2' @click ='praise($event)'></i>
            </div>   
            <div class="set">
              <button class="set1 setButton" @click='plus()'>A<sup>+</sup></button>
              <button class="set2 setButton" @click='normal()'>A</button>
              <button class="set3 setButton" @click='reduce()'>A<sup>-</sup></button>
              <!-- <button class="look">查看原文</button> -->
            </div>
            <div class="information">
              <div class="classify">分类：<span>{{articlenews.tagName}}</span></div>
              <div class="country">国家： <span>{{articlenews.countryName}}</span></div>
            </div>
          </div>
				</div>
				<!-- <div class="comment">
					<span class="comment_title">添加评论</span>
					<textarea></textarea>
				</div> -->
			</div>
			<div class="right">
				<div class="right-padding" v-if='relates.length'>				
						<div class="right_title">
							{{relatetitle}}
						</div>
						<div class="right-content" v-for='(relate,idx) in relates' :key="idx">
							 <router-link :to="{path:'/intl',query:{articleId:relate.article.id,channelId:relate.article.channelId}}">
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
import InformationNav from "./InformationNav";
import { getCookie } from "../../assets/js/cookie.js";
import { setCookie } from "../../assets/js/cookie.js";
import api from "../../api.js";
import $ from "jquery";
export default {
  name: "intl",
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
      num: 18,
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
    // 收藏触发事件
    collection(event) {
      //判断是否是登录状态
      if (getCookie("userId") != "") {
        // 判断是否是点赞状态
        if (this.state.state1 == "icon-star1") {
          let params = {};
          let userId = getCookie("userId");
          params.accountId = userId;
          params.token = getCookie("userToken");
          params.type = 1;
          params.typeId = this.typeId;
          api
            .$http(api.addCollection, params)
            .then(res => {
              this.state.state1 = "icon-star";
              this.$message({
                message: "收藏成功",
                type: "success"
              });
            })
            .catch(err => {
              alert("收藏请求出错");
            });
        } else {
        }
      } else {
        this.$message("请先登录");
      }
    },
    // 点赞触发事件
    praise(event) {
      // 判断是否登录
      if (getCookie("userId") != "") {
        // 判断是否已经点赞
        if (this.state.state2 == "icon-aixin") {
          let params = {};
          let articleid = this.$route.query.articleId;
          params.articleId = articleid;
          params.accountId = getCookie("userId");
          console.log(params);
          if (this.praiseNum == 0) {
            api
              .$http(api.addLike, params)
              .then(res => {
                this.state.state2 = "icon-aixin1";
                this.$message({
                  message: "点赞成功",
                  type: "success"
                });
                this.praiseNum = 1;
              })
              .catch(err => {
                alert("点赞请求出错");
              });
          }
        } else {
        }
      } else {
        this.$message("请先登录");
      }
    },
    plus() {
      if (this.num < 30) {
        this.num++;
        $(".text_info *").css("font-size", this.num + "px");
        $(".text_info").css("font-size", this.num + "px");
      }
    },
    normal() {
      this.num = 18;
      $(".text_info").css("font-size", this.num + "px");
      $(".text_info *").css("font-size", this.num + "px");
    },
    reduce() {
      if (this.num < 30 && this.num > 10) {
        this.num--;

        $(".text_info *").css("font-size", this.num + "px");
        $(".text_info").css("font-size", this.num + "px");
      }
    },

    getData() {
      let checkLikeParams = {};
      let checCollectionParams = {};
      checkLikeParams.accountId = getCookie("userId");
      checkLikeParams.articleId = this.$route.query.articleId;
      // 收藏参数
      checCollectionParams.typeId = this.$route.query.articleId;
      checCollectionParams.type = 1;
      checCollectionParams.accountId = getCookie("userId");
      // 获取收藏状态
      api
        .$http(api.checCollection, checCollectionParams)
        .then(res => {
          if (res.code == 0) {
            this.state.state1 = "icon-star";
          } else {
            this.state.state1 = "icon-star1";
          }
        })
        .catch(err => {
          console.log("收藏查询出错");
        });
      // 获取数据的时候查询是否点赞
      api
        .$http(api.checkLike, checkLikeParams)
        .then(res => {
          if (res.code == 0) {
            this.state.state2 = "icon-aixin1";
          } else {
            this.state.state2 = "icon-aixin";
          }
        })
        .catch(err => {
          console.log("点赞查询出错");
        });
      // ********************************
      this.articleId = this.$route.query.articleId;
      this.channelId = this.$route.query.channelId;
      // let accountId = this.$route.query.accountId;
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      // let token = this.$route.query.token;
      let pa = {
        articleId: this.articleId
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
    this.imgUrl = api.imgUrl;
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

#intl .modal {
  height: 50px;
  background-color: #ccc;
  width: 100px;
  position: fixed;
  z-index: 10;
  top: 50%;
  margin-top: -25px;
  left: 50%;
  margin-left: -50px;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  display: none;
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
  margin-left: 0px;
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
  height: 12px;
  font-size: 12px;
  color: #b39494;
}

#intl .content .left .text .textswiper_info {
  margin-top: 30px;
  font-size: 14px;
  text-indent: 2em;
}
.Disclaimer {
  color: #a49f9f;
  font-size: 12px;
  line-height: 20px;
  margin-top: 10px;
}
#intl .content .left .like {
  height: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #b39494;
  padding-bottom: 30px;
}
#intl .content .left .like .iconfont {
  width: 20px;
  height: 20px;
  display: inline-block;

  margin-right: 13px;
  font-size: 20px;
  color: #17a6b5;
  font-weight: bold;
}
#intl .content .left .set {
  height: 25px;
  margin-top: 14px;
  padding-bottom: 39px;
  border-bottom: 1px solid #b39494;
}
#intl .content .left .set .look {
  border: none;
  border-radius: 2px;
  width: 70px;
  float: right;
  color: #fff;
  background-color: #17a6b5;
}
#intl .content .left button {
  cursor: pointer;
}
#intl .content .left .setButton {
  height: 22px;
  width: 22px;
  border: 1px solid #17a6b5;
  background-color: #fff;
  color: #17a6b5;
  line-height: 22px;
  text-align: center;
  margin-right: 20px;
  overflow: hidden;
}
#intl .content .left .information {
  border-bottom: 1px solid #b39494;
}
#intl .content .left .information .classify,
#intl .content .left .information .country {
  font-size: 12px;
  color: #999999;

  margin-top: 15px;
}
#intl .content .left .information .country {
  padding-bottom: 15px;
}
#intl .content .left .information span,
#intl .content .left .information span {
  color: #17a6b5;
  display: inline-block;
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
.newssource {
  margin: 10px 0;
}
/**资讯登陆**/
.left_content {
  position: relative;
}
.login {
  background-color: #f9f9fb;
  padding: 26px 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  top: 0px;
  z-index: 2;
  /* height: 100%; */
  width: 640px;
}
.login > .top > h3 {
  font-size: 24px !important;
  color: #17a6b5 !important;
  margin: 0 !important;
  text-align: left !important;
}
.login > .top > span {
  font-size: 16px;
  margin: 14px 0 !important;
  height: inherit !important;
  text-align: left !important;
  color: #727272 !important;
  display: inline-block !important;
}
.left-bottom {
  width: 50% !important;
  display: flex !important;
  flex-direction: column !important;
  padding-right: 22px !important;
  padding-top: 26px !important;
  border-top: 1px solid #e1e1e3 !important;
  border-right: 1px solid #e1e1e3 !important;
}

.right-bottom {
  width: 50% !important;
  display: flex !important;
  flex-direction: column !important;
  padding-left: 30px !important;
  padding-top: 26px !important;
  justify-content: space-around !important;
  border-top: 1px solid #e1e1e3 !important;
}
.right-bottom .right-bottom-register {
  font-size: 16px !important;
  color: #17a6b5 !important;
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
.left-bottom-top .point {
  display: inline-block !important;
  height: 100% !important;
  padding: 0 5px !important;
  margin: 0 !important;
}
.left-bottom-top .innertext {
  color: #adadaf !important;
  font-size: 14px !important;
}
.left-bottom-bottom {
  display: flex !important;
  flex-direction: row !important;
  margin-top: 30px !important;
}
.left-bottom-bottom .point {
  padding: 0 5px !important;
  margin: 0 !important;
}
.left-bottom-bottom .innertext {
  color: #adadaf !important;
  font-size: 14px !important;
}
.login .text-bottom {
  width: 100% !important;
  display: flex !important;
  flex-direction: row !important;
}
.login .left-bottom .register {
  margin-top: 5px !important;
  margin-left: 15px !important;
  color: #17a6b5 !important;
  cursor: pointer !important;
  display: block !important;
  font-size: 14px !important;
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
