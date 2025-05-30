<template>
	<div class="choose-person">
		<div class="query-container">
			<u-input v-model="queryParams.userName" placeholder="请输入人员名称" clearable @keyup.enter.native="handleQuery"
				@clear="resetQuery" />
			<div style="margin-left: 20rpx;">
				<u-button type="primary" @click="handleQuery">搜索</u-button>
			</div>
			<div style="margin-left: 20rpx;">
				<u-button @click="resetQuery">重置</u-button>
			</div>
		</div>

		<div class="title">
			<span>已选人</span>
			<!-- 			<div v-if="customAddVisible" style="margin-left: 20rpx;">
				<u-button size="small" type="primary" @click="handleAdd">手动录入</u-button>
			</div> -->
		</div>

		<div class="person-list">
			<u-tag class="person-item" v-for="(item, index) in personList" :key="index" :text="item.label" closable
				@close="onPersonItemClose(item,index)">
			</u-tag>
		</div>

		<div class="tree-list">
			<Tree v-if="!isQuery" v-model="cascaderSelList" :options="cascaderOptions" @change="onCascaderChange">
			</Tree>

			<div v-else class="query-list">
				<div class="query-item" v-for="(item, index) in filterCascaderOptions"
					:class="isPersonChecked(item.value) ? 'checked' : ''" @click="handleQueryItemClick(item)">
					<span>{{ item.label }}</span>
					<u-icon v-if="isPersonChecked(item.value)" name="checkmark" color="#326CFE"></u-icon>
				</div>
			</div>
		</div>

		<u-modal v-if="addPersonDialogVisible" :show="addPersonDialogVisible" title="手动录入" showConfirmButton
			showCancelButton @cancel="addPersonDialogVisible = false" @confirm="submitForm">
			<view class="slot-content">
				<u-input v-model="form.userName"></u-input>
			</view>
		</u-modal>
	</div>
</template>

<script>
	import Tree from "./Tree.vue";

	export default {
		props: {
			choosedPersonList: {
				type: Array,
				default: () => []
			},
			customAddVisible: {
				type: Boolean,
				default: true
			},
			treeData: {
				type: Array,
				default: () => []
			}
		},
		components: {
			Tree
		},
		data() {
			return {
				userInfo: {},
				isQuery: false,
				addPersonDialogVisible: false,
				queryParams: {
					userName: undefined
				},
				cascaderOptions: [],
				filterCascaderOptions: [],
				flatCascaderOptions: [],
				cascaderSelList: [], //选择的人员id
				cascaderPersonList: [], //选择的人员
				customPersonList: [], //自定义的人员
				form: {}
			};
		},
		computed: {
			personList() {
				return this.cascaderPersonList.concat(this.customPersonList);
			},
		},
		watch: {
			personList: {
				immediate: true, // 初始化时立即触发
				handler(newVal) {
					// 通过 emit 事件将新值传递出去
					this.$emit('personListChanged', newVal);
				},
			},
		},
		async created() {
			this.userInfo = this.$store.state.userInfo;

			if (this.choosedPersonList.length > 0) {
				this.cascaderPersonList = this.choosedPersonList.filter(item => !item.value.includes('2-'));
				this.cascaderSelList = this.cascaderPersonList.map(item => item.value);
				this.customPersonList = this.choosedPersonList.filter(item => item.value.includes('2-'));
			}
			// let originList = localStorage.getItem('choose-person-list1');
			// if (!originList) {
			// 	const res = await getTreeOrgAndParties({ orgId: this.userInfo.orgId })
			// 	originList = res.data.children;
			// 	localStorage.setItem('choose-person-list1', JSON.stringify(originList))
			// } else {
			// 	originList = JSON.parse(originList)
			// }
			this.cascaderOptions = JSON.parse(JSON.stringify(this.treeData))
			this.cascaderOptions.forEach(item => this.handlePerson(item))
			this.flatCascaderOptions = this.treeToFlatList(this.cascaderOptions, 'label', 'value');
			this.handleQuery()
		},
		methods: {
			/** 搜索按钮操作 */
			handleQuery() {
				if (this.queryParams.userName) {
					this.isQuery = true;
					this.filterCascaderOptions = this.flatCascaderOptions.filter(item => item.label.includes(this
						.queryParams
						.userName))
				}
			},
			/** 重置按钮操作 */
			resetQuery() {
				this.isQuery = false;
				this.filterCascaderOptions = [];
				Object.keys(this.queryParams).forEach((key) => {
					this.queryParams[key] = undefined;
				});
				this.handleQuery();
			},
			handleAdd() {
				this.addPersonDialogVisible = true;
			},
			handleQueryItemClick(clickItem) {
				const isChecked = this.isPersonChecked(clickItem.value);
				if (isChecked) {
					this.cascaderPersonList = this.cascaderPersonList.filter(item => item.value != clickItem.value);
				} else {
					this.cascaderPersonList.push(clickItem);
				}
				this.cascaderSelList = this.cascaderPersonList.map(item => item.value);
			},
			onCascaderChange(e) {
				let nameList = [];
				e.forEach((idItem => {
					nameList = nameList.concat(this.flatCascaderOptions.filter(item => item.value == idItem)
						.map(item => item
							.label));
				}))
				this.cascaderPersonList = this.cascaderSelList.map((item, index) => {
					return {
						label: nameList[index],
						value: item
					}
				})
			},
			isPersonChecked(id) {
				return this.cascaderPersonList.some(item => item.value == id);
			},
			onPersonItemClose(item, index) {
				let personItem = this.personList[index];

				this.cascaderSelList = this.cascaderSelList.filter(item => personItem.value != item);
				this.cascaderPersonList = this.cascaderPersonList.filter(item => personItem.value != item.value);
				this.customPersonList = this.customPersonList.filter(item => personItem.value != item.value);
			},
			submitForm() {
				let value = '2-' + this.form.userName;
				const isExist = this.personList.some(item => item.value == value);
				if (!isExist) {
					this.customPersonList.push({
						value: value,
						label: this.form.userName
					});
				} else {
					this.$modal.msgError(this.form.userName + "已经存在");
				}
				this.form = {};
				this.addPersonDialogVisible = false;
			},
			// 处理机构和人员
			handlePerson(node) {
				node.value = node.orgId || node.orgName
				node.label = node.orgName
				node.type = 'department'
				node.children = node.children || []
				if (node.children.length > 0) {
					node.children.forEach(child => {
						this.handlePerson(child)
					});
				}
				if (node.users && node.users.length > 0) {
					node.users.forEach(user => {
						user.label = user.userName;
						user.value = user.userType ? (user.userType + "-" + user.userId) : user.userId || user
							.userName;
						node.children.push({
							...user,
							type: 'user'
						});
					});
				}
			},
			//将tree转换为平铺
			treeToFlatList(treeData, labelKey, valueKey) {
				const flatList = [];

				function processNodes(nodes) {
					nodes.forEach(node => {
						flatList.push({
							label: node[labelKey],
							value: node[valueKey],
							node: node
						});
						if (node.children && node.children.length > 0) {
							processNodes(node.children);
						}
					});
				}
				processNodes(treeData);
				return flatList;
			},
			filterTree(tree, label) {
				const filteredTree = [];

				for (const node of tree) {
					let match = false;
					const newNode = {
						...node
					};

					if (node.label.includes(label)) {
						match = true;
					}

					if (node.children && node.children.length > 0) {
						const filteredChildren = this.filterTree(node.children, label);
						if (filteredChildren.length > 0) {
							match = true;
							newNode.children = filteredChildren;
						} else {
							delete newNode.children;
						}
					}

					if (match) {
						filteredTree.push(newNode);
					}
				}

				return filteredTree;
			},
		}
	};
</script>

<style lang="scss" scoped>
	.choose-person {
		height: 50vh;
		display: flex;
		flex-direction: column;
		font-size: 11rpx;
	}

	.query-container {
		padding: 10rpx;
		display: flex;
		align-items: center;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 0 20rpx;
	}

	.person-list {
		display: flex;
		flex-wrap: wrap;
		margin: 5rpx;
	}

	.person-item {
		margin: 5rpx;
	}

	.query-list {}

	.query-item {
		height: 80rpx;
		line-height: 80rpx;
		color: #606266;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.query-item.checked {
		color: #326CFE;
	}

	.tree-list {
		flex: 1;
		overflow-y: auto;
		border: solid 1px #E4E7ED;
		border-radius: 2rpx;
		margin: 10rpx;
	}

	/deep/ .u-button {
		font-size: 11rpx;
	}

	/deep/ .u-tag {
		height: auto;
		line-height: 11rpx;
		padding: 2rpx 5rpx;

		.u-tag__text {
			font-size: 11rpx;
			line-height: 11rpx;
		}
	}

	/deep/ .u-tag__close {
		width: 10rpx;
		height: 10rpx;
	}
</style>