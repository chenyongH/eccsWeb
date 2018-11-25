<template>
    <div class="supplyCont">
        <div class="content">
            <div class="search">
                <div class="procurement-input">
                    <el-input @keyup.enter.native="handleSearch" prefix-icon='el-icon-search' v-model="sertchValue" class="input-with-select">

                        <el-button @click.native="handleSearch" slot="append">搜索</el-button>
                    </el-input>
                </div>
            </div>
            <div class="hotRecommend">
                <div class="title">热门推荐：</div>
                <a
                        v-on:click="SupplierKeyWord(hotRecommend.name)"
                        :key="idxHot"
                        v-for="(hotRecommend,idxHot) in hotRecommends">{{hotRecommend.name}}</a>
            </div>
            <div class="banner">
                <div class="left">
                    <div class="top"><i class="iconfont icon-icon_threeline_fill"></i>产品分类</div>
                    <ul class="proClassify">
                        <li :key="idxClassification" v-for="(classification,idxClassification) in products">
                            {{classification.m.name}}

                            <div v-if="classification.twoClassList" class="classification">
                                <div :key="idxClassifies"
                                     v-for="(classifies,idxClassifies) in classification.twoClassList" class="products">
                                    <span class="classTwo">{{classifies.f.name}} <i
                                            class="el-icon-arrow-right"></i></span>
                                    <div v-if="classifies.threeClassList" class="classifies">
                                    <span @click="Supplier(classes.id)" :key="idxClasses"
                                          v-for="(classes,idxClasses) in classifies.threeClassList">
                                        {{classes.name}}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <div class="top">
                        <span v-on:click="SupplierType(top.id)" :key="idx"
                              v-for="(top,idx) in classification">
                            {{top.name}}
                            <i class="iconfont icon-arrowRight"></i>
                        </span>
                    </div>
                    <div class="bottom">
                        <div id="supllyBanner" class="swiper-container">
                            <div class="swiper-wrapper">
                                <div v-for="(banner,index) in supllyBanner" :key="index" class="swiper-slide">
                                    <img :src="imgUrl+banner.picurl" alt="">
                                </div>
                            </div>
                            <div id="supplYPagination" class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--产品-->
            <div v-for="(supply,idx) in supplys" :key="idx" class="box">
                <div class="head">
                    <div class="top">
                        <div class="title"><i class="iconfont icon-icon-test"></i>{{supply.GoodsType.name}}</div>
                        <div v-if="supply.hots[0]" class="dd">热门分类：
                            <span @click="Supplier(item.contentId)"
                                  style="cursor: pointer"
                                  :key="item.contentId"
                                  v-for="item in supply.hots">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span
                                    v-on:click="Supplier(classs.id)"
                                    :key="classIdx"
                                    v-for="(classs,classIdx) in supply.goodsClasss">{{classs.name}}</span>
                        </div>
                        <!--推荐企业-->
                        <div class="right">
                            <div class="title"><i class="iconfont icon-dashaxiaoqudizhi01"></i>推荐企业</div>
                            <div :id="'bannerSid'+(idx+1)" class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div v-for="(main,keys) in supply.storeMains"
                                         :key="keys"
                                         class="swiper-slide">
                                        <ul class="bannerSid">
                                            <li @click="CompanyHomePage(item.id)" v-for="(item,idx) in main" :key="idx">
                                                <div class="name">{{item.storeName}}</div>
                                                <span>{{item.storeGoods}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <ul :id="'thumbs'+(idx+1)"
                                class="dot swiper-pagination swiper-pagination-clickable swiper-container-thumbs">

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="left">
                        <div class="top"><i class="iconfont icon-hotfill"></i>最新发布产品</div>
                        <ul class="bottom">
                            <li v-on:click="GoodsDetail(newGoods.id)"
                                :key="idxNewGoods"
                                v-for="(newGoods,idxNewGoods) in supply.typeNewGoods">
                                <i></i><span>{{newGoods.name}}</span></li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="top"><i class="iconfont icon-iconfontgoodacitive"></i>推荐产品</div>
                        <ul class="bottom runFull">
                            <li
                                    @mouseleave="maskHide(idx,recommendIdx)"
                                    @mouseenter="maskShow(idx,recommendIdx)"
                                    v-on:click="GoodsDetail(recommendGoods.goodsId)"
                                    v-if="recommendGoods.imgUrl"
                                    v-for="(recommendGoods,recommendIdx) in supply.typeRecommendGoods"
                                    :key="recommendGoods.goodsId"
                            >
                                <div class="imgBox">
                                    <img :src="imgUrl+recommendGoods.imgUrl" alt="">
                                    <div v-show="recommendGoods.show" class="mask">
                                        <!--<span>产品编号：{{recommendGoods.goodsSku}}</span>-->
                                        <span>当前价格：¥{{recommendGoods.salePrice}}元/片</span>
                                        <!--<span>批发价格：¥{{recommendGoods.wholesalePrice}}元/片 (起订 {{recommendGoods.wholesaleNum}} 片)</span>-->
                                        <!--<span>所在地区：{{recommendGoods.address}}</span>-->
                                        <span>发布时间：{{recommendGoods.saleTime}}</span>
                                    </div>
                                </div>
                                <span>{{recommendGoods.goodsName}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <swiper></swiper>
    </div>
</template>
<style scoped>
    .classTwo {
        width: 92px;
        text-align: right;
    }

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
    }
</style>
<script>
    import swiper from "../swiper";
    import $ from 'jquery';
    import "../../assets/font/iconfont.css";
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import "../../assets/css/test.css";
    import api from '../../api.js';
    export default {
        name: 'supply',
        components: {
            swiper
        },
        data(){
            return {
                sertchValue: '',
                hotRecommends: [], /*热门推荐*/
                products: [],
                classification: [],
                supplys: [],
                supllyBanner: [],
                imgUrl: '',
                url: '/open/api/goods/supplyInfo',
                keyword: '/open/api/chance/keyword',
                supplyInfoData:'/open/api/goods/supplyInfoData',
                searchUrl:'/open/api/goods/supplyList'
            }
        },
        methods: {
            /*搜索*/
            handleSearch(){
                this.$router.push({
                    name: 'supplier',
                    params: {
                        sertchValue: this.sertchValue
                    }
                })
            },
            /*点击热门推荐*/
            SupplierKeyWord(e){
                this.$router.push({
                    name: 'supplier',
                    params: {
                        sertchValue: e
                    }
                })
            },
            maskShow: function (idx, recommendIdx) {
                this.supplys[idx].typeRecommendGoods[recommendIdx].show = true;
            },
            maskHide: function (idx, recommendIdx) {
                this.supplys[idx].typeRecommendGoods[recommendIdx].show = false;
            },
            /*跳转商家列表*/
            Supplier: function (e) {
                this.$router.push({
                    name: 'supplier',
                    query: {
                        id: e
                    }
                })
            },
            /*banner上面的标签*/
            SupplierType(e){
                this.$router.push({
                    name: 'supplier',
                    query: {
                        tagId: e
                    }
                })
            },
            /*公司主页*/
            CompanyHomePage(e){

                this.$router.push({
                    name: 'companyHomePage',
                    query: {
                        id: e
                    }
                })
            },
            /*产品详情*/
            GoodsDetail: function (e) {
                /*console.log(e)*/
                this.$router.push({
                    name: 'goodsDetail',
                    query: {
                        id: e
                    }
                })
            },
            server: (url, port, pa) => {
                return api.$http(api.serverSupply + port + url, pa)
            }

        },
        mounted(){
            let url = this.url,
                supplyInfoData=this.supplyInfoData,
                keyword = this.keyword,
                pa = {
                    type: 0
                };
            /*推荐关键字*/
            this.server(keyword, api.portBuyer, pa).then(res => {
                if (res.code) {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                } else {
                    this.hotRecommends = res.data;
                }
            });
            // 页面刷新头部状态
            $('#top-nav .top-input').css('display', 'none');
            $('#top-nav .top-nav-link').find('li').eq(2).children().css('color', '#0d545c');
            $('#top-nav .top-nav-link').find('li').eq(0).children().css('color', '#fff');
            $('#top-nav .top-nav-link').find('li').eq(1).children().css('color', '#fff');
            $('#top-nav .top-nav-link').find('li').eq(3).children().css('color', '#fff');
//            console.log(this.server)
            this.imgUrl = api.imgUrl;
            this.server(url, api.portSupply).then(res => {
                /*this.supplys=res.data.goodsTypeList;*/
                this.classification = res.data.tagList;
                this.supllyBanner = res.data.banners;
                this.products = res.data.goodsClassList;
            }).then(function () {
                $(".proClassify>li").hover(function () {
                    $(this).find(".classification").css({display: 'block'})
                    $(this).siblings().find(".classification").css({display: 'none'})
                    /*$(this).find(".classification").mouseleave(function(){
                     $(this).css({display:'none'})
                     })*/
                }, function () {
                    $(this).find(".classification").css({display: 'none'})
                });
            });
            this.server(supplyInfoData, api.portSupply).then(res => {
                this.supplys = res.data.goodsTypeList;
            }).then(() => {
                this.supplys.map((item, i) => {
                    new Swiper('#bannerSid' + (i + 1), {
                        preventClicks : false,
                        preventLinksPropagation : false,
                        autoplay: true,
                        loop: false,
                        pagination: {
                            el: '#thumbs' + (i + 1),
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '">' + (index + 1) + '</span>';
                            },
                        },
                    });
                });
                new Swiper('#supllyBanner', {
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: '#supplYPagination',
                        clickable: true,
                    },
                });
            })

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
