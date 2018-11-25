/* eslint-disable */
<template>
    <div class="calendar_details">
         <div class="details_tittle">
                <span class="calendar_block" >日历/行业活动</span>
                <img src="../../assets/images/calendar.png" alt="">
        </div>
        <div class="calendar_content">           
            <div class="contain_left"> 
                <div class="calendar_info"> 
                    <el-table :data="exhibitions" header-row-class-name="calendar_header" >
                        <el-table-column prop="date" label="日期" width="120px;"  class="calendar_date" > 
                            <!-- <template slot-scope="scope">
                              <span @click="moreCalendar(scope.$index, scope.row)"></span>
                            
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="countryName" label="地点" width="90px;"  class="calendar_place" >
                        </el-table-column>
                        <el-table-column prop="exhibition.title" label="描述"  class="calendar_text" >
                        </el-table-column>
                    </el-table> 
                    <div class="calendar_Pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pageSize"
                            layout="sizes, prev, pager, next, jumper"
                            :page-count="pageCount"
                            :pager-count="pagerCount"  
                       >
                        </el-pagination>
                    </div>
                </div>       
                
            </div>
            <div class="contain_right">
                <div class="relevant">
                    <div class="relevant_tittle">
                        <span class="relevant_block" >为您推荐</span>
                    </div>    
                    <el-row >
                        <el-col  v-for="(recommend,idx) in recommends" :key="idx" >
                            <el-card  class="relevant_content">
                                <div  class="relevant_right">
                                 <router-link :to="{path:'/intl',query:{articleId:recommend.article.id,channelId:recommend.article.channelId}}">
                                    <span class="relevant_letittle">{{recommend.article.title}}</span>
                                  </router-link>
                                    <span class="relevant_info">{{recommend.date}} | {{recommend.countryName}}</span>
                                    <!-- <span class="relevant_text">{{relevanttext}}</span> -->
                                    <div class="bottom clearfix">
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>    
                </div>
                <div class="textswiper">
                    <el-carousel arrow="hover">
                        <el-carousel-item v-for="(sysLink,idx) in sysLinks" :key="idx">
                          <div class="textswiper_img"><img v-bind:src="imgUrl+sysLink.picurl" alt="广告"></div>
                        </el-carousel-item>
                    </el-carousel>
                </div>  
            </div>
        </div>
        <Swiper></Swiper>
    </div>
</template>
<script>
import Swiper from "../swiper";
import api from "../../api.js";
export default {
  name: "InformationCalendar",
  methods: {
    handleSizeChange(val) {
      this.pageSize = val; //修改显示每页条数
      let id = this.$route.query.id;
      let pa = {
        // channelId: id,
        pageNumber: this.currentPage,
        pageSize: val
      };
      api
        .$http(api.servers + "/open/api/cms/moreExhibition", pa)
        .then(res => {
          this.exhibitions = res.data.mapList;
          this.pageCount = res.data.totalPage;
        })
        .catch(err => {
          alert(err);
        });
    },
    handleCurrentChange(val) {
      /*当前页*/
      this.currentPage = val; //修改当前页数
      let pa = {
        pageNumber: val,
        pageSize: this.pageSize
      };
      api
        .$http(api.servers + "/open/api/cms/moreExhibition", pa)
        .then(res => {
          this.exhibitions = res.data.mapList;
          this.pageCount = res.data.totalPage;
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  data() {
    return {
      sysLinks: [],
      recommends: [],
      exhibitions: [],
      calendars: [],
      currentPage: 1 /*当前页数*/,
      pageSize: 20 /*每页显示条数*/,
      pageCount: 1 /*总页数*/,
      pagerCount: 5 /*页码按钮的数量，当总页数超过该值时会折叠*/,
      imgUrl:""
    };
  },
  components: {
    Swiper
  },
  mounted() {
      this.imgUrl=api.imgUrl;
    // const server = "http://116.196.89.209:9001/";
    let pa = {
      pageNumber: 1,
      pageSize: 20
    };
    api
      .$http(api.servers + "/open/api/cms/sysLink") //广告
      .then(res => {
        this.sysLinks = res.data;
        //console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/recommended") //相关
      .then(res => {
        this.recommends = res.data;
        //console.log(res)
      })
      .catch(err => {
        alert(err);
      });
    api
      .$http(api.servers + "/open/api/cms/moreExhibition", pa) //展会
      .then(res => {
        this.exhibitions = res.data.mapList;
        this.pageCount = res.data.totalPage;
        // console.log(res)
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>
<style>
.calendar_details {
  width: 1300px;
  margin: 0 auto;
  background-color: #ffffff;
}
.calendar_content {
  width: 1300px;
  padding: 0 50px;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  justify-content: space-between;
  background-color: #ffffff;
}
.contain_left {
  width: 640px;
}
.contain_right {
  width: 460px;
}
.calendar_info {
  width: 100%;
  background-color: #f8f8f9;
  margin-bottom: 20px;
}
.details_tittle {
  width: 1200px;
  border-bottom: 8px solid #eaeaed;
  padding: 14px 0 0 0;
  margin: 0 auto;
  background-color: #ffffff;
}
.details_tittle img {
  margin: 0 0 -5px 10px;
}
.calendar_block {
  font-size: 20px;
  color: #333333;
  font-weight: bolder;
  font-family: "Microsoft YaHei";
  text-align: left;
  display: inline-block;
  margin-bottom: 10px;
}
.calendar_tittle > img {
  margin: 0 0 -5px 10px;
}
.calendar_header {
  background-color: #f8f8f9;
  height: 62px;
}
/* .calendar_header .el-table_1_column_1 .cell:nth-child(1) {
  background-color: #f8f8f9;
  width: 88px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #666666;
} */
.calendar_info .calendar_header th:nth-child(1) .cell {
  background-color: #f8f8f9;
  width: 118px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #666666;
}
.calendar_info .calendar_header th:nth-child(2) .cell {
  background-color: #f8f8f9;
  width: 88px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #666666;
}
.calendar_info .calendar_header th:nth-child(3) .cell {
  background-color: #f8f8f9;
  height: 52px;
  line-height: 52px;
  text-align: center;
  color: #666666;
}

.calendar_info table tr {
  background-color: #ffffff;
}
.calendar_info .el-table_1_column_1 {
  width: 90px;
  padding-right: 20px;
}
.calendar_info .el-table__row td:nth-child(1) .cell {
  background: #71bbc3;
  color: #ffffff;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  border-radius: 5px;
  width: 118px;
  text-align: center;
  padding: 0;
  /* position: absolute;
  top: 5px; */
}
.calendar_info .el-table__row td:nth-child(2) .cell {
  padding: 0;
  width: 88px;
  color: #71bbc3;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  text-align: center;
  /* position: absolute;
  top: 5px; */
}

.calendar_info .el-table__row td:nth-child(3) .cell {
  padding: 0;
  width: 100%;
  word-break : keep-all; 
  color: #71bbc3;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  text-align: left;
  
}
.calendar_info .el-table__body {
  border-bottom: 2px solid #eaeaed;
}

.calendar_info .el-table td,
.el-table th.is-leaf {
  border-top: 1px solid #eaeaed;
  border-bottom: 1px solid #eaeaed;
  padding: 5px 0;
}
.calendar_Pagination {
  width: 100%;
  padding: 20px 0;
  background-color: #ffffff;
}

/**calendar end**/

/**relevant start**/
.relevant_content {
  width: 100%;
}
.relevant .el-card__body {
  padding: 0;
}
.relevant_tittle {
  border-bottom: 8px solid #eaeaed;
  padding: 14px 0 0 0;
}
/* .relevant_tittle > img {
  margin: 0 0 -5px 10px;
} */
.el-card.is-always-shadow {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  border-radius: 0;
  border-top: none;
  border-bottom: 2px solid #eaeaed;
  border-left: none;
  border-right: none;
}
.relevant_right {
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 0;
  justify-content: space-around;
  box-sizing: border-box;
}
.relevant_letittle {
  font-size: 18px;
  color: #17a6b5;
  font-weight: bold;
}
.relevant_info {
  font-size: 14px;
  color: #666666;
}
.relevant_text {
  font-size: 12px;
  color: #17a6b5;
}
.relevant_block {
  font-size: 20px;
  color: #333333;
  font-weight: bolder;
  font-family: "Microsoft YaHei";
  text-align: left;
  display: inline-block;
  margin-bottom: 10px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}
/**zan end**/

/**textswiper start**/
.textswiper {
  margin: 35px 0 20px 0;
}
/* .textswiper_tittle {
  text-align: center;
  font-size: 56px;
  color: #f8b334;
  margin: 40px 0 18px 0;
}
.textswiper_info {
  text-align: center;
  font-size: 28px;
  color: #17a6b5;
  margin: 18px 22px 10px 22px;
  font-weight: bold;
  word-wrap: break-word;
  line-height: 40px;
}
.textswiper_text {
  text-align: center;
  font-size: 16px;
  color: #7d7d84;
  margin: 10px 22px 10px 22px;
  word-wrap: break-word;
} */
.textswiper .el-carousel__container {
  height: 300px !important;
}
.textswiper .el-carousel__indicator {
  color: red !important;
  padding: 30px 4px !important;
}
.textswiper .el-carousel__button {
  background-color: #71c7d0 !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
.textswiper .textswiper_img {
  width: 100%;
  height: 100%;
}
.textswiper .textswiper_img img {
  width: 100%;
  height: 100%;
}

/* .textswiper .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;

  line-height: 150px;
  margin: 0;
}

.textswiper .el-carousel__item:nth-child(2n) {
  background-color: #f8f8f9 !important;
}

.textswiper .el-carousel__item:nth-child(2n + 1) {
  background-color: #f8f8f9 !important;
} */
/**textswiper end**/
</style>


