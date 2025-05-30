<template>
	<view class="page">
		<Header></Header>
		<view class="content" v-if="!isAdd && !isDetail">
			<view class="query">
				<u--form labelPosition="left" :model="formData" ref="uForm">
					<u-form-item label="入库单编号：" prop="name" class="margin_top_0">
						<u--input v-model="formData.name" style="width: 148rpx;height: 27rpx;" border="none"
							placeholder=""></u--input>
					</u-form-item>
					<u-form-item label="入库单名称：" prop="name" class="margin_top_0">
						<u--input v-model="formData.name" style="width: 148rpx;height: 27rpx;" border="none"
							placeholder=""></u--input>
					</u-form-item>
					<u-form-item label="物资信息：" prop="name" class="margin_top_0">
						<u--input v-model="formData.name" style="width: 148rpx;height: 27rpx;" border="none"
							placeholder="编码、名称、助记码查询"></u--input>
					</u-form-item>
					<u-form-item label="供应商：" prop="sex">
						<NextDataSelect label="" style="width: 152rpx;height: 27rpx;" @change="onchange"
							format="{lable}" :filterable="true" :options="options" v-model="formData.name">
						</NextDataSelect>
					</u-form-item>
					<u-form-item label="仓库名称：" prop="sex">
						<NextDataSelect label="" style="width: 152rpx;height: 27rpx;" @change="onchange"
							format="{lable}" :filterable="true" :options="options" v-model="formData.name">
						</NextDataSelect>
					</u-form-item>
					<u-form-item label="关联单据：" prop="sex">
						<NextDataSelect label="" style="width: 152rpx;height: 27rpx;" @change="onchange"
							format="{lable}" :filterable="true" :options="options" v-model="formData.name">
						</NextDataSelect>
					</u-form-item>
					<u-form-item label="编制人：" prop="sex">
						<NextDataSelect label="" style="width: 152rpx;height: 27rpx;" @change="onchange"
							format="{lable}" :filterable="true" :options="options" v-model="formData.name">
						</NextDataSelect>
					</u-form-item>
					<u-form-item label="编制日期：" prop="sex">
						<Calendar label="" style="width: 162rpx;height: 27rpx;" @change="onchange" format="{lable}"
							:filterable="true" :options="options" v-model="formData.name">
						</Calendar>
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
			<view class="table-box">
				<view class="buttons" style="margin-bottom: 10rpx;">
					<view class="button" @click="handleAdd">
						<text>新增入库</text>
					</view>
					<view class="button" @click="handleExport">
						<image src="/static/img/import@2x.png"></image>
						<text>数据导入</text>
					</view>
					<view class="button" @click="handleExport">
						<image src="/static/img/export@2x.png"></image>
						<text>数据导出</text>
					</view>
					<view class="button" @click="handleExport">
						<text>删除</text>
					</view>
				</view>
				<view class="table">
					<zb-table :show-header="true" :columns="column" :stripe="true" :fit="true" show-summary sum-text=""
						@rowClick="rowClick" :summary-method="getSummaries" @toggleRowSelection="toggleRowSelection"
						@toggleAllSelection="toggleAllSelection" :border="true" :isShowLoadMore="true"
						:pullUpLoading="pullUpLoading" :height="250" @edit="buttonEdit" @dele="dele" :data="tableData">
						<template #operation="{data}">
							<view style="width: 100%;display: flex;gap: 8rpx;">
								<text style="color: #008AD9;" @tap="handleEdit(data)">编辑</text>
								<text style="color: #E50A0A;" @tap="handleTableOperation(data)">删除</text>
							</view>
						</template>
					</zb-table>

				</view>

			</view>
		</view>
		<Edit v-if="isAdd" :mode="mode" @cancel="handleCancel"></Edit>
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
	import Calendar from "@/components/calendar/index.vue"
	import Edit from "./components/edit"
	import Detail from "./components/detail"
	export default {
		name: "InformationQuery",
		mixins: [aptMinx],
		components: {
			Header,
			DatetimePicker,
			zbTable,
			NextDataSelect,
			Edit,
			Detail,
			Calendar
		},
		data() {
			return {
				mode:'add',
				isAdd: false,
				formData: {
					name: '',
					sex: '',
				},
				column: [{
						type: 'selection',
						checked: true,
						fixed: 'left',
					},
					{
						name: 'operation',
						label: '操作',
						type: "operation",
						fixed: 'left',
						slot: true
					},
					{
						name: 'age',
						label: '入库单编号',
					},
					{
						name: 'sex',
						label: '入库单名称',
					},
					{
						name: 'img',
						label: '入库日期',
					},
					{
						name: 'address',
						label: '仓库'
					},
					{
						name: 'taskState',
						label: '入库数量',
					},
					{
						name: 'InventoryStatus',
						label: '供应商',
					},
					{
						name: 'InventoryStatus',
						label: '关联单据',
					},
					{
						name: 'InventoryStatus',
						label: '编制人',
					},
					{
						name: 'InventoryStatus',
						label: '编制日期',
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
			handleEdit(val) {
				this.isAdd = true
				this.mode = "edit"
			},
			handleAdd(val) {
				this.isAdd = true
				this.mode = "add"
			},
			handleCancel() {
				this.isAdd = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .next-select {
		background-color: #fff;
	}

	.buttons {
		width: calc(100%);
		display: flex;
		gap: 30rpx;
		/* justify-content: flex-end;*/
	}

	.button {
		display: flex;
		align-items: center;
		gap: 5rpx;

		image {
			width: 11.72rpx;
			height: 11.72rpx;
		}

		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 11rpx;
			color: #008AD9;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
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
		width: calc(100% - 11rpx - 11rpx);
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;

		/deep/ .u-form {
			width: 100%;
		}
	}
	.table-box{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		margin-top: 11rpx;
		padding: 12rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;
		.table {
			flex-grow: 1;
		}
	}
</style>