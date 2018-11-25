<template>
  <div class="companyContent">
    <div class="companyHead">
      <span>{{companyInfo.storeName}}</span>
      <!--<div class="Honor">
          <div class="year">
              6 <sup>YR</sup>
          </div>
          <div class="name">
              Gold Supplier
          </div>
      </div>-->
    </div>
    <div class="companyBanner">
      <div id="companySwiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div :key="banner.id" v-for="banner in banners" class="swiper-slide">
            <a :href="banner.url" target="_blank"><img :src="imgUrl+banner.picurl" alt=""></a>
          </div>
        </div>
        <div id="companyPagination" class="swiper-pagination"></div><!--点分页器-->
        <div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
        <div class="swiper-button-next swiper-button-white"></div><!--右箭头-->
      </div>
    </div>
    <div class="companyInfo">
      <!--公司简介-->
      <div class="infoBox">
        <div class="top">公司简介</div>
        <div class="bottom">
          <div class="left">
            <span>企业类型：{{companyInfo.storeClass}}</span>
            <span>成立时间：{{companyInfo.createTime}}</span>
            <span>注册资金：{{companyInfo.companyRegisteredCapital}}</span>
            <span>业务类型：
                            <span v-if="companyInfo.type==1">供应商</span>
                            <span v-if="companyInfo.type==2">采购商</span>
                            <span v-if="companyInfo.type==3">采购商/供应商</span>
                        </span>
            <span>主营产品：{{companyInfo.storeGoods}}</span>
            <span>主要市场：{{companyInfo.storeSalePlace}}</span>
          </div>
          <div class="center">
            <span>员工总数：{{companyInfo.companyEmployeeCount}}</span>
            <span>年总收入：{{companyInfo.yearIncome}}</span>
            <span>位置：{{companyInfo.address}}</span>
            <span class="info">简介：{{companyInfo.companyInfo}}</span>
          </div>
          <div class="right">
            <div class="name"><i class="iconfont icon-man"></i>{{companyInfo.contactsName}}</div>
            <div class="contact">
              <div class="leaving">
                <i class="iconfont icon-pinpaibiaoshi-aliwangwang"></i>
                联系我们
              </div>
              <div v-if="companyInfo.contactsPhone" class="button"><i
                class="iconfont icon-shouji"></i><span>{{companyInfo.contactsPhone}}</span></div>
              <div v-if="companyInfo.companyPhone" class="button"><i class="iconfont icon-iconphone1"></i><span>{{companyInfo.companyPhone}}</span>
              </div>
              <div v-if="companyInfo.contactsEmail" class="button"><i
                class="iconfont icon-iconfontunie62c"></i><span>{{companyInfo.contactsEmail}}</span>
              </div>
            </div>
          </div>
        </div>
        <ul class="Authentication">
          <li><i class="iconfont icon-shenfenzhengrenzheng"></i><span>企业身份认证</span></li>
          <li><i class="iconfont icon-shoujirenzheng"></i><span>实体认证</span></li>
          <li><i class="iconfont icon-yinxingqiarenzheng"></i><span>质量保障</span></li>
          <li><i class="iconfont icon-wangyinrenzheng"></i><span>发货保障</span></li>
          <li><i class="iconfont icon-shipinrenzheng"></i><span>售后认证</span></li>
          <li><i class="iconfont icon-guimianrenzheng"></i><span>买家保障</span></li>
        </ul>
      </div>
      <!-- 商机列表 companyInfo.type!==2||-->
      <div v-if="admission==1||admission==2" class="businessList">
        <div class="top">商机列表</div>
        <table>
          <tr class="table-header">
            <th>区域</th>
            <th>商机类型</th>
            <th>内容摘要</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>阶段</th>
            <th></th>
          </tr>
          <tr class="table-body" v-for='(item,index) in businessList.data' :key=index>
            <td>{{item.buyArea}}</td>
            <td class="tdTwo">
              <img :src="businessList.img[index]" alt="">
              <span class="span1">{{item.chanceTypeName}}</span>
            </td>
            <td class="tdthree">
              <div>
                <span class="span1">{{item.chanceName}}</span>
                <span class="span2">{{item.chanceInfo}}</span>
              </div>
            </td>
            <td>{{item.beginDate}}</td>
            <td>{{item.endDate}}</td>
            <td>{{item.stage}}</td>
            <td><a @click='goPath(item)'>详情信息</a></td>
          </tr>
          <tr v-if='businessList.data.length<=0' class="businessListBoolean">
            <td colspan="7">抱歉，没有数据！！！</td>
          </tr>
        </table>
        <div class="block">
          <el-pagination
            @current-change="businessListCurrentChange"
            :page-size='1'
            :pager-count='5'
            layout="prev, pager, next, jumper"
            :total="businessList.total" prev-text='上一页' next-text='下一页'>
          </el-pagination>
        </div>
      </div>
      <!--产品简介-->
      <div v-if="admission==0||admission==2" class="proBox">
        <div class="top">产品简介</div>
        <div class="bottom">
          <div class="left">
            <div @click="goodsClick()" style="cursor: pointer" id="title" class="title">
              <i class="iconfont icon-star1"></i>
              <span>全部产品</span>
            </div>
            <ul id="navBar">
              <li @click="goodsClick(list.id)" :key="list.id" v-for="list in goodsLists">{{list.name}}<i
                class="iconfont icon-arrowRight"></i></li>
            </ul>
          </div>
          <ul class="right">
            <li @click="goGoodsDetail(goods.goodsId)"
                v-if="goods.imgUrl"
                :key="goods.id"
                v-for="goods in listGoods">
              <div class="imgBox">
                <img :src="imgUrl+goods.imgUrl" alt="">
              </div>
              <div class="textBox">
                <div class="title">
                  {{goods.goodsName}}
                </div>
                <span>零售价：￥{{goods.salePrice}}/套</span>
                <!--<span>批发价：{{goods.wholesalePrice}}/套</span>-->
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :page-count="pageCount"
            :pager-count="pagerCount"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .businessListBoolean {
    td {
      height: 100px;
      background-color: #fafafa;
      text-align: center;
      font-size: 20px;
      color: #b1b1b1;
      border-bottom: 1px solid #ebeef5;
    }
  }

  .info {
    height: 120px;
    white-space: normal !important;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
</style>
<script>
  import {getCookie} from '../../assets/js/cookie.js'
  import api from '../../api.js'
  import $ from 'jquery';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import "../../assets/css/CompanyHomePage.less";
  $(function () {
    /*$('#navBar>li').on("click",function(){
     $(this).addClass("active").siblings().removeClass("active")

     })*/
  })
  export default{
    name: 'companyHomePage',
    data(){
      return {
        id: '',
        classId: '',
        banners: [],
        goodsLists: [],
        companyInfo: {},
        listGoods: [],
        currentPage: 1, /*当前页数*/
        pageSize: 5, /*每页显示条数*/
        pageCount: 1, /*总页数*/
        pagerCount: 5, /*页码按钮的数量，当总页数超过该值时会折叠*/
        imgUrl: '',
        businessList: {
          Listparams: {
            pageNumber: 1,
            pageSize: 5,
            token:''
          },
          currentPage: 1,
          total: 0,
          data: [],
          img: [],
          businessListBoolean: false,
        },

      }
    },
    computed: {
      admission: function() {
        return this.$store.state.personal.Admission
      }
    },
    mounted(){
      this.businessList.Listparams.token=getCookie('userToken');
      // 页面刷新头部状态
      $('#top-nav .top-nav-link').find('li').eq(2).children().css('color', '#fff');
      $('#top-nav .top-nav-link').find('li').eq(0).children().css('color', '#fff');
      $('#top-nav .top-nav-link').find('li').eq(1).children().css('color', '#fff');
      $('#top-nav .top-nav-link').find('li').eq(3).children().css('color', '#fff');
      // 商机列表
      this.businessListRequest(this.businessList.Listparams);
      //
      this.imgUrl = api.imgUrl;
      this.id = this.$route.query.id;
      let id = this.id;
      /*console.log(id,this.id)*/
      let store = {
        storeId: id
      }
      let pa = {
        storeId: id,
        pageNumber: 1,
        pageSize: 5,
      }
      this.server('/open/api/goods/supplyHomePage', store).then(res => {
//                    console.log(res)
        this.banners = res.data.storeBanners;
        this.goodsLists = res.data.oneClassList;
        this.companyInfo = res.data.storeMain;


      }).then(function () {
        new Swiper('#companySwiper', {
          autoplay: true,//可选选项，自动滑动
          pagination: {
            el: '#companyPagination',
            backgroundColor: '#fff'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      });
      this.server('/open/api/goods/supplyStoreGoods', pa).then(res => {
//                    console.log('产品分类',res)
        this.listGoods = res.data.goodsList;
        this.pageCount = res.data.totalPage;

      });
      /*产品分类*/


    },
    methods: {
      goPath(params){
        let query = {}
        query.chanceId = params.id;
        query.appid = getCookie('userId');
        query.token = getCookie('userToken');
        /* if (getCookie('userToken')) {*/
        this.$router.push({name: 'BusinessChancelogin', query})
        /*} else {
         this.$message({
         message: '登录查看商机!',
         type: 'warning'
         });
         }*/
      },
      businessListRequest(listParams){
        listParams.storeId = this.$route.query.id
        api.$http(api.businessList, listParams).then(res => {
          this.businessList.total = res.data.pageCount;
          this.businessList.data = res.data.chanceList;
          for (var i = 0; i < res.data.chanceList.length; i++) {
            this.businessList.img.push(this.imgUrl + res.data.chanceList[i].chanceTypeUrl)
          }
          // console.log(this.businessList.img)
        }).catch(err => {
          console.log('采购商商机列表请求出错')
        })
      },
      // 采购商商机列表页改变
      businessListCurrentChange(){
        let liNum = $('.businessList .block .el-pager>.active').text();
        this.businessList.Listparams.pageNumber = liNum;
        this.businessListRequest(this.businessList.Listparams)
      },
      /*服务接口*/
      server: (url, param) => {
        return api.$http(api.serverSupply + api.portSupply + url, param)
      },
      /*点击产品*/
      goGoodsDetail(e){
//              console.log(e)
        this.$router.push({
          name: 'goodsDetail',
          query: {
            id: e
          }
        })
      },
      /*点击产品分类*/
      goodsClick(e){
//              console.log(e)/*修改当前页数*/
        this.classId = e;
        let pa = {
          classId: e,
          storeId: this.id,
          pageNumber: 1,
          pageSize: 5,
        }
        this.server('/open/api/goods/supplyStoreGoods', pa).then(res => {
          this.listGoods = res.data.goodsList;
          this.pageCount = res.data.totalPage;
        });
        if(e){
          $('#navBar>li').on("click", function () {
            $(this).css({background: '#17A6B5', color: '#fff'}).siblings().css({
              background: '#fff',
              color: '#666'
            })
          })
          $('#title').css({background:'#bbb',})
        }else{
          $('#navBar>li').css({
            background: '#fff',
            color: '#666'
          })
          $('#title').css({background:'#17A6B5',})
        }

      },
      /*分页*/
      handleSizeChange(val) {
        /*每页显示条数*/
        /*console.log("1每页"+val+'条')*/
        this.currentPage=1;
        this.pageSize = val;
        /*修改显示每页条数*/
        let pa = {
          classId: this.classId,
          storeId: this.id,
          pageNumber: 1,/*this.currentPage*/
          pageSize: val,
        };
        this.server('/open/api/goods/supplyStoreGoods', pa).then(res => {
          if(res.code){
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }else{
            this.listGoods = res.data.goodsList;
            this.pageCount = res.data.totalPage;
          }
        });
      },
      handleCurrentChange(val) {
        /*当前页*/
        this.currentPage = val;
        /*修改当前页数*/
        let pa = {
          classId: this.classId,
          storeId: this.id,
          pageNumber: val,
          pageSize: this.pageSize,
        };
        this.server('/open/api/goods/supplyStoreGoods', pa).then(res => {
          if(res.code){
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }else{
            this.listGoods = res.data.goodsList;
            this.pageCount = res.data.totalPage;
          }

        });
      }
    },
    /* beforeRouteLeave (to, from, next) {
     $('#top-nav .top-input').css('display','inline-block');
     $('#top-nav .top-nav-link').find('li').eq(2).children().css('color','#fff');
     next();
     },
     beforeRouteEnter (to, from, next) {
     $('#top-nav .top-input').css('display','none');
     $('#top-nav .top-nav-link').find('li').eq(2).children().css('color','#0d545c');
     next()
     },*/
  }
</script>
