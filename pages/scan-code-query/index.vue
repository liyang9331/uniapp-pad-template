<template>
	<view class="page">
		<Header/>
		<view class="query">
			
		</view>
	</view>
</template>

<script>
	import * as api from '@/api/giveAnalarm.js'
	import config from "@/config.js"
	import {
		dictinit
	} from "@/api/dict.js"
	import aptMinx from "@/mixins/applet-compatibility.js"
	import Header from "@/components/header"
	export default {
		name:"informationQuery",
		mixins: [aptMinx],
		data() {
			return {
				pending: '0',
				processed: '0',
				warn: 0,
				workOrder: 0,
			}
		},
		components: {
			Header
		},
		onInit() {},
		onLoad() {
			// 字典值缓存
			dictinit();
			api.getWarnWorkOrder({}).then(res => {
				this.warn = res.data.data.warn
				this.workOrder = res.data.data.workOrder
			});
			// 每隔1s执行一次，app是否属于假死
			// let setval = ()=>{
			// 	setTimeout(()=>{
			// 		console.log('监听app活动状态！');
			// 		setval()
			// 	},1000)
			// }
			// setval()
		},
		computed: {
			userInfo() {
				return uni.$store.state.userInfo
			}
		},
		// 监听用户下拉动作
		onPullDownRefresh() {
			const http = [uni.$store.dispatch('getUserInfo'), api.getWarnWorkOrder()]
			Promise.all(http).then(res => {
				const data = res[1].data.data
				this.warn = data.warn
				this.workOrder = data.workOrder
			}).finally(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: '../setting/setting'
				})
			}
		},
	}
</script>

<style>
	/* #ifdef H5 */
	.fdr {
		flex-direction: row;
	}

	/* #endif */
</style>
<style lang="scss" scoped>
	.page {
		// width: calc(100% - 31.24rpx);
		height: calc(100% - 11.72rpx);
		background-image: url("/static/img/index/bgc@2x.png");
		background-size: 100%;
		padding-top: 11.72rpx;
		padding-right: 15.63rpx;
		padding-left: 14.84rpx;
	}
</style>