<template>
        <div id="app">
            <div v-if="!$route.meta.keepAlive" >
                <top-nav class="TopNav"></top-nav>
              
                <router-view v-if="isRouterAlive"></router-view>
                <div class="public_footer">
                    <footer-bottom class="FooterBottom"></footer-bottom>
                </div>
            </div>
            <keep-alive>
                <router-view class="view-router" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </div>
</template>

<script>
import TopNav from './components/top-nav'
import FooterBottom from './components/footer'
import {getCookie} from './assets/js/cookie.js'
export default {
  name: 'app',
  components: {
    TopNav,
    FooterBottom,
  },
  provide(){
    return{
      reload:this.reload  
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  computed:{
      loginState(){
        return this.$store.state.login.state;
      },
      websock(){
        return this.$store.state.websock;
      }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive= true
      })
    }
  },
  watch:{

  },
  mounted(){
    // let userName = getCookie('userName');
    // this.$store.dispatch('websocketFunction',userName);
    }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{height:100%;background-color: #E5E5E8;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #E5E5E8;
}
.TopNav{
  margin: 0 auto;
}

.public_footer{
  padding-top: 60px;
  width: 1300px;
   margin: 0px auto;
   background-color: #fff;
}
</style>
