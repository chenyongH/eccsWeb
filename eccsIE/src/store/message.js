/* eslint-disable */
import axios from 'axios'
import api from '../api.js'

const state = {
	inform:[],
	informLength:'',
	pageCount:1,
  pageSize:5,
  totalPage:0,
  totalpageTwo:0,
  totalPageThree:0,
  pageOne:1,
  pageTwo:1,
  pageThree:1,
  pageSizeOne:5,
  pageSizeTwo:5,
  pageSizeThree:5
}
const mutations = {
  // 每页数目
  PAGESIZEONE(state,variable){
    state.pageSizeOne = variable
  },
  PAGESIZETWO(state,variable){
    state.pageSizeTwo = variable
  },
  PAGESIZETHREE(state,variable){
    state.pageSizeThree = variable
  },
  // 当前页
  PAGEONE(state,variable){
    state.pageOne = variable
  },
  PAGETWO(state,variable){
    state.pageTwo = variable
  },
  PAGETHREE(state,variable){
    state.pageThree = variable
  },
  PAGECOUNT(state,variable){
    state.pageCount = variable
  },
  PAGESIZE(state,variable){
    state.pageSize = variable
  },
	informChange(state,variable){
		state.inform = variable
	},
	messageInform(state,variable){
		// 请求数据
		let params = {
        accountId: variable.accountId,
        token: variable.token,
        pageNumber:state.pageCount,
        pageSize: state.pageSize,
        type: 1
      };
      api.$http(
          api.serverSupply + api.collection + "/open/api/acc/myChat",
          params
        )
        .then(res => {
        	if(res.code != 3){
        		state.informLength = res.data.mapList.length;
        		state.inform = res.data.mapList;
        	}else{
            state.inform = [];
            state.informLength = 0;
          }
        	
        })
        .catch(err => {
          console.log(err+'通知数据请求出错');
        });
	},
  totalNum(state,variable){
          // 请求数据
          let params = {
              accountId: variable.accountId,
              token: variable.token,
              pageNumber:1,
              pageSize: 5,
              type: 1
            };
            api.$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if(res.code != 3){
                  state.totalPage = res.data.totalCount
                }else{
                  state.totalPage = 0;
                  state.informLength = 0;
                }
                
              })
              .catch(err => {
                console.log(err+'通知数据请求出错');
              });
  },
  totalNumTwo(state,variable){
          // 请求数据
          let params = {
              accountId: variable.accountId,
              token: variable.token,
              pageNumber:1,
              pageSize: 5,
              type: 2
            };
            api.$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if(res.code != 3){
                  state.totalpageTwo = res.data.totalCount
                }else{
                  state.totalpageTwo = 1;
                  state.informLength = 0;
                }
              })
              .catch(err => {
                console.log(err+'通知数据请求出错');
              });
  },
  totalNumThree(state,variable){
          // 请求数据
          let params = {
              accountId: variable.accountId,
              token: variable.token,
              pageNumber:1,
              pageSize: 5,
              type: 3
            };
            api.$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if(res.code != 3){
                  state.totalPageThree = res.data.totalCount
                }else{
                  state.totalPageThree = 1;
                  state.informLength = 0;
                }            
              })
              .catch(err => {
                console.log(err+'通知数据请求出错');
              });
  }
}

// const getters = {
//     num:(state)=>{
//         return state.num
//     }
// };
export default {
    state,
    mutations,
    // getters
}