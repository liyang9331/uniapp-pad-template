<template>
	<view class="message">
		<text>{{message}}</text>
		<text>{{date}}</text>
	</view>
</template>

<script>
	export default {
		name: "message",
		data() {
			return {
				message: "您有待执行盘点任务请尽快完成。盘点计划：5月份盘点，盘点仓库：2号仓库，盘点起止时间：2025/5/6-2025/5/31。",
				date: "2025/5/5 12:00:00",
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		width: calc(100% - 11.72rpx*2);
		height: 34rpx;
		background: linear-gradient(80deg, #0095EB 0%, rgba(67, 187, 255, 0.64) 100%);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 11.72rpx;

		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 10rpx;
			color: #FFFFFF;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}
</style>