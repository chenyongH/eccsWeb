<template>
    <div class="rgCont">
        <div class="head">
            <div class="header">
                <div class="left">
                    <img style="cursor: pointer" @click="goInfomation" src="../../assets/images/footer-logo.png" alt="">
                    欢迎注册
                </div>
                <div class="right">已有账号？<span @click="goLogin" class="skyBlue">请登录></span></div>
            </div>
        </div>
        <div class="rgContent">
            <div class="stepTip">
                <div class="number bgBlue">1
                    <div class="tips">邮箱验证</div>
                </div>
                <div class="arrowR clBlue">
                    <span>········</span>
                    <span>></span>
                </div>
                <div class="number bgBlue">2
                    <div class="tips tip">填写账户信息</div>
                </div>
                <div class="arrowR">
                    <span>········</span>
                    <span>></span>
                </div>
                <div class="number">3
                    <div class="tips">兴趣标签</div>
                </div>
                <div class="arrowR">
                    <span>········</span>
                    <span>></span>
                </div>
                <div class="number">4
                    <div class="tips">注册成功</div>
                </div>
            </div>
            <div class="form">
                <label>
                    <span>会员名称 </span>
                    <el-input @blur="checkName" v-model="name" placeholder="您的账户名和登录名"></el-input>
                </label>
                <label>
                    <span>设置密码</span>
                    <el-input @focus="passFocus"
                              @blur="checkPassword"
                              v-model="password"
                              type="password"
                              placeholder="建议使用两种或更多组合形式"></el-input>
                    <span v-if="passTips" class="passwordTips">
                        <i class="el-icon-warning"></i>
                        建议使用字母、数字和符号两种及以上的组合，6 - 20个字符</span>
                </label>
                <label>
                    <span>确认密码</span>
                    <el-input @blur="confirmPassword"
                              v-model="confirm"
                              type="password"
                              placeholder="请确认密码"></el-input>
                </label>
                <div style="cursor: pointer" @click="nextStep" class="button">下一步</div>
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
    import "../../assets/css/Register.less"
    export default{
        name: 'RegisterInfo',
        data(){
            return {
                url: '/open/api/member/register',
                code: 0, /*验证码*/
                email: '', /*邮箱*/
                name: '', /*用户名*/
                password: '', /*密码*/
                confirm: '', /*确认密码*/
                passTips:0
            }
        },
        methods: {
            passFocus(){
                this.passTips=1
            },
            goInfomation(){
                this.$router.push({
                    name: 'InformationNav',
                });
            },
            /*登录*/
            goLogin(){
                this.$router.push({
                    name: 'login',
                });
            },
            checkName(){
                this.name ? 0 : this.$message.error('请填写用户名！');
            },
            /*验证密码*/
            checkPassword(){
                let reg=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
                this.passTips=0
                this.password ? 0 : this.$message.error('请填写密码！');
                if(reg.test(this.password)==false){
                    this.$message.error('密码不匹配，建议使用字母、数字和符号两种及以上的组合，6 - 20个字符！')
                    return false;
                }
            },
            confirmPassword(){
                this.confirm ? 0 : this.$message.error('请填确认密码！');
            },
            nextStep(){
                let pa = {
                        email: this.email,
                        loginname: this.name,
                        password: this.password,
                        spassword: this.confirm
                    },
                    url = this.url;
                /*console.log(pa)*/
                if (this.name && this.password && this.confirm) {
                    this.server(url, pa).then(res => {
                        /*console.log(res)*/
                        if (res.code) {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        } else {
                            this.$router.push({
                                name: 'InterestTags',
                                params:{
                                    userId:res.data
                                }
                            });
                        }
                    })

                } else {
                    this.$message.error('请填写完整信息！')
                }
            },
            /*******************************服务接口**********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.portLogin + url, param)
            },
        },
        mounted(){
            this.code = this.$route.query.code;
            this.email = this.$route.query.email;
            /*console.log(this.code)
             console.log(this.email)*/

        }
    }
</script>
<style lang="less">

</style>