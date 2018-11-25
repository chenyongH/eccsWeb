
<template>
 <div class="rgCont">
  <div class="head">
   <div class="header">
    <div class="left">
     <img style="cursor: pointer" @click="goInfomation" src="../../assets/images/footer-logo.png" alt="">
     欢迎注册
    </div>
    <div class="right">已有账号？<span class="skyBlue">请登录></span></div>
   </div>
  </div>
  <div class="rgContent">
   <div class="form">
    <div class="success">
      <i class="iconfont icon-right1"></i>
        <span>注册成功</span>
        <div class="dd">您已成功注册为ECCS用户，系统将在{{times}}s之后跳转至登录页!</div>
    </div>
    <div style="cursor: pointer" @click="Login" class="button">点击登录</div>
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
    import "../../assets/css/Register.less"
    export default{
        name:'Registed',
        data(){
            return{
                times:10,
                Interval:''
            }
        },
        methods:{
            goInfomation(){
                this.$router.push({
                    name:'InformationNav',
                });
            },
            Login(){
                clearInterval(this.Interval)
                this.$router.push({
                    name:'login',
                });
            }
        },
        mounted(){
            let i=10;
            this.Interval=setInterval(()=>{
                /*console.log(i)*/
                i--;
                this.times = i;
                if(i==0){
                    clearInterval(this.Interval)
                    this.$router.push({
                        name:'login',
                    });
                }
            },1000);
        }
    }
</script>
<style lang="less">

</style>
