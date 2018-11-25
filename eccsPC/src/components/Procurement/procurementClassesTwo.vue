<template>
	<div id="procurementClassesTwo">
		<div class="selectone" @click="selectoneShow" @mouseleave='selectoneHidden'>
			<div class="areaDiv"><span>地区不限</span><i class="iconfont icon-xiasanjiao"></i></div>
			<ul>
				<li v-for='city in areaList' @click='selectoneLi(city)'>{{city.name}}</li>
			</ul>
		</div>
		<div class="selecttwo" @click='selecttwoShow' @mouseleave='selecttwoHidden'>
			<div class="sortDiv"><span>最新发布</span><i class="iconfont icon-xiasanjiao"></i></div>
			<ul>
				<li v-for='sort in sort' @click='selecttwoli(sort)'>{{sort.label}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {getCookie} from '../../assets/js/cookie.js'
	import $ from 'jquery'
	export default{
		name:'procurementClassesTwo',
		data(){
			return{
				sort:[
					{
						value:'0',
						label:'最新发布'
					},
					{
						value:'1',
						label:'以前发布'
					}
				],
				num:0,
			}
		},
		methods:{
			// 地区的显示
			selectoneShow(){
				$('#procurementClassesTwo .selectone ul').css('display','block')
			},
			// 地区的隐藏
			selectoneHidden(){
				$('#procurementClassesTwo .selectone ul').css('display','none')
			},
			// 地区的点击事件
			selectoneLi(city){
				$('#procurementClassesTwo .selectone .areaDiv span').html(city.name)
				$('#procurementClassesTwo .selectone ul').stop().slideUp();
				// 改变state.paginationShow状态，每次点击初始化分页器位置
				this.$store.commit('paginationShowChange');
				// 传值
				this.$store.commit('PROCUREMENTareaCode',city.code);
				this.$store.commit('BUYINVITEareaCode',city.code);
				this.$store.commit('AREACODE',city.code);
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
			// 排序的样式显示
			selecttwoShow(){
				$('#procurementClassesTwo .selecttwo ul').css('display','block')
			},
			// 排序的样式隐藏
			selecttwoHidden(){
				$('#procurementClassesTwo .selecttwo ul').css('display','none')
			},
			// 排序顺序点击数据请求
			selecttwoli(sort){
				$('#procurementClassesTwo .selecttwo .sortDiv span').html(sort.label)
				$('#procurementClassesTwo .selecttwo ul').stop().slideUp();

				// 改变state.paginationShow状态，每次点击初始化分页器位置
				this.$store.commit('paginationShowChange');
				// 请求数据
				// 获取vuex中的keword值加入数据请求参数中
				this.$store.commit('PROCUREMENTsort',sort.value);
				this.$store.commit('BUYINVITEsort',sort.value);
				this.$store.commit('SORT',sort.value);
				// this.$store.commit('sortChange');
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
			}
		},
		watch:{
			searchState(){
				$('#procurementClassesTwo .selecttwo .sortDiv span').html('最新发布')
				$('#procurementClassesTwo .selectone .areaDiv span').html('地区不限')
				this.$store.commit('searchStateChange',0)
			},
			procurementSearchState(){
				$('#procurementClassesTwo .selecttwo .sortDiv span').html('最新发布')
				$('#procurementClassesTwo .selectone .areaDiv span').html('地区不限')
				this.$store.commit('searchStateChange',0)
			}
		},
		computed: {
			procurementSearchState(){
				return this.$store.state.procurementSearchState
			},
			// 搜索时候的筛选状态归位
			searchState(){
				return this.$store.state.searchState
			},
			total(){
				return this.$store.state.total;
			},
			// 获取当前标签页是哪一个
			tabNum(){
				return this.$store.state.tabNum;
			},
			//地区数据
		    areaList(){
		      return this.$store.state.procurementClass.areaList 
		    },
		    paginationShow(){
				return this.$store.state.paginationShow
			},
			TopProcurementSearch(){
				return this.$store.state.TopProcurementSearch;
			}
		},
		mounted(){
			let areaCode = '';
			let sort = 0;
			this.$store.commit('PROCUREMENTareaCode',areaCode);
			this.$store.commit('BUYINVITEareaCode',areaCode);
			this.$store.commit('AREACODE',areaCode);
			this.$store.commit('PROCUREMENTsort',sort);
			this.$store.commit('BUYINVITEsort',sort);
			this.$store.commit('SORT',sort);
		}
	}
</script>
<style lang="less" scoped>
	#procurementClassesTwo{
		width: 1200px;
		height: 40px;
		margin: 0 auto;
		border: 1px solid #f1f1f1;
		margin-top: 20px;
		position: relative;
		.selectone{
			cursor: pointer;
			height: 40px;
			width: 130px;
			display: inline-block;
			color: #666666;
			position: absolute;
			.areaDiv{
				text-align: center;
				width: 130px;
				height: 100%;
				line-height: 40px;
				border-right: 1px solid #f1f1f1;
				.iconfont{
					font-size: 15px;
					margin-left: 10px;
				}
			}
			ul{
				width: 130px;
				border: 1px solid #f1f1f1;
				position: absolute;
				top: 40px;
				z-index: 10;
				background-color: #ccc;
				text-align: center;
				color: #ffffff;
				display: none;
				li:hover{
					background-color: #6ccad2;
				}
			}
		}
		.selecttwo{
			cursor: pointer;
			height: 40px;
			width: 130px;
			display: inline-block;
			color: #666666;
			position: absolute;
			left: 130px;
			.sortDiv{
				text-align: center;
				width: 130px;
				height: 100%;
				line-height: 40px;
				border-right: 1px solid #f1f1f1;
				.iconfont{
					font-size: 15px;
					margin-left: 10px;
				}
			}
			ul{
				width: 130px;
				border: 1px solid #f1f1f1;
				position: absolute;
				top: 40px;
				z-index: 10;
				background-color: #ccc;
				text-align: center;
				color: #ffffff;
				display: none;
				li:hover{
					background-color: #6ccad2;
				}
			}
		}
	}
</style>