<template>
    <div class="LogOut" v-wechat-title="$route.meta.title">
        <div class="head">
            <div class="header"></div>
            <div class="avatar">
                <div class="imgBox">
                    <img src="../../assets/wo.png" alt="">
                </div>
                <div class="name">{{name}}</div>
            </div>
        </div>
        <div class="line"></div>
        <ul class="cont" @click='collect'>
            <li><span>我的收藏</span><i class="iconfont icon-fanhui"></i></li>
        </ul>
        <div @click="outLogin" class="button">{{button}}</div>
        <div v-transfer-dom>
              <actionsheet v-model="show8" :menus="menus8" @on-click-menu-menu1="demo8doClose" @on-click-menu-menu2="Delete" :close-on-clicking-mask="true" :close-on-clicking-menu="true">
              </actionsheet>
        </div>
    </div>
</template>
<style lang="less" scoped>
.LogOut{
    li{list-style: none;}
    width: 100%;
    height:100%;
    // margin:47px 0;
    background-color: #fff;
    .line{
        background-color: #f8f8f9;
        width:100%;
        height:10px;
    }
    .head{
        width:100%;
        height:4.96rem;
        background-color: #fff;
        position: relative;
        .header{
            width:100%;
            height:4.4rem;
            background-image: url(../../assets/Ellipse.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .avatar{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            width:100%;
            display:flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            .imgBox{
                width:1.493333rem;
                height:1.493333rem;
                border-radius: 50%;
                overflow: hidden;
                background-color: #dbfcff;
                display:flex;
                justify-content: center;
                align-items: center;
                img{
                    width:60%;
                }
            }
            .name{
                font-size: .453333rem;
                color:#fff;
                margin-top:.266667rem;
            }
        }
    }
    .cont{
        width:100%;
        margin-top:10px;
        background-color: #fff;
        padding:0 .4rem;
        box-sizing: border-box;
        li{
            width:100%;
            height:1.333333rem;
            border-bottom: 1px solid #ededed;
            display:flex;
            justify-content: space-between;
            align-items: center;
            color:#555555;
            font-size:.373333rem;
            i{
                transform: rotateZ(180deg)
            }
        }
    }
    .button{
        width:8.346667rem;
        height:1.333333rem;
        color:#fff;
        font-size:.48rem;
        background-color: #17a6b5;
        /*margin:6.04rem auto .773333rem auto;*/
        border-radius: 100px;
        text-align: center;
        line-height: 1.333333rem;
        color:#fff;
        font-size:.48rem;
        background-color: #17a6b5;
        border-radius: 100px;
        margin: 0 auto;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }
}
</style>

<script>
    import { Actionsheet } from 'vux'
    import {delCookie, getCookie} from '../../assets/js/cookie.js'

export default {
  data () {
    return {
      name: '',
      button: '',
      show8:false,
       menus8: {
        menu1: '确认退出',
        menu2: '取消'
      }
    }
  },
  components: {
      Actionsheet
    },
  methods: {
    //模态框确认删除
    demo8doClose(){
        delCookie('userName')
        delCookie('userId')
        delCookie('userToken')
        delCookie('userEmail')
        this.name = '未登录'
        this.button = '点击登录'
    },
    // 模态框取消删除
    Delete(){
    },
    collect () {
      if (getCookie('userToken')) {
            // alert(1)
      } else {
        this.$router.push({
          name: 'Login'
        })
      }
    },
    outLogin () {
        
      if (getCookie('userToken')) {
        this.show8 = true
      } else {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  },
  mounted () {
        this.$store.dispatch('changehead', '个人中心')
        if (getCookie('userToken')) {
          this.name = 'USER'
          this.button = '退出登录'
        } else {
          this.name = '未登录'
          this.button = '点击登录'
        }
  }
}
</script>

