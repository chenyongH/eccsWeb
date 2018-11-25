/* eslint-disable */
import axios from 'axios'
import api from '../api.js'

const state ={
	//中标总数
	buyBidInfoTotal:0,
	buyBidInfoBoolean:false,
	pageThree:1,
	pageThreeSize:5,
	buyBidInfo:[],
	buyBidInfoMessage:[],
	buyBidLogo:[],
	token:'',
	appid:'',
	typeId:'',
	areaCode:'',
	stageCode:'',
	sort:'',
	keyWord:''
}
const mutations = {
	INIT(state){
		state.buyBidInfoMessage = []
		state.buyBidLogo = []
		state.buyBidInfo = []
	},
	// 用户信息
	USERINFO(state,variable){
		state.token = variable.token
		state.appid = variable.appid
	},
	// 当前页
	PAGETHREE(state,variable){
		state.pageThree = variable
	},
	// 每页数目
	PAGETHREESIZE(state,variable){
		state.pageThreeSize = variable
	},
	KEYWORD(state,variable){
		state.keyWord = variable
	},
	TYPEID(state,variable){
		state.typeId = variable
	},
	STAGECODE(state,variable){
		state.stageCode = variable
	},
	AREACODE(state,variable){
		state.areaCode = variable
	},
	SORT(state,variable){
		state.sort = variable
	},
	// 数据清除
	buyBidInfoREQUESTCLEAR(state){
		state.buyBidInfo = []
	},
	// 数据请求
	buyBidInfoREQUEST(state){
		let params = {
			pageNumber:state.pageThree,
			pageSize:state.pageThreeSize,
			token:state.token,
			appid:state.appid,
			keyWord:state.keyWord,
			sort:state.sort,
			stageCode:state.stageCode,
			areaCode:state.areaCode,
			typeId:state.typeId,
		}
		api.$http(api.buyBidInfo,params).then(res =>{
			let buyBidUrl = [];
			state.buyBidLogo =[];
			for (let i = 0; i < res.data.chanceList.length; i++) {
				buyBidUrl.push(api.imgUrl + res.data.chanceList[i].chanceTypeUrl);
				state.buyBidInfoMessage.push(res.data.chanceList[i].chanceInfo.substr(0,30))
			}
			state.buyBidLogo = buyBidUrl
			state.buyBidInfo = res.data.chanceList
			state.buyBidInfoTotal = res.data.pageCount
			if(res.data.chanceList.length == 0){
				state.buyBidInfoBoolean = true
			}else{
				state.buyBidInfoBoolean = false
			}
		}).catch(err =>{
			console.log(err + '中标数据请求出错')
		})
	}
}

export default {
    state,
    mutations,
}