<template>
	<div class="partner">
		<h4 class="title">{{title}}</h4>
		<ul>
			<li  v-for='(item,index) in picurl'>
				<div class="box">
					<img :src="item" :title='imgAlt[index]' @click='link(data[index].url)'>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import api from '../api.js'
	import $ from 'jquery'

	export default {
		name:'swiper',
		data(){
			return {
				title:'合作伙伴',
				num:0,
				dataLength:6,
				data:{	
				},
				picurl:[],
				footerSwiper:{},
				imgAlt:[]
			}
		},
		methods:{
			link(url){
				let link = 'http://'+ url;
				window.open(link,'_blank')
			}
		},
		mounted(){
	        api.$http(api.swiperAddress)  
	            .then(res => {
	            	this.dataLength = res.data.length
	            	for(var i=0; i < res.data.length ; i ++){
	            		let str = api.imgUrl + res.data[i].picurl;
	            		this.picurl.push(str);
	            		this.imgAlt.push(res.data[i].name)
	            	}
	            	this.data = res.data;
	            	this.num = this.picurl.length;
	            }).catch(err => {
	            console.log('合作伙伴数据请求出错')
	        })
		}
	}

</script>
<style lang="less" scoped>
	.partner{
		height: 180px;
		width: 1200px;
		margin: 0px auto;
		background-color: #f8f8f9;
		position: relative;
		h4{
			height: 60px;
			width: 100%;
			font-size: 20px;
			text-align: center;
			line-height: 60px;
			font-weight: normal;
			font-family: "微软雅黑";
			color: #666666;
		}
		ul{
			height: 120px;
			width: 100%;
			position: absolute;
			top: 60px;
			list-style: none;
			display: flex;
			justify-content: space-around;
			li{
				height: 100%;
				width: 150px;
				float: left;
				.box{
					margin: 0;
					padding: 0;
					border: none;
					height: 100%;
					width: 100%;
					img{
						height: 90px;
						width: 100%;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>