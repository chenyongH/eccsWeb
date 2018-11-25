<template>
	<div id="procurementPublic">
		<div class="procurement-input">
			<div class="selectBox">
				<div class="select"><span class="selectText">商机</span><img src="../../assets/procurementIcon/procurementDown.png" alt=""></div>
				<ul class="selectOption">
					<li class="selectOption1">商机</li>
					<li class="selectOption2">采购商</li>
				</ul>
			</div>
		  	<el-input prefix-icon='el-icon-search' v-model="input5" class="input-with-select">
		    <el-button slot="append" @click='inputSeachAll'>搜索</el-button>
		  </el-input>
		</div>
		<div class="procurementRecommend">
			<ul>
				<li class="procurementfeistLi">热门推荐：</li>
				<li v-for='procurementItem in keyword' @click='keywordTopAll($event,procurementItem)'>{{procurementItem}}</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import {getCookie} from '../../assets/js/cookie.js'
	import api from "../../api.js"
	import $ from 'jquery'
	export default {
		name:'procurement',
		data() {
		    return {
		      	input5: '',
		      	select: '1',
		      	unlimited:'',
				code:''
		    }
		  },
		  computed: {
		        selectState(){
		        	return this.$store.state.selectState 
		        },
		        // 获取当前标签页是哪一个
		        tabNum(){
		        	return this.$store.state.tabNum;
		        },
		        keyword(){
		        	return this.$store.state.procurementTopKey
		        },
		        paginationShow(){
		        	return this.$store.state.paginationShow
		        },
		        TopProcurement(){
		        	return this.$store.state.TopProcurement
		        }
		  },
		  watch:{
		  	TopProcurement(){
		  		$('#procurementPublic .procurement-input .input-with-select input').val('')
		  		$('#procurementPublic .procurement-input .selectBox .select .selectText').html('商机')
		  		this.inputSeach();
		  	}
		  },
		  methods:{
		  	inputSeachAll(){
		  		this.$store.commit('TOPPROCUREMENTSEARCH')
		  		if(this.selectState == 0){
		  			this.inputSeach();
		  		}else{
		  			this.businessInput();
		  		}
		  	},
		  	keywordTopAll(event,keyword){
		  		if(this.selectState == 0){
		  			this.keywordTop(event,keyword);
		  		}else{
		  			this.businessKeyword(event,keyword);
		  		}
		  	},
		  	// 商机输入框的搜索功能
		  	inputSeach(){
		  		// 搜索时候筛选归零
		  		// code置空
		  		this.$store.commit('PROCUREMENTstageCode',this.code);
		  		this.$store.commit('BUYINVITEstageCode',this.code);
		  		this.$store.commit('STAGECODE',this.code);
		  		// 不限传值
				this.$store.commit('PROCUREMENTtype',this.unlimited);
				this.$store.commit('BUYINVITEtype',this.unlimited);
				this.$store.commit('TYPEID',this.unlimited);
				// 地区传值
				this.$store.commit('PROCUREMENTareaCode','noArea');
				this.$store.commit('BUYINVITEareaCode','noArea');
				this.$store.commit('AREACODE','noArea');
				// 排序
				this.$store.commit('PROCUREMENTsort',0);
				this.$store.commit('BUYINVITEsort',0);
				this.$store.commit('SORT',0);
		  		// 改变vuex中的状态值，让筛选项归位
		  		this.$store.commit('searchStateChange',1);
		  		this.$store.commit('PROCUREMENTSEARCHSTATE');
		  		let text = $('#procurementPublic .procurement-input .input-with-select input').val()
		  		// 改变state.paginationShow状态，每次点击初始化分页器位置
		  		this.$store.commit('paginationShowChange');
		  		// 关键字传值
		  		this.$store.commit('PROCUREMENTkeyword',text)
		  		this.$store.commit('BUYINVITEkeyword',text)
		  		this.$store.commit('KEYWORD',text)
		  		// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
		  		this.$store.commit('buyInviteInfoDataClear')
		  		this.$store.commit('procurementClassChange')
		  		this.$store.commit('procurementClassRequest')
		  		// 判断标签页
		  		if(this.tabNum == 0){
		  			this.$store.commit('PROCUREMENTpageNumber',1)
		  			this.$store.commit('procureRequest')
		  		}else if(this.tabNum == 1){
		  			this.$store.commit('BUYINVITEpageNumber',1)
		  			this.$store.commit('buyInviteInfo')
		  		}else{
		  			this.$store.commit('PAGETHREE',1)
		  			this.$store.commit('buyBidInfoREQUEST')
		  		}	
		  	},
		  	// 商机关键字选择
		  	keywordTop(event,keyword){
		  		$('#procurementPublic .procurement-input .input-with-select input').val(keyword)
		  		// code置空
		  		this.$store.commit('PROCUREMENTstageCode',this.code);
		  		this.$store.commit('BUYINVITEstageCode',this.code);
		  		this.$store.commit('STAGECODE',this.code);
		  		// 不限传值
				this.$store.commit('PROCUREMENTtype',this.unlimited);
				this.$store.commit('BUYINVITEtype',this.unlimited);
				this.$store.commit('TYPEID',this.unlimited);
				// 地区传值
				this.$store.commit('PROCUREMENTareaCode','noArea');
				this.$store.commit('BUYINVITEareaCode','noArea');
				this.$store.commit('AREACODE','noArea');
				// 排序
				this.$store.commit('PROCUREMENTsort',0);
				this.$store.commit('BUYINVITEsort',0);
				this.$store.commit('SORT',0);
		  		// 改变vuex中的状态值，让筛选项归位
		  		this.$store.commit('searchStateChange',1);
		  		this.$store.commit('PROCUREMENTSEARCHSTATE');
		  		// 改变state.paginationShow状态，每次点击初始化分页器位置
		  		this.$store.commit('paginationShowChange');
		  		// 关键字传值
		  		this.$store.commit('PROCUREMENTkeyword',keyword)
		  		this.$store.commit('BUYINVITEkeyword',keyword)
		  		this.$store.commit('KEYWORD',keyword)
		  		// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
		  		this.$store.commit('buyInviteInfoDataClear')
		  		this.$store.commit('procurementClassChange')
		  		this.$store.commit('procurementClassRequest')
		  		// 判断标签页
		  		if(this.tabNum == 0){
		  			this.$store.commit('PROCUREMENTpageNumber',1)
		  			this.$store.commit('procureRequest')
		  		}else if(this.tabNum == 1){
		  			this.$store.commit('BUYINVITEpageNumber',1)
		  			this.$store.commit('buyInviteInfo')
		  		}else{
		  			this.$store.commit('PAGETHREE',1)
		  			this.$store.commit('buyBidInfoREQUEST')
		  		}
		  	},
		  	// 采购商的输入框输入内容
		  	businessInput(){
		  		// 输入框内容
		  		let Businesstext = $('#procurementPublic .procurement-input .input-with-select input').val()
		  		this.$store.commit('businessTextChange',Businesstext)
		  	},
		  	
			  // 采购商关键字变化			  
		  	businessKeyword(event,keyword){
				this.$store.commit('businessKeywordChange',keyword);
				$('#procurementPublic .procurement-input .input-with-select input').val(keyword);
				this.$store.commit('businessKeywordChange',keyword);
				this.$store.commit('businessTextChange',keyword)		  	
			}
		  },
		  mounted(){
		  	let initparams = '';
		  	this.$store.commit('PROCUREMENTkeyword',initparams)
		  	this.$store.commit('BUYINVITEkeyword',initparams)
		  	this.$store.commit('KEYWORD',initparams)
		  	// input框键盘点击事件
		  	let _that = this;
		  	$('#procurementPublic .procurement-input .input-with-select input').bind('keypress',function(event){
		  		if(event.keyCode == 13){
		  			if(_that.selectState == 0){
		  				_that.inputSeach();
		  			}else{
		  				_that.businessInput();
		  			}
		  		}
		  	})

		  	// 商机为首页
		  	$('#procurementPublic .procurement-input .selectBox .select .selectText').html('商机')
		  	this.$router.push({ path: '/procurement' });
		  	this.$store.commit('selectState',0)
		  	// 热门推荐数据获取
		  	this.$store.dispatch('procurementTOPKEY')
		  	$('#top-nav .top-input').css('display','none');
		  	// 页面刷新头部状态
		  	$('#top-nav .top-nav-link').find('li').eq(1).children().css('color','#0d545c');
		  	$('#top-nav .top-nav-link').find('li').eq(0).children().css('color','#fff');
		  	$('#top-nav .top-nav-link').find('li').eq(2).children().css('color','#fff');
		  	$('#top-nav .top-nav-link').find('li').eq(3).children().css('color','#fff');
		  	// 对采购搜索范围判断添加路由 商机/采购商
		  	const that = this;
		  	$('#procurementPublic .procurement-input .selectBox .select').click(function(){
		  		$('#procurementPublic .procurement-input .selectBox .selectOption').css('display','block')
		  	})
		  	$('#procurementPublic .procurement-input .selectBox').mouseleave(function(){
		  		$('#procurementPublic .procurement-input .selectBox .selectOption').css('display','none')
		  	})
		  	$('#procurementPublic .procurement-input .selectBox .selectOption li').eq(0).click(function(){
		  		// 初始化传值用户的登录状态
		  		let paramsInit = {}
		  		paramsInit.appId = getCookie('userId');
		  		paramsInit.token = getCookie('userToken');
		  		that.$store.commit('tokenChange',paramsInit);
		  		// 初始化分页器
		  		that.$store.commit('initParams');
		  		// 点击选择样式改变
		  		$('#procurementPublic .procurement-input .selectBox .select .selectText').html('商机')
		  		$('#procurementPublic .procurement-input .selectBox .selectOption').css('display','none')
	  			that.$store.commit('selectState',0)
		  		that.$router.push({ path: '/procurement' })
		  		 $('#top-nav .top-nav-link').find('li').eq(1).children().css('color','#0d545c');
	  			 $('#top-nav .top-nav-link').find('li').eq(0).children().css('color','#fff');
	  			 $('#top-nav .top-nav-link').find('li').eq(2).children().css('color','#fff');
	  			 $('#top-nav .top-nav-link').find('li').eq(3).children().css('color','#fff');
		  	})
		  	$('#procurementPublic .procurement-input .selectBox .selectOption li').eq(1).click(function(){
		  		$('#procurementPublic .procurement-input .selectBox .select .selectText').html('采购商')
		  		$('#procurementPublic .procurement-input .selectBox .selectOption').css('display','none')
		  		that.$router.push({ path: '/procurement/BusinessChance' });
		  		that.$store.commit('selectState',1)
		  	})
		  },
		  beforeRouteLeave (to, from, next) {
		  		$('#top-nav .top-input').css('display','inline-block');
		  		$('#top-nav .top-nav-link').find('li').eq(1).children().css('color','#fff');
		  		next();
		  },
		  beforeRouteEnter (to, from, next) {
		  	$('#top-nav .top-input').css('display','none');
		  	$('#top-nav .top-nav-link').find('li').eq(1).children().css('color','#0d545c');
		  	next()
		  },

	}
</script>
<style scoped>
	*{
		font-size: 14px;
		font-family: "微软雅黑"
	}
	#procurementPublic{
		width: 1200px;
		margin: 0 auto;
		background-color: #fff;
		padding-top: 35px;
	}
	#procurementPublic .procurement-input .selectBox{
		width: 80px;
    	background-color: #17a6b5;
    	display: relative;
    	color: #ffffff;
    	position: relative;
	}
	#procurementPublic .procurement-input .selectBox .select{
			width: 90px;
			background-color: #17a6b5;
			height: 44px;
			cursor: pointer;
			display: flex;
			justify-content:center;
			align-items:center;
			border-radius: 3px;
		}
	#procurementPublic .procurement-input .selectOption{
			background-color: #cccccc;
			width: 85px;
			list-style: none;
			padding-left: 0;
			margin-top: 0;
			display: none;
			position: absolute;
		}
	#procurementPublic .procurement-input .selectOption li{
			width: 100%;
			height: 30px;
			line-height: 30px;
			color: #ffffff;
			text-align: center;
			cursor: pointer;
		}
	#procurementPublic .procurement-input .selectOption li:hover{
			background-color: #6ccad2;
		}
	#procurementPublic .procurement-input .procurementTopSelect{
		/*display: inline-block;*/
		width: 80px;
		/*position: absolute;*/
		/*left: 0;*/
		height: 100%;
		border: none;
		background-color: #17a6b5;
		color: #ffffff;
		padding-left: 15px;
		outline:none;
		appearance:none;  
    	-moz-appearance:none;  
    	-webkit-appearance:none;
		background:#17a6b5 url("../../assets/procurementIcon/pull-down-top.png") no-repeat;
		background-size: 10px 10px ;
		background-position: 60px center;
	}
	#procurementPublic .procurement-input .procurementTopSelect option{
		background-color: #fff;
		color: #666;
		border: none;
	}
	#procurementPublic .procurement-input .procurementTopSelect option:hover{
		background-color: #6ccad2;
		color: #fff;
	}
	#procurementPublic .procurement-input{
		width: 1100px;
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
	#procurementPublic .procurementRecommend{
		width: 1100px;
		margin: 0 auto;
		height: 14px;
		margin-top: 10px;
		padding-bottom: 30px;
	}
	#procurementPublic .procurementRecommend ul{
		width: 100%;
		height: 100%;
		list-style: none;
	}
	#procurementPublic .procurementRecommend ul .procurementfeistLi{
		margin-left: 10px;
		color: #17a6b5;
		margin-right: -10px;
		cursor: not-allowed;
	}
	#procurementPublic .procurementRecommend ul li{
		height: 14px;
		line-height: 14px;
		float: left;
		margin-left: 25px;
		color: #999999;
	}
	#procurementPublic .procurementRecommend ul li:hover{
		color: #17a6b5;
		cursor: pointer;
	}
</style>
<style>
	#procurementPublic .procurement-input .el-input-group__prepend{
		width: 90px;
		padding: 0;
		height: 40px;
	}
	#procurementPublic .procurement-input .el-input-group{
		width: 1016px;
		/*position: absolute;*/
		/*right: 0;*/
		height: 100%;

	}
	#procurementPublic .procurement-input .el-input--suffix .el-input__inner {
		padding-left: 18px;
	}
	#procurementPublic .procurement-input .el-input__suffix{
		width: 14px;
	}
	#procurementPublic .procurement-input .el-select .el-input .el-select__caret{
		width: 10px;
		padding: 0;

	}
	#procurementPublic .procurement-input .el-input__inner{
		border: none;
	}
	#procurementPublic .procurement-input .el-input__icon{
		font-size: 20px;
	}
	#procurementPublic .procurement-input .el-input-group__append{
		width: 120px;
		text-align: center;
		color: #fff;
		background-color: #17a6b5;
		border: none;
		border-radius: 0px;
        font-size: 14px;
        box-sizing:border-box;
	}
</style>
