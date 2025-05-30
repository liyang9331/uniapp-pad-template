<template>
	<view class="body" @tap="focus()">
		<view class="box">
			<image src="/static/img/calendar.png" style="width: 13rpx;height: 13rpx;"></image>
			<view class="content">
				<text>{{ date[0]?date[0]:'开始时间' }}</text>
				<text>-</text>
				<text>{{ date[1]?date[1]:'开始时间' }}</text>
			</view>
		</view>
		<u-calendar :defaultDate="date" :show="show" :mode="mode" @confirm="confirm" @close="close"></u-calendar>
	</view>
</template>

<script>
	export default {
		name: "datatime-picker",
		props: {
			// value:{
			// 	type:["Array"],
			// 	default:["",""]
			// }
		},
		data() {
			return {
				show: false,
				mode: 'range',
				date: []
			};
		},
		methods: {
			focus() {
				// console.log(333)
				this.show = true;
			},
			confirm(res) {
				// console.log(res)
				this.show = false
				this.date = [res[0], res[res.length - 1]]
			},
			close(){
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.body {
		position: relative;
		width: 195.31rpx;
		height: 27.34rpx;
		background: #fff;
		border: 0.39rpx solid #c6cdde;
		border-radius: 6rpx 6rpx 6rpx 6rpx;

		/deep/ .u-icon__icon {
			font-size: 13rpx !important;
		}

		.box {
			position: absolute;
			width: calc(100% - 11.33rpx);
			height: calc(100%);
			top: 0;
			left: 0;
			padding-left: 11.33rpx;

			display: flex;
			align-items: center;
			gap: 8.59rpx;

			.content {
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 11rpx;
					color: #919BB5;
					text-align: left;
					font-style: normal;
					text-transform: none;
					margin-right: 8rpx;
				}
			}
		}
	
		.u-transition{
			
		}
		/deep/ .u-calendar{
			.u-calendar-header__title,.u-calendar-header__subtitle,.u-calendar-header__weekdays__weekday{
				font-size: 11rpx;
			}
			.u-calendar-month__days__day__select__info{
				font-size: 11rpx;
			}
			.u-calendar-month__title{
				font-size: 11rpx;
			}
			.u-calendar-month__days__day__select__buttom-info{
				font-size: 11rpx;
			}
			
			.u-calendar__confirm{
				width: 100rpx;
				height: 27rpx;
				margin: 0 auto;
				.u-button{
					width: 100%;
					height: 100%;
					.u-button__text{
						font-size: 11rpx !important;
					}
				}
			}
		}
		
	}
</style>