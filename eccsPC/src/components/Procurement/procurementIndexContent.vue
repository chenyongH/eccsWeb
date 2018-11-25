<template>
	<div id="procurementIndexContent">
		<el-tabs type="border-card" @tab-click='buyInvite($event)' class='tabs'>
		  <el-tab-pane label="商机">
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
		  	  <tr class="table-body" v-for='procurementInfo,index in procurementData.chanceList'>
		  	    <td>{{procurementInfo.buyArea}}</td>
		  	    <td class="tdTwo">
		  	    	<img :src="procurementLogo[index]" alt="">
		  	    	<span class="span1">{{procurementInfo.chanceTypeName}}</span>
		  	    </td>
		  	    <td class="tdthree">
		  	    	<div>
		  	    		<span class="span1">{{procurementInfo.chanceName}}</span>
		  	    		<span class="span2">{{procurementChanceInfo[index]}}</span>
		  	    	</div>	
		  	    </td>
		  	    <td>{{procurementInfo.beginDate}}</td>
		  	    <td>{{procurementInfo.endDate}}</td>
		  	    <td>{{procurementInfo.stage}}</td>
		  	    <td><a @click='goPath(procurementInfo)'>详情信息</a></td>
		  	  </tr>
		  	  <tr v-if='procureBoolean' class="procureBoolean">
		  	  	<td colspan="7">暂无数据</td>
		  	  </tr>
		  	</table>
		  	<div class="block">
		      <el-pagination
		              @size-change="handleSizeChangeOne"
		              @current-change="handleCurrentChangeOne"
		              :current-page.sync = "pageOne"
		              :page-sizes="[5, 10, 15, 20]"
		              :page-size="5"
		              layout="sizes, prev, pager, next, jumper"
		              :page-count="procurementTotal"
		              :pager-count="5"
		      >
		      </el-pagination>
		  	</div>
		  </el-tab-pane>
		  <el-tab-pane label="招标">
			  	<table>
			  		<tr class="table-header">
			  		    <th>区域</th>
			  		    <th>项目类型</th>
			  		    <th>内容摘要</th>
			  		    <th>开始时间</th>
			  		    <th>结束时间</th>
			  		    <th>阶段</th>
			  		    <th></th>
			  		</tr>
			  		<tr class="table-body" v-for='buyInviteInfo,index in buyInviteInfoData.chanceList'>
			  		    <td>{{buyInviteInfo.buyArea}}</td>
			  		    <td class="tdTwo">
		  	    			<img :src="buyInviteInfoLogo[index]" alt="">
		  	    			<span class="span1">{{buyInviteInfo.chanceTypeName}}</span>
		  	    		</td>
			  		    <td class="tdthree">
			  		    	<div>
			  		    		<span class="span1">{{buyInviteInfo.chanceName}}</span>
			  		    		<span class="span2">{{buyInviteInfo.chanceInfo}}</span>
			  		    	</div>	
			  		    </td>
			  		    <td>{{buyInviteInfo.beginDate}}</td>
			  		    <td>{{buyInviteInfo.endDate}}</td>
			  		    <td>{{buyInviteInfo.stage}}</td>
			  		    <td><a @click='goPath(buyInviteInfo)'>详情信息</a></td>
			  		</tr>
			  		<tr v-if='buyInviteInfoBoolean' class="procureBoolean">
			  		  <td colspan="7">暂无数据</td>
			  		</tr>
			  	</table>
			  	<div class="block">
			  	    <el-pagination
			  	            @size-change="handleSizeChangeTwo"
			  	            @current-change="handleCurrentChangeTwo"
			  	            :current-page.sync = "pageTwo"
			  	            :page-sizes="[5, 10, 15, 20]"
			  	            :page-size="5"
			  	            layout="sizes, prev, pager, next, jumper"
			  	            :page-count="buyInviteTotal"
			  	            :pager-count="5"
			  	    >
			  	    </el-pagination>
			  	</div>
		  </el-tab-pane>
		  <el-tab-pane label="中标">
		  		<table>
			  		<tr class="table-header">
			  		    <th>区域</th>
			  		    <th>商机类型</th>
			  		    <th>内容摘要</th>
			  		    <th>中标企业</th>
			  		    <th>中标时间</th>
			  		</tr>
			  		<tr class="table-body" v-for='buyBidInfoItem,index in buyBidInfo'>
			  		    <td>{{buyBidInfoItem.buyArea}}</td>
			  		    <td class="tdTwo">
		  	    			<img :src="buyBidLogo[index]" alt="">
		  	    			<span class="span1">{{buyBidInfoItem.chanceTypeName}}</span>
		  	    		</td>
			  		    <td class="tdthree">
			  		    	<div>
			  		    		<span class="span1">{{buyBidInfoItem.chanceName}}</span>
			  		    		<span class="span2">{{buyBidInfoMessage[index]}}</span>
			  		    	</div>	
			  		    </td>
			  		    <td>{{buyBidInfoItem.bidStoreName}}</td>
			  		    <td>{{buyBidInfoItem.bidTime}}</td>
			  		</tr>
			  		<tr v-if='buyBidInfoBoolean' class="procureBoolean">
			  		  <td colspan="7">暂无数据</td>
			  		</tr>
			  	</table>
			  	<div class="block">
			  	    <el-pagination
			  	            @size-change="handleSizeChangeThree"
			  	            @current-change="handleCurrentChangeThree"
			  	            :current-page.sync = "pageThree"
			  	            :page-sizes="[5, 10, 15, 20]"
			  	            :page-size="5"
			  	            layout="sizes, prev, pager, next, jumper"
			  	            :page-count="buyBidInfoTotal"
			  	            :pager-count="5"
			  	    >
			  	    </el-pagination>
			  	</div>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import api from '../../api.js'
	import $ from 'jquery'
	import {getCookie} from '../../assets/js/cookie.js'
	export default{
		name:'procurementIndexContent',
		data(){
			return{
				page:1,
				pageOne:1,
				pageTwo:1,
				pageThree:1,
				pageSizeOne:5,
				pageSizeTwo:5,
				pageSizeThree:5,
			}
		},
		computed:{
			buyInviteInfoBoolean(){
				return this.$store.state.buyInviteInfoBoolean; 
			},
			procureBoolean(){
				return this.$store.state.procureBoolean; 
			},
			total(){
				return this.$store.state.total; 
			},
			procurementData(){
				return this.$store.state.procurementData 
			},
			procurementChanceInfo(){
				return this.$store.state.procurementChanceInfo
			},
			pageSize(){
				return this.$store.state.parameter.pageSize
			},
			currentDate(){
				return this.$store.state.currentDate
			},
			procurementLogo(){
				return this.$store.state.procurementLogo
			},
			topClass(){
				return this.$store.state.topClass
			},
			buyInviteInfoData(){
				return this.$store.state.buyInviteInfo.buyInviteInfoData
			},
			buyInviteInfoLogo(){
				return this.$store.state.buyInviteInfo.buyInviteInfoLogo
			},
			tabs(){
				return this.$store.state.tabNum
			},
			paginationShow(){
				// 状态值判断分页器归位
				return this.$store.state.paginationShow
			},
			// 中标信息
			buyBidInfo(){
				return this.$store.state.ProcurementJs.buyBidInfo
			},
			buyBidInfoMessage(){
				return this.$store.state.ProcurementJs.buyBidInfoMessage
			},
			buyBidLogo(){
				return this.$store.state.ProcurementJs.buyBidLogo
			},
			// 中标
			pageThreeNum(){
				return this.$store.state.ProcurementJs.pageThree
			},
			pageThreeSizeNum(){
				return this.$store.state.ProcurementJs.pageThreeSize
			},
			// 中标总数
			buyBidInfoTotal(){
				return this.$store.state.ProcurementJs.buyBidInfoTotal
			},
			// 中标无数据状态
			buyBidInfoBoolean(){
				return this.$store.state.ProcurementJs.buyBidInfoBoolean
			},
			// 商机请求的当前页
			pageOneNum(){
				return this.$store.state.procurementParamRequest.pageNumber
			},
			// 商机总数
			procurementTotal(){
				return this.$store.state.procurementTotal
			},
			// 招标总数
			buyInviteTotal(){
				return this.$store.state.buyInviteTotal
			}
		},
		watch:{
			paginationShow(){
				this.pageOne = 1;
				this.pageTwo =1;
				this.pageThree = 1;
			}
		},
		methods:{
			// 标签页改变标签时候触发事件
			buyInvite(event){
				if(event.index == 0){
					this.$store.commit('tabNum',0);
					// 商机
					this.pageOne = 1
					this.$store.commit('PROCUREMENTpageNumber',1)
					this.$store.commit('procureRequest')
				}else if(event.index == 1){
					this.$store.commit('tabNum',1);
					// 招标
					this.pageTwo =1
					this.$store.commit('BUYINVITEpageNumber',1)
					// this.$store.commit('BUYINVITEpageSize',5)
					let usersInfo = {
						appid:getCookie('userId'),
						token:getCookie('userToken')
					}
					this.$store.commit('BUYINVITEuserInfo',usersInfo)
					this.$store.commit('buyInviteInfo');
				}else{

					this.$store.commit('tabNum',2);
					// 中标
					let userInfoID = {
						appid:getCookie('userId'),
						token:getCookie('userToken')
					}
					this.$store.commit('USERINFO',userInfoID)
					this.pageThree = 1
					this.$store.commit('PAGETHREE',1)
					// this.$store.commit('PAGETHREESIZE',5)
					this.$store.commit('buyBidInfoREQUEST')
				}
			},
			// 详情信息点击跳转
			goPath(event){
				let query = {}
				query.chanceId = event.id;
				query.appid = getCookie('userId');
				query.token = getCookie('userToken');
				// console.log(params)
				this.$router.push({name: 'BusinessChancelogin',query})
			},
			// 商机当前页改变
			handleCurrentChangeOne(val){
				this.$store.commit('PROCUREMENTpageNumber',val)
				this.$store.commit('procureRequest');
			},
			// 中标当前页
			handleCurrentChangeThree(val){
				// 改变每页的数据条数
				this.$store.commit('PAGETHREE',val);
				this.$store.commit('buyBidInfoREQUEST');
			},
			// 招标当前页修改
			handleCurrentChangeTwo(val){
				this.$store.commit('BUYINVITEpageNumber',val)
				this.$store.commit('buyInviteInfo');
			},
			// 商机每页条数
			handleSizeChangeOne(val){
				// 初始化传值判断用户是否登录可以不加
				// let usersInfo = {
				// 	appid:getCookie('userId'),
				// 	token:getCookie('userToken')
				// }
				// this.$store.commit('PROCUREMENTuserInfo',usersInfo)
				// 改变每页的数据条数
				this.$store.commit('PROCUREMENTpageSize',val);
				this.pageOne = 1
				this.$store.commit('PROCUREMENTpageNumber',1)
				this.$store.commit('procureRequest');
			},
			// 招标分页每页数目
			handleSizeChangeTwo(val){
				// 改变每页的数据条数
				this.$store.commit('BUYINVITEpageSize',val);
				// 改变当前页为1
				this.pageTwo = 1
				this.$store.commit('BUYINVITEpageNumber',1)
				this.$store.commit('buyInviteInfo');
			},
			handleSizeChangeThree(val){
				this.$store.commit('PAGETHREESIZE',val)
				// 改变当前页为1
				this.pageThree = 1
				this.$store.commit('PAGETHREE',1)
				this.$store.commit('buyBidInfoREQUEST')
			},
			
		},
		mounted(){
			// 初始化
			this.$store.commit('INIT')
			// 初始化标签页为商机
			this.$store.commit('tabNum',0);
			this.$store.commit('PROCUREMENTpageNumber',1)
			this.$store.commit('BUYINVITEpageNumber',1)
			this.$store.commit('PAGETHREE',1)
			this.$store.commit('PROCUREMENTpageSize',5)
			this.$store.commit('BUYINVITEpageSize',5)
			this.$store.commit('PAGETHREESIZE',5)
			let usersInfo = {
				appid:getCookie('userId'),
				token:getCookie('userToken')
			}
			this.$store.commit('PROCUREMENTuserInfo',usersInfo)
			this.$store.commit('procureRequest');
			
		}
	}
</script>
<style scoped>
	#procurementIndexContent{
		width: 1200px;
		margin: 0 auto;
		margin-top: 40px;
	}
	#procurementIndexContent table{
		width: 1200px;
		font-size: 12px;
		margin-top: 20px;
		border-collapse: separate;
		border-spacing: 0;
	}
	#procurementIndexContent table .procureBoolean td{
		height: 100px;
		background-color: #fafafa;
		text-align: center;
		font-size: 20px;
		color: #b1b1b1;
		border-bottom: 1px solid #ebeef5;
	}
	#procurementIndexContent table tr{
		width: 1200px;
	}
	#procurementIndexContent table .table-header{
		height: 30px;
		background-color: #17a6b5;
		color: #ffffff;
	}
	#procurementIndexContent table .table-header th:nth-child(1){
		border-radius: 5px 0px 0px 0px ;
		width: 100px;
	}
	#procurementIndexContent table .table-header th:nth-child(2){
		width: 160px;
	}
	#procurementIndexContent table .table-header th:nth-child(3){
		width: 350px;
	}
	#procurementIndexContent table .table-header th:nth-child(4){
		width: 180px;
	}
	#procurementIndexContent table .table-header th:nth-child(5){
		width: 180px;
	}
	#procurementIndexContent table .table-header th:nth-child(6){
		width: 100px;
	}
	#procurementIndexContent table .table-header th:nth-child(7){
		border-radius: 0px 5px 0px 0px ;
	}
	#procurementIndexContent table .table-body{
		height: 85px;
		color: #666666;
	}
	#procurementIndexContent table .table-body td{
		text-align: center;
	}
	#procurementIndexContent table .table-body td a{
		color: #17a6b5;
		cursor: pointer;
	}
	#procurementIndexContent table .table-body td:nth-child(3) img{
		line-height: 85px;
	}
	#procurementIndexContent table .table-body td:nth-child(2){
		display: flex;
		justify-content: center;
		align-items: center;
		height: 85px;
	}
	#procurementIndexContent table .table-body td:nth-child(2) span{
		margin-left: 10px;
	}
	#procurementIndexContent table .table-body td:nth-child(3) div{
		display: inline-block;
		width: 100%
	}
	#procurementIndexContent table .table-body td:nth-child(3) div span{
		display: block;
		text-align: left;
		padding-left: 80px;
	}
	#procurementIndexContent table .table-body td:nth-child(3) div .span1{
		margin-bottom: 10px;
		font-size: 14px;
	}
	#procurementIndexContent .block{
		text-align: right;
		padding-bottom: 40px;
	}
	.tdthree .span2{
		height: 36px;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}

</style>
<style>
	#procurementIndexContent .el-tabs--border-card>.el-tabs__header{
		background-color: #fff;
		height: 23px;
		border-bottom: 2px solid #17a6b5;
		font-size: 14px;
	}
	#procurementIndexContent .el-tabs--border-card>.el-tabs__header .el-tabs__item{
		height: 23px;
		line-height: 23px;
		width: 90px;
		text-align: center;
		margin-right: 20px;
		border-radius: 8px 8px 0px 0px;
	}
	#procurementIndexContent .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
		background-color: #17a6b5;
		border: none;
		color: #fff;
		border-bottom: 2px solid #17a6b5;
	}
	#procurementIndexContent .el-tabs--border-card>.el-tabs__content{
		padding: 0;
	}
	#procurementIndexContent .block .el-icon-more{
	 	border: none !important;
	}
</style>