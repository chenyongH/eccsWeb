<template>
	<div class="details" v-wechat-title="$route.meta.title">
		<ul>
			<li class="title" @click='goback'>
				<img src="../../assets/details.png" alt="">
				<span>商机</span>
			</li>
			<li class="title">{{data.chanceName}}</li>
			<li>
				<div class="box">
				<span class="left">采购商：</span><span class="right">{{name}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">项目类型：</span><span class="right">{{data.chanceTypeName}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">商机时间：</span><span class="right">{{data.beginDate}}/{{data.endDate}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">采购商品：</span><span class="right">{{data.buyGoods}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">采购区域：</span><span class="right">{{data.buyArea}}</span>
				</div>
			</li>
			<div class="slide">
			<li>
				<div class="box">
				<span class="left">项目规模：</span><span class="right">{{data.scale}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">国家：</span><span class="right">{{data.country}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">资金来源：</span><span class="right">{{data.capital}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">招标方式：</span><span class="right">{{data.tendering}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">阶段：</span><span class="right">{{data.stage}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">客户类型：</span><span class="right">{{data.customerType}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">账期：</span><span class="right">{{data.period}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">支付币种：</span><span class="right">{{data.currency}}</span>
				</div>
			</li>
			<li>
				<div class="box">
				<span class="left">资金担保：</span><span class="right">{{data.guarantee}}</span>
				</div>
			</li>
			</div>
			<li><div class="button" @click='lishow($event)'><span>收起</span><i class="iconfont icon-shouqishangjiantou-"></i></div></li>
		</ul>
		<div class="procurementDetails">
			<div class="procurementTitle">
				<img src="../../assets/details.png" alt="">
				<span>商机详情</span>
			</div>
			<div class="Message">{{data.chanceName}}</div>
			<div class="date">{{data.beginDate}}</div>
			<div class="info">
				<p>{{info}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import {getCookie} from '../../assets/js/cookie.js'
	import $ from 'jquery'
	export default{
	  name: 'procurementDetails',
	  data () {
	  return {
	  data: [],
	  info: '',
	  name: '',
	  params: {
	  chanceId: this.$route.query.id,
	  token: getCookie('userToken'),
	  appid: getCookie('userId')
	},
	  liShow: true
	}
	},
	computed:{
		procurement () {
	  			return this.$store.state.procurement
	  		}
	  	},
	methods: {
		goback(){
			if(this.procurement == '商机'){
				this.$router.push({
					name: 'ProcurementContent'
				})
			}else{
				this.$router.push({
					name:'ProcurementTwo'
				})
			}
		},
	  lishow (event) {
			  if (this.liShow) {
			  this.liShow = false
						$('.slide').stop().slideUp()
			  $('.button span').html('展开')
			  $('.button .iconfont').removeClass('icon-shouqishangjiantou-').addClass('icon-xiala')
			}else {
			  this.liShow = true
						$('.slide').stop().slideDown()
			  $('.button span').html('收起')
			  $('.button .iconfont').removeClass('icon-xiala').addClass('icon-shouqishangjiantou-')
			}
		}
	},
	mounted () {
	},
	activated: function () {
			// this.$store.dispatch('changehead','')
			// this.$store.dispatch('changehead','商机')
			  this.$api.post('http://116.196.89.209:9004/open/api/chance/chanceDetail', {
			  chanceId: this.$route.query.id,
			  token: getCookie('userToken'),
			  appid: getCookie('userId')
			}, res => {
			  if (res.status >= 200 && res.status < 300) {
			  this.data = res.data.data.chance
			  this.info = res.data.data.chance.chanceInfo
			  this.name = res.data.data.chance.storeMain.storeName
			} else{
			  console.log(res + '详细信息请求出错')
			}
			})
			  this.liShow = true
				if (this.liShow) {
			  this.liShow = false
						$('.slide').stop().slideUp()
			  $('.button span').html('展开')
			  $('.button .iconfont').removeClass('icon-shouqishangjiantou-').addClass('icon-xiala')
			}else {
			  this.liShow = true
						$('.slide').stop().slideDown()
			  $('.button span').html('收起')
			  $('.button .iconfont').removeClass('icon-xiala').addClass('icon-shouqishangjiantou-')
			}
		},
	deactivated: function () {
			is.$store.commit('PROCUREMENTDETAILS')
		}
	}
</script>
<style scoped>
	.details{
		height: 100%;
		margin-top: 0.266667rem;
	}
	.details ul{
		width: 100%;
		/*height: 100%;*/
		overflow: auto;
		list-style: none;
	}
	.details ul li{
		background-color: #fff;
		box-sizing: border-box;
		padding-left:20px;
		padding-right: 20px;
		width: 100%;
		height: 60px;
		
	}
	.details ul li .box{
		height: 100%;
		width: 100%;
		margin: 0 auto;
		border-bottom: 1px solid #ccc;
	}
	.details ul .title{
		display: flex;
		align-items: center;
		height: 60px;
		font-size: 18px;
		font-weight: bold;
	}
	.details ul .title img{
		width: 24px;
		height: 24px;
	}
	.details ul .title span{
		font-size: 18px;
		margin-left: 10px;
		font-weight: bold;
	}
	.details ul li .left{
		font-size: 14px;
		float: left;
		color: #555555;
		height: 60px;
		line-height: 60px;
	}
	.details ul li .right{
		font-size: 14px;
		float: right;
		color: #555555;
		height: 60px;
		line-height: 60px;
	}
	.details ul li .button{
		font-size: 16px;
		width: 100%;
    	display: flex;
    	justify-content: center;
    	color: #17a6b5;
	}
	.details ul li .button .iconfont{
		margin-left: 5px;
	}
	.procurementDetails{
		background-color: #ffffff;
		box-sizing: border-box;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 50px;
	}
	.procurementDetails .procurementTitle{
		
		display: flex;
		align-items: center;
		height: 60px;
		font-size: 18px;
		font-weight: bold;
	}
	.procurementDetails .procurementTitle img{
		width: 24px;
		height: 24px;
	}
	.procurementDetails .procurementTitle span{
		font-size: 18px;
		margin-left: 10px;
		font-weight: bold;
	}
	.procurementDetails .Message{
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 18px;
		font-weight: bold;
	}
	.procurementDetails .date{
		height: 40px;
		margin-top: -15px;
		line-height: 40px;
		font-size: 12px;
		color: #c7c7c7;
	}
	.procurementDetails .info{
		color: #555555;
	}
</style>