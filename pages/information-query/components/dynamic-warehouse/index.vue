<template>
	<view class="body">
		<view class="box">
			<view class="table">
				<zb-table :height="160" :show-header="true" :columns="column" :stripe="true" :fit="true" show-summary sum-text=""
					@rowClick="rowClick" :summary-method="getSummaries" @toggleRowSelection="toggleRowSelection"
					@toggleAllSelection="toggleAllSelection" :border="true" :isShowLoadMore="true"
					:pullUpLoading="pullUpLoading" @edit="buttonEdit" @dele="dele" :data="tableData">
					<template #operation="{data}">
						<view class="state">
							<view class="dot"></view>
							<text>{{data}}</text>
						</view>
					</template>
				</zb-table>
			</view>
		</view>
	</view>
</template>

<script>
	import tabs from "@/components/tabs/index.vue"
	import zbTable from "@/components/zb-table/index.vue"
	import NextDataSelect from "@/components/next-data-select/next-data-select.vue"
	export default {
		name: "DynamicWarehouse",
		components: {
			tabs,
			zbTable,
			NextDataSelect
		},
		data() {
			return {
				range: [{
						value: 0,
						text: "篮球"
					},
					{
						value: 1,
						text: "足球"
					},
					{
						value: 2,
						text: "游泳"
					},
				],
				list1: [{
					name: '仓库一',
				}, {
					name: '仓库二',
				}, ],
				formData: {},
				rules: [],
				column: [{
						name: '',
						label: '序号',
						fixed: true,
						width: 25,
						type: 'index',
					},
					{
						name: 'age',
						label: '物资名称',
						sorter: false,
						fixed: true,
					},
					{
						name: 'address',
						label: '累计出库数量'
					},
					{
						name: 'date',
						label: '累计入库数量',
						sorter: true
					},
					{
						name: 'province',
						label: '累计借用数量'
					},
					{
						name: 'city',
						label: '累计归还数量'
					},
					{
						name: 'zip',
						label: '现存库存'
					},
					{
						name: 'zip',
						label: '现存金额'
					},
					{
						name: 'zip',
						label: '规格'
					},
					{
						name: 'zip',
						label: '型号'
					},
					{
						name: 'zip',
						label: '单位'
					},
					{
						name: 'zip',
						label: '供应商'
					},
					{
						name: 'zip',
						label: '生产厂家'
					},
					{
						name: 'zip',
						label: '批次号'
					},
					{
						name: 'zip',
						label: '采购价'
					},
					{
						name: 'zip',
						label: '投产时间'
					},
					{
						name: 'zip',
						label: '寿命截止'
					},
				],
				tableData: [{
						date: '2016-05-02',
						name: '王小虎1',
						province: '上海',
						sex: '男',
						age: '18',
						img: "https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
						city: '普陀区',
						address: '上海市普',
						zip: 200333
					},
					{
						date: '2016-05-02',
						name: '王小虎2',
						province: '上海',
						sex: '男',
						age: '18',
						city: '普陀区',
						address: '上海市普',
						zip: 200333
					},
					{
						date: '2016-05-02',
						name: '王小虎3',
						province: '上海',
						sex: '男',
						age: '18',
						city: '普陀区',
						address: '上海市普',
						zip: 200333
					},
					{
						date: '2016-05-02',
						name: '王小虎4',
						province: '上海',
						sex: '男',
						age: '18',
						city: '普陀区',
						address: '上海市普',
						zip: 200333
					},
					{
						date: '2016-05-02',
						name: '王小虎5',
						province: '上海',
						sex: '男',
						age: '18',
						city: '普陀区',
						address: '上海市普',
						zip: 200333
					}
				],
				options: [{
						text: '测试1',
						value: 1,
						lable: '选项1'
					},
					{
						text: '测试2',
						value: 2,
						disabled: true,
						lable: '选项2'
					},
				],
				testModel: ''
			}
		},
		methods: {
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
			onchange() {
				console.log(1111111, this.testModel)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			padding: 13rpx 11rpx;
			background: rgba(255, 255, 255, 0.8);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 0rpx solid #FFFFFF;
			flex-wrap: wrap;

			.query {
				width: calc(100%);
				height: calc(27rpx);
				display: flex;

				/deep/ .u-form {
					justify-content: space-between;
					margin: 0 !important;

					.u-form-item {
						margin: 0 !important;
					}

					width: 100%;
					display: flex;
					align-items: center;

					.left {
						display: flex;
					}
				}
			}

			.table {
				width: 100%;
				flex-grow: 1;
				margin-top: 11rpx;
			}
		}
	}

	.btn {
		display: flex;
		align-items: center;
		gap: 7.81rpx;

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

	.state {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4.69rpx;

		// justify-content: center;
		.dot {
			width: 5rpx;
			height: 5rpx;
			border-radius: 50%;
			background: #E50A0A;
		}

		text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 11rpx;
			line-height: 11rpx;
			color: #E50A0A;
		}
	}
</style>