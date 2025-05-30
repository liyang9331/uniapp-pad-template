<template>
	<view class="header">
		<!-- 顶部占位容器 -->
		<view :style="{height:statusBarHeight+'px'}"></view>
		<view class="header-box">
			<view class="fdr user-info" style="" @tap="switchTab('/pages/index/index')">
				<image class="logo" src="@/static/img/login/logo.png"></image>
			</view>
			<view class="tools-top">
				<view style="margin-right: 11.33rpx;">
					<u-avatar :src="userInfo.avatarUrl?userInfo.avatarUrl:''" size="25">
					</u-avatar>
				</view>
				<text class="text" style="margin-right: 19.53rpx;">张三</text>
				<view class="button" style="margin-right: 9.77rpx;">
					<image style="width: 11.72rpx;height: 11.72rpx;" src="@/static/img/index/sync@2x.png"></image>
					<text class="text">数据同步</text>
				</view>
				<view class="button">
					<image style="width: 11.72rpx;height: 11.72rpx;" src="@/static/img/index/exit@2x.png"></image>
					<text class="text">退出</text>
				</view>
			</view>

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
	export default {
		name: "Header",
		mixins: [aptMinx],
		data() {
			return {
				pending: '0',
				processed: '0',
				warn: 0,
				workOrder: 0,
			}
		},
		components: {},
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
			switchTab(route) {
				uni.navigateTo({
					url: route
				})
			},
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

	.header {
		// width: 750rpx;
		// height: 452rpx;
		position: relative;

		.header-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.bgc {
		width: 750rpx;
		height: 452rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.tools-top {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		// align-items: end;
		// flex-wrap: unset;

		.text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 10rpx;
			color: #001A58;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}

	.button {
		padding: 6.64rpx 11.72rpx;
		background: rgba(255, 255, 255, 0.45);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.31);

		gap: 6rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 10rpx;
			color: #001A58;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}

	.setting-image {
		width: 40rpx;
		height: 36rpx;
	}

	.user-info {
		.logo {
			width: 223.05rpx;
			height: 29.3rpx;
		}
	}

	.user-text-page {
		display: flex;
		justify-content: center;
	}

	.font-1 {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 48rpx;
		color: #FFFFFF;
		opacity: 1;
	}

	.font-2 {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: #FFFFFF;
		opacity: 1;
	}
</style>