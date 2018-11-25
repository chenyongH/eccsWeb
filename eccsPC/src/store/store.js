/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import personal from "./personal";
import message from './message'
import ProcurementJs from './procurement'
import vuexAlong from 'vuex-along'
import api from '../api.js'

Vue.use(Vuex)

const state = {
	// 采购商搜索按钮
	TopProcurementSearch:true,
	// 头部采购信息归位
	TopProcurement:true,
	num:'1',
	// 头部搜索闪烁效果使用值
	flicker:true,
	// websock实时通信
	Socket: true,
	// 头部消息未读数目
	Message:{
		systemMessage:1,
		userMessage:3,
	},
	// 头部消息跳转的标签页状态
	msgactiveName: 'msgOne',
	// 头部消息的红点是否显示
	messagesTop: true,
	// 头部搜索文字
	informationTextSearch: '',
	// 采购商搜索内容
	businessText: '',
	// 采购商关键字
	businessKeyword: '',
	// 判断是否搜索
	searchState: 0,
	// 商机关键字推荐
	procurementTopKey:[],
	// 商机select状态存储
	selectState: 0,
	// 记录tab页的展示页面
	tabNum: 0,
	// 无数据时候的页面显示判断状态
	procureBoolean: false,
	// 招标页页面显示数据判断状态
	buyInviteInfoBoolean: false,
	procurementData: [],
	procurementChanceInfo:[],
	currentDate: 0,
	procurementLogo: [],
	intivition: [],
	total: 0,
	procurementClass: {
		chanceTypes: [],
		areaList: [],
		stageList: [],
		sort: 0,
		startTime: 0,
		endTime: 0
	},
	procurementSearchState:true,
	// 登录状态
	login: {
		state: 0
	},
	// 商机分页器归位状态值
	paginationShow:true,
	// 商机数据请求参数
	procurementTotal:0,
	procurementParamRequest:{
		pageNumber:1,
		pageSize:5,
		typeId:'',
		areaCode:'',
		sort:0,
		keyWord:'',
		token:'',
		appid:'',
		stageCode:''
	},
	// 招标请求参数
	buyInviteTotal:0,
	buyInviteParamsRequest:{
		pageNumber:1,
		pageSize:5,
		typeId:'',
		areaCode:'',
		sort:0,
		keyWord:'',
		token:'',
		appid:'',
		stageCode:''
	},
	buyInviteInfo: {
		buyInviteInfoData: [],
		buyInviteInfoLogo: [],
	},
	showState: false
}
const mutations = {
	PROCUREMENTSEARCHSTATE(state){
		state.procurementSearchState = !state.procurementSearchState
	},
	TOPPROCUREMENTSEARCH(state){
		state.TopProcurementSearch = !state.TopProcurementSearch
	},
	TOPPROCUREMENTCHANGE(state){
		state.TopProcurement = !state.TopProcurement
	},
	// 商机参数传值
	PROCUREMENTpageNumber(state,variable){
		state.procurementParamRequest.pageNumber = variable
	},
	PROCUREMENTpageSize(state,variable){
		state.procurementParamRequest.pageSize = variable
	},
	PROCUREMENTuserInfo(state,variable){
		state.procurementParamRequest.token = variable.token
		state.procurementParamRequest.appid = variable.appid
	},
	PROCUREMENTkeyword(state,variable){
		state.procurementParamRequest.keyWord = variable
	},
	PROCUREMENTtype(state,variable){
		state.procurementParamRequest.typeId = variable
	},
	PROCUREMENTstageCode(state,variable){
		state.procurementParamRequest.stageCode = variable
	},
	PROCUREMENTareaCode(state,variable){
		state.procurementParamRequest.areaCode = variable
	},
	PROCUREMENTsort(state,variable){
		state.procurementParamRequest.sort = variable
	},
	// 招标参数传值
	BUYINVITEpageNumber(state,variable){
		state.buyInviteParamsRequest.pageNumber = variable
	},
	BUYINVITEpageSize(state,variable){
		state.buyInviteParamsRequest.pageSize = variable
	},
	BUYINVITEuserInfo(state,variable){
		state.buyInviteParamsRequest.token = variable.token
		state.buyInviteParamsRequest.appid = variable.appid
	},
	BUYINVITEkeyword(state,variable){
		state.buyInviteParamsRequest.keyWord = variable
	},
	BUYINVITEtype(state,variable){
		state.buyInviteParamsRequest.typeId = variable
	},
	BUYINVITEstageCode(state,variable){
		state.buyInviteParamsRequest.stageCode = variable
	},
	BUYINVITEareaCode(state,variable){
		state.buyInviteParamsRequest.areaCode = variable
	},
	BUYINVITEsort(state,variable){
		state.buyInviteParamsRequest.sort = variable
	},
	// 商机分页器状态值分类
	paginationShowChange(state){
		state.paginationShow = !state.paginationShow
	},
	// 招标闪烁
	buyInviteInfoDataClear(state){
		state.buyInviteInfo = {
			buyInviteInfoData: [],
			buyInviteInfoLogo: [],
		}
	},
	// 闪烁值
	procurementClassChange(state){
		state.procurementClass = {
			chanceTypes: [],
			areaList: [],
			stageList: [],
			sort: 0,
			startTime: 0,
			endTime: 0
		}
	},
	// 头部搜索闪烁效果使用值
	flickerChange(state){
		state.flicker = !state.flicker;
	},
	// Socket状态
	SocketState(state){
		state.Socket = !state.Socket
	},
	// 头部消息未读数目变化
	systemMessageChange(state,variable){
		state.Message.systemMessage = variable
	},
	userMessageChange(state,variable){
		state.Message.userMessage = variable
	},
	// 头部消息跳转状态变化
	msgactiveNameChange(state, variable) {
		state.msgactiveName = variable
	},
	// 我的信息头部状态改变
	messagesTopChange(state) {
		state.messagesTop = !state.messagesTop
	},
	// 顶部导航栏搜索
	informationTextSearchChange(state, variable) {
		state.informationTextSearch = variable;
	},
	// 采购商搜索
	businessTextChange(state, variable) {
		state.businessText = variable;
	},
	// 采购商keyword
	businessKeywordChange(state, variable) {
		state.businessKeyword = variable;
	},
	// 商机关键字推荐
	procurementTopKeyCleaar(state){
		state.procurementTopKey = [];
	},
	// 改变搜索状态判断值
	searchStateChange(state, variable) {
		state.searchState = variable;
	},
	// 商机页select状态改变
	selectState(state, variable) {
		state.selectState = variable
	},
	loginStateChange(state, variable) {
		state.login.state = variable
	},
	// 标签页计数
	tabNum(state, variable) {
		state.tabNum = variable;
	},
	procurementDataChange(state, variable) {
		state.procurementData = variable;
	},
	currentDateChange(store, variable) {
		state.currentDate = variable;
	},
	procurementLogoChange(store, variable) {
		state.procurementLogo = variable;
	},
	intivitionChange(store, variable) {
		state.intivition = variable;
	},
	// 头部状态未读消息变化
	topMessageStatusUpdate(state,variable){
		api.$http(api.countChat,variable).then(res =>{
		    state.Message.systemMessage = res.data.msgnum
		    state.Message.userMessage = res.data.chatnum
		}).catch(err =>{
		    console.log(err+'头部未读信息数据更新请求出错')
		})
	},
	// 关键字推荐数据请求
	procurementTopKeyRequest(){
		state.procurementTopKey = [];
		api.$http(api.keyword,{type:1}).then(res =>{
			for (var i = 0; i < res.data.length; i++) {
				state.procurementTopKey.push(res.data[i].name)
			}
		}).catch(err =>{
			console.log('采购商页热门推荐')
		})
	},
	// 商机分类信息条目请求函数
	procurementClassRequest() {
		api.$http(api.chanceCnd).then(res => {
			// 商品分类  

			state.procurementClass.chanceTypes = [];
			for (var i = 0; i < res.data.chanceTypes.length; i++) {
				state.procurementClass.chanceTypes.push(res.data.chanceTypes[i])
			}
			// 所有地区
			state.procurementClass.areaList = [];
			for (var j = 0; j < res.data.areaList.length; j++) {
				state.procurementClass.areaList.push(res.data.areaList[j])
			}
			// 商机状态
			state.procurementClass.stageList = [];
			for (var k = 0; k < res.data.stageList.length; k++) {
				state.procurementClass.stageList.push(res.data.stageList[k])
			}
		}).catch(err => {
			console.log('商机分类信息条目请求出错' + err)
		})
	},
	// 商机信息商机列表请求
	procureRequest(state) {	
		api.$http(api.buyChancesInfo,state.procurementParamRequest).then(res => {
			let procurementLogoUrl = [];
			state.procurementChanceInfo =[];
			for (let i = 0; i < res.data.chanceList.length; i++) {
				procurementLogoUrl.push(api.imgUrl + res.data.chanceList[i].chanceTypeUrl);
				state.procurementChanceInfo.push(res.data.chanceList[i].chanceInfo.substr(0,20))
			}
			state.procurementLogo = procurementLogoUrl;
			let resObj = res.data
			state.procurementData = resObj
			// 提交条目总数
			state.procurementTotal = res.data.pageCount;
			if (state.procurementData.chanceList.length == 0) {
				state.procureBoolean = true
			} else {
				state.procureBoolean = false
			}
		}).catch(err => {
			console.log(err)
		})
	},
	// 招标信息列表数据请求
	buyInviteInfo(state) {
		api.$http(api.buyInviteInfo, state.buyInviteParamsRequest).then(res => {
			state.buyInviteInfo.buyInviteInfoData = res.data;
			let buyInviteInfoLogoUrl = [];
			for (let i = 0; i < res.data.chanceList.length; i++) {
				buyInviteInfoLogoUrl.push(api.imgUrl + res.data.chanceList[i].chanceTypeUrl);
			}
			state.buyInviteInfo.buyInviteInfoLogo = buyInviteInfoLogoUrl;
			state.buyInviteTotal = state.buyInviteInfo.buyInviteInfoData.pageCount;
			let buyInviteInfoNum = res.data.chanceList.length;
			if (buyInviteInfoNum == 0) {
				state.buyInviteInfoBoolean = true
			} else {
				state.buyInviteInfoBoolean = false
			}
		}).catch(err => {
			console.log('招标信息列表数据请求错误' + err)
		})
	},
	//回复按钮显示
	reply(state){
		state.showState = !state.showState;
	},
	// webscoket
	// websocketFunction(state,userName) {
	// 		state.Socket = new WebSocket("ws://116.196.89.209:9002/websocket"); //连接服务器   
	// 		state.Socket.onopen = function (appid) {
	// 			    console.log('webpack已经与服务器连接')
	// 			try {
	// 				state.Socket.send(JSON.stringify({
	// 					room: userName,
	// 					"action": "join"
	// 				}));
	// 			} catch (ex) {
	// 				console.log("WebSocket连接初始化出错")
	// 			}
	// 		};
	// 		state.Socket.onmessage = function (event) {
	// 			// 推送消息后根据消息的变化改变未读消息数据
	// 			// this.commit('stateDemo')
	// 			state.Message.systemMessage = event.data.msgnum;
	// 			state.Message.userMessage = event.data.chatnum;
	// 		};
	// 		state.Socket.onclose = function (event) {
	// 			  console.log('websocket断开连接')
	// 		};
	// 		state.Socket.onerror = function (event) {
	// 			// console.log(event)
	// 		};
	// }

}
//异步
const actions = {
	// websocketFunction(context, userName) {
	// 	context.commit('websocketFunction', userName)
	// },
	procurementTOPKEY(context){
		context.commit('procurementTopKeyRequest')
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
    modules: {
        personal: personal,
        messageInform:message,
        ProcurementJs:ProcurementJs
    },
    plugins: [vuexAlong]
})