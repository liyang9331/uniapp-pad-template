<template>
	<view class="tab-bar-group">
		<view class="card" @tap="switchTab('/pages/information-query/index')" style="background-image: url('/static/img/index/card-bg-1@2x.png');">
			<image src="@/static/img/index/icon-1@2x.png" class="icon" style="width:39.06rpx,height:39.06rpx"></image>
			<text class="text">信息查询</text>
		</view>
		<view class="tab-bar">
			<view class="card-2" @tap="switchTab('/pages/material-storage/index')" style="background-image: url('/static/img/index/store-bg@2x.png');">
				<image src="@/static/img/index/store@2x.png" class="icon" style="width:39.06rpx,height:39.06rpx"></image>
				<text class="text">物资入库</text>
			</view>
			<view class="card-2" @tap="switchTab('/pages/material-issuance/index')" style="background-image: url('/static/img/index/outbound-bg@2x.png');">
				<image src="@/static/img/index/outbound@2x.png" class="icon" style="width:39.06rpx,height:39.06rpx"></image>
				<text class="text">物资出库</text>
			</view>
			<view class="card-2" @tap="switchTab('/pages/scan-code-query/index')" style="background-image: url('/static/img/index/scan-bg@2x.png');">
				<image src="@/static/img/index/scan@2x.png" class="icon" style="width:39.06rpx,height:39.06rpx"></image>
				<text class="text">扫码查询</text>
			</view>
			<view class="card-2" @tap="switchTab('/pages/inventory-history/index')" style="background-image: url('/static/img/index/history-bg@2x.png');">
				<image src="@/static/img/index/history@2x.png" class="icon" style="width:39.06rpx,height:39.06rpx"></image>
				<text class="text">历史盘点记录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
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
<style lang="scss" scoped>
	.card{
		width: 232.03rpx;
		min-width: 232.03rpx;
		height: 333.98rpx;
		background: #FFFFFF;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 0.78;
		background-size: 100% 100%;	
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.card-2{
		width: 232.03rpx;
		height: 160.94rpx;
		background: #FFFFFF;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 0.78;
		background-size: 100% 100%;
		
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.icon{
		width: 39.06rpx;
		height: 39.06rpx;
	}
	.text{
		font-family: Source Han Sans CN, Source Han Sans CN;
		font-weight: bold;
		font-size: 15rpx;
		color: #FFFFFF;
		line-height: 32rpx;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}
	.tab-bar-group {
		width: 100%;
		display: flex;
		gap: 11.72rpx;
		.tab-bar{
			width: 100%;
			display: flex;
			gap: 11.72rpx;
			flex-wrap: wrap;
		}
	}

	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 290rpx;
		height: 290rpx;
		background: rgb(255, 255, 255);
		box-shadow: 0px 0px 6rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}
</style>
