<template>
    <div class="Login" v-wechat-title="$route.meta.title">
        <div class="cont">
            <div class="avatar">
                <img src="../../assets/logo (2).png" alt="">
                <div class="form">
                    <label><span>邮箱</span><input v-model="email" type="text"></label>
                    <label><span>密码</span><input v-model="password" type="password"></label>
                    <div @click="login" class="button">登录</div>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="less" scoped>
    .Login{
        width: 100%;
        height:100%;
        background-color: #fff;
        .cont{
            width:100%;
            height:9.6rem;
            background-color: #17a6b5;
            display: flex;
            // overflow: hidden;
            position: relative;
            .avatar{
                width:2.8rem;
                height:2.8rem;
                background-color: #51d4e1;
                margin:2.133333rem auto 0 auto;
                border-radius: 100%;
                display:flex;
                align-items: center;
                justify-content: center;
                img{width:80%;} 
                .form{
                    width:90%;
                    height:7.546667rem;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 5px .133333rem #ecf5f5;
                    position: absolute;
                    top:230px;
                    padding:0 30px;
                    box-sizing: border-box;
                    label{
                        width:100%;
                        height:1.306667rem;
                        border-bottom:1px solid #f1f1f1;
                        display:flex;
                        align-items: center;
                        font-size: .386667rem;
                        margin-top:.373333rem;
                        span{
                            width:50px;
                            color:#AAAAAA;
                            
                        }
                        input{
                            width: 100%;
                            height: 100%;
                            border:none;
                            outline: none;
                        }
                    }
                    .button{
                        width:100%;
                        height:1.306667rem;
                        background-color: #17a6b5;
                        border-radius: 100px;
                        display:flex;
                        align-items:center;
                        justify-content: center; 
                        font-size:.48rem;
                        color:#fff;
                        margin-top:1.733333rem;
                        box-shadow: 0 10px 10px #d8d8d8;
                    }
                }
            }
        }
    }
</style>

<script>
    import {setCookie, getCookie} from '../../assets/js/cookie.js'

export default {
  data () {
    return {
      http: 'http://116.196.89.209',
      portLogin: ':9005',
      url: '/open/api/member/login',
      email: '',
      password: ''
    }
  },
  methods: {
    // 登录
    login () {
      let {http, portLogin, url} = this
      let pa = {
        loginname: this.email,
        password: this.password
      }
      if (this.email && this.password) {
        this.$api.post(http + portLogin + url, pa, response => {
          if (response.status >= 200 && response.status < 300) {
            if (response.data.code) {
              this.$vux.toast.show({
                text: response.data.msg,
                type: 'text'
              })
            } else {
              setCookie('userName', response.data.data.accountName, 7200)
              setCookie('userId', response.data.data.accountId, 7200)
              setCookie('userToken', response.data.data.token, 7200)
              setCookie('userEmail', response.data.data.email, 7200)
              this.$router.push({
                name: 'Information'
              })
            }
          } else {
            this.$vux.toast.show({
              text: response.message,
              type: 'text'
            })
          }
        })
      } else {
        this.$vux.toast.show({
          text: '请填写完整信息',
          type: 'text'
        })
      }
    }
  },
  mounted () {
        if (getCookie('userToken')) {
          this.$router.push({
            name: 'Information'
          })
        }
  }
}
</script>

