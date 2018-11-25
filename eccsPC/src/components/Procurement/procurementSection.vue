<template>
	<div id="procurementSection">
		<IndexClasses></IndexClasses>
		<ProcurementClassesTwo></ProcurementClassesTwo>
		<ProcurementIndexContent></ProcurementIndexContent>
		<Swiper></Swiper>
	</div>
</template>
<script>
	import Swiper from '../swiper'
	import IndexClasses from './procurementIndexClasses'
	import ProcurementClassesTwo from './procurementClassesTwo'
	import ProcurementIndexContent from './procurementIndexContent'
	export default{
		name:'proccurementSection',
		components:{
		  	IndexClasses,
		  	ProcurementClassesTwo,
		  	ProcurementIndexContent,
		  	 Swiper
		  }
	}
</script>