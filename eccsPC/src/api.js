/**
 * Created by Administrator on 2018/9/11 0011.
 */
 
import axios from 'axios';
// const serverSupply="http://116.196.89.209";
const serverSupply="http://www.eccs.cc";
const servers=serverSupply+":9001";
 const imgUrl=serverSupply+":9002";
 const portBuyer=':9004';
 const portSupply=':9003';
 const portLogin=':9005';
 const collection=':9006';/*个人中心*/
 const swiperAddress=servers + '/open/api/cms/partner';
const procurement = serverSupply+':9004/open/api/chance/buyChancesInfo';
const invitation = serverSupply+':9004/open/api/chance/buyInviteInfo';
// 底部友情链接
const friendlyLink = serverSupply+':9001/open/api/cms/friendlyLink';
// 新闻点赞
const addLike = serverSupply+':9001/open/api/cms/addLike';
// 新闻收藏
const addCollection = serverSupply+':9006/open/api/acc/addCollection'
// 招标
const buyInviteInfo = serverSupply+':9004/open/api/chance/buyInviteInfo'
// 商机
const buyChancesInfo = serverSupply+':9004/open/api/chance/buyChancesInfo'
// 采购商商机列表
const businessList = serverSupply+':9004/open/api/chance/storeChances'
// 中标接口
const buyBidInfo = serverSupply+':9004/open/api/chance/buyBidInfo'
// 资讯页排行数据
const cmsHot = serverSupply+':9001/open/api/cms/cmsHot'
// 采购信息页热门推荐
const keyword = serverSupply+':9004/open/api/chance/keyword'
// 点赞查询
const checkLike = serverSupply+':9001/open/api/cms/checkLike'
// 收藏查询
const checCollection = serverSupply+':9006/open/api/acc/checCollection'

const countChat = serverSupply+':9006/open/api/acc/countChat'

// 消息详情接口
const chatDetail = serverSupply+':9006/open/api/acc/chatDetail'
// 消息发送
const sendChat = serverSupply+':9006/open/api/acc/sendChat'
// 消息回复
const replyChat = serverSupply+':9006/open/api/acc/replyChat'
// 消息已读接口
const changeStatus = serverSupply+':9006/open/api/acc/changeStatus'
const chanceCnd = serverSupply+':9004/open/api/chance/chanceCnd'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    return Promise.reject(error);
});

// 封装axios的post请求，get请求一样
// export function fetch(url, params) {
//     return new Promise((resolve, reject) => {
//             axios.post(url, params)
//             .then(response => {
//             resolve(response.data);
// })
// .catch((error) => {
//         reject(error);
// })
// })
// }

export function fetch(url, params) {
    const qs = require('qs');
    return new Promise((resolve, reject) => {

            axios.post(url, qs.stringify(params))
                .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export default {
    $http(server, params) { //$http会被调用的方法名,可以按自己喜好命名
        return fetch(server, params);
    },
    servers,
    imgUrl,
    serverSupply,
    portSupply,
    swiperAddress,
    procurement,
    invitation,
    portBuyer,
    friendlyLink,
    addLike,
    portLogin,
    collection,
    addCollection,
    businessList,
    cmsHot,
    keyword,
    checkLike,
    checCollection,
    countChat,
    chatDetail,
    sendChat,
    replyChat,
    changeStatus,
    buyBidInfo,
    buyChancesInfo,
    buyInviteInfo,
    chanceCnd
}

