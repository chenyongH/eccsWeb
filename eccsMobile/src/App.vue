
<template>
  <div id="app">
  	<div class='content'>
  		<router-view v-if='!$route.meta.keepAlive'></router-view>
            <keep-alive>
                <router-view v-if='$route.meta.keepAlive'></router-view>
            </keep-alive>
  	</div>
    <FooterBottom v-if='!$route.meta.keepAlive' class='Footer'></FooterBottom>
  </div>
</template>

<script>
import FooterBottom from './components/footer'
export default {
  name: 'app',
  components: {
    FooterBottom,
    // Top
  },
  watch: {
    // '$route' (to) {
    //   console.log(this.$route)
    // }
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
body {
  background-color: #fbf9fe;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#app .content {
  height: 93%;
  width: 100%;
  background-color: #ffffff;
}
#app .Footer {
  height: 7%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
