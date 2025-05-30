<template>
	<view class="body">
		<tabs :list="list1" @change="handleChange"></tabs>
		<view class="box">
			<view class="left">
				<view class="items">
					<view class="item">
						<text>库区一</text>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="cabinet">
					<view class="plate">
						<text>0105</text>
						<image src="/static/img/plate@2x.png"></image>
					</view>
					<view class="items">
						<view class="cabinet_item" v-for="(item,index) in new Array(5)" :key="index"
							style="background-color: #FFCB20;">
							<text>现存库存：20</text>
							<text>预警库存：20</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabs from "@/components/tabs/index.vue"
	export default {
		name: "position",
		components: {
			tabs
		},
		data() {
			return {
				list1: [{
					name: '仓库一',
				}, {
					name: '仓库二',
				}, ]
			}
		},
		methods: {
			handleChange(item) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		display: flex;
		flex-direction: column;
		.box {
			flex-grow: 1;
			padding: 4rpx;
			margin-top: 12.11rpx;
			background: rgba(255, 255, 255, 0.8);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 0rpx solid #FFFFFF;

			display: flex;
			flex-direction: row;

			.left {
				.items {
					.item {
						width: 82rpx;
						height: 37rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #0093E8;
						border-radius: 8rpx 0rpx 0rpx 0rpx;

						text {
							font-family: PingFang SC, PingFang SC;
							font-weight: bold;
							font-size: 11rpx;
							color: #FFFFFF;
							line-height: 10rpx;
							text-align: left;
							font-style: normal;
							text-transform: none;
						}
					}
				}
			}

			.right {
				display: flex;
				flex-direction: row;
				padding-top: 8.59rpx;

				.cabinet {
					display: flex;
					height: 36.72rpx;

					.plate {
						display: flex;
						flex-wrap: wrap;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding-left: 12.5rpx;
						padding-right: 5.86rpx;

						image {
							width: 44.53rpx;
							height: 14.41rpx;
						}

						text {
							font-family: Source Han Sans CN, Source Han Sans CN;
							font-weight: bold;
							font-size: 11rpx;
							color: #001A58;
							line-height: 14rpx;
							text-align: center;
							font-style: normal;
							text-transform: none;
						}
					}

					.items {
						display: flex;
						flex-wrap: wrap;
						gap: 3.13rpx;

						// justify-content: flex-start;
						// /* 左对齐 */
						// align-items: flex-start;
						// /* 顶部对齐 */
						.cabinet_item {
							width: 109rpx;
							height: 37rpx;
							background: #EFF5F8;
							border-radius: 0rpx 0rpx 0rpx 0rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							text{
								font-family: PingFang SC, PingFang SC;
								font-weight: bold;
								font-size: 11rpx;
								color: #FFFFFF;
								line-height: 12rpx;
								text-align: left;
								font-style: normal;
								text-transform: none;
							}
						}
					}


				}
			}
		}
	}
</style>