<template>
	<view class="page">
		<Header></Header>
		<view class="content" v-if="!isHandle && !isDetail">
			<view class="query">
				<u--form labelPosition="left" :model="formData" ref="uForm">
					<u-form-item label="盘点计划名称：" prop="name">
						<u--input v-model="formData.name" style="width: 152rpx;height: 27rpx;" border="none"
							placeholder=""></u--input>
					</u-form-item>
					<u-form-item label="盘点状态：" prop="sex">
						<NextDataSelect label="" style="width: 152rpx;height: 27rpx;" @change="onchange"
							format="{lable}" :filterable="true" :options="options" v-model="formData.name">
						</NextDataSelect>
					</u-form-item>
					<u-form-item class="">
						<view class="btns">
							<view class="btn" @tap="handleQuery"><text>查询</text></view>
							<view class="btn" @tap="handleReset"><text>重置</text></view>
						</view>
					</u-form-item>
				</u--form>
			</view>
			<!-- 表格 -->
			<view class="table">
				<zb-table :height="230" :show-header="true" :columns="column" :stripe="true" :fit="true" show-summary sum-text=""
					@rowClick="rowClick" :summary-method="getSummaries" @toggleRowSelection="toggleRowSelection"
					@toggleAllSelection="toggleAllSelection" :border="true" :isShowLoadMore="true"
					:pullUpLoading="pullUpLoading" @edit="buttonEdit" @dele="dele" :data="tableData">
					<template #operation="{data}">
						<view style="width: 100%;" @tap="handleTableOperation(data.type)">
							<text style="color: #008AD9;">{{data.type == 0 ?'处理':'详情'}}</text>
						</view>
					</template>
					<template #taskState="{data}">
						<view class="table-state">
							<view class="dot"
								:style="{backgroundColor:data.taskState == 0?'#E50A0A':(data.taskState == 1?'#008AD9':'#919BB5')}">
							</view>
							<text
								:style="{color:data.taskState == 0?'#E50A0A':(data.taskState == 1?'#008AD9':'#919BB5')}">
								{{data.taskState == 0 ?'未开始':(data.taskState == 1?'进行中':'已结束')}}
							</text>
						</view>
					</template>
					<template #InventoryStatus="{data}">
						<view class="table-state">
							<view class="dot" :style="{backgroundColor:data.InventoryStatus == 0?'#E50A0A':'#1EBE00'}">
							</view>
							<text
								:style="{color:data.InventoryStatus == 0?'#E50A0A':'#1EBE00'}">{{data.InventoryStatus == 0 ?'未盘点':'完成盘点'}}</text>
						</view>
					</template>
				</zb-table>
			</view>
		</view>
		<Handle v-if="isHandle" @cancel="handleCancel"></Handle>
		<Detail v-if="isDetail" @cancel="handleCancel"></Detail>
	</view>
</template>

<script>
	import * as api from '@/api/giveAnalarm'
	import config from "@/config"
	import {
		dictinit
	} from "@/api/dict"
	import aptMinx from "@/mixins/applet-compatibility"
	import Header from "@/components/header"
	import DatetimePicker from '@/components/datetime-picker/index'
	import zbTable from "@/components/zb-table/index"
	import NextDataSelect from "@/components/next-data-select/next-data-select"
	import Handle from "./components/handle"
	import Detail from "./components/detail"
	export default {
		name: "InformationQuery",
		mixins: [aptMinx],
		components: {
			Header,
			DatetimePicker,
			zbTable,
			NextDataSelect,
			Handle,
			Detail,
		},
		data() {
			return {
				isPreview: false,
				isDetail: false,
				isHandle: false,
				showSex: false,
				formData: {
					name: '',
					sex: '',
				},
				column: [{
						name: 'age',
						label: '盘点计划名称',
						sorter: false,
					},
					{
						name: 'sex',
						label: '盘点仓库',
						sorter: false,
					},
					{
						name: 'img',
						label: '盘点开始时间',
						type: "img"
					},
					{
						name: 'address',
						label: '盘点结束时间'
					},
					{
						name: 'taskState',
						label: '任务状态',
						slot: true,
					},
					{
						name: 'InventoryStatus',
						label: '盘点状态',
						slot: true,
					},
					{
						name: 'operation',
						label: '操作',
						type: "operation",
						slot: true
					},
				],
				tableData: [{
						taskState: 0,
						name: 33,
						InventoryStatus: 0,
						type: 0,
					},
					{
						taskState: 1,
						name: 33,
						InventoryStatus: 1,
						type: 1,
					},
					{
						taskState: 2,
						name: 33,
						InventoryStatus: 0,
						type: 0,
					},
				],
				options: [{
						value: 1,
						lable: '完成盘点',
						disabled: false,
					},
					{
						value: 2,
						disabled: false,
						lable: '选项2'
					},
				],
				testModel: ''
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
			handleChange(item) {

			},
			rowClick() {},
			getSummaries() {},
			toggleRowSelection() {},
			toggleAllSelection() {},
			buttonEdit() {},
			dele() {},
			pullUpLoading(done) {
				console.log(done)
				console.log(333333333)
				setTimeout(() => {
					done('ok')
				}, 500)
			},
			handleExport() {

			},
			onchange(val) {
				console.log(val)

			},
			handleQuery() {

			},
			handleReset() {

			},
			handleTableOperation(val) {
				if (val == 0) {
					// 处理
					this.isHandle = true
					this.isDetail = false
				} else {
					// 详情
					this.isDetail = true
					this.isHandle = false
				}

			},
			handleCancel() {
				this.isHandle = false
				this.isDetail = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .next-select {
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
	}

	.query {
		margin-top: 11rpx;
		padding: 11rpx;
		// width: calc(100% - 11rpx - 11rpx);
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;

		/deep/ .u-form {
			width: 100%;
		}
	}

	.table {
		overflow: hidden;
		margin-top: 11rpx;
		padding: 52rpx 12rpx 12rpx 12rpx;
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;
	}
</style>