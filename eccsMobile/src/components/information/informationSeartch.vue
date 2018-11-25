<template>
    <div class='infoSearch' v-wechat-title="$route.meta.title">
        <div class="position">
            <div class="searchBox">
                <input v-model="key" type="text" placeholder="请输入搜索关键词">
                <icon @click.native="handleSearch" type="search" class='icon'></icon>
            </div>
            <div class="search">
                    <icon @click.native="handleSearch" type="search" class='icon'></icon>
                    <span>全部结果</span>            
            </div>
        </div>
        <div class="informationDetails">
            <div class="procurementTwoBox" v-if='keyState' v-wechat-title="$route.meta.title">
            暂无数据
            </div>
            <p class="drop-down" v-if="dropDown">刷新数据...</p>
            <div ref="bscroll" style="height:100%;width: 100%;background-color: #f6f6f6;">
              <ul style="background-color:#fff">
                <li :key='idx' v-for='(item,idx) in news'   @click="goDetail(item.article.id)">
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
import BScroll from 'better-scroll'
import { Icon,Loading } from 'vux'
export default {
  components: { Icon,Loading },
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
      },
      imgUrl:[],
      imgShow:[]
    }
  },
  methods: {
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
      let { url, http } = this
      let pa = {
        pageNumber: 1,
        pageSize: 5,
        keyWord: this.key
      }
      this.server(http + url, pa)
    },
    server (url, pa) {
      this.$vux.loading.show({
        text:'Loading'
      })
      return this.$api.post(url, pa, response => {
        if (response.status >= 200 && response.status < 300) {
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
          if(this.news.length == 0){
            this.keyState = true
          }else{
            this.keyState = false
          }
          this.$vux.loading.hide()
        } else {
          console.log(response.message)
        }
      })
    },
    server1 (url, pa) {
      this.$vux.loading.show({
        text:'Loading'
      })
      return this.$api.post(url, pa, response => {
        if (response.status >= 200 && response.status < 300) {
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
          if(this.news.length == 0){
            this.keyState = true
          }else{
            this.keyState = false
          }
          this.$vux.loading.hide()
        } else {
          console.log(response.message)
        }
      })
    },
    scrollFn () {
        this.$nextTick(() => {
              // if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.bscroll, {
                    click: true,
                    scrollY: true,
                    probeType: 3
                  })
              // }else{
              //     this.scroll.refresh();
              // }
              this.scroll.on('scroll', (pos) => {
                // 如果下拉超过50px 就显示下拉刷新的文字
                if (pos.y != 0) {
                    if (pos.y > 50) {
                        this.dropDown = true
                    } else{
                        this.dropDown = false
                    }
                  
                  }
              })
               this.scroll.on('scrollEnd',(pos) =>{
                this.dropDown = false
              })
              // touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
            this.scroll.on('touchEnd', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                    this.params.pageSize = 5
                    let { url, http } = this
                    let pa = {
                      pageNumber: 1,
                      pageSize: 5,
                      keyWord: this.key
                    }
                    this.server1(http + url, pa)
                  }
                  // 上拉加载 总高度>下拉的高度+10 触发加载更多
                if (this.scroll.maxScrollY > pos.y + 20) {
                  this.params.keyWord=this.$route.query.keyWord
                  let { url, http } = this
                   this.params.pageSize +=5;
                   this.server(http + url, this.params)
                  }
                  this.scroll.refresh()
              })
          })
      }
  },
  activated () {
    this.$store.dispatch('changehead', '新闻资讯')
    this.key = this.$route.query.keyWord
    let { url, http } = this
    let pa = {
      pageNumber: 1,
      pageSize: 5,
      keyWord: this.key
    }
    this.server(http + url, pa)
    this.scrollFn()
  }
}
</script>
<style lang="less" scoped>
.infoSearch {
    height: 100%;
    .position{
        position: relative;
        background-color: #fff;
        width: 100%;
        height: auto;
        top:0;
        padding-bottom: 10px;
    }
  .searchBox {
    width: 100%;
    height: 0.8rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    position: relative;
    margin-top: 10px;
    .icon {
      position: absolute;
      right: 0.506667rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #b5b5b5;
    }
    input[type="text"] {
      height: 100%;
      width: 100%;
      border-radius: 100px;
      outline: none;
      border: none;
      opacity: 0.8;
      text-indent: 1em;
      font-size: 14px;
      background-color: #f7f7f7;
    }
  }
}
.search {
 margin-top: 0.4rem;
    padding-left: 0.4rem;
    color: #16a7b5;
    // position: fixed;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 0.373333rem;
  .icon {
    color: #16a7b5;
  }
}
li {
  list-style: none;
}
.informationDetails {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 93.9%;
  box-sizing: border-box;
  .drop-down{
   font-size: 0.373333rem;
   color: #ccc;
   position: absolute;
   top: 10px;
   width: 100%;
   text-align: center; 
  }
  .procurementTwoBox{
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
    padding: 0 !important;
  }
  li {
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;border-bottom: 1px solid #e8e8e8;
      &:last-child{border:none;}
    .title {
      font-size: 0.453333rem;
      color: #1a1a1a;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      width: 100%;
      font-size: 0.373333rem;
      color: #555555;
      margin-top: 0.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //（行数）
      -webkit-box-orient: vertical;
    }
    .date {
      display: flex;
      justify-content: space-between;
      font-size: 0.346667rem;
      color: #c7c7c7;
    }
  }
}

</style>
