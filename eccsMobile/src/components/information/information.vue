<template>
	<div class="box" v-wechat-title="$route.meta.title">
		<div class="search">
			<img src="../../assets/information/top.png" alt="">
			<div class="searchBox">
				<input v-model="key" type="text" placeholder="请输入搜索关键词">
				<icon @click.native="handleSearch" type="search" class='icon'></icon>
			</div>
		</div>
		<div class="informationBox">
        <div class="informationTextAlert" v-if='keyState' v-wechat-title="$route.meta.title">
        暂无数据
        </div>
        <p class="drop-down" v-if="dropDown">刷新数据...</p>
        <div class="bscroll" ref="bscroll">
            <ul class="informationDetails">
                <li :key='idx' v-for='(item,idx) in news'  @click="goDetail(item.article.id)">
                    <div class="title">{{item.article.title}}</div>
                    <p>
                        {{item.article.info}}
                    </p>
                    <div class="right" v-if='imgShow[idx]' style="margin-top:0.266667rem">
                      <img :src="imgUrl[idx]" alt="" width="100%" height="190px">
                    </div>
                    <div class="date">
                        <span>{{item.date}}</span>
                        <i class="iconfont icon-gengduo"></i>
                    </div>
                </li>
                <li v-if='text' class="textAlert">已加载全部内容</li>
            </ul>
        </div>
		</div>
	</div>
</template>
<script>
  import { Loading } from 'vux'
  import BScroll from 'better-scroll'
import { Icon, ViewBox } from 'vux'
export default {
  components: {
    Icon,
    ViewBox,
    Loading
  },
  data () {
    return {
      http: 'http://116.196.89.209:9001',
      url: '/open/api/cms/allNews',
      news: [],
      key: '',
      keyState:false,
      dropDown:false,
      text:false,
      params:{
        pageNumber: 1,
        pageSize: 5,
        keyWord: ''
      },
      imgUrl:[],
      imgShow:[]


    }
  },
  methods: {
    //   detail
    goDetail (id) {
      this.$router.push({
        name: 'InformationDetails',
        query: {
          id: id
        }
      })
    },
    //   seartch
    handleSearch () {
      console.log(this.key)
      this.$router.push({
        name: 'InformationSeartch',
        query: {
          keyWord: this.key
        }
      })
    },
    server (url, pa) {
      this.$vux.loading.show({
        text:'Loading'
      })
      return this.$api.post(url, pa, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.data.mapList.length > 0) {
            if(this.news.length == response.data.data.mapList.length){
              if(this.news.length == 0){
                this.keyState = true
                this.text = false
              }else{
                this.text = true
                this.keyState = false
              }
              
            }
            this.news = response.data.data.mapList
            this.imgShow = [];
            this.imgUrl = [];
            for (var i = 0; i < this.news.length; i++) {
              if(this.news[i].article.picurl){
                this.imgShow.push(true)
              }else{
                this.imgShow.push(false)
              }
              this.imgUrl.push('http://116.196.89.209:9002'+this.news[i].article.picurl)
            }
          } else {
            this.news = []
          }
          this.$vux.loading.hide()
        } else {
          this.$vux.toast.show({
            text: response.message,
            type: 'text'
          })
        }
      })
    },
    server1 (url, pa) {
      this.$vux.loading.show({
        text:'Loading'
      })
      return this.$api.post(url, pa, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.data.mapList.length > 0) {
            if(this.news.length == response.data.data.mapList.length){
              if(this.news.length == 0){
                this.keyState = true
                this.text = false
              }else{
                this.text = false
                this.keyState = false
              }
              
            }
            this.news = response.data.data.mapList
            this.imgShow = [];
            this.imgUrl = [];
            for (var i = 0; i < this.news.length; i++) {
              if(this.news[i].article.picurl){
                this.imgShow.push(true)
              }else{
                this.imgShow.push(false)
              }
              this.imgUrl.push('http://116.196.89.209:9002'+this.news[i].article.picurl)
            }
          } else {
            this.news = []
          }
          this.$vux.loading.hide()
        } else {
          this.$vux.toast.show({
            text: response.message,
            type: 'text'
          })
        }
      })
    },
    scrollFn () {
       this.$nextTick(() =>{
          this.scroll = new BScroll(this.$refs.bscroll, {
                  click: true,
                  scrollY: true,
                  probeType: 3
                })
          this.scroll.on('scroll', (pos) => {
            if (pos.y != 0) {
              if (pos.y > 50) {
                  this.dropDown = true
              } else{
                  this.dropDown = false
              }
            }
          })
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
                this.params.pageSize = 5;
                this.server1(this.http+this.url,this.params)
                this.dropDown = false
              }
              // 上拉加载 总高度>下拉的高度+10 触发加载更多
            if (this.scroll.maxScrollY > pos.y + 20) {
                this.params.pageSize += 5
                this.server(this.http+this.url,this.params)
              }
              this.scroll.refresh()
          })
       })
    }
  },
  activated () {
    let {url, http} = this
    this.server(http + url, this.params)
  },
  mounted () {
    // console.log('新闻资讯')
    this.$store.dispatch('changehead', '新闻资讯')
    let {url, http} = this
    let pa = {
      pageNumber: 1,
      pageSize: 5,
      keyWord: ''
    }
    this.server(http + url, pa)
    this.scrollFn()
  }
}
</script>
<style scoped>
.box {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.search {
  position: relative;
  height: 25%;
}
.search img {
  height: 100%;
  width: 100%;
}
.search .searchBox {
  position: absolute;
  top: 10px;
  left: 50%;
  margin-left: -35%;
  height: 0.8rem;
  width: 70%;
}
.search .searchBox input {
  height: 100%;
  width: 100%;
  border-radius: 100px;
  outline: none;
  border: none;
  opacity: 0.8;
  text-indent: 1em;
  font-size: 14px;
}
.search .searchBox .icon {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
}
.informationBox {
  height: 75%;
  width: 100%;
  position: absolute;
  bottom: 0.0rem;
  background-color: #f4f4f4;
}
.informationBox .bscroll ul li{
  /*height:4rem;*/
  background-color: #fff;
}
.bscroll{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.drop-down{
   font-size: 0.373333rem;
   color: #ccc;
   position: absolute;
   top: 10px;
   width: 100%;
   text-align: center; 
}
.informationTextAlert{
  width: 100%;
  font-size: 0.4rem;
  text-align: center;
  padding-top: 1.266667rem;
  color: #55555555;
}
.textAlert{
  height: 1.2rem !important;
  line-height: 1.2rem;
  margin: 0 auto;
  text-align: center;
  padding: 0px !important;
}
</style>
<style lang="less" scoped>
li{list-style: none;}
.informationDetails {
    width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background-color: #fff;
  li{
      padding:.5rem 0;
      box-sizing: border-box;
      border-bottom: 1px solid #e8e8e8;
      &:last-child{border:none;}
      .title{
          font-size: .453333rem;
          color:#1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      p{
          width:100%;
          font-size: .373333rem;
          color:#555555;
          margin-top:.3rem;
           overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;//（行数）
            -webkit-box-orient: vertical;
      }
      .date{
          display: flex;
          justify-content: space-between;
          font-size: .346667rem;
          color: #C7C7C7;
      }
  }
}
</style>