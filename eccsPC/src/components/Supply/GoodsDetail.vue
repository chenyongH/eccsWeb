<template>
    <div class="gd">
        <div class="navigate">
            <i class="iconfont icon-home"></i>
            <a @click="goCompanyHomePage(data.storeId)">{{data.storeName}} ></a>
            <a @click="goBack">{{data.storeGoods}}</a>
            <!--
            <a href="">手机、通讯、通信 ></a>
            <a href="">手机产品、通讯产品、通信产品 ></a>
            <a href="">网络通信产品 ></a>
            <a href="">录播系统一体机、衡阳录播系统、广州上达电子</a>-->
        </div>
        <div class="gdContent">
            <div class="dgBanner">
                <div v-show="data" class="top">{{data.goodsName}}</div>
                <div style="position: relative;" class="bottom">
                    <div class="left">
                        <div v-if="false" id="gallery" class="swiper-container">
                            <div class="swiper-wrapper">
                                <div style="width:100%;height:100%;"
                                     :key="banner.id"
                                     v-for="banner in data.imgUrlList"
                                     class="swiper-slide box">
                                    <img-zoom :configs="configs" :src="imgUrl+banner.imgList"
                                    :bigsrc="imgUrl+banner.imgList"></img-zoom>
                                    <!--<pic-zoom :url="imgUrl+banner.imgList"
                                              :scroll="true"
                                              :scale="3"></pic-zoom>-->
                                    <!--<div class="small">
                                        <img :src="imgUrl+banner.imgList"/>
                                        <div class="mask"></div>
                                    </div>
                                    <div class="big">
                                        <img :src="imgUrl+banner.imgList"/>
                                    </div>-->

                                </div>
                            </div>
                        </div>
                        <div v-if="false" id="thumbs"
                             class="swiper-pagination swiper-pagination-clickable swiper-container-thumbs">

                        </div>
                        <!--<div id="out">
                            <div id="left">
                                <img src="../../assets/images/gb1.png">
                            </div>
                            <div id="buttom">
                                <div class="small">
                                    <img src="../../assets/images/gb2.png">
                                </div>
                                <div class="small">
                                    <img src="../../assets/images/gb3.png">
                                </div>
                            </div>
                            <div id="right">

                            </div>
                        </div>-->

                        <!--<div class="fdj">
                            <div class="small">
                                <img src="../../assets/images/gb1.png" />
                                <div class="mask"></div>
                            </div>
                            <div class="big">
                                <img src="../../assets/images/gb1.png" />
                            </div>
                        </div>-->
                        <div class="preview">
                            <img :src="defaultSrc" alt=""/>
                            <div id="zoom"></div>
                            <div id="mask"></div>
                            <div class="small">
                                <div id="left" class="Left"> < </div>
                                <div class="Imgs">
                                    <div class="boxImg">
                                        <img v-for="(banner,idx) in data.imgUrlList"
                                             :key="banner.id"
                                             @click="handleImgClick(imgUrl+banner.imgList,idx)"
                                             :src="imgUrl+banner.imgList" alt="">
                                    </div>
                                </div>
                                <div id="right" class="Righ"> > </div>
                            </div>
                        </div>
                        <div class="after">
                            <img src="" alt=""/>
                        </div>

                        <!--收藏-->
                        <div class="collection">
                            <div>
                                <i @click="collection" v-bind:class="collections?'icon-star1':'icon-star'"
                                   :style="collections?'':'color:#17A6B5'"
                                   class="iconfont"></i>
                                <span>收藏该商品</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="top">
                            <h3>{{data.goodsTitle}}</h3>
                            <!--<span>产品编号：{{data.goodsSku}}</span>-->
                            <span>当前价格：<span class="red"></span> {{data.salePrice}}元</span>
                            <!--<span>批发价格：<span
                                    class="red"></span> {{data.wholesalePrice}}(起订 {{data.wholesaleNum}} 件)</span>-->
                            <!--<span>所在地区：{{data.address}}</span>-->
                            <span>发布时间：{{data.saleTime}}</span>
                            <div @click="dialogVisible = true" class="button">我要询价</div>
                        </div>
                        <div class="bottom">
                            <div class="name">
                                <span>{{data.storeName}}</span>
                                <em>主营：{{data.storeGoods}}</em>
                            </div>
                            <div class="icons">
                                <i class="iconfont icon-wodezhanghu"></i>
                                <i class="iconfont icon-xinyongpingjia"></i>
                                <i class="iconfont icon-yongyinshenqing"></i>
                                <i class="iconfont icon-chuchai"></i>
                                <i class="iconfont icon-shenfenzhengrenzheng"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr"></div>
            <div class="proDetail">
                <div class="top">产品详情</div>
                <div v-html="data.note" class="proBox">
                </div>
            </div>
        </div>
        <el-dialog
                title=""
                :show-close="false"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-input type="textarea" v-model="messageValue"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="sendMessage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<!--<style lang="less">
    #out{
        position:relative;
    }
    #left{
        width:310px;
        height:310px;
        border:1px solid blue;
        img{
            width:100%;
        }
    }
    #buttom{
        width:310px;
        height:40px;
        margin-top:10px;
    }
    #buttom .small{
        border:1px solid red;
        float:left;
        margin-right:5px;
        img{
            width:100%;
        }
    }
    #right{
        width:400px;
        height:310px;
        position:absolute;
        top:0px;
        left:320px;
        border: 1px solid black;
        /*display:none;*/
        overflow:hidden;
    }
    #right img{
        position:absolute;
        top:0px;
        left:0px;
    }
</style>-->
<!--<style lang="less">
    img{
        vertical-align: top;
    }
    .fdj {
        width: 350px;
        height: 350px;
        position: relative;
        margin: 100px auto;
        border: 1px solid gainsboro;
    }
    .small {
        position: relative;
    }
    .small img {
        width: 350px;
    }
    .mask {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 0, 0.4);
        position: absolute;
        left: 0;
        top: 0;
        cursor: move;
        display: none;
    }
    .big {
        position: absolute;
        top: 0;
        left: 360px;
        width: 500px;
        height: 500px;
        border: 1px solid gainsboro;
        overflow: hidden;
        display: none;
    }
    .big img{
        position: absolute;
        left: 0;
        top: 0;
    }
</style>-->
<style lang="less" scoped>
.preview {
  position: relative;
  width: 100%; /*400px*/
  height: 300px;
  border: 1px solid #ccc;
  float: left;
  .small {
    width: 100%;
    height: 90px;
    border: 1px solid #eee;
    position: absolute;
    left: 0;
    bottom: -95px;
    display: flex;
    justify-content: space-between;
    .Left,
    .Righ {
      width: 10px;
      height: 100%;
      background-color: #eee;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .Imgs {
      width: 366px;
      overflow: hidden;
      .boxImg {
        height: 100%;
        width: 1000px;
        white-space: nowrap;
        img {
          width: 90px;
          height: 100%;
          display: inline;
          margin-left: 5px;
          border: 1px solid #eee;
          cursor: pointer;
        }
      }
    }
  }
}
.preview img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
#zoom {
  position: absolute;
  display: none;
  width: 150px;
  height: 150px;
  background: pink;
  z-index: 10;
  opacity: 0.5;
}
.after {
  position: absolute; /*relative*/
  left: 100%;
  display: none;
  width: 400px;
  height: 300px; /*400*/
  border: 1px solid #ddd;
  float: left;
  overflow: hidden;
  z-index: 100;
  background-color: #fff;
}
/*移动父元素*/
#mask {
  width: 100%; /*400px*/
  height: 100%; /*400px*/
  position: absolute;
  left: 0;
  top: 0;
  z-index: 11;
  background: deeppink;
  opacity: 0;
}
.after > img {
  position: absolute;
}
</style>
<script>
import imgZoom from "vue2.0-zoom";
import PicZoom from "vue-piczoom";
import api from "../../api.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "../../assets/css/GoodsDetail.less";
import $ from "jquery";
import { getCookie } from "../../assets/js/cookie.js";
/*$(function  () {
        var left=document.getElementById("left");
        var buttom=document.getElementById("buttom");
        var right=document.getElementById("right");
        buttom.onmouseover=function  (e) {
            var ev=e||window.event; //事件委托
            var imgobj=ev.srcElement||ev.target;  //事件委托 ，取得事件对象
            if(imgobj.nodeName=="IMG"){//事件委托 ，如果事件对象的节点名为IMG，则true
                var names=imgobj.src; //事件委托 ，取得事件节点的src
                var imgname=names.substring(names.lastIndexOf("/")).replace("1","2"); //names.indexof("/")取得分隔符的位置，然后利用substring从这个节点开始向后剪切，然后利用；取得小图片的名字，把一换成二直接是大图片
                left.innerHTML="<img src=img"+imgname+">";
            }
        }

        left.onmouseover=function  () {
            right.style.display="block"; //框体显示
            var leftimg=left.getElementsByTagName("img")[0]; //取得展示框体对象
            var names=leftimg.src;//取得展示框体对象src值
            var imgname=names.substring(names.lastIndexOf("/")).replace("2","3");//替换展示内容
            console.log(leftimg,names,imgname)
            right.innerHTML="<img src="+names+">";
            var rightimg=right.getElementsByTagName("img")[0];//取得大展示框体对象
            this.onmousemove=function  (e) {
                var ev=e||window.event;  //兼容事件对象
                var l=ev.layerX||ev.offsetX;  //取得鼠标事件的坐标，IE和FF
                var r=ev.layerY||ev.offsetY;  //取得鼠标事件的坐标，IE和FF
                rightimg.style.left=-l/left.offsetWidth*(rightimg.offsetWidth-right.offsetWidth)+"px";
                rightimg.style.top=-r/left.offsetHeight*(rightimg.offsetHeight-right.offsetHeight)+"px";
                //-值说明展示图像走的过程要与鼠标相反，
                //减去 -right.offsetHeight因为 style.left会出现白色边框，减去展示的窗口，就会解决

            }
        };
        left.onmouseout=function  () {
            right.style.display="block";
        }
    });*/
/*$(function () {
        var fdj = document.querySelector('.fdj') // 获得最大的盒子
        var small = document.querySelector('.small'); //获取小图片盒子
        var big = document.querySelector('.big'); //获取大图片盒子
        var bigs = big.children[0] //大图片
        var smalls = small.children[0] //小图片
        var mask = small.children[1]; //遮罩

        //鼠标移入小图片盒子
        small.onmouseover = function() {
            //鼠标移入图片盒子将遮罩与大图片显示
            mask.style.display = 'block';
            big.style.display = ' block';
        };

        //鼠标移出小图片盒子
        small.onmouseout = function() {
            //鼠标移出小图片盒子将遮罩与大图片隐藏
            mask.style.display = 'none';
            big.style.display = 'none';
        };

        var x=0;
        var y=0;
        //鼠标在小图片上移动时
        small.onmousemove = function(ev) {
            var ev = event || window.event;
            //让鼠标在遮罩正中
            //鼠标X坐标与Y坐标
            x = ev.clientX -this.offsetParent.offsetLeft- mask.offsetWidth / 2 ;
            y = ev.clientY -this.offsetParent.offsetTop- mask.offsetHeight / 2 ;
            //将遮罩限制在小图片盒子中

            if (x<0) {
                x=0;
            }else if(x>small.offsetWidth-mask.offsetWidth){
                x = small.offsetWidth-mask.offsetWidth;
            }

            if(y<0){
                y=0;
            }else if(y>small.offsetHeight-mask.offsetHeight){
                y= small.offsetHeight-mask.offsetHeight
            }
            mask.style.left = x + 'px';
            mask.style.top = y + 'px';

            //大图与小图的比例

            /!*var scalX = bigs.offsetWidth/small.offsetWidth;
             var scalY = bigs.offsetHeight/small.offsetHeight;*!/

            var scalX = x/(small.offsetWidth-mask.offsetWidth);
            var scalY = y/(small.offsetHeight-mask.offsetHeight);

            bigs.style.left = -(x*scalX)+'px';
            bigs.style.top = -(y*scalY)+'px';

        };
    });*/
/*$(function(){
        var $preview=$(".preview");
        var $zoom=$("#zoom");
        var $after=$(".after");
        var $mask=$("#mask");
        $mask.mousemove(function(event){
            var $bigImg=$(".after>img");
            $bigImg.attr('src',$('.preview>img').attr('src'));
            var boxW=$preview.width();
            var boxH=$preview.height();
            var x=event.offsetX;
            var y=event.offsetY;
            var w=$zoom.width();
            var h=$zoom.height();
            var W=$bigImg.width();
            var H=$bigImg.height();
            var rw=$mask.width();
            var rh=$mask.height();
            var Bw=W/rw;
            var Bh=H/rh;
            $zoom.show();
            $after.show();
            var left;
            var top;
            //left   min=0  正常  x-w/2   max =400-w
            if(x<w/2){
                left=0;
            }else{
                if(x>boxW-w/2){
                    left=boxW-w;
                } else{ left=x-w/2;}
            }
            if(y<h/2){
                top=0;
            }else{
                if(y>boxH-h/2){
                    top=boxH-h;
                }else{top=y-h/2}
            }
            $zoom.css("left",left);
            $zoom.css("top",top);
            $bigImg.css("left",-left*Bw);
            $bigImg.css("top",-top*Bh);
            /!*console.log(W);*!/

        });
        $preview.mouseout(function(){
            $zoom.hide();
            $after.hide();
        });
        /!*左右滑动*!/
        let num1=0;
        $("#left").click(function () {
            let len=$('.boxImg>img').length,
                width=len*95;
            if(num1<width){
                num1+=95;
                $('.boxImg').animate({marginLeft:`-${num1}px`},300,"linear",function(){
                    /!*console.log(num1,width)*!/
                    /!*$(".boxImg").css({marginLeft:"0px"});
                     $(".boxImg img:first").remove().clone(true).appendTo(".boxImg");*!/
                });
            }


        });
        $("#right").click(function () {
            if(num1>0){
                num1-=95;
                $('.boxImg').animate({marginLeft:`-${num1}px`},300,"linear",function(){
                    /!*console.log(num1)*!/
                    /!*$(".boxImg").css({marginLeft:"0px"});
                     $(".boxImg img:last").remove().clone(true).prependTo(".boxImg");*!/
                });
            }

        });
    });*/
export default {
  name: "GoodsDetail",
  components: {
    imgZoom,
    PicZoom
  },
  data() {
    return {
      id: 0,
      data: [],
      imgUrl: "",
      configs: {
        width: 650,
        height: 350,
        maskWidth: 100,
        maskHeight: 100,
        maskColor: "red",
        maskOpacity: 0.2
      },
      userId: "",
      accountId: "",
      token: "",
      storeId: "",
      goodsId: "",
      collections: 1,
      defaultSrc: "",
      messageValue: "",
      dialogVisible: false, /*对话框*/
        checCollection:'/open/api/acc/checCollection'/*检查是否已收藏*/
    };
  },
  methods: {
    load() {
      var $preview = $(".preview");
      var $zoom = $("#zoom");
      var $after = $(".after");
      var $mask = $("#mask");
      $mask.mousemove(function(event) {
        var $bigImg = $(".after>img");
        $bigImg.attr("src", $(".preview>img").attr("src"));
        var boxW = $preview.width();
        var boxH = $preview.height();
        var x = event.offsetX;
        var y = event.offsetY;
        var w = $zoom.width();
        var h = $zoom.height();
        var W = $bigImg.width();
        var H = $bigImg.height();
        var rw = $mask.width();
        var rh = $mask.height();
        var Bw = W / rw;
        var Bh = H / rh;
        $zoom.show();
        $after.show();
        var left;
        var top;
        //left   min=0  正常  x-w/2   max =400-w
        if (x < w / 2) {
          left = 0;
        } else {
          if (x > boxW - w / 2) {
            left = boxW - w;
          } else {
            left = x - w / 2;
          }
        }
        if (y < h / 2) {
          top = 0;
        } else {
          if (y > boxH - h / 2) {
            top = boxH - h;
          } else {
            top = y - h / 2;
          }
        }
        $zoom.css("left", left);
        $zoom.css("top", top);
        $bigImg.css("left", -left * Bw);
        $bigImg.css("top", -top * Bh);
        /*console.log(W);*/
      });
      $preview.mouseout(function() {
        $zoom.hide();
        $after.hide();
      });
      /*左右滑动*/
      let num1 = 0;
      $("#left").click(function() {
        let len = $(".boxImg>img").length,
          width = len * 95;
            console.log(num1,width);
          /*num1 < width*/
        if (num1 < width) {
          num1 += 95;
          $(".boxImg").animate(
            { marginLeft: `-${num1}px` },
            300,
            "linear",
            function() {
              /*console.log(num1,width)*/
              /*$(".boxImg").css({marginLeft:"0px"});
                             $(".boxImg img:first").remove().clone(true).appendTo(".boxImg");*/
            }
          );
        }
      });
      $("#right").click(function() {
          console.log(num1);
        if (num1 > 0) {
          num1 -= 95;
          $(".boxImg").animate(
            { marginLeft: `-${num1}px` },
            300,
            "linear",
            function() {
              /*console.log(num1)*/
              /*$(".boxImg").css({marginLeft:"0px"});
                             $(".boxImg img:last").remove().clone(true).prependTo(".boxImg");*/
            }
          );
        }
      });
    },
    /**我要询价**/
    sendMessage() {
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      this.storeId = this.data.storeId;
      this.goodsId = this.data.goodsId;
      let pa = {
        accountId: this.accountId,
        token: this.token,
        storeId: this.storeId,
        goodsId: this.goodsId,
        content: this.messageValue
      };
      if(getCookie("userToken")){
          api
              .$http(api.serverSupply + api.collection + "/open/api/acc/sendChat", pa)
              .then(() => {
                  this.dialogVisible = false;
                  this.messageValue="";
                  this.$message({
                      message: '发送成功',
                      type: 'success'
                  })
              })
              .catch(err => {
                  alert(err);
              });
      }else{
          this.$message({
              message: "登录之后才能询价！",
              type: 'warning'
          });
      }

    },
    /*模态控制*/
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    /*轮播小图点击*/
    handleImgClick(url, index) {
      $(".preview>img").attr("src", url);
      $(".boxImg>img")
        .css({ border: "1px solid #eee" })
        .eq(index)
        .css({ border: "1px solid red" });
    },

    goCompanyHomePage(id) {
      this.$router.push({
        name: "companyHomePage",
        query: {
          id: id
        }
      });
    },
    /*收藏*/
    collection() {
      let pa = {
        accountId: this.userId,
        type: 3,
        typeId: this.id,
        token: this.token
      };
      if (this.collections) {
        this.server("/open/api/acc/addCollection", api.collection, pa).then(
          res => {
            /*console.log(this.collections)*/
            if (res.code) {
              if (!this.token) {
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
              if (res.code == 4) {
                this.collections = 0;
              }
            } else {
              this.collections = 0;
                this.$message({
                    message: res.msg,
                    type: "success"
                });
            }
          }
        );
      }
    },
    /*返回上一页*/
    goBack() {
      /*this.$router.go(-1)*/
    },
    /*服务接口*/
    server: (url, port, param) => {
      return api.$http(api.serverSupply + port + url, param);
    }
  },
  mounted() {
    $(".boxImg>img:first").css({ border: "1px solid red" });
    // 页面刷新头部状态
    $("#top-nav .top-input").css("display", "none");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(2)
      .children()
      .css("color", "#0d545c");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(0)
      .children()
      .css("color", "#fff");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(1)
      .children()
      .css("color", "#fff");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(3)
      .children()
      .css("color", "#fff");
    this.userId = getCookie("userId");
    this.imgUrl = api.imgUrl;
    this.token = getCookie("userToken");
    let _this = this;
    let id = {
      goodsId: this.$route.query.id
    };
    this.id = this.$route.query.id;
    this.server("/open/api/goods/supplyGoodsDetail", api.portSupply, id)
      .then(res => {
        this.data = res.data;
        this.defaultSrc = api.imgUrl + res.data.imgUrlList[0].imgList;
      })
      .then(function() {
        new Swiper("#gallery", {
          zoom: true,
          pagination: {
            el: "#thumbs",
            clickable: true,
            renderBullet: function(index, className) {
              return (
                '<span class="' +
                className +
                '"><image src="' +
                _this.imgUrl +
                _this.data.imgUrlList[index].imgList +
                '"></span>'
              );
            }
          }
        });
      });
    if (this.token) {
      let pa={
          accountId:this.userId,
          type:3,
          typeId:this.id
      },url=this.checCollection;
      this.server(url,api.collection,pa).then(res=>{
          if (res.code) {
              if (!this.token) {
                  this.$message({
                      message: res.msg,
                      type: "warning"
                  });
              }
              if (res.code == 4) {
                  this.collections = 0;
              }
          } else {
              this.collections = 0;
          }
      })
    }
    this.load();
  },
  beforeRouteLeave(to, from, next) {
    $("#top-nav .top-input").css("display", "inline-block");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(2)
      .children()
      .css("color", "#fff");
    next();
  },
  beforeRouteEnter(to, from, next) {
    $("#top-nav .top-input").css("display", "none");
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(2)
      .children()
      .css("color", "#0d545c");
    next();
  }
};
</script>