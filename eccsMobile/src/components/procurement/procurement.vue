<template>
	<div class="procurement" v-wechat-title="$route.meta.title">
		<div class="search">
			<input type="search" placeholder="请输入搜索关键词">
			<div @click='search' class="searchIcon">
				<icon type="search" class='icon'></icon>
			</div>
			
		</div>
		<div class="tab" v-if='selectOne'>
			<tab active-color='#17a6b5'>
			    <tab-item selected @on-item-click="onItemClickOne">商机</tab-item>
			    <tab-item @on-item-click="onItemClickTwo">招标</tab-item>
			    <tab-item @on-item-click="onItemClickThree">中标</tab-item>
			</tab>
		</div>
		<div class="tab" v-if='selectTwo'>
			<tab active-color='#17a6b5'>
			    <tab-item @on-item-click="onItemClickOne">商机</tab-item>
			    <tab-item selected @on-item-click="onItemClickTwo">招标</tab-item>
			    <tab-item @on-item-click="onItemClickThree">中标</tab-item>
			</tab>
		</div>
		<div class="tab" v-if='selectThree'>
			<tab active-color='#17a6b5'>
			    <tab-item @on-item-click="onItemClickOne">商机</tab-item>
			    <tab-item @on-item-click="onItemClickTwo">招标</tab-item>
			    <tab-item selected @on-item-click="onItemClickThree">中标</tab-item>
			</tab>
		</div>
		<div class="messageBox">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import { Tab, TabItem, Icon} from 'vux'
	export default {
	  name: 'procurement',
	  data () {
	  return {
	  selectOne: true,
	  selectTwo: false,
	  selectThree: false
	}
	},
	  	components: {
	    	Tab,
	    	TabItem,
	    	Icon
	  	},
	  	computed: {
	  		Selectstate () {
	  			return this.$store.state.procurementState
	  		},
	  		procurement () {
	  			return this.$store.state.procurement
	  		}
	  	},
	  	watch: {
	  		procurement (a) {
	  			if (a == '商机') {
	  				this.selectOne = true
  				this.selectTwo = false
  				this.selectThree = false
  			} else if (a == '招标') {
	  				this.selectOne = false
  				this.selectTwo = true
  				this.selectThree = false
  			}else {
	  				this.selectOne = false
  				this.selectTwo = false
  				this.selectThree = true
  			}
	  		}
	  	},
	  	methods: {
	  		onItemClickOne () {
	  			this.$router.push({
	  				name: 'ProcurementContent'
	  			})
	  		},
	  		onItemClickTwo () {
	  			this.$router.push({
	  				name: 'ProcurementTwo'
	  			})
	  		},
	  		onItemClickThree () {
	  			this.$router.push({
	  				name: 'ProcurementThree'
	  			})
	  		},
	  		search () {
	  			let keyword = $('.search input').val()
	  			this.$store.commit('KEYWORDCHANGE', keyword)
	  			this.$store.commit('SEARCHCHANGE')
	  			// $('.search input').val('')
	  		}
	  	},
	  	mounted () {
	  		this.$store.dispatch('changehead', '商机')
	  		if (this.procurement == '商机') {
	  			this.selectOne = true
				this.selectTwo = false
				this.selectThree = false
	  		} else if (this.procurement == '招标') {
		  			this.selectOne = false
	  			this.selectTwo = true
	  			this.selectThree = false
	  		}else {
		  			this.selectOne = false
	  			this.selectTwo = false
	  			this.selectThree = true
	  		}
	  		let that = this
	  		$('.procurement .search input').keydown(function (e) {
	  			if (e.keyCode == 13 || e.which == 13) {
	  				that.search();
	  			}
	  		})
	  	}
	}
</script>
<style scoped>
	.procurement{
		height: 100%;
		position: fixed;
    	width: 100%;
    	background-color: #ffffff;
	}
	.procurement .search{
		height: 0.8rem;
		width:90%;
		position: relative;
		margin: 0 auto;
		margin-top: 0.266667rem;
		border-radius: 0.4rem;
		background-color: #f4f4f4;
	}
	.procurement .tab{
		margin-top: 2%;
		
	}
	.procurement .tab .vux-tab-item{
		font-size: 0.373333rem;
	}
	.procurement .search input{
		height: 100%;
		width: 85%;
		position: absolute;
		top:0;
		left: 0;
		outline: none;
		border: none;
		box-sizing: border-box;
		border-radius: 0.4rem;
		background-color: #f4f4f4;
		padding-left: 0.4rem;
		font-size: 0.346667rem;
	}
	.searchIcon{
		height: 100%;
		width: 0.933333rem;
		float: right;
	}
	.procurement .search .icon{
		height: 100%;
		font-size: 0.4rem;
		position: absolute;
		right:0.333333rem;
		top: 0;
		line-height: 30px;
	}
	.procurement .messageBox{
		height: 100%;
		width: 100%;
	}
</style>