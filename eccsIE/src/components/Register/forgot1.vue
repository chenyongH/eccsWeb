<template>
    <div class="rgCont">
        <div class="head">
            <div class="header">
                <div class="left">
                    <img style="cursor: pointer" @click="goInfomation" src="../../assets/images/footer-logo.png" alt="">
                    忘记密码
                </div>
                <div class="right">已有账号？<span @click="goLogin" class="skyBlue">请登录></span></div>
            </div>
        </div>
        <div class="rgContent">
            <div class="stepTip">
                <div class="number bgBlue">1
                    <div class="tips">邮箱验证</div>
                </div>
                <div class="arrowR">
                    <span>·················</span>
                    <span>></span>
                </div>
                <div class="number">2
                    <div style="    -webkit-transform: translateX(-136%) !important;
    transform: translateX(-82%) !important;" class="tips tip">重置密码
                    </div>
                </div>
                <div class="arrowR">
                    <span>·················</span>
                    <span>></span>
                </div>
                <div class="number">3
                    <div class="tips">注册成功</div>
                </div>
            </div>
            <div class="form">
                <label>
                    <span>邮箱验证</span>
                    <el-input @blur="emailBlur" @change="changes" v-model="email" placeholder="请输入邮箱"></el-input>
                    <i v-if="iconShow&&emailError" class="el-icon-error"></i>
                    <i v-if="emailS" class="el-icon-success"></i>
                    <!--<span class="tip"></span>-->
                </label>
                <label>
                    <span>邮箱验证码</span>
                    <el-input :disabled="codeDisable" v-model="emailCode" placeholder="请输入邮箱验证码"></el-input>
                    <em :style="codeCursor?'cursor:pointer':'cursor: not-allowed;background:#ddd;color:#eee' "
                        @click="getEmailCode">{{getCode}}</em>
                </label>
                <div :style="isNext?'cursor: pointer':'cursor: not-allowed;background:#ddd;color:#eee'" @click="nextStep" class="button">下一步</div>
            </div>
        </div>
        <div class="footer">
            <span>
               <!-- Copyright © 2010-2015-->
            </span>
            <span>

            </span>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import api from '../../api.js'
    import "../../assets/css/Register.less"
    export default{
        name: 'forgot1',
        data(){
            return {
                email: '', /*输入邮箱*/
                checkEmail: 0, /*邮箱正则验证*/
                checkEmailUrl: '/open/api/member/verifyEmail', /*邮箱验证接口*/
                url: '/open/api/member/getEmailCode', /*获取验证码接口*/
                checkCode: '/open/api/member/checkCode', /*检验验证码接口*/
                emailCode: '', /*验证码*/
                getCode: '获取验证码', /*按钮文字信息*/
                codeCursor: 1,/*获取验证码按钮状态--允许点击*/
                emailError: 0, /*错误提示*/
                iconShow: 0, /*是否显示提示*/
                emailS: 0, /*正确提示*/
                codeDisable: false,/*按钮能否点击*/
                isNext:1,/*能否点击下一步*/
            }
        },
        methods: {
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
            /*下一步*/
            nextStep(){
                let check = this.checkCode;
                if (this.checkEmail&&this.isNext) {
                    let parama = {
                        email: this.email,
                        code: this.emailCode
                    };
                    this.server(check, parama).then(res => {
                        if (res.code) {
                            this.$message.error(res.msg);
                        } else {
                            this.$router.push({
                                name: 'resetPassword',
                                query: {
                                    code: this.emailCode,
                                    email: this.email
                                }
                            });
                        }
                    })
                } else {
                    this.$message.error('请填写正确的邮箱地址！');
                }

            },
            /*点击获取验证码*/
            getEmailCode(){
                if (this.checkEmail) {
                    if (this.codeCursor == 0) {
                        return false
                    } else {
                        this.codeCursor = 0;/*获取验证码按钮状态--不允许点击*/
                        let i = 10;
                        let times = setInterval(() => {
                            /*console.log(i)*/
                            i--;
                            this.getCode = i + 's后重新发送';
                            if (i == 0) {
                                clearInterval(times)
                                this.codeCursor = 1;/*获取验证码按钮状态--允许点击*/
                                this.getCode = '获取验证码'
                            }
                        }, 1000);
                        let url = this.url,
                            pa = {
                                email: this.email
                            };
                        this.server(url,pa).then(res => {
                            if (res.code) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            } else {
                                this.$message({
                                    message: '已发送验证码至该邮箱，请及时查收！',
                                    type: 'success'
                                });
                            }
                        }).catch(err => {
                            this.$message.error('获取验证码失败' + err);
                        })
                    }
                }
            },
            /*邮箱验证*/
            changes(e){
                let Reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                let Chk = Reg.test(e);
                this.checkEmail = Chk;
            },
            emailBlur(){
                /*console.log('blur');*/
                let url = this.checkEmailUrl,
                    parama = {
                        email: this.email
                    };
                Vue.set(this, 'iconShow', 1);
                if (this.checkEmail) {/*判断邮箱格式是否正确*/
                    this.emailError = 0;
                    /*邮箱错误提示标识*/
                    this.server(url, parama).then(res => {
                        /*console.log(res)*/
                        if (res.code) {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                            this.codeCursor = 0;/*获取验证码按钮状态--不允许点击*/
                            this.codeDisable = true;
                            this.emailS = 0;
                            this.emailError = 1;
                            this.isNext=0/*不允许点击下一步*/
                        } else {
                            this.emailS = 1;/*邮箱验证通过*/
                            this.codeCursor = 1;/*获取验证码按钮状态--允许点击*/
                            this.codeDisable = false;/*验证码输入框状态码--不允许输入*/
                            this.isNext=1;/*允许点击下一步*/
                        }
                    })
                } else {
                    this.$message.error('请填写正确的邮箱地址！');
                    this.emailError = 1
                }
            },
            /*******************************服务接口
             *
             * **********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.portLogin +url, param)
            },
        },
        mounted(){

        }
    }
</script>
