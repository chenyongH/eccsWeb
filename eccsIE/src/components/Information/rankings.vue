<!-- 二级新闻栏目右侧排行榜 -->
<template>
	<div class="rankings">
		<ul class="search">
			<li class="title">本月搜索</li>
			<li v-for='(item,index) in monthHots' :key='index' :class="liNum[index]" @click='goInformation(monthHotsId[index],monthHotschannelId[index])'>
				<span>{{index+1}}</span>
				<el-tooltip placement="top" effect="light">
				  <div slot="content" class="toolTipClass">{{monthHots[index]}}</div>
				  <el-button class='monthHots'>{{monthHotsStr[index]}}</el-button>
				</el-tooltip>
			</li>
		</ul>
		<ul class="heat">
			<li class="title">热度排行</li>
			<li v-for='(item,index) in hots' :key='index' :class="liNum[index]" @click='goInformation(hotsId[index],hotschannelId[index])'>
				<span>{{index+1}}</span>
				<el-tooltip placement="top" effect="light">
				  <div slot="content" class="toolTipClass">{{hots[index]}}</div>
				  <el-button class='monthHots'>{{hotsStr[index]}}</el-button>
				</el-tooltip>
			</li>
		</ul>
	</div>
</template>
<script>
import api from "../../api.js";
export default {
  name: "rankings",
  data() {
    return {
      monthHotsId: [],
      monthHotschannelId: [],
      monthHots: [],
      monthHotsStr: [],
      hots: [],
      hotsId: [],
      hotschannelId: [],
      hotsStr: [],
      liNum: [
        "li1",
        "li2",
        "li3",
        "li4",
        "li5",
        "li6",
        "li7",
        "li8",
        "li9",
        "li10"
      ]
    };
  },
  methods: {
    goInformation(id, channelId) {
      let query = {
        articleId: id,
        channelId: channelId
      };
      this.$router.push({ name: "intl", query });
    }
  },
  mounted() {
    api
      .$http(api.cmsHot)
      .then(res => {
        for (var i = 0; i < res.data.monthHots.length; i++) {
          this.monthHots.push(res.data.monthHots[i].name);
          this.monthHotsStr.push(this.monthHots[i].substring(0, 6) + "...");
          this.monthHotsId.push(res.data.monthHots[i].contentId);
          this.monthHotschannelId.push(res.data.monthHots[i].channelId);
        }

        for (var i = 0; i < res.data.hots.length; i++) {
          this.hots.push(res.data.hots[i].name);
          this.hotsId.push(res.data.hots[i].contentId);
          this.hotschannelId.push(res.data.hots[i].channelId);
          this.hotsStr.push(res.data.hots[i].name.substring(0, 6) + "...");
        }
      })
      .catch(err => {
        console.log("资讯排行数据请求出错");
      });
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}
.rankings {
  margin: 10px auto;
  width: 100%;
  height: 745px;
  background-color: #fff;
}
.rankings .search {
  height: 259px;
  width: 100%;
  border: 1px solid #f0f0f0;
  border-top: none;
  position: relative;
}
.rankings .search li {
  cursor: pointer;
  display: block;
  width: 100%;
  height: 80px;
}
.rankings .search .monthHots {
  border: none;
}
.rankings .heat .monthHots {
  border: none;
}
.rankings .search .toolTipClass {
  color: #17a6b5;
}
.rankings .search .title {
  border-top: 4px solid #17a6b5;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  position: absolute;
  top: 0;
  color: #333333;
  text-indent: 10px;
}
.rankings .search li {
  width: 100%;
  height: 25px;
  font-size: 14px;
  color: #666666;
  line-height: 25px;
  position: absolute;
}
.rankings .search .li1 {
  top: 53px;
}
.rankings .search span {
  display: inline-block;
  width: 25px;
  height: 25px;
  color: #fff;
  line-height: 25px;
  text-align: center;
  margin-left: 10px;
  margin-right: 20px;
}
.rankings .search .li1 span,
.rankings .heat .li1 span {
  background-color: #17a6b5;
  color: #ffffff;
}
.rankings .search .li2 {
  top: 93px;
}
.rankings .search .li2 span,
.rankings .heat .li2 span {
  background-color: #1cbfd0;
  color: #ffffff;
}
.rankings .search .li3 {
  top: 133px;
}
.rankings .search .li3 span,
.rankings .heat .li3 span {
  background-color: #1dc8da;
  color: #ffffff;
}
.rankings .search .li4 {
  top: 173px;
}
.rankings .search .li4 span {
  background-color: #dddddd;
}
.rankings .search .li5 {
  top: 213px;
}
.rankings .search .li5 span {
  background-color: #dddddd;
}
.rankings .heat {
  height: 467px;
  width: 100%;
  border: 1px solid #f0f0f0;
  margin-top: 20px;
}
.rankings .heat .title {
  border-top: 4px solid #17a6b5;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  color: #333333;
  text-indent: 10px;
  margin-top: 0px;
}
.rankings .heat li {
  width: 100%;
  height: 25px;
  font-size: 14px;
  color: #666666;
  line-height: 25px;
  margin-top: 15px;
  list-style: none;
}
.rankings .heat span {
  display: inline-block;
  width: 25px;
  height: 25px;
  color: #333333;
  line-height: 25px;
  text-align: center;
  margin-left: 10px;
  margin-right: 20px;
  background-color: #dddddd;
}
</style>