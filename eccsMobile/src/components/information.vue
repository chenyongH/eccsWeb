<template>
  <div>
    <x-header :left-options="{backText: ''}" class="header" :right-options="{showMore: true}" @on-click-more="showMenus = true">新闻资讯</x-header>
    <tabbar>
      <tabbar-item selected>
        <img slot="icon" src="../assets/zixun (2).png">
        <span slot="label">资讯</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/shangji.png">
        <span slot="label">商机</span>
      </tabbar-item>
      <tabbar-item  link="">
        <img slot="icon" src="../assets/wo-.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>
<style lang="less" scoped>
    .header{
        font-size:.48rem;
    }
</style>
<script>
import {
    // header
  XHeader,
  Actionsheet,
  TransferDom,
  ButtonTab,
  ButtonTabItem,
    // tabbar
    Tabbar, TabbarItem, Group, Cell
} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    //   header
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    // tabbar
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  }
}
</script>

