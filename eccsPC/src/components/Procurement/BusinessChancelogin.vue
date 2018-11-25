<template>
	<div id="BusinessChancelogin">
		<div class="title">
			<h3>{{news.title}}</h3>
			<img src="../../assets/images/businesslogin.png" alt="">
		</div>
		<div class="content">
			<div class="left">
                <div class="businesschance">
                    <p class="businesschance_tittle">{{chances.chanceName}}</p>
                    <div class="left_content">
                    <div v-if="loginState" class="businesschance_info_left">
                        <span class="purchaser">采购商：{{chancesStore.storeName}}</span>
                        <span class="time">商机时间：{{chances.beginDate}}至{{chances.endDate}}</span>
                        <span class="area">采购区域：{{chances.buyArea}}</span>
                        <span class="state">国家：{{chances.country}}</span>
                        <span class="tendering">招标方式：{{chances.tendering}}</span>
                        <span class="customerType">客户类型：{{chances.customerType}}</span>
                        <span class="period">账期：{{chances.period}}</span>
                    </div>
                    <div  v-if="loginState" class="businesschance_info_right">
                        <span class="type">项目类型：{{chances. chanceTypeName}}</span>
                        <span class="goods">采购商品：{{chances .buyGoods}}</span>
                        <span class="scale">项目规模：{{chances .scale}}</span>
                        <span class="capital">资金来源：{{chances .capital}}</span>
                        <span class="stage">阶段：{{chances .stage}}</span>
                        <span class="currency">支付币种：{{chances.currency}}</span>
                        <span class="guarantee">资金担保：{{chances.guarantee}}</span>
                    </div>
                    <div  v-if="loginState" class="detail_tittle">
                        <h3>{{detail_tittle}}</h3>
                        <img src="../../assets/images/businesslogin.png" alt="">
                    </div>
                    <div class="text">
                        <!-- <h3 class="text_tittle">{{chances.chanceName}}</h3> -->
                        <span class="text_tag">{{chances.releaseTime}}</span> 
                        <p class="text_info" v-html='chances.chanceInfo'></p>
                        <div  v-if="loginState" class="remark">
                        <span  class="beizhu">备注：</span>
                        <span v-html='chances .remark' class="remarkeable"></span>
                        </div>
                        <div  v-if="loginState" class="setmore">
                        <div class="set">
                            <button class="set1 setButton" @click='plus()'>A<sup>+</sup></button>
                            <button class="set2 setButton" @click='normal()'>A</button>
                            <button class="set3 setButton" @click='reduce()'>A<sup>-</sup></button>	
                            </div>
                            <div class="like">
                            <i class="iconfont :class='state.state1'" :class='state.state1' @click ='collection($event)'></i>
                            </div>     
                        </div>			
                    </div>
                    <div class="login" v-if="!loginState">
                        <div class="top">
                            <img src="../../assets/images/footer-logo.png" alt="">
                            <h3>感谢您访问ECCS</h3>
                            <span>我们希望您喜欢您的免费商机。请在下方注册以访问本文的其余部分以及您需要的所有商机信息。</span>
                        </div>
                        <div class="text-bottom">
                            <div class="left-bottom">
                            <div class="left-bottom-top">
                                <span class="point">·</span>
                                <span class="innertext"> 免费注册并获取更多来自Eccs的文章。</span> 
                                <router-link to="/register">
                                    <span class="register">免费注册</span>
                                </router-link>                      
                            </div> 
                            <div class="left-bottom-bottom">
                                <span class="point">·</span>
                                <span class="innertext">
                                    订阅并无限制地访问Eccs的全面报道，并提供定制的新闻，评论，研究和警报选择。
                                </span>
                            </div>
                            </div>
                            <div class="right-bottom" v-if='storeState'>
                            <span class="right-bottom-register">已经注册？</span>
                            <el-input v-model="name" placeholder="请输入用户名" clearable sty></el-input>
                            <el-input v-model="password" type="password" placeholder="请输入密码" clearable></el-input>
                            <!-- <el-checkbox v-model="checked">记住密码</el-checkbox> -->
                            <el-button @click.native="Login" type="primary" plain>登录
                            </el-button>
                            </div>
                            <div class="right-bottom" v-if='!storeState'>
                            <div style="width: 100%;height: 100%;">
                                <span class="right-bottom-register" style="margin-top: 20px;display: block;width: 100%;text-align: center;">请注册企业账号</span>
                                <el-button style='width: 100px;display: block;margin: 20px auto;' @click.native="goPersonalCenter" type="primary" plain>企业入驻
                                </el-button>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>  
                </div> 
			</div>
			<div class="right">
                <div v-if="chances.enrollState==2">
                    <div class="advertisement">
                        <span class="advertisementdate">发布时间：{{chances.beginDate}}</span>
                        <span class="advertisementtimeleft">
                            不能参与自己的商机
                        </span>
                        <el-button type="primary"  class="join" disabled>{{buttontext}}</el-button>
                        <span class="alreadyoffer">
                            已有报价<span>{{chances.chanceNum}}</span>条
                        </span>
                    </div> 
                </div>
                <div v-else>
                    <div class="advertisement" v-if="chances.state===0">
                        <span class="advertisementdate">发布时间：{{chances.beginDate}}</span>
                        <span class="advertisementtimeleft">
                              报名活动还未开始
                        </span>
                        <el-button type="primary" plain class="join" :disabled="disable" @click.native="Join()">{{buttontext}}</el-button>
                        <!-- <span class="alreadyoffer">
                            已有报价<span>{{chances.chanceNum}}</span>条
                        </span> -->
                    </div>
                    <div class="advertisement" v-else-if="chances.state===1">
                        <span class="advertisementdate">发布时间：{{chances.beginDate}}</span>
                        <span class="advertisementtimeleft">
                            距离报名结束还有<span>{{chances.day}}</span>天
                        </span>
                        <el-button type="primary" plain class="join" :disabled="disable" @click.native="Join()">{{buttontext}}</el-button>
                        <span class="alreadyoffer">
                            已有报价<span>{{chances.chanceNum}}</span>条
                        </span>
                    </div>
                    <div class="advertisement" v-else>
                        <span class="advertisementdate">发布时间：{{chances.beginDate}}</span>
                        <span class="advertisementtimeleft">
                            活动已结束
                        </span>
                        <el-button type="primary" plain class="join" :disabled="disable" @click.native="Join()">{{buttontext}}</el-button>
                        <span class="alreadyoffer">
                            已有报价<span>{{chances.chanceNum}}</span>条
                        </span>
                    </div>
                </div>
               
                
              
                <div class="right-padding">				
                    <div class="right-title">
                        {{leftNews.title}}
                    </div>
                    <div class="right-content" v-for='(chancelistitem,idx) in chancelists' :key="idx">
                        <router-link :to="{path:'/BusinessChancelogin',query:{chanceId:chancelistitem.id,appid:appid,token:token}}">
                        <h3>{{chancelistitem .chanceName}}</h3>
                        </router-link>
                        <span>{{chancelistitem.releaseTime}}</span>
                    </div>				
                </div>	
			</div>
		</div>
	</div>
</template>
<script>
import api from "../../api.js";
import { setCookie } from "../../assets/js/cookie.js";
import { getCookie } from "../../assets/js/cookie.js";
import $ from "jquery";
import axios from "axios";
export default {
  name: "BusinessChancelogin",
  data() {
    return {
      loginState: false,
      storeState: false,
      typeLogin: false,
      detail_tittle: "商机详情",
      news: {
        title: "商机"
      },
      leftNews: {
        title: "相关信息"
      },
      checked: true,
      channelId: "",
      chances: "",
      chancesStore: {},
      chancelists: "",
      typeId: "",
      appid: "",
      token: "",
      num: "18",
      sysLinks: [],
      chanceslogin: "",
      name: "",
      password: "",
      chanceId: "",
      buttontext: "立即参与",
      disable: false,
      state: {
        state1: "icon-star1"
      },
      checCollection: "/open/api/acc/checCollection"
    };
  },
  methods: {
    goPersonalCenter() {
      this.$router.push({
        path: "/personalCenter/personalIndex"
      });
    },
    /**改变字体大小**/
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
      if (this.num > 10 && this.num < 30) {
        this.num--;
        $(".text_info *").css("font-size", this.num + "px");
        $(".text_info").css("font-size", this.num + "px");
      }
    },

    /**立即参与**/
    Join() {
      if (this.typeLogin) {
        if (this.storeState) {
          if (this.enrollState == false || this.enrollState == undefined) {
            this.appid = getCookie("userId");
            let par = {
              chanceId: this.chanceId,
              appid: this.appid
            };
            api
              .$http(
                api.serverSupply +
                  api.portBuyer +
                  "/open/api/chance/saveChanceEnroll",
                par
              )
              .then(res => {
                this.buttontext = "已参与";
                this.disable = true;
                this.$message({
                  message: "报名成功",
                  type: "success"
                });
              })
              .catch(err => {
                alert(err);
              });
          } else if(this.enrollState==1) {
            this.buttontext = "已参与";
            this.disable = true;
          }
          else{
              this.buttontext="无法参与";
              this.disable = true;
          }
        } else {
          this.buttontext = "立即参与";
          this.disable = false;
          this.$message({
            message: "请先入驻",
            type: "warning"
          });
        }
      } else {
        this.buttontext = "立即参与";
        this.disable = false;
        this.$message({
          message: "请先登录",
          type: "warning"
        });
      }
    },
    // this.storeState === true && (this.enrollState == false||this.enrollState==undefined)
    /**收藏**/
    collection(event) {
      if (this.state.state1 == "icon-star1") {
        let params = {};
        let userId = getCookie("userId");
        params.accountId = userId;
        params.token = getCookie("userToken");
        params.type = 2;
        params.typeId = this.chanceId;
        console.log(params.typeId, "typeId");
        // 登录之后
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
    },
    /**登陆**/
    Login() {
      let pa = {
        loginname: this.name,
        password: this.password
      };
      if (this.name && this.password) {
        api
          .$http(
            api.serverSupply + api.portLogin + "/open/api/member/login",
            pa
          )
          .then(res => {
            if (res.code) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            } else {
              // console.log(this.chanceId);
              setCookie("userName", res.data.accountName, 1000 * 60);
              setCookie("userId", res.data.accountId, 1000 * 60);
              setCookie("userToken", res.data.token, 1000 * 60);
              setCookie("userEmail", res.data.email, 1000 * 60);
              this.appid = getCookie("userId");
              this.token = getCookie("userToken");
              this.$store.commit("loginStateChange", 1);
              let params = {
                token: getCookie("userToken"),
                appid: getCookie("userId")
              };
              api
                .$http(
                  api.serverSupply +
                    api.portBuyer +
                    "/open/api/chance/chanceDetailState",
                  params
                )
                .then(res => {
                  this.typeLogin = res.data.loginState;
                  if (res.data.storeState) {
                    // 登录状态
                    this.storeState = res.data.storeState;
                  } else {
                    this.storeState = false;
                  }
                  if (this.typeLogin == false) {
                    this.storeState = true;
                  }
                  if (this.typeLogin == false || this.storeState == false) {
                    this.loginState = false;
                  } else {
                    this.loginState = true;
                  }
                  // ?权限获取成功后请求数据
                  this.chanceId = this.$route.query.chanceId;
                  let token = getCookie("userToken");
                  let appid = getCookie("userId");
                  let par = {
                    chanceId: this.chanceId,
                    token: token,
                    appid: appid
                  };
                  api
                    .$http(
                      api.serverSupply +
                        api.portBuyer +
                        "/open/api/chance/chanceDetail",
                      par
                    )
                    .then(res => {
                      this.chanceslogin = res.data;
                      this.chancesStore = res.data.chance.storeMain;
                      this.chances = res.data.chance;
                      this.chancelists = res.data.chanceList;
                      this.enrollState = res.data.chance.enrollState;
                      $("#top-nav .top-input").css("display", "inline-block");
                      $("#top-nav .top-nav-link")
                        .find("li")
                        .eq(1)
                        .siblings()
                        .children()
                        .css("color", "#fff");
                      $("#top-nav .top-nav-link")
                        .find("li")
                        .eq(1)
                        .children()
                        .css("color", "#0d545c");
                      if (this.enrollState === true) {
                        (this.buttontext = "已参与"), (this.disable = true);
                      } else {
                        (this.buttontext = "立即参与"), (this.disable = false);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log("商机详情权限出错");
                });
            }
          });
      } else {
        this.$message.error("请填写完整信息");
      }
    },
    // hidden() {
    //   if (this.loginState == true) {
    //     $(".login").css("z-index", -2);
    //   }else{
    //       $(".login").css("z-index", 2);
    //   }
    // },
    getdata() {
      /**收藏**/
      let checCollectionParams = {};
      checCollectionParams.typeId = this.$route.query.chanceId;
      checCollectionParams.type = 2;
      checCollectionParams.accountId = getCookie("userId");
      //获取收藏状态
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
      /**登录**/
      this.chanceId = this.$route.query.chanceId;
      this.token = getCookie("userToken");
      this.appid = getCookie("userId");
      let par = {
        chanceId: this.chanceId,
        token: this.token,
        appid: this.appid
      };
      let pa = {
        loginname: this.name,
        password: this.password
      };
      if (this.name && this.password) {
        api
          .$http(
            api.serverSupply + api.portLogin + "/open/api/member/login",
            pa
          )
          .then(res => {
            if (res.code) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
            } else {
              // console.log(this.chanceId);
              setCookie("userName", res.data.accountName, 1000 * 60);
              setCookie("userId", res.data.accountId, 1000 * 60);
              setCookie("userToken", res.data.token, 1000 * 60);
              setCookie("userEmail", res.data.email, 1000 * 60);
              this.appid = getCookie("userId");
              this.token = getCookie("userToken");
            }
          });
      }
      api
        .$http(
          api.serverSupply + api.portBuyer + "/open/api/chance/chanceDetail",
          par
        )
        .then(res => {
          this.chanceslogin = res.data;
          this.enrollState = res.data.chance.enrollState;
          this.chancesStore = res.data.chance.storeMain;
          this.chances = res.data.chance;
          this.typeId = res.data.chance.id;
          this.chancelists = res.data.chanceList;

          if (this.loginState === true) {
            $(".login").css("z-index", -999);
          } else {
            $(".login").css("z-index", 2);
          }
          if (this.enrollState === true) {
            (this.buttontext = "已参与"), (this.disable = true);
          } else {
            (this.buttontext = "立即参与"), (this.disable = false);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  watch: {
    $route(to, from) {
      this.chanceslogin = "";
      this.chances = "";
      this.chancelists = [];
      this.getdata();
    }
  },
  // beforeCreate(){
  //   this.loginState = true;
  // },
  mounted() {
    let params = {
      token: getCookie("userToken"),
      appid: getCookie("userId")
    };
    api
      .$http(
        api.serverSupply + api.portBuyer + "/open/api/chance/chanceDetailState",
        params
      )
      .then(res => {
        this.typeLogin = res.data.loginState;
        if (res.data.storeState) {
          // 登录状态
          this.storeState = res.data.storeState;
        } else {
          this.storeState = false;
        }
        if (this.typeLogin == false) {
          this.storeState = true;
        }
        if (this.typeLogin == false || this.storeState == false) {
          this.loginState = false;
        } else {
          this.loginState = true;
        }
      })
      .catch(err => {
        console.log("商机详情权限出错");
      });
    // ##########################3
    this.chanceId = this.$route.query.chanceId;
    let token = getCookie("userToken");
    let appid = getCookie("userId");
    let par = {
      chanceId: this.chanceId,
      token: token,
      appid: appid
    };
    api
      .$http(
        api.serverSupply + api.portBuyer + "/open/api/chance/chanceDetail",
        par
      )
      .then(res => {
        this.chanceslogin = res.data;
        this.chancesStore = res.data.chance.storeMain;
        this.chances = res.data.chance;
        this.chancelists = res.data.chanceList;
        this.enrollState = res.data.chance.enrollState;
        $("#top-nav .top-input").css("display", "inline-block");
        $("#top-nav .top-nav-link")
          .find("li")
          .eq(1)
          .siblings()
          .children()
          .css("color", "#fff");
        $("#top-nav .top-nav-link")
          .find("li")
          .eq(1)
          .children()
          .css("color", "#0d545c");

        if (this.enrollState === true) {
          (this.buttontext = "已参与"), (this.disable = true);
        } else {
          (this.buttontext = "立即参与"), (this.disable = false);
        }
      })
      .catch(err => {
        alert(err);
      });
    let url = this.checCollection,
      pa = {
        accountId: appid,
        type: 2,
        typeId: this.chanceId
      };
    api
      .$http(api.serverSupply + api.collection + this.checCollection, pa)
      .then(res => {
        if (res.code) {
          this.state.state1 = "icon-star1";
        } else {
          this.state.state1 = "icon-star";
        }
      });
    // if(this.typeLogin == false){
    //   this.loginState = false
    //   this.storeState = false
    // }else if(this.typeLogin == true && this.this.storeState = false)
    if (this.loginState === true) {
      $(".login").css("z-index", "-2");
    } else {
      $(".login").css("z-index", "2");
    }
  },
  beforeRouteLeave(to, from, next) {
    $("#top-nav .top-input").css("display", "inline-block");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(1)
      .children()
      .css("color", "#fff");
    next();
  },
  beforeRouteEnter(to, from, next) {
    $("#top-nav .top-input").css("display", "none");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(1)
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
.modal {
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
.modal2 {
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
#BusinessChancelogin {
  width: 1300px;
  margin: 0 auto;
  background-color: #fff;
}
#BusinessChancelogin .title {
  width: 1200px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 8px solid #f1f1f1;
  padding: 18px 0 15px 0;
}
#BusinessChancelogin .title h3 {
  font-size: 20px;
  color: #333333;
}
#BusinessChancelogin .title img {
  margin-left: 10px;
}
#BusinessChancelogin .content {
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
#BusinessChancelogin .content .left {
  width: 640px;
  margin-left: 0px;
  position: relative;
}
.left_content {
  position: relative;
}
#BusinessChancelogin .content .left .login {
  background-color: #f9f9fb;
  padding: 26px 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  top: 50px;
  z-index: 2;
}
#BusinessChancelogin .content .left .login > .top > h3 {
  font-size: 24px !important;
  color: #17a6b5 !important;
  margin: 0 !important;
  text-align: left;
}
#BusinessChancelogin .content .left .login > .top > span {
  font-size: 16px;
  margin: 14px 0 !important;
  height: inherit;
  text-align: left;
  color: #727272;
  display: inline-block;
}
.left-bottom {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 22px;
  padding-top: 26px;
  border-top: 1px solid #e1e1e3;
  border-right: 1px solid #e1e1e3;
}

.right-bottom {
  width: 48%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-top: 26px;
  justify-content: space-around;
  border-top: 1px solid #e1e1e3;
}
.right-bottom .right-bottom-register {
  font-size: 16px;
  color: #17a6b5;
}
.right-bottom .el-input {
  margin-top: 15px;
}
.right-bottom .el-input__inner {
  background-color: #e1e1e1;
  border-radius: 10px;
}
.right-bottom .el-button {
  height: 20px;
  width: 60px;
  margin-top: 15px;
  border-radius: 10px;
}
.right-bottom .el-checkbox {
  margin-top: 15px;
}
.left-bottom-top .point {
  display: inline-block;
  height: 100%;
  padding: 0 5px;
}
.left-bottom-top .innertext {
  color: #adadaf;
  font-size: 14px;
}
.left-bottom-bottom {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.left-bottom-bottom .point {
  padding: 0 5px;
  margin: 0;
}
.left-bottom-bottom .innertext {
  color: #adadaf;
  font-size: 14px;
}
.like .iconfont {
  color: #17a6b5;
  font-weight: bolder;
}
#BusinessChancelogin .content .left .login .text-bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#BusinessChancelogin .content .left .login .left-bottom .register {
  margin-top: 5px;
  margin-left: 15px;
  color: #17a6b5;
  cursor: pointer;
  display: block;
  font-size: 14px;
}
#BusinessChancelogin .content .left .businesschance {
  width: 100%;
}
#BusinessChancelogin .content .left .businesschance_tittle {
  font-size: 24px;
  color: #17a6b5;
  margin: 26px 0;
}
.businesschance_info_left {
  width: 50%;
  float: left;
  display: flex;
  flex-direction: column;
}
.businesschance_info_right {
  width: 50%;
  float: left;
  display: flex;
  flex-direction: column;
}
.detail_tittle {
  width: 100%;
  clear: both;
}
.businesschance_info_left span {
  font-size: 14px;
  color: #666666;
  margin: 10px 0;
}
.businesschance_info_right span {
  font-size: 14px;
  color: #666666;
  margin: 10px 0;
}
.businesschance .detail_tittle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 8px solid #f1f1f1;
  padding: 45px 0 15px 0;
}
.businesschance .detail_tittle h3 {
  font-size: 20px;
  color: #333333;
}
.businesschance .detail_tittle img {
  margin-left: 10px;
}
#BusinessChancelogin .content .left .text {
  width: 640px;
}
#BusinessChancelogin .content .left .text .text_tittle {
  margin-top: 22px;
  font-size: 30px;
  font-weight: normal;
  color: #17a6b5;
}
#BusinessChancelogin .content .left .text .text_tag {
  margin-top: 22px;
  display: block;
  height: 12px;
  font-size: 12px;
  color: #b39494;
}
#BusinessChancelogin .content .left .text .text_info {
  margin-top: 30px;
  font-size: 14px;
  text-indent: 2em;
}
#BusinessChancelogin .content .left .remark {
  margin-top: 30px;
  margin-bottom: 30px;
  color: #b39494;
}
#BusinessChancelogin .content .left .remark .beizhu {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
}
#BusinessChancelogin .content .left .remark .remarkeable {
  font-size: 12px;
}
#BusinessChancelogin .content .left .setmore {
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
  border-bottom: 1px solid #b39494;
}
#BusinessChancelogin .content .left .like i {
  font-size: 22px;
  width: 20px;
  height: 20px;
  margin-right: 13px;
}

#BusinessChancelogin .content .left button {
  cursor: pointer;
}
#BusinessChancelogin .content .left .setButton {
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

/*右边内容*/
#BusinessChancelogin .content .right {
  width: 458px;

  margin-top: 25px;
}
.advertisement {
  width: 100%;
  height: 236px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 0;
  background-color: #f8f8f9;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.advertisement .advertisementdate {
  font-size: 14px;
  color: #666666;
}
.advertisement .advertisementtimeleft {
  font-size: 24px;
  color: #666666;
}
.advertisement .advertisementtimeleft span {
  color: #dd2726;
}
.advertisement .el-button {
  font-size: 14px;
  width: 100px;
  height: 30px;
}
.advertisement .alreadyoffer {
  font-size: 14px;
  color: #666666;
}
.advertisement .alreadyoffer span {
  font-size: 18px;
  color: #dd2726;
}
#BusinessChancelogin .content .right .right-padding {
  padding: 15px 20px;
  border: 1px solid #eeeeee;
}
#BusinessChancelogin .content .right .right-title {
  font-size: 20px;
  color: #333333;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  padding-bottom: 35px;
  border-bottom: 8px solid #eee;
}
#BusinessChancelogin .content .right .right-content {
  height: 40px;
  margin-top: 10px;
  padding-bottom: 55px;
  border-bottom: 2px solid #eee;
}
#BusinessChancelogin .content .right .right-content:nth-child(7) {
  border-bottom: none;
}
#BusinessChancelogin .content .right .right-content h3 {
  font-size: 16px;
  height: 16px;
  line-height: 16px;
  font-weight: normal;
  color: #17a6b5;
  margin-bottom: 10px;
}
#BusinessChancelogin .content .right .right-content span {
  font-size: 14px;
  color: #999;
  display: block;
  height: 14px;
  line-height: 14px;
}
/*轮播广告*/
#BusinessChancelogin .content .right .textswiper {
  margin: 46px 0 20px 0;
}
#BusinessChancelogin .content .right .calendar_date {
  color: #ffffff !important;
  background-color: #71bbc3 !important;
}
#BusinessChancelogin .content .right .calendar_place {
  color: #71bbc3 !important;
}
#BusinessChancelogin .content .right .textswiper_tittle {
  text-align: center;
  font-size: 56px;
  color: #f8b334;
  margin: 40px 0 18px 0;
}
#BusinessChancelogin .content .right .textswiper_info {
  text-align: center;
  font-size: 28px;
  color: #17a6b5;
  margin: 18px 22px 10px 22px;
  font-weight: bold;
  word-wrap: break-word;
  line-height: 40px;
}
#BusinessChancelogin .content .right .textswiper_text {
  text-align: center;
  font-size: 16px;
  color: #7d7d84;
  margin: 10px 22px 10px 22px;
  word-wrap: break-word;
}
#BusinessChancelogin .content .right .textswiper .el-carousel__indicator {
  color: red !important;
  padding: 30px 4px !important;
}
#BusinessChancelogin .content .right .textswiper .el-carousel__button {
  background-color: #71c7d0 !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
</style>
