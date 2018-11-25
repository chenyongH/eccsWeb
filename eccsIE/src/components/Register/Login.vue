<template>
    <div class="loginCont">
        <div class="header">
            <div class="left">
                <img style="cursor: pointer" @click="goInfomation" src="../../assets/images/login-top.png" alt="">
                欢迎登录
            </div>
            <div class="right">您好欢迎来到ECCS!</div>
        </div>
        <div class="center">
            <div class="loginContent">
                <div class="left">
                    <img src="../../assets/images/bgLogin.png" alt="">
                </div>
                <div class="right">
                    <div class="top">账户登录</div>
                    <form action="">
                        <div class="input">
                            <label><i class="iconfont icon-geren"></i>
                                <el-input @focus="handleFocus(0)" v-model="name" placeholder="请输入用户名/邮箱"></el-input>
                            </label>
                            <label><i class="iconfont icon-ympassworld"></i>
                                <el-input @focus="handleFocus(1)" @keyup.enter.native="Log" type="password" v-model="password" placeholder="请输入密码"></el-input>
                            </label>
                        </div>
                        <div class="buttons">
                            <span @click="forgot">忘记密码</span>
                            <span @click="goRegister">免费注册</span>
                        </div>
                        <div @click="Log" class="submit">登录</div>
                        <div class="loginStyle">
                            <span>扫描微信二维码登录</span>
                        </div>
                        <div class="type">
                            <div class="line"></div>
                            <div class="img">
                                <img src="../../assets/images/wexin.png" alt="">
                            </div>
                            <div class="line"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="footer">
            <span>
                <!--Copyright © 2010-2015-->
            </span>
            <span>

            </span>
        </div>
    </div>
</template>
<script>
    import {setCookie} from '../../assets/js/cookie.js'
    import api from '../../api.js'
    import $ from "jquery"
    import "../../assets/css/login.less"
    export default{
        name:'logIn',
        data(){
            return{
                url:'/open/api/member/login',
                name:'',
                password:''

            }
        },
        methods:{
            handleFocus(id){
                $(".input>label").css({borderBottom:'2px solid #ddd',color:'#666'}).eq(id).css({borderBottom:'2px solid #17a6b5',color:'#17a6b5'});
            },
            forgot(){
                this.$router.push({
                    name:'forgot1',
                });
            },
            goInfomation(){
                this.$router.push({
                    name:'InformationNav',
                });
            },
            /*注册*/
            goRegister(){
                this.$router.push({
                    name:'register',
                });
            },
            /*登录*/
            Log(){
                let url=this.url,
                pa={
                    loginname:this.name,
                    password:this.password
                };
                if(this.name&&this.password){
                    this.server(url,pa).then(res => {
                        /*console.log(res)*/
                        if(res.code){
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }else{
                            setCookie('userName',res.data.accountName,7200);
                            setCookie('userId',res.data.accountId,7200);
                            setCookie('userToken',res.data.token,7200);
                            setCookie('userEmail',res.data.email,7200);
                            this.$router.push({
                                name:'InformationNav',
                                /*params:{
                                    data:res.data
                                }*/
                            });
                            this.$store.commit('loginStateChange',1);
                        }
                    })
                }else{
                    this.$message.error('请填写完整信息');
                }

            },
            /*******************************服务接口**********************/
            server:(url,param)=>{
                return api.$http(api.serverSupply+api.portLogin+url,param)
            },
        },
        mounted:()=>{
        }
    }
    $(function(){
        $(".input>label").click(function(){
            $(this).css({borderBottom:'2px solid #17a6b5',color:'#17a6b5'});
            $(this).siblings().css({borderBottom:'2px solid #ddd',color:'#666'});
        });
    })
</script>
