<template>
    <div style="padding-bottom:0;" v-wechat-title="$route.meta.title">
        <div class="head">
            <i class="iconfont icon-diqiu"></i><span>{{news.channelName}}</span>
        </div>
        <div class="tip">
            <span>{{news.article.title}}</span>
            <div class="date">{{news.date}} {{news.countryName}}</div>
        </div>
        <div v-html="news.article.content" class="informationDetails"></div>
        <div class="operation">
            <i @click="thumbsUp(news.article.id)" :style='colorUp' :class='iconUp' class="iconfont"></i>
            <i @click="Collection(news.article.id)" :style='colorCollection' :class='iconCollection' class="iconfont"></i>
        </div>      
    </div>
	
</template>
<script>
    import {getCookie} from '../../assets/js/cookie.js'

export default {
  name: 'informationDetails',
  components: {},
  data () {
    return {
      http: 'http://116.196.89.209',
      portNew: ':9001',
      portCollection: ':9006',
      url: '/open/api/cms/newsDetial',
      news: [],
      addLike: '/open/api/cms/addLike',
      addCollection: '/open/api/acc/addCollection',
      iconUp: 'icon-aixin',
      iconCollection: 'icon-favourite',
      colorUp: {},
      colorCollection: {},
      checkLike: '/open/api/cms/checkLike', // 查询是否点赞
      checCollection: '/open/api/acc/checCollection' // 查询是否收藏
    }
  },
  methods: {
    //   点赞
    thumbsUp (id) {
      if(!getCookie('userId')){
        this.$router.push({
           path: '/login'
        })
      }
      let {http, portNew, addLike} = this
      let pa = {
        accountId: getCookie('userId'),
        articleId: id
      }
      this.$api.post(http + portNew + addLike, pa, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.code) {
            this.$vux.toast.show({
              text: response.data.msg,
              type: 'text'
            })
            this.iconUp = 'icon-aixin'
            this.colorUp = {}
          } else {
            this.iconUp = 'icon-aixin1'
            this.colorUp = {color: '#17a6b5'}
          }
        } else {
          this.$vux.toast.show({
            text: response.message,
            type: 'text'
          })
        }
      })
    },
    //   收藏
    Collection (id) {
      if(!getCookie('userId')){
        this.$router.push({
           path: '/login'
        })
      }
      let {http, portCollection, addCollection} = this
      let pa = {
        accountId: getCookie('userId'),
        type: 1,
        typeId: id,
        token: getCookie('userToken')
      }
      this.$api.post(http + portCollection + addCollection, pa, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.code) {
            this.$vux.toast.show({
              text: response.data.msg,
              type: 'text'
            })
            this.iconCollection = 'icon-favourite'
            this.colorCollection = {}
            if (response.data.code == 4) {
              this.iconCollection = 'icon-shoucang1'
              this.colorCollection = {color: '17a6b5'}
            }
          } else {
            this.iconCollection = 'icon-shoucang1'
            this.colorCollection = {color: '17a6b5'}
          }
        } else {
          this.$vux.toast.show({
            text: response.message,
            type: 'text'
          })
        }
      })
    },
    server (url, pa) {
      return this.$api.post(url, pa, response => {
        if (response.status >= 200 && response.status < 300) {
          this.news = response.data.data
          let {http, portNew, checkLike, portCollection, checCollection} = this
          let pa = {
            accountId: getCookie('userId'),
            articleId: response.data.data.article.id
          }
            //   查询点赞
          this.$api.post(http + portNew + checkLike, pa, response => {
            if (response.status >= 200 && response.status < 300) {
              if (response.data.code) {
                this.iconUp = 'icon-aixin'
                this.colorUp = {}
              } else {
                this.iconUp = 'icon-aixin1'
                this.colorUp = {color: '#17a6b5'}
              }
            } else {
              this.$vux.toast.show({
                text: response.message,
                type: 'text'
              })
            }
          })
            //   查询收藏
          let pas = {
            accountId: getCookie('userId'),
            type: 1,
            typeId: response.data.data.article.id
          }
          this.$api.post(http + portCollection + checCollection, pas, response => {
            if (response.status >= 200 && response.status < 300) {
              if (response.data.code) {
                this.iconCollection = 'icon-favourite'
                this.colorCollection = {}
                if (response.data.code == 4) {
                  this.iconCollection = 'icon-shoucang1'
                  this.colorCollection = {color: '17a6b5'}
                }
              } else {
                this.iconCollection = 'icon-shoucang1'
                this.colorCollection = {color: '17a6b5'}
              }
            } else {
              this.$vux.toast.show({
                text: response.message,
                type: 'text'
              })
            }
          })
        } else {
          console.log(response.message)
        }
      })
    }
  },
    //   activated
  activated () {
        this.$store.dispatch('changehead', '新闻资讯')
    this.id = this.$route.query.id
    let {url, http, portNew} = this
    let pa = {
      articleId: this.id
    }
    this.server(http + portNew + url, pa)
  }
}
</script>
<style lang="less" scoped>
.head{
    height:1.28rem;
    display:flex;
    align-items: center;
    font-size: .4rem;
    color:#1A1A1A;
    i{color:#17a6b5;margin:0 .2rem 0 .4rem;font-size:.533333rem;}
}
.tip{
    color:#1A1A1A;
    font-size: .453333rem;
    padding-left:.4rem;
    box-sizing: border-box; 
    .date{
        font-size: .346667rem;
        color:#C7C7C7;
    }
}
.operation{
    width:100%;
    padding:.4rem;
    box-sizing: border-box;
    color:#17a6b5;
    font-size:.533333rem;
    text-align: right;
}
li{list-style: none;}
.informationDetails {
    width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
  overflow: hidden;
  p{
      width:100%;
      overflow: hidden;
    img{
        width:100% !important;
    } 
  }
  
}
</style>
