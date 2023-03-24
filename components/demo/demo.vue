<template>
	<view>
		{{msg}}
	</view>
</template>

<script>
	export default {
		name:"demo",
		data() {
			return {
				msg:'测试'
			};
		},
		beforeCreate(){
			
		},
		created(){
			console.log(this.msg)
		},
		beforeMount(){
			
		},
		mounted(){
			this.msg='测试2'
			console.log(this.msg)
		},
		beforeUpdate(){
			
		},
		updated(){
			
		},
		beforeDestroy(){
			
		},
		destroyed(){
			
		},
	}
</script>

<style lang="scss">

</style>