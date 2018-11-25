<template>
	<div id="footer-box">
		<div id="footer-bottom">
			<div id="contain">
				<div id="left">
					<ul>
						<li class="left-title">友情链接</li>
						<li><a target="_blank" :href="url[0]"><img :src="leftImg[0]" alt=""><span>{{name[0]}}</span></a></li>
						<li><a target="_blank" :href="url[1]"><img :src="leftImg[1]" alt=""><span>{{name[1]}}</span></a></li>
						<li><a target="_blank" :href="url[2]"><img :src="leftImg[2]" alt=""><span>{{name[2]}}</span></a></li>
						<li><a target="_blank" :href="url[3]"><img :src="leftImg[3]" alt=""><span>{{name[3]}}</span></a></li>
						<li><a target="_blank" :href="url[4]"><img :src="leftImg[4]" alt=""><span>{{name[4]}}</span></a></li>
					</ul>
				</div>
				<div id="centre">
					<ul>
						<li class="centre-title">{{centre.title}}</li>
						<div class="centre-top">
							<li>{{centre.li1}}</li>
							<li class="size">{{centre.li2}}</li>
							<li class="size">{{centre.li3}}</li>
							<li class="four">{{centre.li4}}</li>
						</div>
						<li>{{centre.li5}}</li>
						<li>{{centre.li6}}</li>
					</ul>
				</div>
				<div id="right">
					<div class="right-top">
						<span>{{right.title}}</span>
						<p>&copy{{right.msg}}</p>
					</div>
					<div class="right-bottom">
						<ul>
							<li>{{right.li1}}</li>
							<li>{{right.li2}}</li>
							<li>{{right.li3}}</li>
							<li>{{right.li4}}</li>
						</ul>
						<img src="../assets/images/footer-logo.png" alt="logo">
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import api from '../api.js'
	export default {
		name:'footer-bottom',
		data(){
			return {
				left:{
				},
				name:[],
				leftImg:[],
				centre:{
					title:'联系信息',
					li1:'中国通信服务国际有限公司',
					li2:'China Communnications Services',
					li3:'International Limited',
					li4:'地址：香港湾仔港湾道23号鹰君中心 3203-3205室',
					li5:'电话：（852）2802 8098',
					li6:'传真：（852）2802 7666'
				},
				right:{
					title:'法律信息',
					msg:'中国通信服务国际有限公司版权所有。未经许可不得复制本网站的任何部分。',
					li1:'',
					li2:'',
					li3:'',
					li4:''
				},
				url:[],
			}
		},
		mounted(){
			api.$http(api.friendlyLink)  
	            .then(res => {
	            	this.left = res.data;
	            	for (var i = 0; i < 5; i++) {
	            		let str =api.imgUrl + res.data[i].picurl;
	            		let urlstr = res.data[i].url;
	            		this.leftImg.push(str);
	            		this.url.push(urlstr);
	            		this.name.push(res.data[i].name)
	            	}
	            }).catch(err => {
	            console.log('底部友情链接出错')
	        })
		}

	}
</script>
<style scoped>
	#footer-box{
		position: relative;
		height: 360px;
		width: 1300px;
		margin: 0 auto;
		background-color: #f8f8f9;
	}
	#footer-bottom{
		margin: 0 auto;
		height: 305px;
		border-bottom: 1px solid #eeeeee;
		width: 1200px;
		color: #828282;
		font-size: 14px;
		font-family: '微软雅黑';
	}
	#contain{
		padding: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
	}
	#left{
		position: absolute;
		text-align: left;
		left: 30px;
		top: 40px;
	}
	#left ul,#centre ul{
		height: 100%;
		list-style: none;
	}
	.left-title,.centre-title{
		font-size: 16px; 
		color: #17a6b5;
		margin-bottom: 20px;
	}
	#left ul li a{
		color: #828282;
		font-size: 14px;
		font-family: '微软雅黑';
	}
	li{
		margin: 10px;
		text-align: left;
	}
	#left li span{
		vertical-align: top;
		margin-left: 5px;
	}
	#left li a{
		text-decoration: none;

	}
	#left img{
		height: 20px;
		width: 20px;
	}
	#centre{
		top: 40px;
		position: absolute;
		left: 30%;
	}
	.centre-top{
		height: 102px;
	}
	.centre-top li{
		margin-bottom: 3px;
		margin-top: 0px;
	}
	.centre-top .size{
		font-size: 12px;
	}
	.centre-top .four{
		width: 230px;
	}
	#right{
		height: 320px;
		position: absolute;
		right: 10%;
		width: 35%;
		top: 40px;
	}
	.right-top{
		position: absolute;
		top: 10px;
	}
	.right-top span{
		position: absolute;
		left: 0;
		font-size: 16px; 
		color: #17a6b5;
	}
	.right-top p{
		margin-top: 41px;
		text-align: left;
		word-break: break-all;
		font-family: "微软雅黑";
	}
	.right-bottom{
		position: absolute;
		top: 120px;
	}
	.right-bottom ul{
		list-style: none;
		padding-left: 0px;
	}
	.right-bottom li{
		margin-bottom: 5px;
		margin-top: 0px;
		margin-left: 0px;
	}
	.right-bottom img{
		position: absolute;
		top: 10px;
		left: 160px;
	}
</style>