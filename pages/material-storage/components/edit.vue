<template>
	<view class="body">
		<u--form labelPosition="left" :model="formData" ref="uForm" :rules="rules">
			<view class="form_1">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u-form-item label="入库单编号：" prop="name">
					<u--input v-model="formData.name" style="width: 144rpx;height: 27rpx;" border="none"
						:disabled="true"></u--input>
				</u-form-item>
				<u-form-item label="入库单名称：" prop="val">
					<u--input v-model="formData.name" style="width: 144rpx;height: 27rpx;" border="none"
						:disabled="true"></u--input>
				</u-form-item>
				<u-form-item label="入库日期：" prop="val">
					<DatetimePicker v-model="formData.inboundDate" type="" style="width: 144rpx;height: 27rpx;">
					</DatetimePicker>
				</u-form-item>
				<u-form-item label="供应商：" prop="sex">
					<NextDataSelect label="" style="width: 144rpx;height: 27rpx;" @change="onchange" format="{lable}"
						:filterable="true" :options="options" v-model="formData.name">
					</NextDataSelect>
				</u-form-item>
				<u-form-item label="仓库：" prop="sex">
					<NextDataSelect label="" style="width: 144rpx;height: 27rpx;" @change="onchange" format="{lable}"
						:filterable="true" :options="options" v-model="formData.name">
					</NextDataSelect>
				</u-form-item>
				<u-form-item label="保管员：" prop="val">
					<input-tree-select v-model="formData.userName" :disabled="true"
						style="width: 144rpx;height: 27rpx;"></input-tree-select>
				</u-form-item>
				<u-form-item label="关联单据：" prop="val">
					<u--input v-model="formData.name" style="width: 144rpx;height: 27rpx;" border="none"
						:disabled="true"></u--input>
				</u-form-item>
				<u-form-item label="编制日期：" prop="val">
					<DatetimePicker v-model="formData.compilationDate" type="" style="width: 144rpx;height: 27rpx;">
					</DatetimePicker>
				</u-form-item>
				<u-form-item label="编制人：" prop="sex">
					<input-tree-select v-model="formData.userName" :disabled="false"
						style="width: 144rpx;height: 27rpx;"></input-tree-select>
				</u-form-item>
				<u-form-item label="备注：" prop="name" style="width:calc(100% - 15rpx)">
					<u--textarea v-model="formData.name" placeholder="请输入内容"></u--textarea>
				</u-form-item>
				<u-form-item label="图片：" prop="val" style="width: 144rpx;">
					<image-upload :style="{width:30}" v-model="formData.checkImages" :multiple="true" :maxCount="6"
						:max-size="2 * 1024 * 1024" @change="(res) => { formData.checkImages = res }">
					</image-upload>
				</u-form-item>
			</view>
			<view class="table-box">
				<view class="buttons" style="margin-bottom: 10rpx;">
					<view class="button" @click="insertRow">
						<image src="/static/img/plus.png"></image>
						<text>插入行</text>
					</view>
					<view class="button" @click="removedRows">
						<image :src="multipleSelection.length>0?'/static/img/minus.png':'/static/img/minus-no.png'"></image>
						<text :style="{color:multipleSelection.length>0?'':'#cdcdcd'}">移除行</text>
					</view>
					<view class="button" @click="handleExport">
						<text>批量入库</text>
					</view>
				</view>
				<view class="table">
					<zb-table :show-header="true" :columns="column" :stripe="true" :fit="true" show-summary sum-text=""
						@rowClick="rowClick" :summary-method="getSummaries" @toggleRowSelection="toggleRowSelection"
						@toggleAllSelection="toggleAllSelection" :border="true" :isShowLoadMore="true"
						:pullUpLoading="pullUpLoading" :height="250" @edit="buttonEdit" @dele="dele" :data="tableData">
						<template #operation="{data}">
							<view class="table-input-box">
								<u--input class="table-input" v-model="data.name" border="none"
									placeholder="搜索物资编码、助记码、名称"></u--input>
							</view>
						</template>
						<template #age="{data}">
							<view class="table-input-box">
								<u--input class="table-input" @focus="show=true" v-model="data.name" border="none"
									placeholder=""></u--input>
							</view>
						</template>
						<template #money="{data}">
							<view class="table-input-box">
								<u--input class="table-input" v-model="data.money" :disabled="true"
									border="none"></u--input>
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
								<view class="dot"
									:style="{backgroundColor:data.InventoryStatus == 0?'#E50A0A':'#1EBE00'}">
								</view>
								<text
									:style="{color:data.InventoryStatus == 0?'#E50A0A':'#1EBE00'}">{{data.InventoryStatus == 0 ?'未盘点':'完成盘点'}}</text>
							</view>
						</template>
					</zb-table>

				</view>

			</view>


			<crs-picker v-model="show" :data="users" :initSelected="initSelected" :showSearch="true" :multiple="false"
				@confirm="onConfirm" />

			<u-form-item class="" style="margin-right: 0;width: 100%;margin-top: 11.72rpx;">
				<view class="btns">
					<view class="btn btn-cancel" @tap="handleCancel"><text>取消</text></view>
					<view class="btn" @tap="submitEvent"><text>提交结果</text></view>
				</view>
			</u-form-item>
		</u--form>
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
	import DatetimePicker from '@/components/datetime-picker/index.vue'
	import zbTable from "@/components/zb-table/index.vue"
	import NextDataSelect from "@/components/next-data-select/next-data-select.vue"

	import InputTreeSelect from "@/components/input-tree-select/index.vue"

	import ImageUpload from '@/components/image-upload';

	import CrsPicker from "@/components/crs-picker/crs-picker.vue"
	import dayjs from 'dayjs'
	export default {
		name: "InformationQuery",
		mixins: [aptMinx],
		components: {
			DatetimePicker,
			zbTable,
			NextDataSelect,
			InputTreeSelect,
			ImageUpload,
			CrsPicker
		},
		props: {
			mode: {
				type: String,
				default: 'add'
			}
		},
		data() {
			return {
				show: false,
				formData: {
					name: '',
					sex: '',
					userName: "马毅仙",
					checkImages: "",
					inboundDate:"",
					compilationDate:"",
				},
				multipleSelection:[],
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
				rules: {
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				column: [{
						type: 'selection',
						checked: true,
						fixed: 'left',
					},
					{
						name: 'operation',
						label: '入库物资',
						type: "operation",
						fixed: 'left',
						slot: true
					},
					{
						name: 'age',
						label: '入库库区',
						slot: true
					},
					{
						name: 'age',
						label: '入库库位',
						slot: true
					},
					{
						name: 'age',
						label: '供应商',
						slot: true
					},
					{
						name: 'operation',
						label: '生产厂家',
						slot: true
					},
					{
						name: 'operation',
						label: '批次号',
						slot: true
					},
					{
						name: 'operation',
						label: '采购价',
						slot: true
					},
					{
						name: 'operation',
						label: '入库数量',
						slot: true
					},
					{
						name: 'money',
						label: '金额',
						slot: true
					},
					{
						name: 'operation',
						label: '投产时间',
						slot: true
					},
					{
						name: 'money',
						label: '寿命截止',
						slot: true
					},
					{
						name: 'money',
						label: '规格',
						slot: true
					},
					{
						name: 'money',
						label: '型号',
						slot: true
					},
					{
						name: 'money',
						label: '单位',
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
				users: [],
				initSelected: [],
			}
		},
		created() {
			this.formData.inboundDate = this.formData.compilationDate = dayjs().format('YYYY-MM-DD')
			console.log(this.formData)
			for (let i = 0; i < 50; i++) {
				var obj = new Object();
				obj.label = '张小海' + (i + 1);
				obj.value = i + 1;
				this.users.push(obj);
			}
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
			onConfirm() {},
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
			toggleRowSelection(selected, array) {
				// console.log(selected, array)
				this.multipleSelection = array
			},
			toggleAllSelection(selected, array) {
				// console.log(selected, array)
				this.multipleSelection = array
			},
			buttonEdit() {},
			dele() {},
			pullUpLoading(done) {
				setTimeout(() => {
					done('ok')
				}, 500)
			},
			handleExport() {

			},
			submitEvent() {
				console.log(this.formData)
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			handleCancel() {
				this.$emit("cancel")
			},
			insertRow() {
				this.tableData.push({})
			},
			removedRows() {
				if(this.multipleSelection.length>0){
					this.tableData = this.tableData.filter(a=>!this.multipleSelection.find(b=>b.key==a.key))
					this.multipleSelection = []
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .next-select {
		background-color: #fff;
	}

	/deep/ .u-form-item__body__left__content__label {
		width: 70rpx;
	}

	.body {
		flex-grow: 1;
		overflow: hidden;
		overflow-y: auto;
		padding-top: 11rpx;
		padding-left: 0;
		padding-right: 0;
	}

	.form_1 {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		padding: 12rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;

		/deep/ .u-form-item {
			margin: 0 !important;
		}
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


	.table-box {
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

	.scroll-view {
		margin-top: 12rpx;
		height: 250rpx;
	}

	.form_2 {
		display: flex;
		flex-wrap: wrap;
		width: calc(100% - 11rpx - 8rpx);
		padding: 17rpx 11rpx 13rpx 8rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;

		.title {
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 13rpx;
			color: #001A58;
			line-height: 10rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}


		.table {
			margin-top: 9rpx;
			width: 100%;
			height: 102rpx;

			/deep/ .zb-table {
				min-height: 102rpx;
			}
		}
	}

	.btns {
		position: fixed;
		bottom: 10rpx;
		width: calc(100%);
		display: flex;
		gap: 11.72rpx;
		justify-content: center;
	}

	.table-input-box {
		padding: 4rpx;
		width: calc(100% - 8rpx);
		height: calc(100% - 8rpx);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.table-input {
		width: 100%;
		height: 100%;
		border: 1rpx solid #C6CDDE;
		border-radius: 6rpx;

		/deep/ .u-input__content {
			width: 100%;
			height: 100%;

			.u-input__content__field-wrapper {
				width: 100%;
				height: 100%;

				.u-input__content__field-wrapper__field {
					width: 100%;
					height: 100%;

					.uni-input-wrapper {
						.uni-input-input {
							width: calc(100% - 9rpx);
							border-radius: 6rpx;
							font-family: PingFang SC;
							font-weight: 400;
							font-size: 11rpx;
							color: #001A58;
							text-align: left;
							font-style: normal;
							text-transform: none;
							padding-left: 9rpx;

							&[disabled] {
								background: #ECEEF4;
							}
						}
					}
				}
			}
		}
	}
</style>