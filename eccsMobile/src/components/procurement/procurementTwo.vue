
<template>
  <div class="procurementTwo" v-wechat-title="$route.meta.title">
    <div class="procurementTwoBox" v-if='keyState' v-wechat-title="$route.meta.title">
    暂无数据
    </div>
    <p class="drop-down" v-if="dropDown">刷新数据...</p>
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <ul>
                   <li v-for='i,index in data'>
                      <div class="itemTop">
                        <span style='float: left;'>{{i.buyArea}}</span>
                        <span style="width:4.666667rem;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;"><nobr>{{i.chanceName}}</nobr></span>
                        <span class="detail" @click='godetails(i.id)'>查看详情</span>
                      </div>
                      <div class="itemContent">
                        <div class="event" style="border-right: 1px silid #e8e8e8">
                            <span>开始时间</span>
                            <span>{{i.beginDate}}</span>
                        </div>
                        <div class="event" style="border-right: 1px silid #e8e8e8">
                            <span>结束时间</span>
                            <span>{{i.endDate}}</span>
                        </div>
                        <div class="event">
                            <span>阶段</span>
                            <span>{{i.stage}}</span>
                        </div>
                      </div>
                      <div class="itemInfo">
                        <span class="title">内容摘要：</span>
                        <span>{{info[index]}}</span>
                      </div>
                   </li>
                   <li v-if='text' class="textAlert">已加载全部内容</li>
                </ul>
            </div>
        </div>
        <!-- <p class="more" v-if='up'></p> -->
  </div>
</template>
<script>
  import { Loading } from 'vux'
  import BScroll from 'better-scroll'
  import {getCookie} from '../../assets/js/cookie.js'
  export default {
  name: 'procurementTwo',
  data () {
      return {
          text:true,
          keyState:false,
          dropDown: false,
          up: false,
          data: [],
          info: [],
          pramas: {
              pageNumber: 1,
              pageSize: 5
            }
        }
    },
  components:{
    Loading
  },
  methods: {
    request(){
        this.$api.post('http://116.196.89.209:9004/open/api/chance/buyBidInfo', this.pramas, res => {
          if (res.status >= 200 && res.status < 300) {
            if(this.data.length == res.data.data.chanceList.length){
              this.text = true
            }else{
              this.text = false
            }
            if(this.keyState){
              this.text = false
            }
          }else {
            console.log(res + '信息请求确认出错')
          }
        })
      },
    godetails (id) {
        let token = getCookie('userToken')
        if (token) {
          this.$router.push({
            name: 'ProcurementDetails',
            query: {
              id: id
            }
          })
        }else {
          this.$router.push({
        name: 'Login'
      })
        }
    },
    requestData () {
        this.$vux.loading.show({
          text:'Loading'
        })
        this.$api.post('http://116.196.89.209:9004/open/api/chance/buyInviteInfo', this.pramas, res => {
          if (res.status >= 200 && res.status < 300) {
            if (!res.data.data.chanceList.length) {
                this.keyState = true
              }else {
                this.keyState = false
              }
            if(this.data.length == res.data.data.chanceList.length){
              if(this.keyState){
                this.text = false
              }else{
                this.text = true
              }
            }else{
              this.text = false
            }
            this.data = res.data.data.chanceList
            for (var i = 0; i < res.data.data.chanceList.length; i++) {
              this.info.push(res.data.data.chanceList[i].chanceInfo.substr(0, 15))
            }
              this.$vux.loading.hide()
          }else {
            console.log(res + '中标信息请求出错')
          }
        })
    },
    requestData1 () {
        this.$vux.loading.show({
          text:'Loading'
        })
        this.$api.post('http://116.196.89.209:9004/open/api/chance/buyInviteInfo', this.pramas, res => {
          if (res.status >= 200 && res.status < 300) {
            if (!res.data.data.chanceList.length) {
                this.keyState = true
              }else {
                this.keyState = false
              }
            this.text = false
            this.data = res.data.data.chanceList
            for (var i = 0; i < res.data.data.chanceList.length; i++) {
              this.info.push(res.data.data.chanceList[i].chanceInfo.substr(0, 15))
            }
              this.$vux.loading.hide()
          }else {
            console.log(res + '中标信息请求出错')
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
                      if (pos.y < this.scroll.maxScrollY + 20) {
                        this.up = true
                      } else{
                        this.up = false
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
                      this.pramas.pageSize = 5
                      this.requestData1()
                      this.dropDown = false
                    }
                    // 上拉加载 总高度>下拉的高度+10 触发加载更多
                  if (this.scroll.maxScrollY > pos.y + 20) {
                      this.pramas.pageSize += 5
                      this.requestData()
                      this.up = false
                      
                    }
                    this.scroll.refresh()
                })
            })
        }
    },
  computed: {
      searchState () {
        return this.$store.state.search
      },
      keyword () {
        return this.$store.state.keyword
      }
    },
  watch: {
      searchState () {
        this.pramas.keyWord = this.keyword
        this.requestData()
        this.scrollFn()
      }
    },
  mounted () {
      this.$store.commit('PROCUREMENT', '招标')
      this.pramas.keyWord = this.keyword
      this.requestData()
      this.scrollFn()
      this.$store.commit('PROCUREMENTSTATE', 1)
      this.request()
    }

}
</script>
<style scoped>
  .procurementTwo{
    height: 80%;
   background-color: #f6f6f6;
   position: relative;
   font-family: '微软雅黑'
  }
  .procurementTwoBox{
    width: 100%;
    font-size: 0.4rem;
    text-align: center;
    padding-top: 1.266667rem;
    color: #55555555;
  }
  .bscroll{
    width: 100%;
    height:100%;
    overflow: hidden;
    z-index: 100;
}
.bscroll ul{
  list-style: none;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.bscroll ul li{
  width: 100%;
  height: 4.533333rem;
  margin-bottom: 2%;
  background-color: #ffffff;
}
.bscroll ul li .itemTop{
  width: 90%;
  height: 1.2rem;
  margin: 0 auto;
  border-bottom: 1px solid #e8e8e8;
}
.bscroll ul li .itemTop span{
  display: inline-block;
  font-size: 0.4rem;
  margin-right: 0.333333rem;
  height: 100%;
  line-height: 1.2rem;
}
.bscroll ul li .itemTop .detail{
  float: right;
  margin-right: 0px;
    color: #17a6b5;
}
.bscroll ul li .itemContent{
  width: 90%;
  height: 2.266667rem;
  margin: 0 auto;
  /*border-bottom: 1px solid #e8e8e8;*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.bscroll ul li .itemContent .event{
  width: 33%;
}
.bscroll ul li .itemContent .event span{
  display: block;
  text-align: center;
  font-size: 0.4rem;
  color: #555555;
  
}
.bscroll ul li .itemInfo{
  width: 90%;
  height: 1.066667rem;
  margin: 0 auto;
  padding-top: 10px;
}
.bscroll ul li .itemInfo span{
  color: #555555;
  font-size: 0.4rem;
}
.drop-down{
   font-size: 0.373333rem;
   color: #ccc;
   position: absolute;
   top: 10px;
   width: 100%;
   text-align: center; 
}
.more{
  font-size: 0.373333rem;
   color: #ccc;
   position: absolute;
   bottom: 8%;
   width: 100%;
   text-align: center;
}
.textAlert{
  height: 1.2rem !important;
  line-height: 1.2rem;
  margin: 0 auto;
  text-align: center;
}
</style>