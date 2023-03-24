<template>
	<view>
		<nav-bar></nav-bar>
		<view class="charts-box">
			<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
		</view>
		<u-button type="primary" text="调用" @click="test"></u-button>
		
	</view>
</template>

<script>
	import services from '@/services';
	const {
		yzhRequest
	} = services;
	export default {
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				}
			}
		},
		onReady() {
			this.getServerData();
		},
		// 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面		
		onShow() {

		},
		// 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发		
		onReady() {
			this.getServerData();
		},
		// 监听页面隐藏
		onHide() {

		},
		// 监听页面卸载
		onUnload() {

		},
		// 监听用户下拉动作，一般用于下拉刷新，参考示例
		onPullDownRefresh() {

		},
		// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项
		// onReachBottom使用注意 可在pages.json里定义具体页面底部的触发距离onReachBottomDistance，比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。
		onReachBottom() {

		},
		// 点击 tab 时触发，参数为Object，具体见下方注意事项
		onTabItemTap() {

		},
		// 	用户点击右上角分享	
		onShareAppMessage() {

		},
		// 监听页面滚动，参数为Object
		onPageScroll() {

		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
						series: [{
								name: "目标值",
								data: [35, 36, 31, 33, 13, 34]
							},
							{
								name: "完成量",
								data: [18, 27, 21, 24, 6, 28]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			async test() {
				const data = await yzhRequest.testAjax();
				console.log({
					data
				});
				my.showToast({
					content: data.data.error_info
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
