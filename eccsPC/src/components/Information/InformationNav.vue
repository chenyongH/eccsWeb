<!-- 资讯页公用导航 -->
/* eslint-disable */
<template>
	<div id="nav">
		<div class="nav">
      <el-tabs v-if="channels.channelList"  type="border-card" @tab-click="handClick" >
        <el-tab-pane :label="main">
          <!-- <router-link to="/Information/Informationdetails"> -->
            <el-row >
              <el-col >
                <el-card :body-style="{ padding: '0px' ,height:'76px'}"  class="nav_content">
                  <div  class="nav_item">
                    <ul>
                      <li v-for="(item,idx) in channels.tagList" :key="idx" @click="tagToDetails(item.id)">{{item.name}}</li>
                    </ul>
                    <div class="bottom clearfix">
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
        
        </el-tab-pane>
        <el-tab-pane :label="channel.name" :name="channel.code"  v-for="(channel,index) in channels.channelList" :key="index"  >
          <!-- <router-link to="/Information/Informationdetails"> -->
            <el-row >
              <el-col  >
                <el-card :body-style="{ padding: '0px' ,height:'76px'}" class="nav_content">
                  <div  class="nav_item">
                    <ul>
                      <li v-for="(item,idx) in channels.tagList" @click="tagToDetails(item.id)" :key="idx">{{item.name}}</li>
                    </ul>
                    <div class="bottom clearfix">
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
        
        </el-tab-pane>
        <el-tab-pane label="展会"  >
          <!-- <router-link to="/Information/InformationCalendar"> -->
            <el-row >
              <el-col   >
                <el-card :body-style="{ padding: '0px' ,height:'76px'}"  class="nav_content">
                  <div  class="nav_item">
                    <ul>
                    <li v-for="	(item,idx) in channels.tagList" @click="tagToDetails(item.id)" :key="idx">{{item.name}}</li>
                    </ul>
                    <div class="bottom clearfix">
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          <!-- </router-link> -->
        </el-tab-pane>
      </el-tabs>	   	  
		</div>	
		<router-view></router-view>
	</div>
</template>
<script>
import api from "../../api.js";
import $ from "jquery";
export default {
  name: "InformationNav",
  data() {
    return {
      channels: {},
      main: "主页",
      channelid: ""
    };
  },
  watch: {
    //监听路由变化
    // $route(to, from) {
    //   //  console.log(this.getStatus(this.$route.path))
    //   //  console.log(this.$route.query)
    //  this.$router.go(0);
    // }
  },
  methods: {
    //   getStatus (urlStr) {
    //   var urlStrArr = urlStr.split('?')
    //   return urlStrArr[urlStrArr.length - 1]
    // },
    handClick(tab, event) {
    //   console.log(event, "event");
    //   console.log(tab.label, "tab");
    //   console.log(event.target.getAttribute("id"));
      let cid = event.target.getAttribute("id"); //当前点击的id
      let length= this.channels.channelList.length;
      let lastid = length+1;
      // console.log(cid,"cid")
      let label = tab.label; //tab中对s的选项卡名称
      let Id = 0;
      if (cid == "tab-0") {
        //主页
        this.$router.push({
          path: "/Information"
        });
      } else if (cid == "tab-"+lastid) {
        //展会
        this.$router.push({
          name: "InformationCalendar",
          query: {
            channelid: ""
          }
        });
      } else {
        //国际资讯,中国资讯，专题
        let channels = this.channels.channelList;
        channels.map(item => {
          /*console.log(item, "item");*/
          if (label == item.name) {
            // console.log(idx,"idx");
            Id = item.id;
            /*console.log(Id, "id");*/
          }
        });

        this.$router.push({
          path: "/Information/Informationdetails",
          query: {
            flag: "more",
            id: Id
          }
        });
      }
    },
    tagToDetails(e) {
      // console.log(e, "e");
      // alert(1234);
      this.$router.push({
        name: "Informationdetails",
        query: {
          tagid: e,
          flag: " "
        }
      });
    }
  },
  mounted() {
    api
      .$http(api.servers + "/open/api/cms/channel")
      .then(res => {
        this.channels = res.data;
        // console.log(res.data, "channels");
      })
      .catch(err => {
        alert(err);
      });
  },
  beforeRouteLeave(to, from, next) {
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(0)
      .children()
      .css("color", "#fff");
    next();
  },
  beforeRouteEnter(to, from, next) {
    $("#top-nav .top-nav-link")
      .find("li")
      .eq(0)
      .children()
      .css("color", "#0d545c");
    next();
  }
};
</script>
<style scoped>
.center {
  width: 1300px;
  margin: 0 auto;
}
.contain {
  width: 1300px;
  padding: 0 50px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #ffffff;
}
#nav .nav {
  padding-top: 20px;
  background-color: #fff;
  width: 1300px;
}
#nav .nav .el-card {
  border: none;
}
#nav .nav .nav_content {
  height: 80px;
}
.nav li {
  cursor: pointer;
}
</style>