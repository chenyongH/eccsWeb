<template>
  <div @click="handleClick" class="supplierCont">
    <div class="content">
      <div class="search">
        <div class="procurement-input">
          <el-input @keyup.enter.native="handleSearch" prefix-icon='el-icon-search' v-model="sertchValue"
                    class="input-with-select">

            <el-button @click.native="handleSearch" slot="append">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="hotRecommend">
        <div class="title">热门推荐：</div>
        <a @click="chanceSertchValue(hotRecommend.name)" :key="idxHot"
           v-for="(hotRecommend,idxHot) in hotRecommends">{{hotRecommend.name}}</a>
      </div>
      <div v-if="classNames.length>=0" class="steps">
        <div :key="idx" v-for="(item,idx) in classNames">
          <p>{{item}}</p>&nbsp;&nbsp;
          <span v-if="idx!==classNames.length-1"> > </span>
          &nbsp;&nbsp;
        </div>
      </div>
      <!--搜索筛选-->
      <ul id="filters" class="detail">
        <!--品牌-->
        <!--<li>
            <div class="left">
                <p>品牌：</p>
                <a @click="filter('brandId','')">不限</a>
                <a @click="filter('brandId',brand.id)"
                   v-if="idxBrand<9"
                   :key="idxBrand" v-for="(brand,idxBrand) in brands">{{brand.name}}</a>
            </div>
            <div v-if="brands.length>=9" class="right">
                更多
                <el-dropdown>
                    <el-button  size="mini">
                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="idx>=9"
                                          @click="filter('brandId',brandMore.id)"
                                          v-for="(brandMore,idx) in brands">{{brandMore.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </li>-->
        <!--企业等级-->
        <li v-if="false">
          <div class="left">
            <p>企业等级：</p>
            <a @click="filter('levelId','')">不限</a>
            <a @click="filter('levelId',level.id)" :key="idxLevel"
               v-for="(level,idxLevel) in levels">{{level.name}}</a>
          </div>
        </li>
        <!--企业勋章-->
        <li v-if="false">
          <div class="left">
            <p>企业勋章：</p>
            <a @click="filter('medalId','')">不限</a>
            <a @click="filter('medalId',medal.id)" :key="idxMedal"
               v-for="(medal,idxMedal) in medals">{{medal.medalName}}</a>
          </div>
        </li>
        <!--商品类型-->
        <li>
          <div class="left">
            <p>商品类型：</p>
            <a @click="filter('typeId','')">不限</a>
            <a v-if="idxType<5" @click="filter('typeId',type.id)"
               :key="idxType" v-for="(type,idxType) in types">{{type.name}}</a>
          </div>
          <div v-if="types.length>5" class="right">
            更多
            <el-dropdown>
              <el-button size="mini">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="filter('typeId',typeMore.id)"
                                  :key="idx"
                                  v-if="idx>5" v-for="(typeMore,idx) in types">{{typeMore.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
        <!--规格-->
        <li v-if="specs" :key="idx" v-for="(spec,idx) in specs">
          <div class="left">
            <p>{{spec.name}}：</p>
            <a @click="filter('specId','',idx,true)">不限</a>
            <a :key="specValue.id"
               v-for="(specValue,moreId) in spec.specValues"
               v-if="moreId<5"
               @click="filter('specId',specValue.id,idx)">{{specValue.spec_alias}}</a>
          </div>
          <div v-if="spec.specValues.length>5" class="right">
            更多
            <el-dropdown>
              <el-button size="mini">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="spec.specValues.length>5"
                                  @click="filter('specId',values.id,idx)"
                                  :key="more"
                                  v-for="(values,more) in spec.specValues.slice(5,spec.specValues.length)">
                  {{values.spec_alias}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
        <!--<li>
            <div class="left">
                <p>高级选项：</p>
                <el-dropdown>
                    <el-button size="mini">
                        运行内存<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a href="">16T</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown>
                    <el-button size="mini">
                        运行内存<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a href="">16T</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown>
                    <el-button size="mini">
                        运行内存<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a href="">16T</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown>
                    <el-button size="mini">
                        运行内存<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><a href="">16T</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </li>-->
      </ul>
      <!--品牌img-->
      <div v-if="brands" class="brand">
        <div class="left">品牌：</div>
        <div class="right">
          <div @click.stop="filter('brandId',brand.id)"
               v-if="brand.imgurl" :key="idxB"
               v-for="(brand,idxB) in brands"
               @mouseenter="mouseenter(idxB)"
               class="imgBox">
            <img :src="imgUrl+brand.imgurl" alt="">
          </div>
        </div>
      </div>
      <div class="contents">
        <div class="left">
          <!--筛选-->
          <div class="filter">
            <!--更新时间-->
            <el-dropdown trigger="click" @command="upDateData">
              <el-button>
                更新时间<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">从新到旧(默认)</el-dropdown-item>
                <el-dropdown-item command="1">从旧到新</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--显示顺序-->
            <!--VIP指数-->
            <!--公司规模-->
            <el-dropdown trigger="click" @command="companySize">
              <el-button>
                公司规模<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="size.code"
                                  :key="size.id"
                                  v-for="size in companySizes">
                  {{size.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--注册资本-->
            <label style="display:flex; align-items: center">
              <span style="white-space: nowrap">注册资本</span>
              <el-input style="width: 100px;" size="mini" v-model="state1"></el-input>
              <div>万-</div>
              <!-- @blur="blur"-->
              <el-input style="width: 100px;" size="mini" v-model="state2"></el-input>
              <div>万</div>
            </label>
            <el-button @click.native="blur" size="mini">确定</el-button>
          </div>
          <div class="proBox">
            <div v-if="companyInfor.length<=0" class="nothing">
              {{noData}}
            </div>
            <div v-if="companyInfor.length>0" :key="idxInfo" v-for="(information,idxInfo) in companyInfor"
                 class="enterprise">
              <div class="left">
                <div @click="navToCompany(information.store.id)" class="title">
                  {{information.store.storeName}}
                </div>
                <div class="address">
                  公司地址：{{information.store.storeAddress}}
                </div>
                <div class="product">
                  主营产品：{{information.store.storeGoods}}
                </div>
                <!--******************-->
                <div class="relationship">
                  <div class="vip">
                    <div class="arrow-right"></div>
                    <i class="iconfont icon-vip5"></i>
                    <span>{{information.store.levelName}}</span>
                  </div>
                  <i v-if="information.store.medalImg" class=""><img :src="imgUrl+information.store.medalImg" alt=""></i>
                  <i v-if="information.store.medalImg" class=""><img :src="imgUrl+information.store.medalImg" alt=""></i>
                </div>
                <!--*******************************-->
                <ul class="enterpriseGo">
                  <li @click="navToCompany(information.store.id)"><i class="iconfont icon-photo"></i>企业产品
                  </li>
                  <li v-if="information.store.storeTel"><i
                    class="iconfont icon-phonecall"></i>{{information.store.storeTel}}
                  </li>
                  <!--<li><i class="iconfont icon-xinfengtianchong"></i>给我留言</li>-->
                </ul>
              </div>
              <ul class="right">
                <li @click="goGoodsDetail(good.id)" v-if="good.imageList" :key="good.id"
                    v-for="good in information.goods">
                  <img :src="imgUrl+good.imageList[0].imgList" alt="">
                  <span>{{good.name}}</span>
                </li>
              </ul>
            </div>
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
        <div class="right">
          <div class="side">
            <div class="title">本月排行</div>
            <ul>
              <li @click="goGoodsDetail(month.contentId)" style="cursor: pointer"
                  :key="idx"
                  v-for="(month,idx) in rankings.monthHots">
                <span><i>{{idx + 1}}</i>{{month.name}}</span><em></em></li>
            </ul>
          </div>
          <div class="side">
            <div class="title">商品排行</div>
            <ul>
              <li @click="goGoodsDetail(hots.contentId)" style="cursor: pointer"
                  :key="idx"
                  v-for="(hots,idx) in rankings.hots">
                <span><i>{{idx + 1}}</i>{{hots.name}}</span><em></em></li>
            </ul>
          </div>
          <div class="side">
            <div class="title">公司排行</div>
            <ul>
              <li @click="goCompanyHomePage(store.contentId)" style="cursor: pointer"
                  :key="idx"
                  v-for="(store,idx) in rankings.storeHots">
                <span><i>{{idx + 1}}</i>{{store.name}}</span><em></em></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <swiper></swiper>
  </div>
</template>
<style lang="less" scoped>
  .procurement-input {
    width: 1200px;
    margin: 0 auto;
    height: 44px;
    border: 2px solid #17a6b5;
    border-radius: 5px;
    /*position: relative;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .steps {
    display: flex;
    margin-bottom: 20px;
    div {
      display: flex;
    }
  }
</style>
<style>
  .search .procurement-input .el-input-group__prepend {
    width: 90px;
    padding: 0;
    height: 40px;
  }

  .search .procurement-input .el-input-group {
    /*width: 1116px;*/
    /*position: absolute;*/
    /*right: 0;*/
    height: 100%;

  }

  .search .procurement-input .el-input--suffix .el-input__inner {
    padding-left: 18px;
  }

  .search .procurement-input .el-input__suffix {
    width: 14px;
  }

  .search .procurement-input .el-select .el-input .el-select__caret {
    width: 10px;
    padding: 0;

  }

  .search .procurement-input .el-input__inner {
    border: none;
  }

  .search .procurement-input .el-input__icon {
    font-size: 20px;
  }

  .search .procurement-input .el-input-group__append {
    width: 120px;
    text-align: center;
    color: #fff;
    background-color: #17a6b5;
    border: none;
    border-radius: 0px;
    font-size: 14px;
    box-sizing: border-box;
  }
</style>
<script>
  import Vue from "vue"
  import $ from 'jquery';
  import swiper from "../swiper";
  import "../../assets/css/Supplier.less"
  import api from '../../api.js'
  export default {
    name: "supplier",
    components: {
      swiper
    },
    data(){
      return {
        noData: '暂无数据',
        screenGoodsByType: '/open/api/goods/screenGoodsByType',
        classNames: [],
        sertchValue: '',
        hotRecommends: [], /*热门推荐*/
        restaurants: [],
        state1: '',
        state2: '',
        currentPage: 1, /*当前页数*/
        pageSize: 5, /*每页显示条数*/
        pageCount: 1, /*总页数*/
        pagerCount: 5, /*页码按钮的数量，当总页数超过该值时会折叠*/
        companyInfor: [],
        id: 0,
        typeId: '', /*类型*/
        imgUrl: '',
        supplyList: '/open/api/goods/supplyList',
        filterApi: '/open/api/goods/screenGoodsList',
        goodsHot: '/open/api/goods/goodsHot', /*排行*/
        rankings: [], /*排行*/
        /*filter*/
        specs: [], /*规格*/
        types: [], /*类型*/
        brands: [], /*品牌*/
        levels: [], /*等级*/
        medals: [], /*勋章*/
        query: {
          specId: ['', ''],
          typeId: '',
          brandId: '',
          levelId: '',
          medalId: '',
        },
        /*排序*/
        sortlist: {
          timeSort: '0', /*更新时间*/
          levelSort: ''
        },
        companySizes: [], /*公司规模*/
        keyword: '/open/api/chance/keyword',
      }
    },
    methods: {
      /*页面点击*/
      handleClick(){
        $('.imgBox').css({border: '1px solid #f1f1f1'})
        if (this.query.brandId) {
          /*清空品牌*/
          this.filter('brandId', '');
        }
      },
      /*品牌选中*/
      mouseenter(index){
        $('.imgBox').css({border: '1px solid #f1f1f1'}).eq(index).css({border: '1px solid red'})
      },
      /*搜索*/
      handleSearch(){
        this.companyInfor = [];
        this.noData = '';
        /*清空数据*/
        let url = this.supplyList,
          pa = {
            classId: this.id,
            keyWord: this.sertchValue,
            pageNumber: 1,
            pageSize: 5
          };
        this.server(url, api.portSupply, pa).then(res => {
          if (res.code) {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          } else if (res.data.storeList.length > 0) {
            this.companyInfor = res.data.storeList;
            this.pageCount = res.data.pageCount;
          } else {
            return this.companyInfor = []
          }

        }).then(() => {
          this.noData = '暂无数据'
        });
      },
      /*点击热门推荐*/
      chanceSertchValue(e){
        this.noData = '';
        /*清空数据*/
        this.companyInfor = [];
        this.sertchValue = e;
        let url = this.supplyList,
          pa = {
            keyWord: e,
            classId: this.id,
            pageNumber: 1,
            pageSize: 5
          };
        this.server(url, api.portSupply, pa).then(res => {
          if (res.code) {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          } else if (res.data.storeList.length > 0) {
            this.companyInfor = res.data.storeList;
            this.pageCount = res.data.pageCount;
          } else {
            this.companyInfor = [];
          }
        }).then(() => {
          this.noData = '暂无数据'
        });
      },
      /*公司主页*/
      goCompanyHomePage(id){
        this.$router.push({
          name: 'companyHomePage',
          query: {
            id: id
          }
        })
      },
      /*****************************排序***************************/
      /*注册资金*/
      blur(){
        this.noData = '';
        /*清空数据*/
        this.companyInfor = [];
        /*输入排序*/
        let params = {
            specId: JSON.stringify(this.query.specId),
            typeId: this.query.typeId,
            brandId: this.query.brandId,
            levelId: this.query.levelId,
            medalId: this.query.medalId,
            ...this.sortlist,
            minCapital: this.state1,
            maxCapital: this.state2,
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            classId: this.id,
            keyWord: this.sertchValue
          },
          supply = this.supplyList
        ;
        /*if(this.state1&&this.state2){*/
        this.server(supply, api.portSupply, params).then(res => {
          this.companyInfor = res.data.storeList;
          this.pageCount = res.data.pageCount;
        }).then(() => {
          this.noData = '暂无数据'
        });
        /*}*/
      },
      querySearch(queryString, cb) {
        /*输入项*/
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          {"value": '500'},
          {"value": "1000"},
        ];
      },
      /*公司规模*/
      companySize(e){
        this.companyInfor = [];
        this.noData = '';
        /*清空数据*/
        this.sortlist.levelSort = e;
        let params = {
            specId: JSON.stringify(this.query.specId),
            typeId: this.query.typeId,
            brandId: this.query.brandId,
            levelId: this.query.levelId,
            medalId: this.query.medalId,
            ...this.sortlist,
            minCapital: this.state1,
            maxCapital: this.state2,
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            classId: this.id,
            keyWord: this.sertchValue
          },
          supply = this.supplyList
        ;
        this.server(supply, api.portSupply, params).then(res => {
          this.companyInfor = res.data.storeList;
          this.pageCount = res.data.pageCount;
        }).then(() => {
          this.noData = '暂无数据'
        });
        /*console.log(this.sortlist)*/
      },
      /*更新时间*/
      upDateData(e){
        this.noData = '';
        /*清空数据*/
        this.companyInfor = [];
        this.sortlist.timeSort = e;
        let params = {
            specId: JSON.stringify(this.query.specId),
            typeId: this.query.typeId,
            brandId: this.query.brandId,
            levelId: this.query.levelId,
            medalId: this.query.medalId,
            ...this.sortlist,
            minCapital: this.state1,
            maxCapital: this.state2,
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            classId: this.id,
            keyWord: this.sertchValue
          },
          supply = this.supplyList
        ;
        this.server(supply, api.portSupply, params).then(res => {
          this.companyInfor = res.data.storeList;
          this.pageCount = res.data.pageCount;
        }).then(() => {
          this.noData = '暂无数据'
        });
        /*console.log(this.sortlist)*/
      },
      /*点击进入产品详情*/
      goGoodsDetail(e){
//              console.log(e)
        this.$router.push({
          name: 'goodsDetail',
          query: {
            id: e
          }
        })
      },
      /****************************筛选****************************/
      filter(key, value, index, d){
        /*样式控制--兼容IE*/
        $(event.target).css({color: '#fff', backgroundColor: '#17A6B5'}).siblings('a').css({
          color: '#666',
          backgroundColor: '#fff'
        });
        this.companyInfor = [];
        /*清空数据*/
        this.noData = '';
        /*清空数据*/
        /*
         * key:传给后台的健名；
         * value:健值；
         * index：规格的索引值；
         * d:是否为默认值；
         * */
        /*清空排序*/
        this.sortlist.timeSort = '0';
        /*更新时间*/
        this.sortlist.levelSort = '';
        /*公司规模*/
        this.state1 = '';
        this.state2 = '';
        /*筛选条件*/
        /*key == "specId" ? d ? this.query[key].splice(index, 1, '') : this.query[key].splice(index, 1, value) : this.query[key] = value;*/
        if (key == "specId") {
          if (d) {
            this.query[key].splice(index, 1, '')
          } else {
            this.query[key].splice(index, 1, value)
          }
        } else if (key == "typeId") {
          this.query[key] = value;
          let url = this.screenGoodsByType,
            pa = {
              typeId: value
            };
          this.server(url, api.portSupply, pa).then(res => {
            if (res.code) {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            } else {
              this.specs = res.data.goodsSpecs;
              this.brands = res.data.goodsBrands;
            }
          })
        } else {
          this.query[key] = value;
        }
        let params = {
            specId: JSON.stringify(this.query.specId),
            typeId: this.query.typeId,
            brandId: this.query.brandId,
            levelId: this.query.levelId,
            medalId: this.query.medalId,
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            classId: this.id,
            keyWord: this.sertchValue,
          },
          supply = this.supplyList
        ;
//                console.log(d,params)
        this.server(supply, api.portSupply, params).then(res => {
          this.companyInfor = res.data.storeList;
          this.pageCount = res.data.pageCount;
        }).then(() => {
          this.noData = '暂无数据'
        });
      },
      /*******************************服务接口**********************/
      server(url, port, param) {
        return api.$http(api.serverSupply + port + url, param)
      },
      /*点击商家名进入商家主页*/
      navToCompany(e){
        /*console.log(e)*/
        this.$router.push({
          name: 'companyHomePage',
          query: {
            id: e
          }
        })
      },
      /******************************分页**************************/
      handleSizeChange(val) {
        /*每页显示条数*/
        /*console.log("1每页"+val+'条')*/
        this.currentPage = 1;
        this.pageSize = val;
        /*修改显示每页条数*/
        let id = this.id;
        let pa = {
            classId: id,
            keyWord: this.sertchValue,
            tagId: this.tagId,
            pageNumber: 1, /*this.currentPage*/
            pageSize: val,
          },
          url = this.supplyList;
        this.server(url, api.portSupply, pa).then(res => {
          if (res.code) {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          } else {
            this.companyInfor = res.data.storeList;
            this.pageCount = res.data.pageCount;
          }
        });
      },
      handleCurrentChange(val) {
        /*当前页*/
        /*console.log('2当前'+val+'页')*/
        this.currentPage = val;
        /*修改当前页数*/
        let id = this.id;
        let pa = {
            classId: id,
            keyWord: this.sertchValue,
            tagId: this.tagId,
            pageNumber: val,
            pageSize: this.pageSize,
          },
          url = this.supplyList;
        this.server(url, api.portSupply, pa).then(res => {
          if (res.code) {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          } else {
            this.companyInfor = res.data.storeList;
            this.pageCount = res.data.pageCount;
          }
        });
      }
    },
    mounted() {
      /*清空数据*/
      this.rankings = [];
      this.hotRecommends = [];
      this.companyInfor = [];
      this.pageCount = 1;
      /*推荐关键字*/
      let keyword = this.keyword,
        param = {
          type: 0
        };
      this.server(keyword, api.portBuyer, param).then(res => {
        if (res.code) {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        } else {
          this.$nextTick(() => {
            this.hotRecommends = res.data;
          })
        }
      });
      let supply = this.supplyList,
        filterApi = this.filterApi,
        goodsHot = this.goodsHot
      ;
      this.imgUrl = api.imgUrl;
      this.restaurants = this.loadAll();
      /*排序注册资金*/
      this.id = this.$route.query.id;
      this.tagId = this.$route.query.tagId;
      /*标签*/
      this.sertchValue = this.$route.params.sertchValue;
      let pa = {
        classId: this.id,
        /*typeId:this.typeId,*/
        tagId: this.tagId,
        keyWord: this.sertchValue,
        pageNumber: 1,
        pageSize: 5,
      };
      /*排行*/
      this.server(goodsHot, api.portSupply, {}).then(res => {
        if (res.code) {
          /*this.$message({
           message: res.msg,
           type: 'warning'
           });*/
        } else {
          this.$nextTick(() => {
            this.rankings = res.data
          })
        }
      });
      api.$http(api.serverSupply + api.portSupply + supply, pa).then(res => {
        if (res.data) {
          if (res.data.classNames) {
            this.classNames = res.data.classNames.reverse()
          }
          this.$nextTick(() => {
            Vue.set(this, 'companyInfor', res.data.storeList);
            /*this.companyInfor = res.data.storeList;*/
            this.pageCount = res.data.pageCount;
          })
        }
      });
      /*this.server(supply, api.portSupply, pa).then(res => {
       if (res.data) {
       if (res.data.classNames) {
       this.classNames = res.data.classNames.reverse()
       }
       this.$nextTick(() => {
       this.companyInfor = res.data.storeList;
       this.pageCount = res.data.pageCount;
       })
       }
       });*/
      this.specs = [];
      this.brands = [];
      this.types = [];
      this.levels = [];
      this.medals = [];
      this.companySizes = [];
      /*filter*/
      this.server(filterApi, api.portSupply, {}).then(res => {
        this.$nextTick(() => {
          this.specs = res.data.goodsSpecs;
          this.brands = res.data.goodsBrands;
          this.types = res.data.goodsTypes;
          this.levels = res.data.levels;
          this.medals = res.data.storeMedals;
          this.companySizes = res.data.sysDictList;
          this.companySizes.unshift({name: '不限', code: ''});
        })
      });
      // 页面刷新头部状态
      $('#top-nav .top-input').css('display', 'none');
      $('#top-nav .top-nav-link').find('li').eq(2).children().css('color', '#0d545c');
      $('#top-nav .top-nav-link').find('li').eq(0).children().css('color', '#fff');
      $('#top-nav .top-nav-link').find('li').eq(1).children().css('color', '#fff');
      $('#top-nav .top-nav-link').find('li').eq(3).children().css('color', '#fff');
    },
    beforeRouteLeave (to, from, next) {
      $('#top-nav .top-input').css('display', 'inline-block');
      $('#top-nav .top-nav-link').find('li').eq(2).children().css('color', '#fff');
      next();
    },
    beforeRouteEnter (to, from, next) {
      $('#top-nav .top-input').css('display', 'none');
      $('#top-nav .top-nav-link').find('li').eq(2).children().css('color', '#0d545c');
      next()
    },
  }
</script>
