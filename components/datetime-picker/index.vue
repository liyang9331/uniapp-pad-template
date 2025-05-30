<template>
	<view class="datetime-picker" @tap="focus()">
		<view class="box">
			<image src="/static/img/calendar.png" style="width: 13rpx;height: 13rpx;"></image>
			<view class="content">
				<text>{{ date?filterDate:'选择日期' }}</text>
			</view>
		</view>
		<u-datetime-picker :show="show" v-model="date" mode="datetime" @confirm="confirm" @cancel="close"
			@close="close"></u-datetime-picker>
	</view>
</template>

<script>
	import dayjs from "dayjs"
	export default {
		name: "datatime-picker",
		props: {
			value:{
				type:String,
			}
		},
		data() {
			return {
				show: false,
				mode: 'range',
				date: ""
			};
		},
		computed:{
			filterDate(){
				return  this.date?dayjs(this.date).format("YYYY-MM-DD"):'';
			}
		},
		created() {
			this.date = this.value
		},
		methods: {
			focus() {
				// console.log(333)
				this.show = true;
			},
			confirm(res) {
				// console.log(res)
				this.show = false
				this.$emit("input",dayjs(res.value).format("YYYY-MM-DD HH:mm"))
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.datetime-picker {
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
	}
</style>