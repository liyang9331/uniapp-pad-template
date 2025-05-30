<template>
	<view class="">
		<u--input v-model="userName" :disabled="disabled" class="input" border="none" @focus="focus"></u--input>

		<u-popup :show="rectifyPeopleFlag">
			<view>
				<view class="popup-handle">
					<view @click="rectifyPeopleFlag = false">取消</view>
					<view @click="submitChoosePersonDialog">确定</view>
				</view>
				<ChoosePerson v-if="rectifyPeopleFlag" :treeData="treeData" :choosedPersonList="choosedPersonList"
					:customAddVisible="customAddVisible" @personListChanged="onPerosonListChanged"></ChoosePerson>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import ChoosePerson from "@/components/choose-person/ChoosePerson.vue";
	export default {
		name: "InputSelectTree",
		components: {
			ChoosePerson
		},
		props: {
			value: String ,// 默认 prop 名是 `value`
			disabled:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				userId: "",
				userName: "",
				treeData: [{
					orgId: 1,
					orgName: "测试",
					parentId: 0,
					children: [{
						orgId: 1,
						parentId: 1,
						orgName: "研发部",
						users: [{
							parentId: 11,
							userId: 3555,
							id: 111,
							userName: '张三',
						}, {
							parentId: 11,
							userId: 3555666,
							id: 112,
							userName: '李四',
						}],
					}]
				}],
				rectifyPeopleFlag: false,
				optionType: 1,
				customAddVisible: true,
				choosedPersonList: []
			}
		},
		created() {
			this.userName = this.value
			console.log(this.value)
		},
		methods: {
			focus() {
				this.rectifyPeopleFlag = true
			},
			onPerosonListChanged(personList = []) {
				console.log("onPerosonListChanged", personList)
				this.choosedPersonList = personList
			},
			submitChoosePersonDialog(res) {
				this.rectifyPeopleFlag = false;
				this.userId = this.choosedPersonList.map(a => a.value).join(",")
				this.userName = this.choosedPersonList.map(a => a.label).join(",")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		width: 100%;
		height: 100%;
	}

	.popup-handle {
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
		font-size: 11rpx;
	}
</style>