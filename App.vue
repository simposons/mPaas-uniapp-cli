<script>
	import utils from '@/utils'
	import config from '@/config'
	const { updateManager } = utils;
	const { isUpdate } = config;
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef PROD
			console.log("生产环境");
			// #endif
			isUpdate && updateManager.getUpdateManager()
			.then((res, e) => {
			  console.log({ res }, { e });
			})
			.catch((e) => {
			  console.log({ e });
			});			   
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function() {
			console.log('App Error')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
