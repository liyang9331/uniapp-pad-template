<template>
	<view class="page">
		<Header />
		<view class="query">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="formData" ref="uForm">
				<u-form-item label="查询物资：" prop="name" class="margin_top_0">
					<u--input v-model="formData.name" style="width: 195.31rpx;height: 27.34rpx;" border="none"
						placeholder="编码、名称、助记码等查询"></u--input>
				</u-form-item>
				<u-form-item label="批次号：" prop="sex" class="margin_top_0">
					<u--input v-model="formData.name" style="width: 152.34rpx;height: 27.34rpx;" border="none"
						placeholder=""></u--input>
				</u-form-item>
				<u-form-item label="供应商：" prop="sex" class="margin_top_0" style="margin-right: 0;">
					<u--input v-model="formData.name" style="width: 152.34rpx;height: 27.34rpx;" border="none"
						placeholder=""></u--input>
				</u-form-item>
				<u-form-item label="查询类型：" prop="sex">
					<u-radio-group v-model="formData.radiovalue1" placement="row" @change="groupChange">
						<u-radio :class="formData.radiovalue1 == item.name?'active':''"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name"
							@change="radioChange">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="查询时段：">
					<DatetimePicker></DatetimePicker>
				</u-form-item>
				<u-form-item class="" style="margin-right: 0;width: 100%;margin-top: 11.72rpx;">
					<view class="btns">
						<view class="btn"><text>查询</text></view>
						<view class="btn"><text>重置</text></view>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<!-- 表格 -->
		<view class="table">
			<Positin v-if="formData.radiovalue1 == '存放位置'" style="height: 100%;"></Positin>
			<InventoryQuery v-if="formData.radiovalue1 == '库存查询'" style="height: 100%;"></InventoryQuery>
			<StorageRecord v-if="formData.radiovalue1 == '入库记录'"></StorageRecord>
			<OutboundRecord v-if="formData.radiovalue1 == '出库记录'"></OutboundRecord>
			<DynamicWarehouse v-if="formData.radiovalue1 == '动态仓库'"></DynamicWarehouse>
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
	import DatetimePicker from '@/components/datetime-picker/index.vue'
	
	import Positin from "./components/position/index.vue"
	import InventoryQuery from "./components/inventory-query/index.vue"
	import StorageRecord from "./components/storage-record/index.vue"
	import OutboundRecord from "./components/outbound-record/index.vue"
	import DynamicWarehouse from "./components/dynamic-warehouse/index.vue"
	export default {
		name: "InformationQuery",
		mixins: [aptMinx],
		components: {
			Header,
			DatetimePicker,
			Positin,
			InventoryQuery,
			StorageRecord,
			OutboundRecord,
			DynamicWarehouse
		},
		data() {
			return {

				showSex: false,
				formData: {
					name: '',
					sex: '',
					// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
					radiovalue1: '存放位置',
				},
				// 基本案列数据
				radiolist1: [{
						name: '存放位置',
						disabled: false
					},
					{
						name: '库存查询',
						disabled: false
					},
					{
						name: '入库记录',
						disabled: false
					}, {
						name: '出库记录',
						disabled: false
					}, {
						name: '动态仓库',
						disabled: false
					}
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onInit() {},
		onLoad() {
			// 字典值缓存
			// dictinit();
			// api.getWarnWorkOrder({}).then(res => {
			// 	this.warn = res.data.data.warn
			// 	this.workOrder = res.data.data.workOrder
			// });
		},
		computed: {
			userInfo() {
				return uni.$store.state.userInfo
			}
		},
		// 监听用户下拉动作
		onPullDownRefresh() {
			// const http = [uni.$store.dispatch('getUserInfo'), api.getWarnWorkOrder()]
			// Promise.all(http).then(res => {
			// 	const data = res[1].data.data
			// 	this.warn = data.warn
			// 	this.workOrder = data.workOrder
			// }).finally(() => {
			// 	uni.stopPullDownRefresh()
			// })
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			change(e) {
				this.single = e;
				console.log("-change事件:", e);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.query {
		margin-top: 11rpx;
		padding: 11rpx;
		width: calc(100% - 11rpx - 11rpx);
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;
		/deep/ .u-form {
			width: 100%;
		}
	}

	.btns {
		width: calc(100%);
		display: flex;
		gap: 11.72rpx;
		justify-content: flex-end;
		.btn {
			width: 90rpx;
			height: 27rpx;
			background: linear-gradient(129deg, #5EC4FF 0%, #0093E8 100%);
			border-radius: 16rpx 16rpx 16rpx 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 11.72rpx;
			transition: all 0.2s ease; /* 添加过渡效果使变化更平滑 */

			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 11rpx;
				color: #FFFFFF;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}
			
			/* 点击状态 */
			&:active {
			  transform: scale(0.98); /* 轻微缩小效果 */
			  opacity: 0.9; /* 轻微透明 */
			  box-shadow: 0 2rpx 2rpx rgba(0, 0, 0, 0.2) inset; /* 内阴影模拟按下效果 */
			}
		}
	}
	
	.table{
		flex-grow: 1;
		margin-top: 21.09rpx;
		width: 100%;
	}
</style>