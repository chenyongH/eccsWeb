<template>
	<div id="procurementIndexClasses">
		<ul>
			<li class="classes-first">商机类型：</li>
			<li><span class="class-first-Span"  @click='topSpan($event)'>不限</span></li>
			<li v-for='classesone in chanceTypes'><span  @click='topClass($event,classesone.id)'>{{classesone.name}}</span></li>
		</ul>
		<ul style="border-bottom:1px solid #f1f1f1">
			<li class="classes-first">项目阶段：</li>
			<li><span class="class-two-Span"  @click='towSpan($event)'>不限</span></li>
			<li v-for='classestwo in stageList'>
				<span  @click='twoClass($event,classestwo.code)'>{{classestwo.name}}</span></li>
		</ul>
		
	</div>
</template>
<script>
	import {getCookie} from '../../assets/js/cookie.js'
	import $ from 'jquery'
	export default{
		name:'procurementIndexClasses',
		data(){
			return{
				unlimited:'',
				code:''
			}
		},
		methods:{
			// 第一个分类不限触发事件
			topSpan(event){
				// 样式改变
				$(event.target).css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$(event.target).parent().siblings().children('span').not(event.target).css({'background':'#ffffff','color':'#666666'});
				// 不限传值
				this.$store.commit('PROCUREMENTtype',this.unlimited);
				this.$store.commit('BUYINVITEtype',this.unlimited);
				this.$store.commit('TYPEID',this.unlimited);
				// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
		  		// 改变state.paginationShow状态，每次点击初始化分页器位置
		  		this.$store.commit('paginationShowChange');
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
			// 第一个搜索类点击事件
			topClass(event,id){
				// 改变state.paginationShow状态，每次点击初始化分页器位置
				this.$store.commit('paginationShowChange');
				// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
				// 样式改变
				$(event.target).css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$(event.target).parent().siblings().children('span').not(event.target).css({'background':'#ffffff','color':'#666666'});

				// 传值
				this.$store.commit('PROCUREMENTtype',id);
				this.$store.commit('BUYINVITEtype',id);
				this.$store.commit('TYPEID',id);
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
			// 第二个不限点击事件
			towSpan(evevt){
				// 改变state.paginationShow状态，每次点击初始化分页器位置
				this.$store.commit('paginationShowChange');
				// 样式改变
				$(event.target).css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$(event.target).parent().siblings().children('span').not(event.target).css({'background':'#ffffff','color':'#666666'});
				// code置空
				// 传值
				this.$store.commit('PROCUREMENTstageCode',this.code);
				this.$store.commit('BUYINVITEstageCode',this.code);
				this.$store.commit('STAGECODE',this.code);
				// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
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
			// 第二个搜索类点击事件
			twoClass(event,code){
				// 改变state.paginationShow状态，每次点击初始化分页器位置
				this.$store.commit('paginationShowChange');
				// 样式改变
				$(event.target).css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$(event.target).parent().siblings().children('span').not(event.target).css({'background':'#ffffff','color':'#666666'});
				// 为参数加上stageCode
				// 传值
				this.$store.commit('PROCUREMENTstageCode',code);
				this.$store.commit('BUYINVITEstageCode',code);
				this.$store.commit('STAGECODE',code);
				// 闪烁
		  		this.$store.commit('procurementDataChange',[])
		  		this.$store.commit('buyBidInfoREQUESTCLEAR')
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
		},
		watch:{
			searchState(){
				// 商机分类样式
				$('#procurementIndexClasses ul li span').css({'background':'#ffffff','color':'#666666'});
				$('#procurementIndexClasses ul .class-two-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$('#procurementIndexClasses ul .class-first-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				this.$store.commit('searchStateChange',0)
			},
			TopProcurementSearch(){
				$('#procurementIndexClasses ul li span').css({'background':'#ffffff','color':'#666666'});
				$('#procurementIndexClasses ul .class-two-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$('#procurementIndexClasses ul .class-first-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
			},
			procurementSearchState(){
				// 商机分类样式
				$('#procurementIndexClasses ul li span').css({'background':'#ffffff','color':'#666666'});
				$('#procurementIndexClasses ul .class-two-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
				$('#procurementIndexClasses ul .class-first-Span').css({'background':'#17a6b5','border-radius':'2px','color':'#ffffff'});
			}
		},
		computed: {
			procurementSearchState(){
				return this.$store.state.procurementSearchState
			},
			searchState(){
				return this.$store.state.searchState
			   },
		    chanceTypes(){
		      	return this.$store.state.procurementClass.chanceTypes 
		      },
		    stageList(){
		      	return this.$store.state.procurementClass.stageList
		      },
		    // 获取当前标签页是哪一个
			tabNum(){
				return this.$store.state.tabNum;
			},
			TopProcurementSearch(){
				return this.$store.state.TopProcurementSearch;
			}
		},
		mounted(){
			this.$store.commit('procurementClassRequest');
			this.$store.commit('PROCUREMENTtype',this.unlimited);
			this.$store.commit('BUYINVITEtype',this.unlimited);
			this.$store.commit('TYPEID',this.unlimited);
			this.$store.commit('PROCUREMENTstageCode',this.code);
			this.$store.commit('BUYINVITEstageCode',this.code);
			this.$store.commit('STAGECODE',this.code);
		}
	}
</script>
<style scoped>
	#procurementIndexClasses{
		width: 1100px;
		margin: 0 auto;
		color: #666666;
		font-size: 12px;
		margin-top: 20px;
	}
	#procurementIndexClasses ul{
		width: 100%;
		height: 40px;
		border: 1px solid #f1f1f1;
		border-bottom: none;
	}
	#procurementIndexClasses ul .class-two-Span{
		background-color: #17a6b5;
		color: #ffffff;
		border-radius: 2px;
	}
	#procurementIndexClasses ul .class-first-Span{
		background-color: #17a6b5;
		color: #ffffff;
		border-radius: 2px;
	}
	/*#procurementIndexClasses ul .default{
		background-color: #17a6b5;
		color: #fff;
	}*/
	#procurementIndexClasses .classes-first{
		margin-left: 10px;
		margin-right: 0px;
		cursor: not-allowed;
		padding-left: 0;
		padding-right: 0px;
	}
	#procurementIndexClasses .classes-last{
		border-bottom: 1px solid #f1f1f1;
	}
	#procurementIndexClasses ul li{
		cursor: pointer;
		height: 100%;
		float: left;
		line-height: 40px;
		padding-left: 10px;
		padding-right: 10px;
        margin-right: 10px;
        list-style: none;
	}
	#procurementIndexClasses ul li span{
		padding: 0 10px;
	}
	#procurementIndexClasses ul .classesone-button,#procurementIndexClasses ul .classestwo-button{
		float: right;
		padding-right: 10px;
	}
	#procurementIndexClasses ul .classesone-button button,#procurementIndexClasses ul .classestwo-button button{
		height: 12px;
		width: 15px;
		line-height: 12px;
	    background-color: #fff;
	    border: 1px solid #f1f1f1;
	    color: #f1f1f1;
	}
</style>
