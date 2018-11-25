<template>
    <div class="pcCont">
        <div class="pcBanner">
            <div id="pcSwiper" class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../assets/images/re1.png" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/images/re2.png" alt=""></div>
                    <!--<div class="swiper-slide"><img src="../../assets/images/gb3.png" alt=""></div>-->
                </div>
                <div id="pcPagination" class="swiper-pagination"></div><!--点分页器-->
                <div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
                <div class="swiper-button-next swiper-button-white"></div><!--右箭头-->
            </div>
        </div>
        <div class="pcContent">
            <div class="left">
                <div class="pcBox">
                    <router-link to='/personalCenter/personalIndex'>
                    <div class="title">
                        <i class="iconfont icon-huiyuan"></i>
                        <span>会员信息</span>
                    </div>
                    </router-link>
                    <ul>
                        <li id="personalCenter">
                            <router-link to="/personalCenter/personalIndex">个人主页</router-link>
                        </li>
                        <li id="messages"><router-link to='/personalCenter/Messages'>站内信</router-link></li>
                        <!--<li><router-link target="_blank" to="/FormApplySetting">设置企业信息</router-link></li>-->
                    </ul>
                </div>
                <div class="pcBox">
                    <div class="title">
                        <i class="iconfont icon-star1"></i>
                        <span>我的收藏</span>
                    </div>
                    <ul>
                        <li id="informationInPer"><router-link to="/personalCenter/informationInPer">资讯</router-link></li>
                        <li id="opportunityForBusiness"><router-link to="/personalCenter/opportunityForBusiness">商机</router-link></li>
                        <li id="product"><router-link :to="{path:'/personalCenter/product'}">产品</router-link></li>
                        <!--<li>采购商</li>
                        <li>供应商</li>-->
                    </ul>
                </div>
                <div v-if="admission==1||admission==2" class="pcBox">
                    <div class="title">
                        <i class="iconfont icon-jinpaicaigoushang"></i>
                        <span>采购商管理</span>
                    </div>
                    <ul>
                        <li id="BusinessOpportunityList"><router-link to="/personalCenter/BusinessOpportunityList">商机列表</router-link></li>
                        <li id="ReleaseBusinessOpportunity"><router-link to="/personalCenter/ReleaseBusinessOpportunity">发布商机</router-link></li>
                    </ul>
                </div>
                <div v-if="admission==0||admission==2" class="pcBox">
                    <div class="title">
                        <i class="iconfont icon-gongkaobei"></i>
                        <span>供应商管理</span>
                    </div>
                    <ul>
                        <li id="ProductList"><router-link to="/personalCenter/ProductList">产品列表</router-link></li>
                        <li id="ReleaseProducts"><router-link to="/personalCenter/ReleaseProducts">发布产品</router-link></li>
                        <li id="MyParticipationInBusinessOpportunities"><router-link to="/personalCenter/MyParticipationInBusinessOpportunities">我参与的商机</router-link></li>
                        <li id="MyWinningBusinessOpportunities"><router-link to="/personalCenter/MyWinningBusinessOpportunities">我中标的商机</router-link></li>
                    </ul>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {getCookie,delCookie} from '../../assets/js/cookie.js'
    import $ from 'jquery';
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import "../../assets/css/PersonalCenter.less"
    export default{
        name:'PersonalCenter',
        data(){
            return{

            }
        },
        computed: {
            admission: function() {
                return this.$store.state.personal.Admission
            }
        },
        watch:{
            '$route'(to){
                /*console.log(to)*/
                if(!getCookie('userToken')){
                    this.$store.commit('loginStateChange',0);
                    this.$message({
                     message: "登录超时或未登录，请重新登录！",
                     type: 'warning'
                     });
                     setTimeout(()=>{
                     this.$router.push({
                     name:'login'
                     })
                     },500)
                }
            }
        },
        mounted(){
            new Swiper('#pcSwiper', {
                autoplay: true,//可选选项，自动滑动
                pagination: {
                    el: '#pcPagination',
                    backgroundColor:'#fff'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        beforeRouteLeave (to, from, next) {
            $('#top-nav .top-input').css('display','inline-block');
            next();
        },
        beforeRouteEnter (to, from, next) {
            $('#top-nav .top-input').css('display','none');
            next()
        },
    }
</script>