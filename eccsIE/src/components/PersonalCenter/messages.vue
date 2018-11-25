<template>
  <div id="messages">
    <el-tabs type="border-card" v-model='msgactiveName' @tab-click='handleClick' class='tabs'>
      <el-tab-pane label="通知" name='msgOne'>
          <div style="margin-bottom: 15px">   
            <el-button v-if="inform" @click='selectInformStatus'>标记为已读</el-button>
             <el-button v-if="inform" @click='selectInformDelete'>删除</el-button>          
           </div>
          <el-table ref="multipleTable" :data="inform" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column width="20">
                <template slot-scope="scope" v-if='!scope.row.msgUser.status'>
                  <el-badge is-dot class="item">
                  </el-badge>
                </template>
              </el-table-column>
              <el-table-column prop="sendAt"  label="时间" width="160">
              </el-table-column>
              <el-table-column prop="sysMsg.note" label="消息内容">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini" @click="messageInform(scope.$index,scope.row.msgUser.id)">查看</el-button>
                <el-button size="mini"  type="danger" @click='messageInformDelete(scope.row,scope.row.msgUser.id)'>删除</el-button>
                </template>
              </el-table-column> 
          </el-table>
          <!-- 分页 -->
          <div class="pagination">
                  <el-pagination
                          @size-change="handleSizeChangeOne"
                          @current-change="handleCurrentChangeOne"
                          :current-page.sync = "pageOne"
                          :page-sizes="[5, 10, 15, 20]"
                          :page-size="5"
                          layout="sizes, prev, pager, next, jumper"
                          :total="totalPageNum"
                          :pager-count="5"
                  >
                  </el-pagination>
          </div>     
      </el-tab-pane>
      <el-tab-pane label="已接收" name='msgTwo'>  
        <div style="margin-bottom: 15px">
            <el-button @click="partMark()" >标记为已读</el-button>
            <el-button  @click="partDelete()" >删除</el-button>
        </div>
          <el-table ref="multipleTable" :data="receiveMessages" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column  width="20">
                <template slot-scope="scope" v-if='!scope.row.sysChat.status'>
                  <el-badge is-dot class="item"></el-badge>
                </template>
              </el-table-column>
              <el-table-column prop="userName" label="用户" width="80">
              </el-table-column>
              <el-table-column prop="sendAt"  label="时间" width="150">
              
              </el-table-column>
              <el-table-column prop="goodsName" label="商品" width="120">
              </el-table-column>
              <el-table-column prop="sysChat.content" label="消息内容" show-overflow-tooltip>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini"  @click="openDetail(type,scope.row.sysChat.id)">查看</el-button>
                <el-button size="mini"  type="danger" @click="handleDelete( scope.row,receiveMessages)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>  
          <div class="pagination">
                  <el-pagination
                          @size-change="handleSizeChangeTwo"
                          @current-change="handleCurrentChangeTwo"
                          :current-page.sync = "pageTwo"
                          :page-sizes="[5, 10, 15, 20]"
                          :page-size="5"
                          layout="sizes, prev, pager, next, jumper"
                          :total="totalPageNumTwo"
                          :pager-count="5"
                  >
                  </el-pagination>
          </div>
      </el-tab-pane>
      <el-tab-pane  label="已发送" name='msgThree'>  
          <div style="margin-bottom: 15px">
             <el-button  @click="partDelete()">删除</el-button>
          </div>
          <el-table ref="multipleTable" :data="receiveMessages" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="userName" label="用户" width="80">
              </el-table-column>
              <el-table-column prop="sendAt"  label="时间" width="150">
              
              </el-table-column>
              <el-table-column prop="goodsName" label="商品" width="120">
              </el-table-column>
              <el-table-column prop="sysChat.content" label="消息内容" show-overflow-tooltip>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini"  @click="sendInform(type,scope.row.sysChat.id)">查看</el-button>
                <el-button size="mini"  type="danger" @click="handleDelete( scope.row,receiveMessages)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
          <div class="pagination">
                  <el-pagination
                          @size-change="handleSizeChangeThree"
                          @current-change="handleCurrentChangeThree"
                          :current-page.sync = "pageThree"
                          :page-sizes="[5, 10, 15, 20]"
                          :page-size="5"
                          layout="sizes, prev, pager, next, jumper"
                          :total="totalPageNumThree"
                          :pager-count="5"
                  >
                  </el-pagination>
          </div> 
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import $ from "jquery";
import api from "../../api.js";
import { getCookie } from "../../assets/js/cookie.js";
export default {
  name: "messages",
  data() {
    return {
      multipleSelection: [],
      accountId: "",
      token: "",
      type: "",
      currentPage: 1 /*当前页数*/,
      pageSize: 5 /*每页显示条数*/,
      pageCount: 1 /*总页数*/,
      pagerCount: 5 /*页码按钮的数量，当总页数超过该值时会折叠*/,
      receiveMessages: [],
      pageOne:1,
      pageTwo:1,
      pageThree:1,
      size:5,
    };
  },
  watch: {
    $route(to, from) {
      handleClick();
    },
    SocketState(){
      console.log('接收到通知消息');
      if (this.msgactiveName == "msgOne") {
        this.pageOne = 1;
        this.$store.commit('PAGEONE',1)
        this.$store.commit("msgactiveNameChange","msgOne");
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit("messageInform", params);
        this.$store.commit('totalNum',params)
      } else if (this.msgactiveName == "msgTwo") {
        //已收到
          this.pageTwo = 1;
          let par = {
            accountId: getCookie("userId"),
            token: getCookie("userToken"),
            pageNumber: 1,
            pageSize: this.pageSizeTwoNum,
            type: 2
          };
          api
            .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", par)
            .then(res => {
              if (res.data) {
                this.receiveMessages = res.data.mapList;
              } else {
                this.receiveMessages = [];
              }
            })
            .catch(err => {
              alert(err);
            });
            // 通知消息的总页数
          let paramsNum = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit('totalNumTwo',paramsNum)
          this.$store.commit("msgactiveNameChange", "msgTwo");
          this.type = 2;
          // 通知消息的总页数
      } else {
         this.pageThree = 1;
         // 已发送
         let params = {
           accountId: getCookie("userId"),
           token: getCookie("userToken"),
           pageNumber: 1,
           pageSize: this.pageSizeThreeNum,
           type: 3
         };
         api
           .$http(
             api.serverSupply + api.collection + "/open/api/acc/myChat",
             params
           )
           .then(res => {
             if (res.data) {
               this.receiveMessages = res.data.mapList;
             } else {
               this.receiveMessages = [];
             }
           })
           .catch(err => {
             alert(err);
           });
         this.$store.commit("msgactiveNameChange", "msgThree");
         this.type = 3;
        let paramsNum = {
           accountId: getCookie("userId"),
           token: getCookie("userToken")
         };
         this.$store.commit('totalNumThree',paramsNum)
      }
    },
    msgactiveName(){
    if (this.msgactiveName == "msgOne") {
      let params = {
        accountId: getCookie("userId"),
        token: getCookie("userToken")
      };
      this.$store.commit("messageInform", params);
      this.$store.commit('totalNum',params)
    } else if (this.msgactiveName == "msgTwo") {
      //已收到
      let par = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        pageNumber: 1,
        pageSize: 5,
        type: 2
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", par)
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            this.receiveMessages = [];
          }
        })
        .catch(err => {
          alert(err);
        });
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumTwo',params)
        // 通知消息的总页数
    } else {
      // 已发送
      let params = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        pageNumber: 1,
        pageSize: 5,
        type: 3
      };
      api
        .$http(
          api.serverSupply + api.collection + "/open/api/acc/myChat",
          params
        )
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            this.receiveMessages = [];
          }
        })
        .catch(err => {
          alert(err);
        });
        let paramss = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumThree',paramss)
      }
    }
  },
  methods: {
    //选项卡点击事件
    handleClick(tab, event) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      let cid = event.target.getAttribute("id"); 
      if (cid == "tab-msgOne"){
        this.pageOne = 1;
        this.$store.commit('PAGECOUNT',1);
        this.$store.commit('PAGEONE',1)
        this.$store.commit("msgactiveNameChange","msgOne");
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit("messageInform", params);
        this.$store.commit('totalNum',params)

      } else if (cid == "tab-msgTwo") {
        this.pageTwo = 1;
        let par = {
          accountId: getCookie("userId"),
          token: getCookie("userToken"),
          pageNumber: 1,
          pageSize: this.pageSizeTwoNum,
          type: 2
        };
        api
          .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", par)
          .then(res => {
            if (res.data) {
              this.receiveMessages = res.data.mapList;
            } else {
              this.receiveMessages = [];
            }
          })
          .catch(err => {
            alert(err);
          });
          // 通知消息的总页数
        let paramsNum = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumTwo',paramsNum)
        this.$store.commit("msgactiveNameChange", "msgTwo");
        this.type = 2;
      } else {
        this.pageThree = 1;
        // 已发送
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken"),
          pageNumber: 1,
          pageSize: this.pageSizeThreeNum,
          type: 3
        };
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/myChat",
            params
          )
          .then(res => {
            if (res.data) {
              this.receiveMessages = res.data.mapList;
            } else {
              this.receiveMessages = [];
            }
          })
          .catch(err => {
            alert(err);
          });
        this.$store.commit("msgactiveNameChange", "msgThree");
        this.type = 3;
       let paramsNum = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumThree',paramsNum)
      }
    },
    // 每页条数改变
    handleSizeChangeOne(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.pageOne = 1;
      this.$store.commit('PAGESIZE',val)
      this.$store.commit('PAGECOUNT',1)
      let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken"),
        };
      this.$store.commit("messageInform", params);
      this.$store.commit('totalNum',params);
    },
    handleSizeChangeTwo(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      let num = val
      this.$store.commit('PAGESIZETWO',num)
      this.pageTwo = 1;
      this.type = 2;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: this.type,
        pageNumber: 1,
        pageSize: val
      };
      api
      .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
      .then(res => {
        if (res.data) {
          this.receiveMessages = res.data.mapList;
        } else {
          this.receiveMessages = [];
          this.pageCount = 1;
        }
      })
      .catch(err => {
        alert(err);
      });
      // 分页总数
      let params = {
        accountId: getCookie("userId"),
        token: getCookie("userToken")
      };
      this.$store.commit('totalNumTwo',params)
    },
    handleSizeChangeThree(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      let num = val
      this.$store.commit('PAGESIZETHREE',num)
      this.pageThree = 1;
      this.type = 3;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: this.type,
        pageNumber: 1,
        pageSize: val
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            this.receiveMessages = [];
          }
        })
        .catch(err => {
          console.log(err+'已发消息');
        });
        // 分页总数
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumThree',params)
    },
    // 修改当前页
    handleCurrentChangeOne(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.$store.commit('PAGECOUNT',val);
      this.$store.commit('PAGEONE',val)
      let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken"),
        };
      this.$store.commit("messageInform", params);
      // 分页总数
      // this.$store.commit('totalNum',params)
    },
    handleCurrentChangeTwo(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.type = 2;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: this.type,
        pageNumber: val,
        pageSize: this.pageSizeTwoNum
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            pa.pageNumber = val - 1;
            api
              .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                } else {
                  this.receiveMessages = [];
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
        // 分页总数
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumTwo',params)
    },
    handleCurrentChangeThree(val){
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      // alert(this.pageSizeThreeNum)
      this.type = 3;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: this.type,
        pageNumber: val,
        pageSize: this.pageSizeThreeNum
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            pa.pageNumber = val - 1
            api
              .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", pa)
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                } else {
                  this.receiveMessages = [];
                  
                }
              })
              .catch(err => {
                alert(err);
              });
          }
        })
        .catch(err => {
          alert(err);
        });
        // 分页总数
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumThree',params)
    },
    //勾选标记
    partMark(val) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      let array = [];
      this.multipleSelection.map(item => {
        array.push(item.sysChat.id);
      });
      this.chatIds = array;
      let pa = {
        accountId: this.accountId,
        token: this.token,
        type: this.type,
        chatIds: JSON.stringify(array)
      };
      let Params = {
        accountId: this.accountId,
        token: this.token
      };
      let para = {
        accountId: this.accountId,
        token: this.token,
        pageNumber:  this.pageTwo,
        pageSize: this.pageSizeTwoNum,
        type: this.type
      };
      //调用标记接口
      api
        .$http(
          api.serverSupply + api.collection + "/open/api/acc/changeStatus",
          pa
        )
        .then(res => {
          //标记后再获取未读消息数目
      api
        .$http(
              api.serverSupply + api.collection + "/open/api/acc/countChat",
              Params
            )
            .then(res => {
              this.$store.commit("systemMessageChange", res.data.msgnum);
              this.$store.commit("userMessageChange", res.data.chatnum);
              api
                .$http(
                  api.serverSupply + api.collection + "/open/api/acc/myChat",
                  para
                )
                .then(res => {
                  if (res.data) {
                    this.receiveMessages = res.data.mapList;
                    this.pageCount = res.data.totalPage;
                  
                  } else {
                    this.receiveMessages = [];
                  }
                })
                .catch(err => {
                  alert(err);
                });
              //   console.log(res.data, "res.data");
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    },

    //勾选部分删除
    partDelete(val) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      if (this.msgactiveName == "msgOne") {
        this.type = 1;
      } else if (this.msgactiveName == "msgTwo") {
        this.type = 2;
        this.size = this.pageSizeTwoNum
        let array = [];
        this.multipleSelection.map(item => {
          array.push(item.sysChat.id);
        });
        this.chatIds = array;
        let pa = {
          accountId: this.accountId,
          token: this.token,
          type: this.type,
          chatIds: JSON.stringify(array)
        };
        //调用标记接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/changeStatus",
            pa
          )
          .then(res => {
            //标记后再获取未读消息数目
            let Params = {
              accountId: this.accountId,
              token: this.token
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/countChat",
                Params
              )
              .then(res => {
                this.num = res.data;
                this.$store.commit("systemMessageChange", res.data.msgnum);
                this.$store.commit("userMessageChange", res.data.chatnum);
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
        //调用删除接口
        api
          .$http(api.serverSupply + api.collection + "/open/api/acc/delChat", pa)
          .then(res => {
            this.receiveMessages = [];
            let params = {
              accountId: this.accountId,
              token: this.token,
              pageNumber: this.pageTwo,
              pageSize: this.pageSizeTwoNum,
              type: this.type
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                  this.pageCount = res.data.totalPage;
                } else {
                  let paramsAg = {
                    accountId: this.accountId,
                    token: this.token,
                    pageNumber: this.pageTwo,
                    pageSize: this.pageSizeTwoNum,
                    type: this.type
                  };
                  api
                    .$http(
                      api.serverSupply + api.collection + "/open/api/acc/myChat",
                      paramsAg
                    ).then(res =>{
                      if (res.data) {
                        this.receiveMessages = res.data.mapList;
                        this.pageCount = res.data.totalPage;
                      } else {
                        this.receiveMessages = [];
                        this.pageCount = 1;
                      }
                    }).catch(err =>{
                      console.log(err)
                    })
                }
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
          let params = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit('totalNumTwo',params)
          this.$store.commit('totalNumThree',params)
      } else {
        this.type = 3;
        this.size = this.pageSizeThreeNum
        let array = [];
        this.multipleSelection.map(item => {
          array.push(item.sysChat.id);
        });
        this.chatIds = array;
        let pa = {
          accountId: this.accountId,
          token: this.token,
          type: this.type,
          chatIds: JSON.stringify(array)
        };
        //调用标记接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/changeStatus",
            pa
          )
          .then(res => {
            //标记后再获取未读消息数目
            let Params = {
              accountId: this.accountId,
              token: this.token
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/countChat",
                Params
              )
              .then(res => {
                this.num = res.data;
                this.$store.commit("systemMessageChange", res.data.msgnum);
                this.$store.commit("userMessageChange", res.data.chatnum);
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
        //调用删除接口
        api
          .$http(api.serverSupply + api.collection + "/open/api/acc/delChat", pa)
          .then(res => {
            this.receiveMessages = [];
            let params = {
              accountId: this.accountId,
              token: this.token,
              pageNumber: this.pageThree,
              pageSize: this.pageSizeThreeNum,
              type: this.type
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                  this.pageCount = res.data.totalPage;
                } else {
                  let paramsAg = {
                    accountId: this.accountId,
                    token: this.token,
                    pageNumber: this.pageThree,
                    pageSize: this.pageSizeThreeNum,
                    type: this.type
                  };
                  api
                    .$http(
                      api.serverSupply + api.collection + "/open/api/acc/myChat",
                      paramsAg
                    ).then(res =>{
                      if (res.data) {
                        this.receiveMessages = res.data.mapList;
                        this.pageCount = res.data.totalPage;
                      } else {
                        this.receiveMessages = [];
                        this.pageCount = 1;
                      }
                    }).catch(err =>{
                      console.log(err)
                    })
                }
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
          let params = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit('totalNumTwo',params)
          this.$store.commit('totalNumThree',params)
      }
      
    },
    //单行删除
    handleDelete(row, receiveMessages) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.accountId = getCookie("userId");
      this.token = getCookie("userToken");
      if (this.msgactiveName == "msgOne") {
        this.type = 1;
      } else if (this.msgactiveName == "msgTwo") {
        this.type = 2;
        this.size = this.pageSizeTwoNum
        this.chatIds = row.sysChat.id;
        let param = {
          accountId: this.accountId,
          token: this.token,
          type: this.type,
          chatIds: this.chatIds
        };
        //删除后调用标记接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/changeStatus",
            param
          )
          .then(res => {
            //标记后再获取未读消息数目
            let pa = {
              accountId: this.accountId,
              token: this.token
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/countChat",
                pa
              )
              .then(res => {
                this.num = res.data;
                this.$store.commit("systemMessageChange", res.data.msgnum);
                this.$store.commit("userMessageChange", res.data.chatnum);
                console.log(res.data, "res.data");
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
        //调用删除接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/delChat",
            param
          )
          .then(res => {
            //删除后重新调用接口使分页显示正常
            this.receiveMessages = [];
            let params = {
              accountId: this.accountId,
              token: this.token,
              pageNumber: this.pageTwo,
              pageSize: this.pageSizeTwoNum,
              type: this.type
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                  this.pageCount = res.data.totalPage;
                } else {
                  this.receiveMessages = [];
                  this.pageCount = 1;
                }
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
      } else {
        this.type = 3;
        this.size = this.pageSizeThreeNum
        this.chatIds = row.sysChat.id;
        let param = {
          accountId: this.accountId,
          token: this.token,
          type: this.type,
          chatIds: this.chatIds
        };
        //删除后调用标记接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/changeStatus",
            param
          )
          .then(res => {
            //标记后再获取未读消息数目
            let pa = {
              accountId: this.accountId,
              token: this.token
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/countChat",
                pa
              )
              .then(res => {
                this.num = res.data;
                this.$store.commit("systemMessageChange", res.data.msgnum);
                this.$store.commit("userMessageChange", res.data.chatnum);
                console.log(res.data, "res.data");
              })
              .catch(err => {
                alert(err);
              });
          })
          .catch(err => {
            alert(err);
          });
        //调用删除接口
        api
          .$http(
            api.serverSupply + api.collection + "/open/api/acc/delChat",
            param
          )
          .then(res => {
            //删除后重新调用接口使分页显示正常
            this.receiveMessages = [];
            let params = {
              accountId: this.accountId,
              token: this.token,
              pageNumber: this.pageThree,
              pageSize: this.pageSizeThreeNum,
              type: this.type
            };
            api
              .$http(
                api.serverSupply + api.collection + "/open/api/acc/myChat",
                params
              )
              .then(res => {
                if (res.data) {
                  this.receiveMessages = res.data.mapList;
                  this.pageCount = res.data.totalPage;
                } else {
                  this.receiveMessages = [];
                  this.pageCount = 1;
                }
              })
              .catch(err => {
                alert(err);
              });
            // receiveMessages.splice(index, 1);
          })
          .catch(err => {
            alert(err);
          });
      }
      
    },
    //操作多选
    handleSelectionChange(val) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.multipleSelection = val;
    },
    //查看跳转至详情
    openDetail(c, id) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      //传参
      this.$router.push({
        name: "messageDetails",
        query: {
          type: c,
          chatId: id
        }
      });
      //查看后调用标记已读接口
      let par = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: c,
        chatIds: id
      };
      api
        .$http(
          api.serverSupply + api.collection + "/open/api/acc/changeStatus",
          par
        )
        .then(res => {
          //标记后再获取未读消息数目
          let pa = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          api
            .$http(
              api.serverSupply + api.collection + "/open/api/acc/countChat",
              pa
            )
            .then(res => {
              this.num = res.data;
              this.$store.commit("systemMessageChange", res.data.msgnum);
              this.$store.commit("userMessageChange", res.data.chatnum);
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    },
    // 通知查看详情
    messageInform(index, id) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      this.$router.push({
        name: "messageInform",
        query: {
          index: index,
          id: id
        }
      });
    },
    //已发送查看
    sendInform(c, id) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
     this.$router.push({
        name: "sendInform",
        query: {
          type: c,
          chatId: id
        }
      });  
    },
    // 通知单项删除
    messageInformDelete(row, id) {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      let deleteInform = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: 1,
        chatIds: id
      };
      api
        .$http(
          api.serverSupply + api.collection + "/open/api/acc/delChat",
          deleteInform
        )
        .then(res => {
          //删除后重新调用接口使分页显示正常
          this.$store.commit("informChange", []);
          let params = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit("topMessageStatusUpdate", params);
          this.$store.commit("messageInform", params);
          // 获取未读信息数据
        })
        .catch(err => {
          console.log(err + "单行删除通知出错");
        });
    },
    // 选择删除
    selectInformDelete() {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      // 获取勾选项的id值
      let array = [];
      this.multipleSelection.map(item => {
        array.push(item.msgUser.id);
      });
      this.chatIds = array;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: 1,
        chatIds: JSON.stringify(array)
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/delChat", pa)
        .then(res => {
          this.$store.commit("informChange", []);
          let params = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit('PAGECOUNT',1);
          this.pageOne = 1;
          this.$store.commit("messageInform", params);
          // 获取未读信息数据
          this.$store.commit("topMessageStatusUpdate", params);
        })
        .catch(err => {
          console.log(err + "勾选删除出错");
        });
        // 分页总数
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNum',params)
    },
    // 通知选择标记已读
    selectInformStatus() {
      if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
      // 获取勾选项的id值
      let array = [];
      this.multipleSelection.map(item => {
        array.push(item.msgUser.id);
      });
      this.chatIds = array;
      let pa = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        type: 1,
        chatIds: JSON.stringify(array)
      };
      api
        .$http(api.changeStatus, pa)
        .then(res => {
          this.$store.commit("informChange", []);
          let params = {
            accountId: getCookie("userId"),
            token: getCookie("userToken")
          };
          this.$store.commit("messageInform", params);
          // 获取未读信息数据
          this.$store.commit("topMessageStatusUpdate", params);
        })
        .catch(err => {
          console.log(err + "勾选标记已读出错");
        });
    }
  },
  computed: {
    messagesTop() {
      return this.$store.state.messagesTop;
    },
    msgactiveName() {
      return this.$store.state.msgactiveName;
    },
    inform() {
      return this.$store.state.messageInform.inform;
    },
    num() {
      return this.$store.state.messageInform.pageCount;
    },
    informLength() {
      return this.$store.state.messageInform.informLength;
    },
    totalPageNum(){
      return this.$store.state.messageInform.totalPage;
    },
    totalPageNumTwo(){
      return this.$store.state.messageInform.totalpageTwo;
    },
    totalPageNumThree(){
      return this.$store.state.messageInform.totalPageThree;
    },
    pageOneNum(){
      return this.$store.state.messageInform.pageOne;
    },
    pageSizeTwoNum(){
      return this.$store.state.messageInform.pageSizeTwo;
    },
    pageSizeThreeNum(){
      return this.$store.state.messageInform.pageSizeThree;
    },
    SocketState(){
      return this.$store.state.Socket
    }
  },
  mounted() {
    if(!getCookie('userToken')){
        this.$router.push({
          path: '/login'
        })
      }
    this.$store.commit('PAGEONE',1)
    this.$store.commit('PAGESIZE',5)
    this.$store.commit('PAGECOUNT',1)
    this.$store.commit('PAGESIZETWO',5)
    this.$store.commit('PAGESIZETHREE',5)
    this.$store.commit('PAGESIZEONE',5)
    if (this.msgactiveName == "msgOne") {
      let params = {
        accountId: getCookie("userId"),
        token: getCookie("userToken")
      };
      this.$store.commit("messageInform", params);
      this.$store.commit('totalNum',params)
    } else if (this.msgactiveName == "msgTwo") {
      //已收到
      let par = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        pageNumber: 1,
        pageSize: 5,
        type: 2
      };
      api
        .$http(api.serverSupply + api.collection + "/open/api/acc/myChat", par)
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            this.receiveMessages = [];
          }
        })
        .catch(err => {
          alert(err);
        });
        let params = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumTwo',params)
        // 通知消息的总页数
    } else {
      // 已发送
      let params = {
        accountId: getCookie("userId"),
        token: getCookie("userToken"),
        pageNumber: 1,
        pageSize: 5,
        type: 3
      };
      api
        .$http(
          api.serverSupply + api.collection + "/open/api/acc/myChat",
          params
        )
        .then(res => {
          if (res.data) {
            this.receiveMessages = res.data.mapList;
          } else {
            this.receiveMessages = [];
          }
        })
        .catch(err => {
          alert(err);
        });
        let paramss = {
          accountId: getCookie("userId"),
          token: getCookie("userToken")
        };
        this.$store.commit('totalNumThree',paramss)

    }
    this.accountId = getCookie("userId");
    this.token = getCookie("userToken");

    if (this.messagesTop == true) {
      this.$store.commit("messagesTopChange");
    }
    // 左侧导航效果
    $("#messages>a").css("color", "#17a6b5");
  },
  beforeDestroy: function() {
    $("#messages").css({ backgroundColor: "#fff" });
    $("#messages>a").css({ color: "#333" });
  }
};
</script>
<style lang="less" scoped>
#messages {
  width: 870px;
  .tabs {
    .notify {
      .notifyData {
        height: 100px;
        line-height: 100px;
        background-color: #fafafa;
        text-align: center;
        font-size: 20px;
        color: #b1b1b1;
        border-bottom: 1px solid #ebeef5;
      }
    }
    .sendMessages {
      li {
        border-bottom: 1px solid #ebeef5;
        height: 100px;
        position: relative;
        .span {
          height: 20px;
          display: flex;
          span {
            display: block;
            height: 100%;
            font-size: 18px;
            font-weight: bold;
            line-height: 20px;
            text-indent: 10px;
          }
          .date {
            font-size: 12px;
            font-weight: normal;
            height: 12px;
            line-height: 12px;
            align-self: flex-end;
          }
        }
        p {
          height: 60px;
          width: 90%;
          padding: 20px;
          line-height: 20px;
        }
        .buttonOne {
          width: 10%;
          position: absolute;
          bottom: 10px;
          border: none;
          border-radius: 5px;
          background-color: #17a6b5;
          color: #fff;
          right: 0px;
        }
      }
      .messagesData {
        height: 100px;
        line-height: 100px;
        background-color: #fafafa;
        text-align: center;
        font-size: 20px;
        color: #b1b1b1;
        border-bottom: 1px solid #ebeef5;
      }
    }
    .getMessages {
      li {
        border-bottom: 1px solid #ebeef5;
        height: 100px;
        position: relative;
        .span {
          height: 20px;
          display: flex;
          span {
            display: block;
            height: 100%;
            font-size: 18px;
            font-weight: bold;
            line-height: 20px;
            text-indent: 10px;
          }
          .date {
            font-size: 12px;
            font-weight: normal;
            height: 12px;
            line-height: 12px;
            align-self: flex-end;
          }
        }
        p {
          height: 60px;
          width: 90%;
          padding: 20px;
          line-height: 20px;
        }
      }
      .messagesData {
        height: 100px;
        line-height: 100px;
        background-color: #fafafa;
        text-align: center;
        font-size: 20px;
        color: #b1b1b1;
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
}
</style>
<style>
#messages .el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
  height: 23px;
  border-bottom: 2px solid #17a6b5;
  font-size: 14px;
  margin-bottom: 15px;
}
#messages .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  height: 23px;
  line-height: 23px;
  width: 90px;
  text-align: center;
  margin-right: 20px;
  border-radius: 8px 8px 0px 0px;
}
#messages .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #17a6b5;
  border: none;
  color: #fff;
  border-bottom: 2px solid #17a6b5;
}
#messages .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
#messages .el-table .cell {
  text-overflow: unset;
}
.pagination {
  padding: 36px 0;
  display: flex;
  justify-content: flex-end;
}
.businesser {
  display: flex;
  justify-content: space-between;
  word-wrap: none;
}
.business_info {
  color: #17a6b5;
  width: 90%;
  height: 48px;
  line-height: 48px;
  position: absolute;
  top: 0;
  left: 50px;
  display: block;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
  overflow: hidden;
}
.buttonOne {
  width: 10%;
  position: absolute;
  bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #17a6b5;
  color: #fff;
  right: 0px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
  margin-bottom: 0px !important;
}
/*.el-tabs__header*/
</style>