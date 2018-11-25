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
        <div class="rgContent itContent">
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
                <div class="number bgBlue">3
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
            <div class="tags">
                <el-checkbox-group size="mini" v-model="checkboxGroup">
                    <el-checkbox-button v-for="(tag,idx) in tags" :label="tag.id" :key="idx">{{tag.name}}</el-checkbox-button>
                </el-checkbox-group>
            </div>
            <div style="cursor: pointer" @click="nextStep" class="button">下一步</div>
            <div style="cursor: pointer" @click="skip" class="button skip">跳过</div>
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
<style lang="less">
    .itContent{
        width:60% !important;
        margin:0 auto;
        .el-checkbox-button.is-checked .el-checkbox-button__inner{
            background-color: #17A6B5;
            border-color: #17A6B5;
        }
        .el-checkbox-button__inner{border-left:1px solid #dcdfe6;}
        .tags{
            width:100%;
            padding:20px;
            .el-checkbox-group{
                display:flex;
                flex-wrap: wrap;
                label{
                    margin:10px;

                    span{
                        border-radius:4px !important;
                    }
                }
            }
        }
        .stepTip{
            width:400px !important;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin-bottom: 20px !important;
            margin:0 auto;
        }
        .button{
            width: 400px;
            height: 50px;
            color: #fff;
            background-color: #17a6b5;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 10%;
            font-size: 18px;
            margin:0 auto;
        }
        .skip{margin-top:25px;}
    }
</style>
<script>
    import {getCookie} from '../../assets/js/cookie.js'
    import api from '../../api.js'
    import "../../assets/css/Register.less"
    export default{
        name: 'InterestTags',
        data(){
            return {
                userId:'',
                url:'/open/api/acc/getTags',
                next: '/open/api/acc/addTags',
                checkboxGroup: [],
                tags:[],
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
            /*跳过*/
            skip(){
                this.$router.push({
                    name: 'Registed',
                });
            },
            /*下一步*/
            nextStep(){
                let pa = {
                        accountId: this.userId,
                        tagIds:JSON.stringify(this.checkboxGroup)
                    },
                    url = this.next;
                /*console.log(pa)*/
                this.server(url,pa).then(res=>{
                    /*console.log(res)*/
                    if(res.code){
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }else{
                        this.$router.push({
                            name: 'Registed',
                        });
                    }
                })

            },
            /*******************************服务接口**********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.collection + url, param)
            },
        },
        mounted(){
            this.userId=this.$route.params.accountId;
            console.log(this.$route.params.accountId)
            let url=this.url;
            this.server(url).then(res=>{
                if(res.code==0){
                    this.tags=res.data
                }
            })
        }
    }
</script>
<style lang="less">

</style>