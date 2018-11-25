<template>
	<div class='top'>
		<x-header class='header' :left-options='left' @on-click-back='goback' :right-options='{showMore: true}' @on-click-more='showMenus'>{{head}}</x-header>
	</div>
</template>
<script>
import {
  XHeader,
  Actionsheet,
//   TransferDom,
  ButtonTab,
  ButtonTabItem
} from 'vux'
export default {
  name: 'top',
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      left: {
        preventGoBack: true,
        backText: ''
      }
    }
  },
  computed: {
    head () {
      return this.$store.state.personal.head
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    showMenus () {
      alert('菜单')
    }
  }
}
</script>
<style scoped>
.top {
  height: 100%;
}
.header {
  height: 100%;
}
</style>