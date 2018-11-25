<template>
  <div class="inform">
    <h3><span @click='goHome'>通知</span>&nbsp&nbsp>&nbsp&nbsp消息详情</h3>
    <h2>{{informData.title}}</h2>
    <p>{{informData.note}}</p>
  </div>
</template>
<script>
  import $ from 'jquery'
  import api from "../../api.js"
  import { getCookie } from "../../assets/js/cookie.js"
  export default {
    data(){
      return {
        informData:{}
      }
    },
    name:'inform',
    computed:{
      inform(){
        return this.$store.state.messageInform.inform
      }
    },
    methods:{
      // 返回站内信
        goHome(){
          this.$store.commit('msgactiveNameChange','msgOne');
          this.$router.push({
          name: "Messages"
          })
        },
    },
    mounted(){
      let inx = this.$route.query.index
      this.informData = this.inform[inx].sysMsg
      let id = this.$route.query.id
      let params = {
        chatIds :id,
        accountId:getCookie("userId"),
        token:getCookie("userToken"),
        type:1
      }
      // 通知消息已读
      api.$http(api.changeStatus,params).then(res =>{
        if(res.code == 0){
          let countChatParams = {
              accountId : getCookie("userId"),
              token:getCookie("userToken")
          }
          api.$http(api.countChat,countChatParams).then(res =>{
              this.$store.commit('systemMessageChange',res.data.msgnum)
              this.$store.commit('userMessageChange',res.data.chatnum)
          }).catch(err =>{
              console.log(err+'通知消息已读后未读消息状态更新请求出错')
          })
        }
      }).catch(err =>{
        console.log(err+ '通知消息已读出错')
      })
    }
  }
</script>
<style scoped>
  .inform{
    width: 940px;
    background-color: #f8f8f9;
  }
  .inform h3{
    font-weight: normal;
    height: 35px;
    background-color: #17a6b5;
    line-height: 35px;
    text-indent: 1em;
    font-size: 14px;
    color: #fff;
    display: block;
  }
  .inform h3 span{
    font-size: 16px;
    cursor: pointer;
  }
  .inform h2{
    border-bottom: 1px dashed #17a6b5;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .inform p{
    height: 100%;
    text-indent: 2em;
    padding: 40px;
    overflow: auto;
  }
</style>