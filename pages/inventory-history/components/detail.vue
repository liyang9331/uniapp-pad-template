<template>
	<view class="body">
		<u--form labelPosition="left" :model="formData" ref="uForm">
			<view class="form_1">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u-form-item label="盘点计划名称：" prop="name">
					<view class="" style="width: 144rpx;height: 27rpx;">
						<text>{{formData.name}}</text>
					</view>
				</u-form-item>
				<u-form-item label="盘点仓库：">
					<view class="" style="width: 144rpx;height: 27rpx;">
						<text>{{formData.name}}</text>
					</view>
				</u-form-item>
				<u-form-item label="盘点开始时间：">
					<view class="" style="width: 144rpx;height: 27rpx;">
						<text>{{formData.name}}</text>
					</view>
				</u-form-item>
				<u-form-item label="盘点结束时间：">
					<view class="" style="width: 144rpx;height: 27rpx;">
						<text>{{formData.name}}</text>
					</view>
				</u-form-item>
				<u-form-item label="盘点流程：">
					<view class="" style="width: 389rpx;height: 27rpx;">
						<text>{{formData.name}}</text>
					</view>
				</u-form-item>
			</view>
			<!-- 中间区域 -->
			<scroll-view class="scroll-view" :scroll-y="true">
				<view class="form_2">
					<text class="title">仓库一</text>
					<view class="table">
						<zb-table :show-header="true" :columns="column" :stripe="true" :fit="true" show-summary
							sum-text="" @rowClick="rowClick" :summary-method="getSummaries"
							@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection"
							:border="true" :isShowLoadMore="true" :pullUpLoading="pullUpLoading" :height="250"
							@edit="buttonEdit" @dele="dele" :data="tableData">
						</zb-table>
					</view>
				</view>
			</scroll-view>
			<u-form-item class="" style="margin-right: 0;width: 100%;margin-top: 11.72rpx;">
				<view class="btns">
					<view class="btn btn-cancel" @tap="handleCancel"><text>关闭</text></view>
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
	import zbTable from "@/components/zb-table/index.vue"
	export default {
		name: "InformationQuery",
		mixins: [aptMinx],
		components: {
			zbTable,
		},
		props: {},
		data() {
			return {
				showSex: false,
				formData: {
					name: '',
					sex: '',
				},
				column: [{
						label: '序号',
						type: "index",
						fixed: "left",
					},
					{
						name: '',
						label: '所在库位',
						sorter: false,
						fixed: "left",
					},
					{
						name: '',
						label: '物资编码',
						fixed: "left",
					},
					{
						name: 'number',
						label: '实际数量',
					},
					{
						name: 'money',
						label: '实际金额',
					},
					{
						name: '',
						label: '账面数量'
					},
					{
						name: '',
						label: '账面金额'
					},
					{
						name: '',
						label: '规格'
					},
					{
						name: '',
						label: '型号'
					},
					{
						name: '',
						label: '批次号'
					},
					{
						name: '',
						label: '采购价'
					}, {
						name: '',
						label: '序列号'
					},
					{
						name: '',
						label: '单位'
					},
					{
						name: '',
						label: '生产厂家',
						fixed: "right",
					},
				],
				tableData: [{
					money: 200,
					type: 0,
				}, ],
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
			SubmitEvent() {
				console.log(this.formData)
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			handleCancel() {
				this.$emit("cancel")
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .next-select {
		background-color: #fff;
	}
	
	.body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
	}
	
	/deep/ .u-form{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	
	.form_1 {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		padding: 17rpx 11rpx 13rpx 8rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 0rpx solid #FFFFFF;
	
		/deep/ .u-form-item {
			margin: 0 !important;
		}
	}
	
	.scroll-view {
		margin-top: 12rpx;
		height: 270rpx;
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
							width: calc(100% - 9rpx - 2rpx);
							background: #FFFFFF;
							border-radius: 6rpx 6rpx 6rpx 6rpx;
							border: 1rpx solid #C6CDDE;
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