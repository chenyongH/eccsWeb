<template>
    <div class="msgDetailsContent">
         <el-button :plain="true" class='box'></el-button>
        <h2><span @click='goHome'>已接收</span>&nbsp&nbsp>&nbsp&nbsp消息详情</h2>
        <div class="messageContent">
          <span>{{userName}}&nbsp&nbsp&nbsp&nbsp&nbsp{{messageTime}}</span>
          <p>{{messageDetail}}</p>
        </div>
        
        <div class="replyMessage">
            <div class="reply">
                <el-button v-if="this.$store.state.showState" size="small" type="primary"  @click.native="reply()">回复</el-button>
            </div>               
            <div class="send"  v-if="!this.$store.state.showState">
                <el-input type="textarea" class='textValue'></el-input> 
                <el-button @click.native="sendMessage()"  type="primary" size="small" class='button1'>发送</el-button> 
                <el-button @click.native="reply()"  type="default" size="small">取消</el-button>     
            </div> 
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import api from "../../api.js"
import { getCookie } from "../../assets/js/cookie.js"
export default {
  name: "messageDetails",
  data() {
    return {
      goodsId:'',
      storeId:'',
      messageTime:'',
      userName:'',
    };
  },
  methods:{
    // 返回站内信
      goHome(){
        this.$store.commit('msgactiveNameChange','msgTwo');
        this.$router.push({
        name: "Messages"
        })
      },
      reply() {
        this.$store.commit("reply");
        console.log(this.$store.state.showState);
      },
      sendMessage(){
       if($('.textValue textarea').val()){
          let sendParams = {
            accountId : getCookie("userId"),
            token:getCookie("userToken"),
            content : $('.textValue textarea').val(),
            chatId:this.$route.query.chatId
          }
          api.$http(api.replyChat,sendParams).then(res =>{
            $('.textValue textarea').val('')
            this.$message({
              message: '回复成功',
              type: 'success'
            });
          }).catch(err =>{
            console.log(err+ '回复消息出错')
          })
       }
       
      }
  },
  computed:{
     Reply() {
      return this.$store.state.showState;
    } 
  },
  mounted(){
    let paramsMessage = {
      accountId : getCookie("userId"),
      token:getCookie("userToken"),
      type:this.$route.query.type,
      chatId:this.$route.query.chatId
    }
    api.$http(api.chatDetail,paramsMessage).then(res =>{
      this.messageTime = res.data.sendAt;
      this.userName = res.data.userName;
      this.messageDetail = res.data.sysChat.content;
      this.storeId = res.data.sysChat.storeId;
      this.goodsId = res.data.sysChat.goodsId;
    }).catch(err =>{
      console.log(err+'消息详情请求出错')
    })
  }
};
</script>
<style>
.msgDetailsContent {
  width: 940px;
  background-color: #f8f8f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.msgDetailsContent .box{
  display: none;
}
.msgDetailsContent h2 {
  height: 35px;
  background-color: #17a6b5;
  line-height: 35px;
  text-indent: 1em;
  font-size: 14px;
  color: #fff;
  font-weight: normal;
}
.msgDetailsContent h2 span{
  font-size: 16px;
  cursor: pointer;
}
.msgDetailsContent p{
  text-indent: 2em;
  padding: 10px;
}
.msgDetailsContent span{
  padding-left: 10px;
}
.msgDetailsContent .messageContent{
  height: 100%;
  margin-top: 20px;
}
.replyMessage {
  height: 100%;
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
  border-top: 1px dashed #17a6b5;
  flex-direction: column;
  justify-content: space-between;
}
.replyMessage .reply{
  margin: 0px auto;
  margin-top: 40px;
  width: 90%;
}
.replyMessage .reply button{
  background-color: #17a6b5;
  float: right;
}
.replyMessage .reply button span{
  text-align: center;
  padding: 0;
}
.replyMessage .send{
  width: 90%;
  margin: 15px auto;
}
.replyMessage .send button{
  float: right;
  margin-left: 20px;
  margin-top: 10px;
}
.replyMessage .send button span{
  text-align: center;
  padding: 0;
}
.button1{
  background-color: #17a6b5;
}
</style>

