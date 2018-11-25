/* eslint-disable */
<template>
    <div id="top-nav">
        <el-container>
            <el-header>
                <img src="../assets/images/top-logo.png" alt="" @click='gohome'>
                <ul class="top-nav-link">
                    <li class="firstLi" @click='oneChange'>
                        <router-link to="/">{{nav.li1}}</router-link>
                    </li>
                    <li @click='StateChange'>
                        <router-link to="/procurement">{{nav.li2}}</router-link>
                    </li>
                    <li @click='ThreeChange'>
                        <router-link to="/Supply">{{nav.li3}}</router-link>
                    </li>
                    <li @click='fourChange'>
                        <router-link to="/platform">{{nav.li4}}</router-link>
                    </li>
                </ul>
                <div class="top-input">
                    <el-input class="input">
                    </el-input>
                    <i class="el-icon-search" @click='informationSearch'></i>
                </div>
                 <!--登录前-->
                <div v-if="!state" class="top-figure top-login">
                    <span style="width: 32px;height: 100%;line-height: 60px;" @click="goLogin">登录</span>
                    <span @click="goRegist" style="margin-left:20px;width: 32px;height: 100%;line-height: 60px;">注册</span>
                </div>
                <!--登陆后-->
                <div v-if="state" class="top-figure">
                    <div style="height:100%;position:relative;">
                            <div :style="color" class="username">{{userName}}</div>
                            <div style="height:100%;width:50%"  @mouseleave="leave">
                                <i style="position: absolute;fontSize:30px;top:20px;top: 50%;margin-top: -18px;"
                                   :style="color"
                                   class="iconfont icon-user img1" @mouseenter="enter"></i>
                                <!--<img src="../assets/images/personal.png" :alt="userName" @mouseenter="enter" class="img1">-->
                                <div class="perBox">
                                    <div @click="goPersonalCenter" class="li">个人中心</div>
                                    <div @click="outLogin" class="li">退出登录</div>
                                </div>

                            </div>
                            <div style="height:100%;width:50%" class="msgBox" @mouseleave="msgLeave">
                                <span class="newsNum" v-if='messagesTop'></span>
                                <img src="../assets/images/msg.png" alt="消息" class="img2" @mouseenter='msgEnter' @click='messages'>
                                <!-- 消息下拉框 -->
                                <ul class="perBox2">
                                    <li @click='messagesOne'>系统消息<span v-if='systemMessage'>{{systemMessage}}</span></li>
                                    <li @click='messagesTwo'>用户消息<span v-if='userMessage'>{{userMessage}}</span></li>
                                </ul>
                            </div>
                    </div>
                </div>
                <div class="top-language">
                    <img src="../assets/language/cn.png" height="30px" alt="中文">
                </div>
            </el-header>
        </el-container>
    </div>
</template>
<script>
    import api from '../api.js'
    import $ from "jquery"
    import {getCookie,delCookie} from '../assets/js/cookie.js'
    $(function () {
        $('.perBox>.li').hover(function () {
            $(this).stop().toggleClass('active');
            $(this).siblings().removeClass('active')
        });

    });
    export default {
        name: 'top-nav',
        data(){
            return {
                url:'/open/api/member/logout',
                nav: {
                    li1: '资讯',
                    li2: '采购信息',
                    li3: '供应信息',
                    li4: '平台服务'
                },
                userName: '',
                userId: '',
                userToken: '',
                userEmail: '',
                color:{color:'#fff'}
            }
        },
        methods: {
          // 资讯首页
          oneChange(){
            this.$router.push({
                path:'/'
              })
          },
          // 采购信息
            StateChange(){
              this.$store.commit('TOPPROCUREMENTCHANGE')
              this.$router.push({
                path:'/procurement'
              })
            },
            // 供应信息
            ThreeChange(){
              this.$router.push({
                path:'/Supply'
              })
            },
            // 平台服务
            fourChange(){
              this.$router.push({
                path:'/platform'
              })
            },
            // 消息点击效果
            messages(){
                this.$store.commit('msgactiveNameChange','msgOne')
                this.$router.push({
                    path:'/personalCenter/Messages'
                })
                $(".perBox2").stop().slideUp();
            },
            messagesOne(){
                this.$store.commit('msgactiveNameChange','msgOne')
                this.$router.push({
                    path:'/personalCenter/Messages'
                })
                $(".perBox2").stop().slideUp();
            },
            messagesTwo(){
                this.$store.commit('msgactiveNameChange','msgTwo')
                this.$router.push({
                    path:'/personalCenter/Messages'
                })
                $(".perBox2").stop().slideUp();
            },
            // 个人鼠标移入效果
            enter(){
                $(".perBox").stop().slideDown();
            },
            leave(){
                $(".perBox").stop().slideUp();

            },
            // 消息鼠标移除效果
            msgEnter(){
                $(".perBox2").stop().slideDown();
            },
            msgLeave(){
                $(".perBox2").stop().slideUp();
            },
            goPersonalCenter(){
                this.$router.push({
                    name: 'personalCenter',
                });
                $(".perBox").stop().slideUp();
            },
            gohome(){
                this.$router.push({name: 'InformationNav'})
                $(".perBox").stop().slideUp();
            },
            // 顶部搜索
           informationSearch(){
                let text = $('.top-input .input input').val()
                this.$store.commit('flickerChange')
                this.$store.commit('informationTextSearchChange',text);
                this.$router.push({name: 'InformationSearch'})
           },
            outLogin(){
                this.userName='';
                this.userId='';
                this.userToken='';
                this.userEmail='';
                delCookie('userName');
                delCookie('userId');
                delCookie('userToken');
                delCookie('userEmail');
                this.$router.push({
                    name: 'login',
                });
                this.$store.commit('loginStateChange',0);
                location.reload();
            },
            goLogin(){
                this.$router.push({
                    name: 'login',
                });
            },
            goRegist(){
                this.$router.push({
                    name: 'register',
                });
            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.portLogin+url,param)
            },
            // webSocket
            webSocket(userName){
                let webSocketThis = this;
               var Socket = new WebSocket("ws://116.196.89.209:9002/websocket"); //连接服务器
               Socket.onopen = function (appid) {
                                console.log('webpack已经与服务器连接')
                            try {
                                Socket.send(JSON.stringify({
                                    room: userName,
                                    "action": "join"
                                }));
                            } catch (ex) {
                                console.log("WebSocket连接初始化出错")
                            }
                };
                Socket.onmessage = function (event) {
                    let userInfo = {
                        accountId: getCookie("userId"),
                        token: getCookie("userToken")
                    }
                    // 头部状态变化
                    webSocketThis.$store.commit('topMessageStatusUpdate',userInfo)
                    // 改变状态值
                    webSocketThis.$store.commit('SocketState')
                };
                let that = this;
                Socket.onclose = function (event) {
                    console.log('websocket断开连接')
                    that.init()
                };
                Socket.onerror = function (event) {
                    console.log(event+'webSocket出错')
                };
            },
            init(){
                this.webSocket()
            }
        },
        computed:{
            state(){
                return this.$store.state.login.state
            },
            informationTextSearch(){
                return this.$store.state.informationTextSearch
            },
            messagesTop(){
                if(this.$store.state.Message.userMessage || this.$store.state.Message.systemMessage){
                   return true
                }
                   return false
            },
            userMessage(){
                return this.$store.state.Message.userMessage
            },
            systemMessage(){
                return this.$store.state.Message.systemMessage
            }
        },
        mounted(){
			if(getCookie('userToken')){
            	this.$store.commit('loginStateChange',1);
          	}else{
            	this.$store.commit('loginStateChange',0);
          	}            // 键盘搜索事件
            let that = this;
            $('.top-input .input input').bind('keypress',function(event){
                if(event.keyCode == 13){
                    let text = $('.top-input .input input').val()
                    that.$store.commit('flickerChange')
                    that.$store.commit('informationTextSearchChange',text);
                    that.$router.push({name: 'InformationSearch'})

                }
            })

            // 判断是否登录
            this.userName = getCookie('userName');
            if (this.state) {
                // webSocket
                let webSocketuserName = getCookie('userName');
                this.webSocket(webSocketuserName);
                // 改变值
                this.$store.commit('loginStateChange',1);
                // 头部显示值
                this.userId = getCookie('userId');
                this.userToken = getCookie('userToken');
                this.userEmail = getCookie('userEmail');
                // 获取未读信息数据
                let countChatParams = {
                    accountId : this.userId,
                    token:this.userToken
                }
                this.$store.commit('topMessageStatusUpdate',countChatParams)
            }else{
//              this.$store.commit('loginStateChange',0);
            }

            // input输入框获得焦点时候触发事件
            $('.top-input input').focus(function(){
                $('.top-input input').css('width','300px');
                $('.top-input input').css('transition','width 0.5s');
                $('.top-input input').css('box-shadow','0 0 5px #fff');
                $('.top-input input').css('border-color','#fff')
            })
            $('.top-input input').blur(function(){
                if($('.top-input input').val()){

                }else{
                    $('.top-input input').css('width','200px');
                    $('.top-input input').css('border-color','#fff')
                    $('.top-input input').css('box-shadow','0 0 0px #fff')
                }
            })


        },
        watch:{
            '$route'(to){
                /*console.log(to)*/
                if(to.matched[0].name=="personalCenter"){
                    this.color={color:'#333'}
                }else{
                    this.color={color:'#fff'}
                }
                if(!getCookie('userToken')){
                    this.$store.commit('loginStateChange',0);
                    /*this.$message({
                        message: "登录超时或未登录，请重新登录！",
                        type: 'warning'
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name:'login'
                        })
                    },500)*/
                }
            },
            state(){
              if(this.state){
                 this.userName = getCookie('userName');
              }
            }
        }
    }
</script>
<style scoped>
#top-nav .top-nav-link {
  display: -webkit-flex;
  display: flex;
  align-items: center;
}

.el-container {
  width: 1200px;
  margin: 0 auto;
  background-color: #17a6b5;
  position: relative;
}

.el-header img {
  position: absolute;
  /*bottom: 10px;*/
  top: 12px;
  left: 20px;
}

.el-header .firstLi a {
  color: #0d545c;
}

/*导航内容*/
.el-header ul {
  list-style: none;
  height: 60px;
  width: 360px;
  position: absolute;
  /*top: 7px;*/
  top: 0;
  left: 130px;
  margin: 0 0 0 30px;
  padding: 0;
}

.el-header ul li {
  display: inline-block;
  font-size: 18px;
  font-family: "微软雅黑";
  color: #fff;
  margin: 0;
  padding: 0;
  width: 90px;
  text-align: center;
  line-height: 60px;
}

.el-header ul li:first-child {
  width: 70px;
}

.el-header ul li a {
  font-size: 18px;
  font-family: "微软雅黑";
  color: #fff;
}

/*输入框内容*/
.top-input {
  width: 400px;
  height: 35px;
  position: absolute;
  right: 220px;
  top: 15px;
  border-radius: 10px;
}
.top-input .el-icon-search {
  position: absolute;
  font-size: 25px;
  top: 2px;
  right: 10px;
  color: #fff;
}
.top-figure {
  height: 60px;
  width: 110px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 70px;
  font-size: 16px;
}
.top-login {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
}
.top-login > span:hover {
  color: #b74231;
}
.top-figure .perBox {
  position: absolute;
  z-index: 100;
  top: 60px;
  background-color: #eee;
  display: none;
  width: 100px;
  height: 80px;
  left: -30px;
  text-align: center;
  box-sizing: border-box;
}
.top-figure .perBox2 {
  position: absolute;
  z-index: 100;
  top: 60px;
  left: 15px;
  background-color: #eee;
  width: 100px;
  height: 80px;
  list-style: none;
  margin-left: 0;
  display: none;
   box-sizing: border-box;
}
.top-figure .perBox2 li {
  width: 100% !important;
  border: 1px solid #eee;
  cursor: pointer;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #2c3e50;
  position: relative;
  box-sizing: border-box;
}
.top-figure .perBox2 li span {
  position: absolute;
  display: block;
  height: 20px;
  width: 20px;
  background: #e00d0d;
  font-size: 12px;
  line-height: 20px;
  top: 10px;
  right: -3px;
  border-radius: 20px;
  text-align: center;
  color: #ffffff;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.7);

}
.top-figure .perBox2 li:hover {
  color: #17a6b5;
}
.top-figure .msgBox {
  position: absolute;
  top: 0px;
  right: 0px;
}
.top-figure .perBox div:hover {
  color: #17a6b5;
}
/*用户名*/
.top-figure .username {
  color: #ffffff;
  position: absolute;
  height: 100%;
  line-height: 60px;
  font-size: 14px;
  left: -30px;
  width: 50px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top-figure .perBox .li {
  width: 100%;
  border: 1px solid #eee;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #2c3e50;
  cursor: pointer;
  box-sizing: border-box;
}
.top-figure .img1 {
  height: 25px;
  left: 30px;
  top: 50%;
  margin-top: -12px;
  cursor: pointer;
}
.top-figure .img2 {
  height: 25px;
  cursor: pointer;
  left: 25px;
  top: 50%;
  margin-top: -12px;
}
/*    .top-figure .news{

    }*/
.top-figure .newsNum {
  position: absolute;
  font-size: 12px;
  color: #ffffff;
  top: 15px;
  right: 5px;
  background-color: #f00;
  z-index: 2;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  text-align: center;
  line-height: 15px;
  border: none;
}
.top-language {
  height: 60px;
  width: 30px;
  position: absolute;
  right: 20px;
}
.top-language img {
  height: 25px;
  top: 50%;
  margin-top: -12px;
  left: 0px;
}
</style>
<style>
/* .top-figure .el-badge__content {
        height: 12px;
        padding: 0px;
        width: 12px;
        line-height: 12px;
        border: none;
        background-color: #df1313;
    }*/
.top-input .el-input__inner {
  height: 30px;
  line-height:30px;
  border-radius: 15px;
  border: 1px solid #ffffff;
  background-color: #17a6b5;
  color: #ffffff;
  width: 200px;
  float: right;
}
</style>
