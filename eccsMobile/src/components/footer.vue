<template>
	<div class="FooterBottom">
		<tabbar class='footerBox' v-if='showOne'>
		  <tabbar-item selected link="/">
		    <img slot="icon" src="../assets/zixun.png">
		    <img slot="icon-active" src="../assets/zixun (2).png">
		    <span slot="label">资讯</span>
		  </tabbar-item>
		  <tabbar-item  link="/procurement">
		    <img slot="icon" src="../assets/shangji.png">
		    <img slot="icon-active" src="../assets/shangji2.png">
		    <span slot="label">商机</span>
		  </tabbar-item>
		  <tabbar-item  link="/LogOut">
		    <img slot="icon" src="../assets/wo-.png">
		    <img slot="icon-active" src="../assets/wo2.png">
		    <span slot="label">我的</span>
		  </tabbar-item>
		</tabbar>
		<tabbar class='footerBox' v-if='showTwo'>
		  <tabbar-item link="/">
		    <img slot="icon" src="../assets/zixun.png">
		    <img slot="icon-active" src="../assets/zixun (2).png">
		    <span slot="label">资讯</span>
		  </tabbar-item>
		  <tabbar-item selected  link="/procurement">
		    <img slot="icon" src="../assets/shangji.png">
		    <img slot="icon-active" src="../assets/shangji2.png">
		    <span slot="label">商机</span>
		  </tabbar-item>
		  <tabbar-item  link="/LogOut">
		    <img slot="icon" src="../assets/wo-.png">
		    <img slot="icon-active" src="../assets/wo2.png">
		    <span slot="label">我的</span>
		  </tabbar-item>
		</tabbar>
		<tabbar class='footerBox' v-if='showThree'>
		  <tabbar-item link="/">
		    <img slot="icon" src="../assets/zixun.png">
		    <img slot="icon-active" src="../assets/zixun (2).png">
		    <span slot="label">资讯</span>
		  </tabbar-item>
		  <tabbar-item  link="/procurement">
		    <img slot="icon" src="../assets/shangji.png">
		    <img slot="icon-active" src="../assets/shangji2.png">
		    <span slot="label">商机</span>
		  </tabbar-item>
		  <tabbar-item selected  link="/LogOut">
		    <img slot="icon" src="../assets/wo-.png">
		    <img slot="icon-active" src="../assets/wo2.png">
		    <span slot="label">我的</span>
		  </tabbar-item>
		</tabbar>

	</div>
</template>
<script>
import { Tabbar, TabbarItem, Group, Cell, TransferDom } from 'vux'
export default {
  name: 'FooterBottom',
  data(){
  	return {
  		showOne:true,
  		showTwo:false,
  		showThree:false
  	}
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  computed: {
    head () {
      return this.$store.state.personal.head
    },
    procurementDetails(){
    	return this.$store.state.procurementDetails
    }
  },
  watch:{
  	head(a){
  		if(a == '商机'){
  			this.showOne = false
  			this.showTwo = true
  			this.showThree = false
  		}else if(a == '个人中心'){
  			this.showOne = false
  			this.showTwo = false
  			this.showThree = true
  		}else{
  			this.showOne=true,
  			this.showTwo=false,
  			this.showThree=false
  		}
  	},
  	procurementDetails(){
  		this.showOne = false
  		this.showTwo = true
  		this.showThree = false
  	}
  },
  mounted(){
  	console.log(this.head)
  	if(this.head == '商机'){
  			this.showOne = false
  			this.showTwo = true
  			this.showThree = false
  		}else if(this.head == '个人中心'){
  			this.showOne = false
  			this.showTwo = false
  			this.showThree = true
  		}else{
  			this.showOne=true,
  			this.showTwo=false,
  			this.showThree=false
  		}
  }
}
</script>
<style scoped>
.FooterBottom {
  height: 100%;
}
</style>